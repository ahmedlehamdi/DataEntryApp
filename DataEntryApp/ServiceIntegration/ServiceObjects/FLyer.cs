using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataEntryApp.ServiceIntegration.ServiceObjects
{
    public class FLyer
    {
        public int FLYER_ID{get;set;}

        public string PROVIDER_NAME_EN{get;set;}

        public string PROVIDER_NAME_AR{get;set;}

        public string FRAME_NAME_EN{get;set;}

        public string FRAME_NAME_AR{get;set;}

        public string OFFER_TYPE_NAME_EN{get;set;}

        public string OFFER_TYPE_NAME_AR{get;set;}

        public string LOCATION_CITY{get;set;}

        public string LOCATION_DISTRICT{get;set;}

        public string FLYER_NAME_EN{get;set;}

        public string FLYER_NAME_AR{get;set;}

        public string FLYER_IMAGE_URL{get;set;}

        public System.Nullable<bool> FLYER_APPROVED{get;set;}

        public System.Nullable<System.DateTime> FRAME_DATE_FROM{get;set;}

        public System.Nullable<System.DateTime> FRAME_DATE_TO{get;set;}
    }
}