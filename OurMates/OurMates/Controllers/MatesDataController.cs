using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using OurMates.Models;
using Newtonsoft.Json.Linq;

namespace OurMates.Controllers
{
    public class MatesDataController : ApiController
    {
        [HttpGet]
        public JObject GetPersonWithAllPhotos(string personId)
        {
            var personModel = PersonModel.CreatePersonModelById(personId);

            return JObject.FromObject(personModel);
        }


        [HttpGet]
        public JObject GetPhotoWithAllPersons(string photoId)
        {
            var photoModel = PhotoModel.CreatePhotoModelById(photoId);

            return JObject.FromObject(photoModel);
        }
    }
}