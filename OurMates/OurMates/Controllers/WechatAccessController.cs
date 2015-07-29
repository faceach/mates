using System;
using System.Web;
using System.Web.Http;
using System.Net;
using System.IO;
using System.Text;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using OurMates.Models.WeChat;
using OurMates.WeChat;

namespace OurMates.Controllers
{
    public class WechatAccessController : ApiController
    {
        [HttpGet]
        public WeChatModel Access(string url)
        {
            string decodedUrl = HttpUtility.UrlDecode(url);
            return WeChatManager.CreateWeChatModel(decodedUrl);
        }
    }
}