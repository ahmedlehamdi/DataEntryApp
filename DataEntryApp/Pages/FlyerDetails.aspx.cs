using DataEntryApp.ServiceIntegration;
using DataEntryApp.ServiceIntegration.ServiceObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DataEntryApp.Pages
{
    public partial class FlyerDetails : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            this.Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1.0));
            this.Response.Cache.SetNoStore();
            int num = -1;
            try
            {
                num = int.Parse(Session["UserID"].ToString());
            }
            catch (Exception ex)
            {
                this.Response.Redirect("Login.aspx");
            }
            if (num == -1)
            {
                this.Response.Redirect("Login.aspx");
            }
            else
            {
                if (Request.Form["param0"] != null)
                {
                    retrieveFlyerDetails(int.Parse(Request.Form["param0"]));
                }
                else
                {
                    this.Response.Redirect("Login.aspx");
                }
            }
        }

        private void retrieveFlyerDetails(int flyerID)
        {
            var flyersData = ServiceResponseUnMarshaller<List<FLyer>>.deserializer(Session["flyersList"].ToString());
            FLyer selectedFlyer = null;
            foreach(FLyer flyer in flyersData)
            {
                if (flyer.FLYER_ID == flyerID)
                {
                    selectedFlyer = flyer;
                    break;
                }
            }

        }
    }
}