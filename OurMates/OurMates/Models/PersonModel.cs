
using System;
using System.Collections.Generic;
using OurMates.Database;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Runtime.Serialization.Json;
using OurMates.Utils;
using System.Text;

namespace OurMates.Models
{
    public class PersonModel
    {
        public Person PersonEntity { get; set; }

        /// <summary>
        /// All photos of this person
        /// </summary>
        public IList<FaceWithPhotoModel> FaceWithPhotoList { get; set; }

        public PersonModel()
        { }

        public PersonModel(Person person, IList<FaceWithPhotoModel> faceWithPhotoList)
        {
            this.PersonEntity = person;

            this.FaceWithPhotoList = faceWithPhotoList;
        }
        public static PersonModel CreatePersonModelById(string personId)
        {
            Person person = PersonManager.QueryPerson(personId);
            var faceList = FaceManager.QueryFaceListByPerson(personId);
            var faceWithPhotoList = FaceManager.CreateFaceWithPhotoList(faceList);

            return new PersonModel(person, faceWithPhotoList);
        }

        public bool TryParseJson(JObject jsonData)
        {
            dynamic json = jsonData;

            bool result = false;

            Person person = new Person();
            person.PersonId = json.PersonId;
            if (string.IsNullOrEmpty(person.PersonId))
            {
                return false;
            }

            person.WechatId = json.WechatId;
            if (!string.IsNullOrEmpty(person.WechatId))
            {
                person.IsClaimed = true;
            }

            person.Name = json.Name;
            person.Location = json.Location;
            person.ElementarySchool = json.ElementarySchool;
            person.MiddleSchool = json.MiddleSchool;
            person.HighSchool = json.HighSchool;
            person.University = json.University;
            person.MasterUniversity = json.MasterUniversity;
            person.Others = json.Others;

            try
            {
                PersonManager.AddPerson(person);

                string faceId = json.FaceId;
                if (!string.IsNullOrEmpty(faceId))
                {
                    FaceManager.UpdatePersonOfFace(faceId, person.PersonId);
                }
            }
            catch (Exception e)
            {
            }

            return result;

        }
    }
}