
using OurMates.Database;
using System.Collections.Generic;

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
        /*
        public void TagModel(PhotoAnalyzeResultsModel model, string belongTo)
        {
            foreach (var face in model.Faces)
            {
                face.BelongTo = belongTo;
            }

            if (model.Faces.Count == 0)
            {
                model.Description = "No faces";
                model.Category |= 0X0000;
            }
            else if (model.Faces.Count > 1)
            {
                model.Description = "face select";
                model.Category |= 0X0100;
            }
            else
            {
                model.Description = "success";
            }

        }
        */
    }
}