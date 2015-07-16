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
using OurMates.Utils;
using System.Threading.Tasks;
using OurMates.Models.OxfordModel;
using OurMates.Database;

namespace OurMates.Controllers
{
    public class MatesDataController : ApiController
    {
        [HttpGet]
        public string Prob()
        {
            return "success";
        }

        [HttpGet]
        public async Task<JObject> GetPersonWithAllPhotos(string personId)
        {
            var personModel = await PersonModel.CreatePersonModelById(personId);

            return JObject.FromObject(personModel);
        }


        [HttpGet]
        public async Task<JObject> GetPhotoWithAllPersons(string photoId)
        {
            var photoModel = await PhotoModel.CreatePhotoModelById(photoId);

            return JObject.FromObject(photoModel);
        }

        [HttpPost]
        public async Task<HttpResponseMessage> UploadPhoto(JObject jsonData)
        {
            HttpResponseMessage response = null;

            var resultModel = await PhotoAnalyzeResultsModel.TryParseJson(jsonData);
            if (resultModel != null)
            {
                String result = Helper.GetJsonFromObject(resultModel);

                response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StringContent(result, Encoding.UTF8, "application/json");
            }

            return response;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> UploadPerson(JObject jsonData)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);

            var result = await PersonManager.TryParseJson(jsonData);
            if (!string.IsNullOrEmpty(result))
            {
                response.Content = new StringContent(result, Encoding.UTF8, "application/json");
            }

            return response;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> DeletePhoto(string personId)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.NotFound);

            var result = await FaceManager.DeleteFaceOfPerson(personId);
            if (result)
            {
                response = new HttpResponseMessage(HttpStatusCode.OK);
            }

            return response;
        }

    }
}