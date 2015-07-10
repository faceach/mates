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
        public HttpResponseMessage UploadPerson(JObject jsonData)
        {
            HttpStatusCode httpStatusCode = HttpStatusCode.BadRequest;

            if (PersonManager.TryParseJson(jsonData))
            {
                httpStatusCode = HttpStatusCode.OK;
            }

            return new HttpResponseMessage(httpStatusCode);
        }
    }
}