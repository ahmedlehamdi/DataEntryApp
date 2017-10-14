using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataEntryApp.ServiceIntegration.ServiceObjects
{
    public class FLyer
    {
        public int _FLYER_ID { get; set; }

        public string PROVIDER_NAME_EN { get; set; }

        public string PROVIDER_NAME_AR { get; set; }

        public string FRAME_NAME_EN { get; set; }

        public string FRAME_NAME_AR { get; set; }

        public string OFFER_TYPE_NAME_EN { get; set; }

        public string OFFER_TYPE_NAME_AR { get; set; }

        public string LOCATION_CITY { get; set; }

        public string LOCATION_DISTRICT { get; set; }

        public string FLYER_NAME_EN { get; set; }

        public string FLYER_NAME_AR { get; set; }

        public string FLYER_IMAGE_URL { get; set; }

        public bool FLYER_APPROVED { get; set; }
    }
}