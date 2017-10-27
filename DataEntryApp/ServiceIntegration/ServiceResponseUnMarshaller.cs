using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DataEntryApp.ServiceReference1;
using Newtonsoft.Json;

namespace DataEntryApp.ServiceIntegration
{
    public class ServiceResponseUnMarshaller<OBJ>
    {

        public static ReturnObject<object> unmarshall(string response)
        {
            ReturnObject<object> resObj = JsonConvert.DeserializeObject<ReturnObject<object>>(response);
            return resObj;
        }

        public static OBJ deserializer(string str)
        {
            OBJ obj = JsonConvert.DeserializeObject<OBJ>(str);
            return obj;
        }

        public static string serializer(OBJ obj)
        {
            string result = JsonConvert.SerializeObject(obj);
            return result;
        }
    }
}