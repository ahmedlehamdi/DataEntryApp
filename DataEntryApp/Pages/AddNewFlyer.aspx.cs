using DataEntryApp.ServiceIntegration;
using DataEntryApp.ServiceReference1;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DataEntryApp.ServiceIntegration.ServiceObjects;

namespace DataEntryApp.Pages
{
    public partial class AddNewFlyer : System.Web.UI.Page
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
                //if(IsPostBack &&  this.Request.QueryString["fnID"] == null)
                //{
                //    this.Response.Redirect("Home.aspx");
                //}

                 if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "3")
                {
                    RETRIEVE_PROVIDERS_DATA();
                }

                else if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "4")
                {
                    RETRIEVE_OFFERS_TYPES_DATA();
                }

                else if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "5")
                {
                    RETRIEVE_TIME_FRAMES_DATA();
                }
                else if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "6")
                {
                    RETRIEVE_ADD_FLYER_DATA();
                }
                else if(HttpContext.Current.Request.Form["action"] != null && HttpContext.Current.Request.Form["action"] == "insert")
                {
                    flyerSubmitData();
                }
                else if(HttpContext.Current.Request.Form["action"] != null && HttpContext.Current.Request.Form["action"] == "update")
                {
                    flyerSubmitData();
                }
            }
        }

        public void RETRIEVE_PROVIDERS_DATA()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllProviders());
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("providersList = " + output.returnObj + ";");
                    Session["providersList"] = output.returnObj;
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
                HttpContext.Current.Response.Write("alert('Error Retrieving Providers Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }

        public void RETRIEVE_OFFERS_TYPES_DATA()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllOfferTypes());
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("offersTypesList = " + output.returnObj + ";");
                    Session["offersTypesList"] = output.returnObj;
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
                HttpContext.Current.Response.Write("alert('Error Retrieving Offers Types Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }

        public void RETRIEVE_TIME_FRAMES_DATA()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllTimeFrames());
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("timeFramesList = " + output.returnObj + ";");
                    Session["timeFramesList"] = output.returnObj;
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
                HttpContext.Current.Response.Write("alert('Error Retrieving Time Frames Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }

        public void RETRIEVE_ADD_FLYER_DATA()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                ReturnObject<object> providers = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllProviders());
                if (providers.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("providersList = " + providers.returnObj + ";");
                    Session["providersList"] = providers.returnObj;
                }
                else
                    HttpContext.Current.Response.Write("alert('" + providers.returnObj + "');");

                ReturnObject<object> offerTypes = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllOfferTypes());
                if (offerTypes.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("offersTypesList = " + offerTypes.returnObj + ";");
                    Session["offersTypesList"] = offerTypes.returnObj;
                }
                else
                    HttpContext.Current.Response.Write("alert('" + offerTypes.returnObj + "');");

                ReturnObject<object> timeFrames = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllTimeFrames());
                if (timeFrames.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("timeFramesList = " + timeFrames.returnObj + ";");
                    Session["timeFramesList"] = timeFrames.returnObj;
                }
                else
                    HttpContext.Current.Response.Write("alert('" + timeFrames.returnObj + "');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearHeaders();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.Write("alert('Error Retrieving Providers Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }

        protected void flyerSubmitData()
        {
            try
            {
                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearHeaders();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.ContentType = "application/json";

                HttpPostedFile file = HttpContext.Current.Request.Files["_file"];
                string fileName = "";
                if (file != null)
                {
                    fileName = Path.GetFileName(file.FileName);
                    string filename = !(file.FileName == "NoImage") ? Path.Combine(this.Server.MapPath("~/UploadedImages/"), fileName) : "";
                    file.SaveAs(filename);
                }
                else
                {
                    fileName = Request.Form["oldImage"].Replace("/UploadedImages/", "");
                }
                OFFER_FLYER flyerData = new OFFER_FLYER();
                flyerData.FLYER_NAME_AR = Request.Form["flyerNameAr"];
                flyerData.FLYER_NAME_EN = Request.Form["flyerNameEn"];
                flyerData.FLYER_IMAGE_URL = "/UploadedImages/" + fileName;
                flyerData.PROVIDER_ID = int.Parse(Request.Form["providerDD"]);
                flyerData.OFFER_TYPE_ID = int.Parse(Request.Form["offerTypeDD"]);
                flyerData.FLYER_APPROVED = false;
                flyerData.FLYER_EXPIRED = false;
                flyerData.USER_ID = int.Parse(Session["UserID"].ToString());

                TIME_FRAME frame = new TIME_FRAME();
                frame.FRAME_TYPE_ID = int.Parse(Request.Form["timeFrameDD"]);
                frame.FRAME_NAME_EN = Request.Form["frameNameAr"];
                frame.FRAME_NAME_AR = Request.Form["frameNameEn"];
                frame.FRAME_DATE_FROM = Convert.ToDateTime(Request.Form["dateFrom"]);
                frame.FRAME_DATE_TO = Convert.ToDateTime(Request.Form["dateTo"]);

                //flyerID  -   frameID
                var action = HttpContext.Current.Request.Form["action"];
                if (action == "update")
                {
                    frame.FRAME_ID = int.Parse(HttpContext.Current.Request.Form["frameID"]);
                    flyerData.FLYER_ID = int.Parse(HttpContext.Current.Request.Form["flyerID"]);
                }


                ReturnObject<object> flyerObj = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().addNewFlyerBasicData(flyerData, frame, action));
                if (flyerObj.statusCode == 0)
                {
                    Session["flyerID"] = int.Parse(flyerObj.returnObj.ToString());
                    var redURL = (action == "insert") ? "/Pages/AddNewFlyer_Step2.aspx" : "/Pages/EditFlyerDetails_Step2.aspx";
                    HttpContext.Current.Response.Write("window.location = '" + redURL + "';localStorage.setItem('flyerID', '" + flyerObj.returnObj.ToString() + "');");
                }
                else
                {
                    Session["flyerID"] = null;
                    errorLbl.Text = flyerObj.returnObj.ToString();
                    HttpContext.Current.Response.Write("flyerID = null;alert('"+ flyerObj.returnObj.ToString() + "')");
                }
                
               
               // HttpContext.Current.Response.RedirectToRoute("/Pages/AddNewFlyer_Step2.aspx");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;

            }
            catch (Exception ex)
            {
                errorLbl.Text = ex.Message;
            }
            
        }
    }
}
