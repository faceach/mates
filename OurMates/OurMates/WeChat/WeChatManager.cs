using Senparc.Weixin.Exceptions;
using Senparc.Weixin.MP.CommonAPIs;
using Senparc.Weixin.MP.Helpers;
using OurMates.Models.WeChat;
using System;

namespace OurMates.WeChat
{
    public class WeChatManager
    {
        public readonly static string WeChatJsSdkAppId = "wxcf1b742a641680e0";
        public readonly static string WeChatJsSdkAppSecret = "aabf228b0096491d3eb21d8c51816d75";

        public static WeChatModel CreateWeChatModel(string url)
        {
            WeChatModel weChatModel = new WeChatModel();

            string ticket = string.Empty;
            weChatModel.Timestamp = JSSDKHelper.GetTimestamp();
            weChatModel.NonceStr = JSSDKHelper.GetNoncestr();
            JSSDKHelper jssdkhelper = new JSSDKHelper();
            weChatModel.Signature = string.Empty;
            weChatModel.AppId = WeChatJsSdkAppId;
            try
            {
                ticket = JsApiTicketContainer.TryGetTicket(WeChatJsSdkAppId, WeChatJsSdkAppSecret);
                weChatModel.Signature = jssdkhelper.GetSignature(ticket, weChatModel.NonceStr, weChatModel.Timestamp, url);
            }
            catch (ErrorJsonResultException ex)
            {
                Console.WriteLine("errorcode:" + ex.JsonResult.errcode.ToString() + "   errmsg:" + ex.JsonResult.errmsg);
            }

            return weChatModel;
        }
    }
}
