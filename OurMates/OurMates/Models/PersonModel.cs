
using System;
using System.Collections.Generic;
using OurMates.Database;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;

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

        /// <summary>
        /// 查找一个人的所有信息，包括其所有相片的信息，以及相片中该人的face信息
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public static Task<PersonModel> CreatePersonModelById(string personId)
        {
            return Task.Run<PersonModel>(() =>
                {
                    var person = PersonManager.QueryPerson(personId);
                    var faceList = FaceManager.QueryFaceListByPerson(personId);
                    var faceWithPhotoList = FaceManager.CreateFaceWithPhotoList(faceList);

                    return new PersonModel(person, faceWithPhotoList);
                });
        }
    }
}