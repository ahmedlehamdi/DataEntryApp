using DataEntryApp.ServiceIntegration;
using DataEntryApp.ServiceIntegration.ServiceObjects;
using DataEntryApp.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DataEntryApp.Pages
{
    public partial class UserManagment : System.Web.UI.Page
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
                if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "18")
                {
                    loadUsersList();
                }
                if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "19")
                {
                    validateUserPassword();
                }

            }
        }

        private void loadUsersList()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getListOfAllUsers());
                if (output.statusCode == 0)
                {
                    var usersList = ServiceResponseUnMarshaller<List<User>>.deserializer(output.returnObj.ToString());
                    Session["UsersList"] = output.returnObj.ToString();
                    foreach (User user in usersList)
                        user.USER_PASSWORD = "";
                    var emptyUsersList = ServiceResponseUnMarshaller<List<User>>.serializer(usersList);
                    HttpContext.Current.Response.Write("usersList = " + emptyUsersList + ";");

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
                HttpContext.Current.Response.Write("alert('Error Retrieving Users Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }
        
        private void validateUserPassword()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                var userID = this.Request.QueryString["uID"];
                var enteredPassword = this.Request.QueryString["enteredPassword"];
                var userPassword = Session["UserPassword"].ToString();
                var password = "";

                if(enteredPassword == userPassword)
                {
                    var usersListStr = Session["UsersList"].ToString();
                    var usersList = ServiceResponseUnMarshaller<List<User>>.deserializer(usersListStr);
                    foreach(User user in usersList)
                    {
                        if(user.USER_ID == int.Parse(userID))
                        {
                            password = user.USER_PASSWORD;
                            break;
                        }
                    }
                    HttpContext.Current.Response.Write("$('#validateConfirmBtn').remove();$('#modalBody').html('<h3>Requested Password is : " + password +"</h3>');");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Invalid Entered Password');");
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
                HttpContext.Current.Response.Write("alert('Error Retrieving Users Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }
    }
}