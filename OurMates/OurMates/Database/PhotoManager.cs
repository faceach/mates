using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OurMates.Models;
using System.Threading.Tasks;

namespace OurMates.Database
{
    public class PhotoManager
    {
        public static Photo CreatePhotoModel(string photoId,
                                                    DateTime graduateDate,
                                                    DateTime uploadDateTime,
                                                    int personNum,
                                                    string url,
                                                    string school,
                                                    string gradeClass)
        {
            if (string.IsNullOrEmpty(photoId))
            {
                return null;
            }

            Photo photo = new Photo();
            photo.PhotoId = photoId;
            photo.GraduateDate = graduateDate;
            photo.UploadDateTime = uploadDateTime;
            photo.PersonNum = personNum;
            photo.URL = url;
            photo.School = school;
            photo.GradeClass = gradeClass;

            return photo;
        }
        public static Photo CreatePhotoModel(string photoId)
        {
            if (string.IsNullOrEmpty(photoId))
            {
                return null;
            }

            Photo photo = new Photo();
            photo.PhotoId = photo.PhotoId;

            return photo;
        }

        public static bool AddPhoto(Photo photoItem)
        {
            if (photoItem == null || string.IsNullOrEmpty(photoItem.PhotoId))
            {
                return false;
            }
            using (var matesEntities = new MatesEntities())
            {
                Photo photo = matesEntities.Photos.FirstOrDefault(c => c.PhotoId == photoItem.PhotoId);
                if (photo != null)
                {
                    return true;
                }

                // Add new category and update the old category

                matesEntities.Photos.Add(photoItem);
                matesEntities.SaveChanges();
            }

            return true;
        }

        public static Task<bool> DeletePhoto(string photoId)
        {
            return Task.Run<bool>(() =>
            {
                if (string.IsNullOrEmpty(photoId))
                {
                    return false;
                }

                using (var matesEntities = new MatesEntities())
                {
                    Photo photo = matesEntities.Photos.FirstOrDefault(c => c.PhotoId == photoId);
                    if (photo == null || string.IsNullOrEmpty(photo.PhotoId))
                    {
                        return false;
                    }

                    matesEntities.Photos.Remove(photo);
                    matesEntities.SaveChanges();
                }
                return true;
            });
        }

        public static Photo QueryPhoto(string photoId)
        {
            if (string.IsNullOrEmpty(photoId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                Photo photo = matesEntities.Photos.FirstOrDefault(c => c.PhotoId == photoId);

                return photo;
            }
        }

        /// <summary>
        /// select photo by faceId
        /// </summary>
        /// <param name="photoId"></param>
        /// <returns></returns>
        public static Photo QueryPhotoByFace(string faceId)
        {
            if (string.IsNullOrEmpty(faceId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {

                Face face = FaceManager.QueryFace(faceId);
                if (face != null && string.IsNullOrEmpty(face.PhotoId))
                {
                    Photo photo = matesEntities.Photos.FirstOrDefault(c => c.PhotoId == face.PhotoId);
                    return photo;
                }

                return null;
            }
        }

        public static IList<Photo> QueryPhotoList(List<string> photoIdList)
        {
            if (photoIdList == null)
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                List<Photo> photoList = new List<Photo>();
                foreach (string photoId in photoIdList)
                {
                    Photo photo = QueryPhoto(photoId);
                    if (photo != null)
                    {
                        photoList.Add(photo);
                    }
                }

                return photoList;
            }
        }

        /// <summary>
        /// select Photos by personId
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public static IList<Photo> QueryPhotoList(string personId)
        {
            if (string.IsNullOrEmpty(personId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                List<Photo> photoList = new List<Photo>();

                var faceList = FaceManager.QueryFaceListByPersonId(personId);

                foreach (var face in faceList)
                {
                    Photo photo = QueryPhoto(face.PhotoId);
                    if (photo != null)
                    {
                        photoList.Add(photo);
                    }
                }

                return photoList;
            }
        }

        public static bool UpdatePhoto(Photo photoNew)
        {
            if (photoNew == null || string.IsNullOrEmpty(photoNew.PhotoId))
            {
                return false;
            }

            using (var matesEntities = new MatesEntities())
            {
                Photo photo = matesEntities.Photos.FirstOrDefault(c => c.PhotoId == photoNew.PhotoId);
                if (photo == null)
                {
                    return false;
                }

                photo.GraduateDate = photoNew.GraduateDate;
                photo.UploadDateTime = photoNew.UploadDateTime;
                photo.PersonNum = photoNew.PersonNum;
                photo.URL = photoNew.URL;
                photo.School = photoNew.School;
                photo.GradeClass = photoNew.GradeClass;

                matesEntities.SaveChanges();
                return true;
            }
        }
    }
}