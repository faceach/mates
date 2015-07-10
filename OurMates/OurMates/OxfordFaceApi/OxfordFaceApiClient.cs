using Microsoft.ProjectOxford.Facial;
using Microsoft.ProjectOxford.Facial.Contract;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Microsoft.WindowsAzure.IntelligentServices.Face.AlgorithmHelper
{
    public class OxfordFaceApiClient
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="VisionHelper"/> class.
        /// </summary>
        /// <param name="subscriptionKey">The subscription key.</param>
        /// <param name="frameImageUri">The frame image URI.</param>
        public OxfordFaceApiClient(string subscriptionKey)
        {
            this.faceServiceClient = new FaceServiceClient(subscriptionKey);
        }

        private readonly IFaceServiceClient faceServiceClient;


        public async Task<float> CalculateSimilarity(Guid faceId1, Guid faceId2)
        { 
            var verifyResult = await faceServiceClient.VerifyAsync(faceId1, faceId2);
            var conf = verifyResult.Confidence;
            if (conf > 0.5)
            {
                conf = 0.2 * conf + 0.8;
            }
            else
            {
                conf = 1.8 * conf;
            }
            return (float)conf;
        }

        public async Task<FaceRectangle[]> UploadAndDetectFaces(string imageFilePath)
        {
            try
            {
                using (Stream imageFileStream = File.OpenRead(imageFilePath))
                {
                    var faces = await faceServiceClient.DetectAsync(imageFileStream);
                    var faceRects = faces.Select(face => face.FaceRectangle);

                    return faceRects.ToArray();
                }
            }
            catch (Exception)
            {
                return new FaceRectangle[0];
            }
        }

        public async Task<FaceRectangle[]> UploadAndDetectFaces(Stream imageFileStream)
        {
            try
            {
                var faces = await faceServiceClient.DetectAsync(imageFileStream);
                var faceRects = faces.Select(face => face.FaceRectangle);

                return faceRects.ToArray();
            }
            catch (Exception)
            {
                return new FaceRectangle[0];
            }
        }

        public async Task<Facial[]> UploadStreamAndDetectFaces(string url)
        {
            try
            {
                var request = System.Net.WebRequest.Create(new Uri(url));
                request.Timeout = 6000;
                var response = request.GetResponse();
                var len = response.ContentLength;
                if (len > 3000000) return null;
                var streamToUpload = response.GetResponseStream();
                var faces = await faceServiceClient.DetectAsync(streamToUpload, false, false, false, false);
                return faces.ToArray();
            }
            catch (Exception)
            {
                return new Facial[0];
            }
        }

        public async Task<Facial[]> UploadStreamAndDetectFaces(Stream stream)
        {
            try
            {
                var faces = await faceServiceClient.DetectAsync(stream, false, false, false, false);
                return faces.ToArray();
            }
            catch (Exception)
            {
                return new Facial[0];
            }
        }

        public async Task<Facial[]> UploadStreamToStore(Stream stream)
        {
            try
            {
                var faces = await faceServiceClient.DetectAsync(stream, false, false, false, false, true);
                return faces.ToArray();
            }
            catch (Exception)
            {
                return new Facial[0];
            }
        }


        public async Task<Facial[]> UploadAndReturnFaces(string imageFilePath)
        {
            try
            {
                using (Stream imageFileStream = File.OpenRead(imageFilePath))
                {
                    var faces = await faceServiceClient.DetectAsync(imageFileStream, true, true, true, true);
                    return faces.ToArray();
                }
            }
            catch (Exception)
            {
                return new Facial[0];
            }
        }

    }
}