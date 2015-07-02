using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;

using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Diagnostics;
using Microsoft.WindowsAzure.ServiceRuntime;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace OurMates.Utils
{
    public class AzureBlobStorageUtil
    {
        public static CloudBlobContainer GetBlobContaniner(string conn, string containerName)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(conn);

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            return blobClient.GetContainerReference(containerName);
        }

        /// <summary>
        /// Download the text from blob
        /// </summary>
        /// <param name="conn"></param>
        /// <param name="containerName"></param>
        /// <param name="blobName"></param>
        /// <returns></returns>
        public static string GetTextBlob(string conn, string containerName, string blobName, int retry = 2)
        {
            int i = retry;
            while (i-->0)
            {
                try
                {
                    CloudBlobContainer container = GetBlobContaniner(conn, containerName);
                    CloudBlockBlob cloudblob = container.GetBlockBlobReference(blobName);
                    string text = cloudblob.DownloadText(Encoding.UTF8);
                    if (!string.IsNullOrWhiteSpace(text))
                    {
                        return text;
                    }
                }
                catch (Exception e)
                {
                    Trace.TraceError("Request is error. {0}", e.ToString());
                }
            }
            return null;
        }

        public static Dictionary<string, string> GetKeyValuePairFromBlob(string conn, string containerName, string blobName)
        {
            Dictionary<string, string> ret = new Dictionary<string, string>();
            string text = GetTextBlob(conn, containerName, blobName);
            if (text != null)
            {
                string[] lines = text.Split(new char[] { '\r', '\n' });
                foreach (string line in lines)
                {
                    if (!string.IsNullOrWhiteSpace(line))
                    {
                        string[] infos = line.Split('\t');
                        ret.Add(infos[0], infos[1]);
                    }
                }
            }
            return ret;
        }

        public static string UploadImageToAzure(Stream stream, String fileName, String publicPath, String accountName, String accountKey)
        {
            try
            {
                StorageCredentials credsC = new StorageCredentials(accountName, accountKey);
                CloudStorageAccount accountC = new CloudStorageAccount(credsC, "core.chinacloudapi.cn", useHttps: true);
                CloudBlobClient clientC = accountC.CreateCloudBlobClient();
                CloudBlobContainer sxhtestContainerC = clientC.GetContainerReference("mates");
                sxhtestContainerC.CreateIfNotExists();
                String webFileName = "image/" + publicPath + fileName;
                //String webFileName = DateTime.Now.ToString("yyyyMMddhhmmss") + "/" + id + "/" + Path.GetFileName(fileName);
                CloudBlockBlob blobC = sxhtestContainerC.GetBlockBlobReference(webFileName);
                blobC.Properties.ContentType = "image/jpeg";
                blobC.UploadFromStream(stream);
                blobC.SetProperties();

                return webFileName;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
