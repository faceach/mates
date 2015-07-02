using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OurMates.Models;

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
                var person1 = matesEntities.Person.FirstOrDefault(c => c.PersonId == person.PersonId);
                if (person1 != null)
                {
                    return true;
                }

                // Add new category and update the old category

                matesEntities.Person.Add(person);
                matesEntities.SaveChanges();
                return true;
            }
        }
        public static bool DeletePerson(string personId)
        {
            if (string.IsNullOrEmpty(personId))
            {
                return false;
            }

            using (var matesEntities = new MatesEntities())
            {
                Person person = matesEntities.Person.FirstOrDefault(c => c.PersonId == personId);
                if (person == null || string.IsNullOrEmpty(person.PersonId))
                {
                    return false;
                }

                matesEntities.Person.Remove(person);
                matesEntities.SaveChanges();
                return true;
            }
        }

        public static Person QueryPerson(string personId)
        {
            if (string.IsNullOrEmpty(personId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                Person person = matesEntities.Person.FirstOrDefault(c => c.PersonId == personId);

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

        public static bool UpdatePerson(Person personEntity)
        {
            if (personEntity == null || string.IsNullOrEmpty(personEntity.PersonId))
            {
                return false;
            }

            using (var matesEntities = new MatesEntities())
            {
                Person person = matesEntities.Person.FirstOrDefault(c => c.PersonId == personEntity.PersonId);
                if (person == null)
                {
                    return false;
                }

                person.WechatId = personEntity.WechatId;
                person.IsClaimed = personEntity.IsClaimed;
                person.Name = personEntity.Name;
                person.PictureURL = personEntity.PictureURL;
                person.Location = personEntity.Location;
                person.ElementarySchool = personEntity.ElementarySchool;
                person.MiddleSchool = personEntity.MiddleSchool;
                person.HighSchool = personEntity.HighSchool;
                person.University = personEntity.University;
                person.MasterUniversity = personEntity.MasterUniversity;
                person.Others = personEntity.Others;

                matesEntities.SaveChanges();
                return true;
            }
        }
    }
}