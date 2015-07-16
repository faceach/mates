using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OurMates.Models
{
    public class MatesResult
    {
        public enum MatesResultEnum
        {
            Success = 0,

            FaceSelectError = 1,//001
            FaceAddError = 2,//010
            FaceDeleteError = 3,//011
            FaceUpdateError = 4,//100

            PersonSelectError = 8,//001 000
            PersonAddError = 16,//010 000
            PersonDeleteError = 24,//011 000
            PersonUpdateError = 32,//100 000

            PhotoSelectError = 64,//001 000 000
            PhotoAddError = 128,//010 000 000
            PhotoDeleteError = 192,//011 000 000
            PhotoUpdateError = 256,//100 000 000

            ImageSaveError = 512,//001 000 000 000
            ThumbnailSaveError = 1024,//010 000 000 000

            PhotoParseError = 2048,//100 000 000 000

            RequestError = 4096,//1000 000 000 000

            IncompleteInfoError = 8192,//1000 000 000 000

            OtherError = 16384//1000 000 000 000
        }

        public static string SuccessStr = "OK";
        public static string DBErrorStr = "操作失败！";
        public static string PhotoParseErrorStr = "相片解析失败！";
        public static string ImageSaveErrorStr = "相片上传失败";
        public static string OtherErrorStr = "处理出错";

        public static string RequestErrorStr = "请求失败";
        public static string IncompleteInfoErrorStr = "输入信息不完整";

        public static string GetDescriptionFromError(MatesResultEnum resultError)
        {
            switch(resultError)
            {
                case MatesResultEnum.PhotoParseError:
                    return PhotoParseErrorStr;
                case MatesResultEnum.ImageSaveError:
                case MatesResultEnum.ThumbnailSaveError:
                    return ImageSaveErrorStr;
                case MatesResultEnum.FaceSelectError:
                case MatesResultEnum.FaceAddError:
                case MatesResultEnum.FaceDeleteError:
                case MatesResultEnum.FaceUpdateError:
                case MatesResultEnum.PersonSelectError:
                case MatesResultEnum.PersonAddError:
                case MatesResultEnum.PersonDeleteError:
                case MatesResultEnum.PersonUpdateError:
                case MatesResultEnum.PhotoSelectError:
                case MatesResultEnum.PhotoAddError:
                case MatesResultEnum.PhotoDeleteError:
                case MatesResultEnum.PhotoUpdateError:
                    return DBErrorStr;
                case MatesResultEnum.OtherError:
                    return OtherErrorStr;
                case MatesResultEnum.RequestError:
                    return RequestErrorStr;
                case MatesResultEnum.IncompleteInfoError:
                    return IncompleteInfoErrorStr;
                default:
                    return SuccessStr;
            }
        }
    }
}