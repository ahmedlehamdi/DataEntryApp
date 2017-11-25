using DataEntryApp.ServiceIntegration;
using DataEntryApp.ServiceReference1;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
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
                else if (HttpContext.Current.Request.QueryString["fnID"] != null && HttpContext.Current.Request.QueryString["fnID"] == "30")
                {
                    getAllManufactures();
                }
                else if (HttpContext.Current.Request.QueryString["fnID"] != null && HttpContext.Current.Request.QueryString["fnID"] == "31")
                {
                    getAllBranches();
                }
                else if (HttpContext.Current.Request.QueryString["fnID"] != null && HttpContext.Current.Request.QueryString["fnID"] == "32")
                {
                    getTypeAllSpecs();
                }
                else if (HttpContext.Current.Request.QueryString["fnID"] != null && HttpContext.Current.Request.QueryString["fnID"] == "33")
                {
                    getProductOfferTypes();
                }
                else if (HttpContext.Current.Request.Form["fnID"] != null && HttpContext.Current.Request.Form["fnID"] == "40")
                {
                    uploadProductsImages();
                    //submitProductsObjects
                }
                //else if (HttpContext.Current.Request.QueryString["fnID"] != null && HttpContext.Current.Request.QueryString["fnID"] == "41")
                //{
                //    submitProductsObjects();
                //}
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
                //Session["flyerID"] = null;

                var productCount = int.Parse(HttpContext.Current.Request.Form["productCount"]);
                PRODUCT[] products = new PRODUCT[productCount];

                PROD_OFF_TYP_ATTR[] offerTypeAttrArr = new PROD_OFF_TYP_ATTR[productCount];

                PROD_TYPE_SPEC[][] allTypeSpecsArr = new PROD_TYPE_SPEC[productCount][];

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

                    PRODUCT prod = new PRODUCT();
                    prod.FLYER_ID = flyerID;

                    prod.PRODUCT_NAME_EN = HttpContext.Current.Request.Form["productNameEn_" + i];
                    prod.PRODUCT_NAME_AR = HttpContext.Current.Request.Form["productNameAr_" + i];

                    prod.TYPE_ID = int.Parse(HttpContext.Current.Request.Form["productTypeDD_" + i]);
                    
                    prod.PRODUCT_IMAGE = "/UploadedImages/" + fileName;
                    prod.PRODUCT_PRICE = HttpContext.Current.Request.Form["productPrice_" + i];

                    prod.LOCATION_ID = int.Parse(HttpContext.Current.Request.Form["productLocationDD_" + i]);
                    prod.MANUFACTURE_ID = int.Parse(HttpContext.Current.Request.Form["manufactureDD_" + i]);

                    prod.PRODUCT_TAGS = HttpContext.Current.Request.Form["smartTags_" + i];

                    ///// To be Edited while adding Offer Type  
                    var offerTypeAttrCount = int.Parse(HttpContext.Current.Request.Form["offerTypeAttrCount_" + i]);
                    var offerTypeID = int.Parse(HttpContext.Current.Request.Form["offerTypeDD_" + i]);


                    PROD_OFF_TYP_ATTR offerTypeAttr = new PROD_OFF_TYP_ATTR();
                    
                    if(HttpContext.Current.Request.Form["offerTypeAttr_" + i+ "_0"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_1 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_0"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_1"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_1 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_1"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_2"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_3 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_2"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_3"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_4 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_3"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_4"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_5 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_4"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_5"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_6 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_5"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_6"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_7 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_6"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_7"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_8 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_7"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_8"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_9 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_8"];
                    if (HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_9"] != null) offerTypeAttr.PROD_OFF_TYP_ATTR_10 = HttpContext.Current.Request.Form["offerTypeAttr_" + i + "_9"];

                    offerTypeAttr.PROD_OFF_TYPE_ID = offerTypeID;

                    offerTypeAttrArr[i] = offerTypeAttr;
                    

                    prod.DATE_FROM = DateTime.Parse(HttpContext.Current.Request.Form["dateFrom_" + i]);
                    prod.DATE_TO = DateTime.Parse(HttpContext.Current.Request.Form["dateTo_" + i]);

                    // Product Specs
                    prod.PRODUCT_ATTR_1 = HttpContext.Current.Request.Form["productSpecs_1_" + i];
                    prod.PRODUCT_ATTR_2 = HttpContext.Current.Request.Form["productSpecs_2_" + i];
                    prod.PRODUCT_ATTR_3 = HttpContext.Current.Request.Form["productSpecs_3_" + i];
                    prod.PRODUCT_ATTR_4 = HttpContext.Current.Request.Form["productSpecs_4_" + i];
                    prod.PRODUCT_ATTR_5 = HttpContext.Current.Request.Form["productSpecs_5_" + i];


                    // Product Type Specs
                    var typeSpecsCount = int.Parse(HttpContext.Current.Request.Form["prodSpecsAttrCount_" + i]);
                    PROD_TYPE_SPEC[] typeSpecsArr = new PROD_TYPE_SPEC[typeSpecsCount];
                    for (int y = 0; y < typeSpecsCount; y++)
                    {
                        PROD_TYPE_SPEC typeSpecs = new PROD_TYPE_SPEC();

                        var value = (HttpContext.Current.Request.Form["prodSpecsAttr_" + i + "_" + y]).ToString().Split(',');
                        typeSpecs.TEMPLATE_VALUE = value[0];
                        typeSpecs.TEMPLATE_ID = int.Parse(value[1]);
                        typeSpecs.TYPE_ID = prod.TYPE_ID;
                        typeSpecsArr[y] = typeSpecs;
                    }
                    allTypeSpecsArr[i] = typeSpecsArr;



                    products[i] = prod;
                }
                ReturnObject<object> prodObj = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().submitFlyerAllProducts(products, allTypeSpecsArr, offerTypeAttrArr));
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
                HttpContext.Current.Response.Write("alert('Somethinf Went wrong please try again later.\n " + ex.Message + "')");
            }
            HttpContext.Current.Response.Flush();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
            HttpContext.Current.Response.SuppressContent = true;

        }

        private void getAllManufactures()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ContentType = "application/json";
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllProductManufactures());
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("prodManufacture=" + output.returnObj + ";");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Error Getting Manufacture List please try again later.')");
                }

            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write("alert('Something Went wrong please try again later.\n " + ex.Message + "')");
            }
            HttpContext.Current.Response.Flush();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
            HttpContext.Current.Response.SuppressContent = true;

        }

        private void getAllBranches()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ContentType = "application/json";
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllProductBranches(int.Parse(HttpContext.Current.Request.QueryString["providerID"])));
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("prodBranches=" + output.returnObj + ";");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Error Getting Branches List please try again later.')");
                }

            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write("alert('Something is wrong please try again later.\n " + ex.Message + "')");
            }
            HttpContext.Current.Response.Flush();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
            HttpContext.Current.Response.SuppressContent = true;

        }

        private void getTypeAllSpecs()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ContentType = "application/json";
            try
            {
                var typeID = int.Parse(Request.QueryString["typeID"]);
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getTypeAllSpecs(typeID));
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("typeSpecs=" + output.returnObj + ";");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Error Getting Type Specs please try again later.')");
                }

            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write("alert('Something is wrong please try again later.\n " + ex.Message + "')");
            }
            HttpContext.Current.Response.Flush();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
            HttpContext.Current.Response.SuppressContent = true;

        }

        private void getProductOfferTypes()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ContentType = "application/json";
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().getAllProductOfferTypes());
                if (output.statusCode == 0)
                {
                    HttpContext.Current.Response.Write("prodOfferTypes=" + output.returnObj + ";");
                }
                else
                {
                    HttpContext.Current.Response.Write("alert('Error Getting Type Specs please try again later.')");
                }

            }
            catch (Exception ex)
            {
                HttpContext.Current.Response.Write("alert('Something is wrong please try again later.\n " + ex.Message + "')");
            }
            HttpContext.Current.Response.Flush();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
            HttpContext.Current.Response.SuppressContent = true;

        }

        private void uploadProductsImages()
        {
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.ClearContent();
            HttpContext.Current.Response.ContentType = "application/json";
            var filesCount = Request.Form["IMAGES_COUNT"];
            if (filesCount != null)
            {
                for (int i = 0; i < int.Parse(filesCount); i++)
                {
                    HttpPostedFile file = HttpContext.Current.Request.Files["_file_" + i] != null ? HttpContext.Current.Request.Files["_file_" + i] : HttpContext.Current.Request.Files["_file_bundle_" + i];
                    string fileName = HttpContext.Current.Request.Form["_file_Name_" + i] != null ? HttpContext.Current.Request.Form["_file_Name_" + i] : HttpContext.Current.Request.Form["_file_bundle_Name_" + i];

                    if (file != null)
                    {
                        var nameArr = fileName.Split('/');
                        var Name = Path.GetFileName(nameArr[3]);
                        string filename = !(file.FileName == "NoImage") ? Path.Combine(this.Server.MapPath("~/" + nameArr[1] + "/" + nameArr[2] + "/"), nameArr[3]) : "";
                        file.SaveAs(filename);
                    }
                }
            }
            else
            {
                HttpContext.Current.Response.Write("error = true;alert('Error Uploading Images ');");
            }
            
            HttpContext.Current.Response.Flush();
            HttpContext.Current.ApplicationInstance.CompleteRequest();
            HttpContext.Current.Response.SuppressContent = true;

        }

        [System.Web.Services.WebMethod]
        public static string submitProductsObjects(List<ServiceIntegration.ServiceObjects.PRODUCT> obj)
        {
            try
            {
                ReturnObject<object> output = ServiceResponseUnMarshaller<object>.unmarshall(new Service1Client().submitAllProducts(JsonConvert.SerializeObject(obj)));
                if (output.statusCode == 0)
                {
                    return "";
                }
                else
                {
                    return ("alert('Error Getting Type Specs please try again later.')");
                }
            }
            catch (Exception ex)
            {
                return ("alert('Something is wrong please try again later.\n " + ex.Message + "')");
            }
        }
    }
}