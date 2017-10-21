using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataEntryApp.ServiceIntegration.ServiceObjects
{
    public class PROVIDER
    {
        public int PROVIDER_ID{get;set;}

        public string PROVIDER_NAME_EN{get;set;}

        public string PROVIDER_NAME_AR{get;set;}

        public string PROVIDER_BUSINESS_AREA{get;set;}

        public string PROVIDER_CONTACTS{get;set;}

        public string PROVIDER_COORDINATOR{get;set;}

        public int LOCATION_ID{get;set;}

        public string LOCATION_COUNTRY{get;set;}

        public string LOCATION_REGION{get;set;}

        public string LOCATION_CITY{get;set;}

        public string LOCATION_DISTRICT{get;set;}

        public string LOCATION_STREET{get;set;}

        public string LOCATION_COORDINATES{get;set;}
    }
}