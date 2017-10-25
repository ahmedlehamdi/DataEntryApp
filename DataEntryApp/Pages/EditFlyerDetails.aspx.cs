using DataEntryApp.ServiceIntegration;
using DataEntryApp.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DataEntryApp.Pages
{
    public partial class EditFlyerDetails : System.Web.UI.Page
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
                if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "12")
                {
                    retrieveFlyerDetails(int.Parse(this.Request.QueryString["flyerID"]));
                }
            }
        }
        private void retrieveFlyerDetails(int flyerID)
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                if (flyerID > 0)
                {
                    ReturnObject<object> FlyerBasicData = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getFlyerBasicData(flyerID));
                    if (FlyerBasicData.statusCode == 0)
                    {
                        HttpContext.Current.Response.Write("flyerData = " + FlyerBasicData.returnObj + ";");
                    }
                    else
                        HttpContext.Current.Response.Write("alert('" + FlyerBasicData.returnObj + "');");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Failed To retrieve Flyer Data');");
                }
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearHeaders();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.Write("alert('Error Retrieving Flyer Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }
    }
}