﻿using DataEntryApp.ServiceIntegration;
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

                //ReturnObject<object> timeFrames = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllTimeFrames());
                //if (timeFrames.statusCode == 0)
                //{
                //    HttpContext.Current.Response.Write("timeFramesList = " + timeFrames.returnObj + ";");
                //    Session["timeFramesList"] = timeFrames.returnObj;
                //}
                //else
                //    HttpContext.Current.Response.Write("alert('" + timeFrames.returnObj + "');");
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
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ContentType = "application/json";
            try
            {
                string filesNames = "";
                var filesCount = Request.Form["IMAGES_COUNT"];
                if (filesCount != null)
                {
                    for (int i = 0; i < int.Parse(filesCount); i++)
                    {
                        HttpPostedFile file = HttpContext.Current.Request.Files["_file_" + i];
                        
                        if (file != null)
                        {
                            var Name = Path.GetFileName(file.FileName);
                            var type = Name.Split('.')[1];
                            string filename = !(file.FileName == "NoImage") ? Path.Combine(this.Server.MapPath("~/UploadedImages/Flyers/"), "Flyer_" + Request.Form["FLYER_NAME_AR"] + "_" + i + "." + type) : "";
                            file.SaveAs(filename);
                            filesNames += "/UploadedImages/Flyers/" + "Flyer_" + Request.Form["FLYER_NAME_AR"] + "_" + i + "." + type + "&&";
                        }
                    }
                }
                else
                {
                    filesNames = Request.Form["FLYER_IMAGE_URL"];
                }
                OFFER_FLYER flyerData = new OFFER_FLYER();
                flyerData.FLYER_NAME_AR = Request.Form["FLYER_NAME_AR"];
                flyerData.FLYER_NAME_EN = Request.Form["FLYER_NAME_EN"];
                flyerData.FLYER_IMAGE_URL = filesNames;
                flyerData.PROVIDER_ID = int.Parse(Request.Form["PROVIDER_ID"]);
                flyerData.OFFER_TYPE_ID = int.Parse(Request.Form["OFFER_TYPE_ID"]);
                flyerData.FLYER_APPROVED = false;
                flyerData.FLYER_EXPIRED = false;
                flyerData.USER_ID = int.Parse(Session["UserID"].ToString());
                
                flyerData.DATE_FROM = Convert.ToDateTime(Request.Form["DATE_FROM"]);
                flyerData.DATE_TO = Convert.ToDateTime(Request.Form["DATE_TO"]);

                //flyerID  -   frameID
                var action = HttpContext.Current.Request.Form["action"];
                if (action == "update")
                {
                    //frame.FRAME_ID = int.Parse(HttpContext.Current.Request.Form["frameID"]);
                    flyerData.FLYER_ID = int.Parse(HttpContext.Current.Request.Form["FLYER_ID"]);
                }


                ReturnObject<object> flyerObj = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().addNewFlyerBasicData(flyerData, action));
                if (flyerObj.statusCode == 0)
                {
                    Session["flyerID"] = int.Parse(flyerObj.returnObj.ToString());
                    var redURL = (action == "insert") ? "/Pages/AddNewFlyer_Step2.aspx" : "/Pages/EditFlyerDetails_Step2.aspx";
                    HttpContext.Current.Response.Write("window.location = '" + redURL + "';localStorage.setItem('flyerID', '" + flyerObj.returnObj.ToString() + "');");
                }
                else
                {
                    Session["flyerID"] = null;
                    //errorLbl.Text = flyerObj.returnObj.ToString();
                    HttpContext.Current.Response.Write("flyerID = null;alert('"+ flyerObj.returnObj.ToString() + "')");
                }
                
               
               // HttpContext.Current.Response.RedirectToRoute("/Pages/AddNewFlyer_Step2.aspx");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;

            }
            catch (Exception ex)
            {
                //errorLbl.Text = ex.Message;
                HttpContext.Current.Response.Write("flyerID = null;alert('" + ex.Message + "')");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
            
        }
    }
}
