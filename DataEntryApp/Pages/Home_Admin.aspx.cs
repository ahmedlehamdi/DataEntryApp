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
    public partial class Home_Admin : System.Web.UI.Page
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
                if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "15")
                {
                    deleteFlyer(int.Parse(this.Request.QueryString["flyerID"]));
                }
                else if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "16")
                {
                    updateUserPassword();
                }
            }
        }

        private void deleteFlyer(int flyerID)
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().deleteFlyerAndProductsByID(flyerID));
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("alert('Flyer Deleted Successfully');output = true;");
                    
                }
                else
                    HttpContext.Current.Response.Write("alert('" + output.returnObj + "');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearHeaders();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.Write("alert('Error Retrieving Flyers Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }

        private void updateUserPassword()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                var userID = int.Parse(Session["UserID"].ToString());

                var oldPassword = this.Request.QueryString["oldPassword"];
                var storedPassword = Session["UserPassword"].ToString();
                var newPassword = this.Request.QueryString["newPassword"];
                var newPasswordRepeated = this.Request.QueryString["newPasswordRepeated"];

                if (oldPassword == storedPassword)
                {
                    if (newPassword == newPasswordRepeated)
                    {
                        ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().updateUserPassword(userID, newPassword));
                        if (output.statusCode == 0)
                        {
                            HttpContext.Current.Response.Write("alert('Password Updated Successfully');output = true;");

                        }
                        else
                            HttpContext.Current.Response.Write("alert('" + output.returnObj + "');");
                        HttpContext.Current.Response.Flush();
                        HttpContext.Current.ApplicationInstance.CompleteRequest();
                        HttpContext.Current.Response.SuppressContent = true;
                    }
                    else
                    {
                        HttpContext.Current.Response.Write("alert('New Password mismatched with the repeated one');");
                        HttpContext.Current.Response.Flush();
                        HttpContext.Current.ApplicationInstance.CompleteRequest();
                        HttpContext.Current.Response.SuppressContent = true;
                    }
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Old Password is Wrong');");
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    HttpContext.Current.Response.SuppressContent = true;
                }
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearHeaders();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.Write("alert('Error Retrieving Flyers Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }
    }
}