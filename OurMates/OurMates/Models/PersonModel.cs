
using System.Collections.Generic;
using OurMates.Database;

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
    }
}