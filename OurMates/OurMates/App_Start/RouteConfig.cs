﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace OurMates
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "",
                defaults: new { controller = "Mates", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "LandingPage",
                url: "mates/index",
                defaults: new { controller = "Mates", action = "GetHomePage", id = UrlParameter.Optional }
            );
        }
    }
}