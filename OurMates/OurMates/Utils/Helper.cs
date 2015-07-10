using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;
using System;

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

        public static Stream Base64StringToStream(String inputStr)
        {
            Stream stream = null;
            try
            {
                if (!String.IsNullOrEmpty(inputStr))
                {
                    byte[] buffer = Convert.FromBase64String(inputStr);
                    stream = new MemoryStream(buffer);
                }
            }
            catch (Exception ex)
            {
                //MessageBox.Show("Base64StringToStream 转换失败\nException：" + ex.Message);
            }

            return stream;
        }
    }
}