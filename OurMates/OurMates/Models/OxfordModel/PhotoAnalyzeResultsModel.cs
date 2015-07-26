using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OurMates.Models;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using OurMates.Utils;
using OurMates.Database;
using Microsoft.WindowsAzure.IntelligentServices.Face.AlgorithmHelper;
using Microsoft.ProjectOxford.Facial.Contract;

namespace OurMates.Models.OxfordModel
{
    public class PhotoAnalyzeResultsModel
    {
        public string AnalyticsEvent { get; set; }

        public string PhotoId { get; set; }

        public string PhotoURL { get; set; }

        public int Score { get; set; }

        public string Description { get; set; }

        public List<Face> Faces { get; set; }

        /// <summary>
        /// Save Image into Blob: 1 seccess; 0 fail
        /// Save Info: 1 seccess; 0 fail
        /// Parse image:  1 seccess; 0 fail
        /// </summary>
        public int Category { get; set; } //”success”, “nofaces”, “faceselect”, 

        

        public static async Task<PhotoAnalyzeResultsModel> TryParseJson(JObject jsonData)
        {
            var photoAnalyzeResultsModel = new PhotoAnalyzeResultsModel();
            var matesResult = MatesResult.MatesResultEnum.Success;
            bool result = true;

            if (jsonData == null)
            {
                matesResult = MatesResult.MatesResultEnum.RequestError;
            }
            else
            {
                try
                {
                    dynamic json = jsonData;
                    Photo photo = new Photo();
                    photo.PhotoId = json.ID;
                    if (string.IsNullOrEmpty(photo.PhotoId))
                    {
                        photo.PhotoId = Guid.NewGuid().ToString().Replace("-", "");
                    }
                    photoAnalyzeResultsModel.PhotoId = photo.PhotoId;

                    string graduateDate = json.GraduateDate;
                    if (!string.IsNullOrEmpty(graduateDate))
                    {
                        DateTime dateTime;
                        if (DateTime.TryParse(graduateDate, out dateTime))
                        {
                            photo.GraduateDate = dateTime;
                        }
                    }

                    if (!photo.GraduateDate.HasValue)
                    {
                        result = false;
                    }

                    photo.School = json.School;
                    photo.GradeClass = json.GradeClass;
                    photo.Category = json.Category;
                    photo.Summary = json.Summary;

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

                    string base64Image = json.Src;
                    var filePath = await AzureBlobStorageUtil.SaveImageToAzure(base64Image, photo.PhotoId, AccountUtil.sMatesPhotoStorage);
                    if (!string.IsNullOrEmpty(filePath))
                    {
                        photo.URL = AccountUtil.sPhotoStorageBlobURLBase + filePath;

                        //Parse faces
                        Facial[] faces = await MvcApplication.OxfordFaceApiClient.UploadStreamAndDetectFaces(Helper.Base64StringToStream(base64Image));
                        if (faces == null || faces.Length <= 0)
                        {
                            photoAnalyzeResultsModel.Description = MatesResult.PhotoParseErrorStr;
                        }
                        else
                        {
                            photo.PersonNum = faces.Length;
                            photoAnalyzeResultsModel.PhotoURL = photo.URL;
                            result = PhotoManager.AddPhoto(photo);
                            photoAnalyzeResultsModel.Faces = CreatFaceList(faces);
                        }

                        if (!result)
                        {
                            matesResult = MatesResult.MatesResultEnum.PhotoAddError;
                        }

                        result = FaceManager.AddFace(photoAnalyzeResultsModel.Faces, photo.PhotoId);
                        if (!result)
                        {
                            matesResult = MatesResult.MatesResultEnum.FaceAddError;
                        }
                    }

                    else
                    {
                        matesResult = MatesResult.MatesResultEnum.ImageSaveError;
                    }
                }
                catch (Exception e)
                {
                    matesResult = MatesResult.MatesResultEnum.OtherError;
                }
            }

            photoAnalyzeResultsModel.Category = (int)matesResult;
            photoAnalyzeResultsModel.Description = MatesResult.GetDescriptionFromError(matesResult);
            return photoAnalyzeResultsModel;
        }

        private static List<Face> CreatFaceList(Facial[] retFaces)
        {
            if (retFaces == null || retFaces.Length <= 0)
            {
                return null;
            }

            var imageResult = new List<Face>();

            foreach (var t in retFaces)
            {
                var face = new Face
                {
                    FaceId = t.FaceId.ToString(),
                    LeftPosition = t.FaceRectangle.Left,
                    TopPosition = t.FaceRectangle.Top,
                    Width = t.FaceRectangle.Width,
                    Height = t.FaceRectangle.Height,
                    //Attributes = new FaceAttributes()
                    Age = t.Attributes.Age,
                    Gender = t.Attributes.Gender

                };
                imageResult.Add(face);
            }

            return imageResult;
        }
    }
}