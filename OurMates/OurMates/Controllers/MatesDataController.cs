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
using System.Text;

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

        [HttpPost]
        public HttpResponseMessage UploadPhoto(JObject jsonData)
        {
            HttpResponseMessage response = null;

            PhotoModel photoModel = new PhotoModel();
            if (photoModel.TryParseJson(jsonData))
            {
                String result = photoModel.GetJsonFromObject();

                response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StringContent(result, Encoding.UTF8, "application/json");
            }

            return response;
        }

        [HttpPost]
        public HttpResponseMessage UploadPerson(JObject jsonData)
        {
            HttpStatusCode httpStatusCode = HttpStatusCode.BadRequest;

            PhotoModel photoModel = new PhotoModel();
            if (photoModel.TryParseJson(jsonData))
            {
                httpStatusCode = HttpStatusCode.OK;
            }

            return new HttpResponseMessage(httpStatusCode);
        }
    }
}