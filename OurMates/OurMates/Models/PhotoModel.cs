
using OurMates.Database;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OurMates.Models
{
    public class PhotoModel
    {
        public Photo PhotoEntity { get; set; }

        /// <summary>
        /// All persons in this photo
        /// </summary>
        public IList<FaceWithPersonModel> FaceWithPersonList { get; set; }
        public IList<Face> FaceList { get; set; }

        public PhotoModel()
        { }

        public PhotoModel(Photo photo, IList<Face> faceList, IList<FaceWithPersonModel> faceWithPersonList)
        {
            this.PhotoEntity = photo;
            this.FaceList = faceList;
            this.FaceWithPersonList = faceWithPersonList;
        }
        public static Task<PhotoModel> CreatePhotoModelById(string photoId)
        {
            return Task.Run<PhotoModel>(() =>
                {
                    Photo photo = PhotoManager.QueryPhoto(photoId);
                    var faceList = FaceManager.QueryFaceListByPhoto(photoId);
                    var faceWithPersonList = FaceManager.CreateFaceWithPersonList(faceList);

                    return new PhotoModel(photo, faceList, faceWithPersonList);
                });
        }

    }
}