using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OurMates.Models;

namespace OurMates.Database
{
    public class FaceManager
    {
        public static Face CreateFaceModel(string faceId)
        {
            if (string.IsNullOrEmpty(faceId))
            {
                return null;
            }

            Face face = new Face();

            return face;
        }

        public static bool AddFace(Face faceEntity)
        {
            if (faceEntity == null || string.IsNullOrEmpty(faceEntity.FaceId))
            {
                return false;
            }

            using (var matesEntities = new MatesEntities())
            {
                Face face = matesEntities.Face.FirstOrDefault(c => c.FaceId == faceEntity.FaceId);
                if (face != null)
                {
                    return true;
                }

                // Add new category and update the old category
                matesEntities.Face.Add(faceEntity);
                matesEntities.SaveChanges();
                return true;
            }
        }
        public static bool DeleteFace(string faceId)
        {
            if (string.IsNullOrEmpty(faceId))
            {
                return false;
            }

            using (var matesEntities = new MatesEntities())
            {
                Face face = matesEntities.Face.FirstOrDefault(c => c.FaceId == faceId);
                if (face == null || string.IsNullOrEmpty(face.FaceId))
                {
                    return false;
                }

                matesEntities.Face.Remove(face);
                matesEntities.SaveChanges();
                return true;
            }
        }

        public static Face QueryFace(string faceId)
        {
            if (string.IsNullOrEmpty(faceId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                Face face = matesEntities.Face.FirstOrDefault(c => c.FaceId == faceId);

                return face;
            }
        }

        /// <summary>
        /// select all faces by personId
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public static IList<Face> QueryFaceListByPerson(string personId)
        {
            if (string.IsNullOrEmpty(personId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                List<Face> faceList = new List<Face>();

                faceList = matesEntities.Face.Where(c => c.PersonId == personId).ToList();

                return faceList;
            }
        }

        public static IList<FaceWithPhotoModel> CreateFaceWithPhotoList(IList<Face> faceList)
        {
            if (faceList == null || faceList.Count() <= 0)
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                var faceWithPhotoList = new List<FaceWithPhotoModel>();
                foreach (var face in faceList)
                {
                    Photo photo = PhotoManager.QueryPhotoByFace(face.FaceId);
                    if (photo != null)
                    {
                        faceWithPhotoList.Add(new FaceWithPhotoModel(face, photo));
                    }
                }

                return faceWithPhotoList;
            }
        }

        public static IList<FaceWithPersonModel> CreateFaceWithPersonList(IList<Face> faceList)
        {
            if (faceList == null || faceList.Count() <= 0)
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                var faceWithPersonList = new List<FaceWithPersonModel>();
                foreach (var face in faceList)
                {
                    Person person = PersonManager.QueryPerson(face.PersonId);
                    if (person != null)
                    {
                        faceWithPersonList.Add(new FaceWithPersonModel(face, person));
                    }
                }

                return faceWithPersonList;
            }
        }

        /// <summary>
        /// select all faces by photoId
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public static IList<Face> QueryFaceListByPhoto(string photoId)
        {
            if (string.IsNullOrEmpty(photoId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                List<Face> faceList = new List<Face>();

                faceList = matesEntities.Face.Where(c => c.PhotoId == photoId).ToList();

                return faceList;
            }
        }

        public static bool UpdateFace(Face faceEntity)
        {
            if (faceEntity == null || string.IsNullOrEmpty(faceEntity.FaceId))
            {
                return false;
            }

            using (var matesEntities = new MatesEntities())
            {
                Face face = matesEntities.Face.FirstOrDefault(c => c.FaceId == faceEntity.FaceId);
                if (face == null)
                {
                    return false;
                }

                face.PersonId = faceEntity.PersonId;
                face.PhotoId = faceEntity.PhotoId;
                face.TopPosition = faceEntity.TopPosition;
                face.LeftPosition = faceEntity.LeftPosition;
                face.Width = faceEntity.Width;
                face.Height = faceEntity.Height;

                matesEntities.SaveChanges();
                return true;
            }
        }
    }
}