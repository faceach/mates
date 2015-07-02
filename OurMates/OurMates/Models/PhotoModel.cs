
using System;
using System.Collections.Generic;
using OurMates.Database;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Runtime.Serialization.Json;
using OurMates.Utils;
using System.Text;

namespace OurMates.Models
{
    public class PhotoModel
    {
        public Photo PhotoEntity { get; set; }

        /// <summary>
        /// All persons in this photo
        /// </summary>
        public IList<FaceWithPersonModel> FaceWithPersonList { get; set; }

        public PhotoModel()
        { }

        public PhotoModel(Photo photo, IList<FaceWithPersonModel> faceWithPersonList)
        {
            this.PhotoEntity = photo;
            this.FaceWithPersonList = faceWithPersonList;
        }
        public static PhotoModel CreatePhotoModelById(string photoId)
        {
            Photo photo = PhotoManager.QueryPhoto(photoId);
            var faceList = FaceManager.QueryFaceListByPhoto(photoId);
            var faceWithPersonList = FaceManager.CreateFaceWithPersonList(faceList);

            return new PhotoModel(photo, faceWithPersonList);
        }

        public bool TryParseJson(JObject jsonData)
        {
            dynamic json = jsonData;

            bool result = false;

            Photo photo = new Photo();
            photo.PhotoId = json.ID;
            if (string.IsNullOrEmpty(photo.PhotoId))
            {
                return false;
            }

            photo.GraduateDate = json.GraduateDate;
            if (photo.GraduateDate == null || !photo.GraduateDate.HasValue)
            {
                return false;
            }

            photo.School = json.School;
            if (string.IsNullOrEmpty(photo.School))
            {
                return false;
            }

            photo.Class = json.Class;
            if (string.IsNullOrEmpty(photo.Class))
            {
                return false;
            }

            try
            {
                string timestamp = json.UploadDateTime;
                if (!string.IsNullOrEmpty(timestamp))
                {
                    DateTime dateTime;
                    if (DateTime.TryParse(timestamp, out dateTime))
                    {
                        photo.UploadDateTime = dateTime;
                    }
                }

                if (!photo.UploadDateTime.HasValue)
                {
                    photo.UploadDateTime = DateTime.Now;
                }

                string base64Image = json.Base64EncodedImage;
                var filePath = SaveImageToAzure(base64Image);
                if (!string.IsNullOrEmpty(filePath))
                {
                    photo.URL = AccountUtil.sMatesStorageBlobURLBase + filePath;
                    result = PhotoManager.AddPhoto(photo);

                    //TODO
                    //Parse faces

                }

                this.PhotoEntity = photo;
            }
            catch (Exception e)
            {
            }

            return result;

        }

        public string GetJsonFromObject()
        {
            using (MemoryStream memStream = new MemoryStream())
            {
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(PhotoModel));
                ser.WriteObject(memStream, this);

                return Encoding.UTF8.GetString(memStream.ToArray());
            }
        }

        private string SaveImageToAzure(string base64Image)
        {
            string result = string.Empty;
            if (!String.IsNullOrEmpty(base64Image))
            {
                try
                {
                    String fileName = this.PhotoEntity.PhotoId + ".jpg";
                    var webFileName = fileName;
                    using (Stream stream = Base64StringToStream(base64Image))
                    {
                        if (stream != null)
                        {
                            webFileName = AzureBlobStorageUtil.UploadImageToAzure(stream, fileName, "", AccountUtil.sAccountName, AccountUtil.sAccountKey);
                        }
                    }
                    result = webFileName;
                }
                catch (Exception e)
                {
                }
            }

            return result;
        }

        private static Stream Base64StringToStream(String inputStr)
        {
            Stream stream = null;
            try
            {
                if (!String.IsNullOrEmpty(inputStr))
                {
                    byte[] buffer = Convert.FromBase64String(inputStr);
                    stream = new MemoryStream(buffer);
                }
            }
            catch (Exception ex)
            {
                //MessageBox.Show("Base64StringToStream 转换失败\nException：" + ex.Message);
            }

            return stream;
        }

    }
}