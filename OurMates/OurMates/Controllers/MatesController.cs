using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OurMates.Controllers
{
    public class MatesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetHomePage()
        {
            return View("SentimentWeb");
        }
    }
}
