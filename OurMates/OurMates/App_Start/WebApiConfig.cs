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
        }
    }
}
