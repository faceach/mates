
using System.Collections.Generic;
using OurMates.Database;

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
    }
}