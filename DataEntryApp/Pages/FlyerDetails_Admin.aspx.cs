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
    public partial class FlyerDetails_Admin : System.Web.UI.Page
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
                if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "17")
                {
                    
                }
            }
        }

        private void approveRejectFlyer()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                var flyerID = int.Parse(this.Request.QueryString["flyerID"]);
                var flag = bool.Parse(this.Request.QueryString["flag"]);
                if (flyerID > 0)
                {
                    ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().approveRejectFlyer(flyerID, flag));
                    if (output.statusCode == 0)
                    {
                        if(flag)
                            HttpContext.Current.Response.Write("alert('Flyer Approved Successfully');");
                        else
                            HttpContext.Current.Response.Write("alert('Flyer Rejected Successfully');");
                        HttpContext.Current.Response.Write("window.location='/Pages/Home_Admin.aspx';");
                    }
                    else
                        HttpContext.Current.Response.Write("alert('" + output.returnObj + "');");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Failed To Change Flyer Status');");
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
                HttpContext.Current.Response.Write("alert('Error Retrieving Flyer Products Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }
    }
}