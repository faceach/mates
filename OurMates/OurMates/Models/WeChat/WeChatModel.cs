using System;

namespace OurMates.Models.WeChat
{
    public class WeChatModel
    {
        public string AppId { get; set; }
        public string Timestamp { get; set; }
        public string NonceStr { get; set; }
        public string Signature { get; set; }
    }
}
