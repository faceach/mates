using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace OurMates
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/mates",
                defaults: new { controller = "MatesData", action = "Prob", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "PersonWithAllPhotosApi",
                routeTemplate: "api/person/photos",
                defaults: new { controller = "MatesData", action = "GetPersonWithAllPhotos", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "PhotoWithAllPersonsApi",
                routeTemplate: "api/photo/persons",
                defaults: new { controller = "MatesData", action = "GetPhotoWithAllPersons", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "UpdatePhotoApi",
                routeTemplate: "api/photo/upload",
                defaults: new { controller = "MatesData", action = "UploadPhoto", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "UpdatePersonsApi",
                routeTemplate: "api/person/upload",
                defaults: new { controller = "MatesData", action = "UploadPerson", id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "DeletePhotoApi",
                routeTemplate: "api/photo/delete",
                defaults: new { controller = "MatesData", action = "DeletePhoto", id = RouteParameter.Optional }
            );
        }
    }
}
