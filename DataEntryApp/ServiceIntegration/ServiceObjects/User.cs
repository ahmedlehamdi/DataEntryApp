using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataEntryApp.ServiceIntegration.ServiceObjects
{
    public class User
    {
        public int USER_ID { get; set; }

        public string USER_NAME { get; set; }

        public string USER_PASSWORD { get; set; }

        public string USER_TYPE { get; set; }

        public string USER_PAGES { get; set; }
    }
}