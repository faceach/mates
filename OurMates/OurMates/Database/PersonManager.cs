using Newtonsoft.Json.Linq;
using OurMates.Models;
using OurMates.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OurMates.Database
{
    public class PersonManager
    {
        public static PersonModel CreatePersonModel(Person person)
        {
            if (person == null || string.IsNullOrEmpty(person.PersonId))
            {
                return null;
            }

            PersonModel personModel = new PersonModel();
            personModel.PersonEntity = person;

            return personModel;
        }

        public static bool AddPerson(Person person)
        {
            if (person == null || string.IsNullOrEmpty(person.PersonId))
            {
                return false;
            }

            using (var matesEntities = new MatesEntities())
            {
                var person1 = matesEntities.Persons.FirstOrDefault(c => c.PersonId == person.PersonId);
                if (person1 != null)
                {
                    return true;
                }

                // Add new category and update the old category

                matesEntities.Persons.Add(person);
                matesEntities.SaveChanges();
                return true;
            }
        }


        public static Task<bool> DeletePerson(string personId)
        {
            return Task.Run<bool>(() =>
            {
                if (string.IsNullOrEmpty(personId))
                {
                    return false;
                }

                using (var matesEntities = new MatesEntities())
                {
                    Person person = matesEntities.Persons.FirstOrDefault(c => c.PersonId == personId);
                    if (person == null || string.IsNullOrEmpty(person.PersonId))
                    {
                        return false;
                    }

                    matesEntities.Persons.Remove(person);
                    matesEntities.SaveChanges();
                    return true;
                }
            });
        }

        public static Person QueryPerson(string id, bool isPersonId = true)
        {
            if (string.IsNullOrEmpty(id))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                Person person = null;
                person = isPersonId ? matesEntities.Persons.FirstOrDefault(c => c.PersonId == id)
                    : matesEntities.Persons.FirstOrDefault(c => c.WechatId == id);

                return person;
            }
        }

        public static IList<Person> QueryPersonList(List<string> personIdList)
        {
            if (personIdList == null)
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                List<Person> personList = new List<Person>();
                foreach (string personId in personIdList)
                {
                    Person person = QueryPerson(personId);
                    if (person != null)
                    {
                        personList.Add(person);
                    }
                }

                return personList;
            }
        }

        public static Task<bool> UpdatePerson(Person personEntity)
        {
            return Task.Run<bool>(() =>
            {
                if (personEntity == null || string.IsNullOrEmpty(personEntity.PersonId))
                {
                    return false;
                }

                using (var matesEntities = new MatesEntities())
                {
                    Person person = matesEntities.Persons.FirstOrDefault(c => c.PersonId == personEntity.PersonId);
                    if (person == null)
                    {
                        return false;
                    }

                    person.WechatId = personEntity.WechatId;
                    person.IsSingle = personEntity.IsSingle;
                    person.Name = personEntity.Name;
                    person.PictureURL = personEntity.PictureURL;
                    person.Company = personEntity.Company;
                    person.CurrentLocation = personEntity.CurrentLocation;
                    person.HighestCollege = personEntity.HighestCollege;
                    person.HighestDegree = personEntity.HighestDegree;

                    person.HomeLocation = personEntity.HomeLocation;
                    person.ElementarySchool = personEntity.ElementarySchool;
                    person.MiddleSchool = personEntity.MiddleSchool;
                    person.HighSchool = personEntity.HighSchool;
                    person.University = personEntity.University;
                    person.Others = personEntity.Others;

                    matesEntities.SaveChanges();
                    return true;
                }
            });
        }

        public static async Task<string> TryParseJson(JObject jsonData)
        {
            dynamic json = jsonData;
            var matesResult = MatesResult.MatesResultEnum.Success;

            bool result = true;

            if (jsonData == null)
            {
                matesResult = MatesResult.MatesResultEnum.RequestError;
            }
            else
            {
                Person person = new Person();
                person.PersonId = json.PersonId;
                if (string.IsNullOrEmpty(person.PersonId))
                {
                    person.PersonId = Guid.NewGuid().ToString().Replace("-", "");
                }

                person.WechatId = json.WechatId;

                person.Name = json.Name;
                if (string.IsNullOrEmpty(person.Name))
                {
                    result = false;
                    matesResult = MatesResult.MatesResultEnum.IncompleteInfoError;
                }

                person.Company = json.Company;
                person.CurrentLocation = json.CurrentLocation;
                person.HighestCollege = json.HighestCollege;
                person.HighestDegree = json.HighestDegree;
                person.BusinessScope = json.BusinessScope;

                person.HomeLocation = json.HomeLocation;
                person.ElementarySchool = json.ElementarySchool;
                person.MiddleSchool = json.MiddleSchool;
                person.HighSchool = json.HighSchool;
                person.University = json.University;
                person.Others = json.Others;

                try
                {
                    person.IsSingle = json.IsSingle;
                    person.IsSelf = json.IsSelf;
                    /*
                    var isSingle = json.IsSingle;
                    if (!string.IsNullOrEmpty(isSingle))
                    {
                        person.IsSingle = Boolean.Parse(isSingle);
                    }

                    var isSelf = json.IsSelf;
                    if (!string.IsNullOrEmpty(isSelf))
                    {
                        person.IsSelf = Boolean.Parse(isSelf);
                    }
                     * */
                    if (result)
                    {
                        string base64Image = json.Src;
                        if (!string.IsNullOrEmpty(base64Image))
                        {
                            var filePath = await AzureBlobStorageUtil.SaveImageToAzure(base64Image, person.PersonId, AccountUtil.sMatesPersonStorage);
                            if (!string.IsNullOrEmpty(filePath))
                            {
                                person.PictureURL = AccountUtil.sPersonPicStorageBlobURLBase + filePath;
                            }
                            else
                            {
                                result = false;
                                matesResult = MatesResult.MatesResultEnum.ImageSaveError;
                            }
                        }

                        if (result)
                        {
                            result = PersonManager.AddPerson(person);

                            if(!result)
                            {
                                matesResult = MatesResult.MatesResultEnum.PersonAddError;
                            }
                        }

                        string faceId = json.FaceId;
                        if (!string.IsNullOrEmpty(faceId))
                        {
                            result = FaceManager.UpdatePersonOfFace(faceId, person.PersonId);

                            if (!result)
                            {
                                matesResult = MatesResult.MatesResultEnum.FaceUpdateError;
                            }
                        }
                    }
                }
                catch (Exception e)
                {
                    matesResult = MatesResult.MatesResultEnum.OtherError;
                }
            }

            return MatesResult.GetDescriptionFromError(matesResult);
        }
    }
}