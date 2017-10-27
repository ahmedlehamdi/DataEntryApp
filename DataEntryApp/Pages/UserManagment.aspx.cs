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
                if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "20")
                {
                    insertNewUser();
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
                    var usersList = ServiceResponseUnMarshaller<List<ServiceReference1.User>>.deserializer(output.returnObj.ToString());
                    Session["UsersList"] = output.returnObj.ToString();
                    foreach (ServiceReference1.User user in usersList)
                        user.USER_PASSWORD = "";
                    var emptyUsersList = ServiceResponseUnMarshaller<List<ServiceReference1.User>>.serializer(usersList);
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
                    var usersList = ServiceResponseUnMarshaller<List<ServiceReference1.User>>.deserializer(usersListStr);
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

        private void insertNewUser()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                var userName = this.Request.QueryString["userName"];
                var userPassword = this.Request.QueryString["userPassword"];
                var UserType = this.Request.QueryString["UserType"];

                ServiceReference1.User user = new ServiceReference1.User();
                user.USER_NAME = userName;
                user.USER_PASSWORD = userPassword;
                user.USER_TYPE = (UserType == "1" ? "DataEntry" : "Admin");

                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().addNewUser(user));
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("window.location='/Pages/UserManagment.aspx';alert('User Have been Inserted Successfully');");
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
    }
}