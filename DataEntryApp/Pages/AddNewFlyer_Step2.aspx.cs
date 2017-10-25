using DataEntryApp.ServiceIntegration;
using DataEntryApp.ServiceReference1;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DataEntryApp.Pages
{
    public partial class AddNewFlyer_Step2 : System.Web.UI.Page
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
                if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "8")
                {
                    loadProductCategroies();
                }
                else if (this.Request.QueryString["fnID"] != null && this.Request.QueryString["fnID"] == "9")
                {
                    loadCategoryTypes(int.Parse(Request.QueryString["catID"]));
                }
                else if(HttpContext.Current.Request.Form["fnID"] != null && HttpContext.Current.Request.Form["fnID"] == "10")
                {
                    submitProducts();
                }
            }
        }

        private void loadProductCategroies()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllProductCategories());
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("productCategories = " + output.returnObj + ";");
                    Session["productCategories"] = output.returnObj;
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
                HttpContext.Current.Response.Write("alert('Error Retrieving Categories Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }
        private void loadCategoryTypes(int catID)
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            try
            {
                if (catID > -1)
                {
                    ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllCategoryTypes(catID));
                    if (output.statusCode == 0)
                    {
                        HttpContext.Current.Response.Write("catTypes = " + output.returnObj + ";");
                        Session["catTypes"] = output.returnObj;
                    }
                    else
                        HttpContext.Current.Response.Write("alert('" + output.returnObj + "');");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Please Select A Product Category');");
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
                HttpContext.Current.Response.Write("alert('Error Retrieving Categories Types Data');");
                HttpContext.Current.Response.Flush();
                HttpContext.Current.ApplicationInstance.CompleteRequest();
                HttpContext.Current.Response.SuppressContent = true;
            }
        }

        private void submitProducts()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ContentType = "application/json";
            try
            {
                var flyerID = int.Parse(Session["flyerID"] != null ? Session["flyerID"].ToString() : HttpContext.Current.Request.Form["flyerID"]);
                Session["flyerID"] = null;
                var productCount = int.Parse(HttpContext.Current.Request.Form["productCount"]);
                PRODUCT_SPEC[] specs = new PRODUCT_SPEC[productCount];
                PRODUCT[] products = new PRODUCT[productCount];
                for (int i = 0; i < productCount; i++)
                {
                    string fileName = "";
                    if (HttpContext.Current.Request.Files["_file_" + i] != null)
                    {
                        HttpPostedFile file = HttpContext.Current.Request.Files["_file_" + i];
                        fileName = Path.GetFileName(file.FileName);
                        string filename = !(file.FileName == "NoImage") ? Path.Combine(this.Server.MapPath("~/UploadedImages/"), fileName) : "";
                        file.SaveAs(filename);
                    }
                    else if (HttpContext.Current.Request.Form["_imgFile_" + i] != null)
                    {
                        fileName = HttpContext.Current.Request.Form["_imgFile_" + i].Replace("/UploadedImages/", "");
                    }
                    PRODUCT_SPEC spec = new PRODUCT_SPEC();
                    spec.SPECS_ATTR_1 = HttpContext.Current.Request.Form["productSpecs_1_" + i];
                    spec.SPECS_ATTR_2 = HttpContext.Current.Request.Form["productSpecs_2_" + i];
                    spec.SPECS_ATTR_3 = HttpContext.Current.Request.Form["productSpecs_3_" + i];
                    spec.SPECS_ATTR_4 = HttpContext.Current.Request.Form["productSpecs_4_" + i];
                    spec.SPECS_ATTR_5 = HttpContext.Current.Request.Form["productSpecs_5_" + i];

                    specs[i] = spec;

                    PRODUCT prod = new PRODUCT();
                    prod.PRODUCT_NAME_EN = HttpContext.Current.Request.Form["productNameEn_" + i];
                    prod.PRODUCT_NAME_AR = HttpContext.Current.Request.Form["productNameAr_" + i];
                    prod.TYPE_ID = int.Parse(HttpContext.Current.Request.Form["productTypeDD_" + i]);
                    prod.PROVIDER_ID = int.Parse(HttpContext.Current.Request.Form["providerDD_" + i]);
                    prod.PRODUCT_IMAGE = "/UploadedImages/" + fileName;
                    prod.FLYER_ID = flyerID;

                    products[i]  = prod;
                }
                ReturnObject<object> prodObj = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().submitFlyerAllProducts(products, specs));
                if (prodObj.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("window.location = '/Pages/Home.aspx';alert('Flyer Have been created, Please wait for the approval')");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Something went wrong please try again later.')");
                }

            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write("alert('Somethinf Went wrong please try again later.\n "+ex.Message+"')");
            }
            HttpContext.Current.Response.Flush();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
            HttpContext.Current.Response.SuppressContent = true;

        }
    }
}