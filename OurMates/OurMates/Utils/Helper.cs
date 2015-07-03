using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;

namespace OurMates.Utils
{
    public class Helper
    {
        public static string GetJsonFromObject<T>(T t)
        {
            using (MemoryStream memStream = new MemoryStream())
            {
                DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(T));
                ser.WriteObject(memStream, t);

                return Encoding.UTF8.GetString(memStream.ToArray());
            }
        }
    }
}