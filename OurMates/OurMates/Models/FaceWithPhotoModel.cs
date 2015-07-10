using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OurMates.Models
{
    public class FaceWithPhotoModel
    {
        public Face FaceModel { get; set; }

        //infor of photo
        public Photo PhotoModel { get; set; }

        public FaceWithPhotoModel()
        { }

        public FaceWithPhotoModel(Face face, Photo photo)
        {
            this.FaceModel = face;
            this.PhotoModel = photo;
        }


    }
}