using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OurMates.Models;
using System.Threading.Tasks;

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

        public static Task<bool> AddFace(Face faceEntity)
        {
            return Task.Run<bool>(() =>
            {
                if (faceEntity == null || string.IsNullOrEmpty(faceEntity.FaceId))
                {
                    return false;
                }

                using (var matesEntities = new MatesEntities())
                {
                    Face face = matesEntities.Faces.FirstOrDefault(c => c.FaceId == faceEntity.FaceId);
                    if (face != null)
                    {
                        return true;
                    }

                    // Add new category and update the old category
                    matesEntities.Faces.Add(faceEntity);
                    matesEntities.SaveChanges();
                    return true;
                }
            });
        }

        public static bool AddFace(IList<Face> faceList, string photoId)
        {
            if (faceList == null || faceList.Count() <= 0)
            {
                return true;
            }
            using (var matesEntities = new MatesEntities())
            {

                foreach (var faceItem in faceList)
                {
                    Face face = matesEntities.Faces.FirstOrDefault(c => c.FaceId == faceItem.FaceId);
                    if (face != null)
                    {
                        continue;
                    }

                    if (string.IsNullOrEmpty(faceItem.PhotoId))
                    {
                        faceItem.PhotoId = photoId;
                    }
                    // Add new category and update the old category
                    matesEntities.Faces.Add(faceItem);
                }
                matesEntities.SaveChanges();
                return true;
            }
        }

        public static Task<bool> DeleteFace(string faceId)
        {
            return Task.Run<bool>(() =>
            {
                if (string.IsNullOrEmpty(faceId))
                {
                    return false;
                }

                using (var matesEntities = new MatesEntities())
                {
                    Face face = matesEntities.Faces.FirstOrDefault(c => c.FaceId == faceId);
                    if (face == null || string.IsNullOrEmpty(face.FaceId))
                    {
                        return false;
                    }

                    matesEntities.Faces.Remove(face);
                    matesEntities.SaveChanges();
                    return true;
                }
            });
        }

        public static Task<bool> DeleteFaceOfPerson(string personId)
        {
            return Task.Run<bool>(() =>
            {
                if (string.IsNullOrEmpty(personId))
                {
                    return false;
                }

                using (var matesEntities = new MatesEntities())
                {
                    List<Face> faceList = new List<Face>();
                    faceList = matesEntities.Faces.Where(c => c.PersonId == personId).ToList();

                    if (faceList == null || faceList.Count <= 0)
                    {
                        return false;
                    }

                    foreach (var face in faceList)
                    {
                        face.PersonId = null;
                    }

                    matesEntities.SaveChanges();
                    return true;
                }
            });
        }

        public static Face QueryFace(string faceId)
        {
            if (string.IsNullOrEmpty(faceId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                Face face = matesEntities.Faces.FirstOrDefault(c => c.FaceId == faceId);

                return face;
            }
        }

        /// <summary>
        /// select all faces by personId
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public static IList<Face> QueryFaceListByPersonId(string personId)
        {
            if (string.IsNullOrEmpty(personId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                List<Face> faceList = new List<Face>();

                faceList = matesEntities.Faces.Where(c => c.PersonId == personId).ToList();

                return faceList;
            }
        }
        public static IList<Face> QueryFaceListByPerson(Person person)
        {
            if (person == null || string.IsNullOrEmpty(person.PersonId))
            {
                return null;
            }

            using (var matesEntities = new MatesEntities())
            {
                List<Face> faceList = new List<Face>();

                faceList = matesEntities.Faces.Where(c => c.PersonId == person.PersonId).ToList();

                return faceList;
            }
        }

        /// <summary>
        /// 根据某一个人的多个Face，找到其所有的相片
        /// </summary>
        /// <param name="faceList"></param>
        /// <returns></returns>
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

                faceList = matesEntities.Faces.Where(c => c.PhotoId == photoId).ToList();

                return faceList;
            }
        }

        public static Task<bool> UpdateFace(Face faceEntity)
        {
            return Task.Run<bool>(() =>
            {
                if (faceEntity == null || string.IsNullOrEmpty(faceEntity.FaceId))
                {
                    return false;
                }

                using (var matesEntities = new MatesEntities())
                {
                    Face face = matesEntities.Faces.FirstOrDefault(c => c.FaceId == faceEntity.FaceId);
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
            });
        }

        public static bool UpdatePersonOfFace(string faceId, string personId)
        {
            if (string.IsNullOrEmpty(faceId) || string.IsNullOrEmpty(personId))
            {
                return false;
            }

            using (var matesEntities = new MatesEntities())
            {
                Face face = matesEntities.Faces.FirstOrDefault(c => c.FaceId == faceId);
                if (face == null)
                {
                    return false;
                }

                if (string.IsNullOrEmpty(face.PersonId) || face.PersonId != personId)
                {
                    face.PersonId = personId;
                    matesEntities.SaveChanges();
                }
                return true;
            }
        }
    }
}