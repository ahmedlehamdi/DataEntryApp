using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DataEntryApp.ServiceReference1;
using DataEntryApp.ServiceIntegration;
using DataEntryApp.ServiceIntegration.ServiceObjects;

namespace DataEntryApp.Pages
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "1")
            {
                doLogin();
            }
        }

        protected void doLogin()
        {
            if (this.Request.QueryString["username"] != null && this.Request.QueryString["password"] != null)
            {
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearHeaders();
                HttpContext.Current.Response.ClearContent();
                try
                {
                    ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().checkLogin(this.Request.QueryString["username"], this.Request.QueryString["password"]));
                    if (output.statusCode == 0)
                    {
                        User user = ServiceResponseUnMarshaller<User>.deserializer(output.returnObj.ToString());
                        this.Session["UserID"] = user.USER_ID;
                        if (user.USER_TYPE == "Admin")
                        {
                            HttpContext.Current.Response.Write("localStorage.setItem('UType', 'admin');localStorage.setItem('username', '" + user.USER_NAME + "');window.location = '../index.html';");
                        }
                        else if (user.USER_TYPE == "DataEntry")
                        {
                            HttpContext.Current.Response.Write("localStorage.setItem('UType', 'entry');localStorage.setItem('username', '" + user.USER_NAME + "');window.location = '../index.html';");
                        }
                    }
                    else
                        HttpContext.Current.Response.Write("alert('"+ output.returnObj+"');");
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    HttpContext.Current.Response.SuppressContent = true;
                }
                catch (Exception ex)
                {
                    HttpContext.Current.Response.Clear();
                    HttpContext.Current.Response.ClearHeaders();
                    HttpContext.Current.Response.ClearContent();
                    HttpContext.Current.Response.Write("alert('Error in username or password');");
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                    HttpContext.Current.Response.SuppressContent = true;
                }
            }
        }
    }
}