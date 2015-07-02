using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OurMates.Models
{
    public class FaceWithPersonModel
    {
        public Face FaceModel { get; set; }

        //infor of person
        public Person PersonModel { get; set; }

        public FaceWithPersonModel()
        { }

        public FaceWithPersonModel(Face face, Person person)
        {
            this.FaceModel = face;
            this.PersonModel = person;
        }
    }
}