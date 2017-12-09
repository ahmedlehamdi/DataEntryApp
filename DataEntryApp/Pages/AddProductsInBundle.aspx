<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddProductsInBundle.aspx.cs" Inherits="DataEntryApp.Pages.AddProductsInBundle" %>



<!--
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE HTML>
<html>
<head>
    <title>Best Offers - Data Entry</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="Best Offers - Data Entry" />
    <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
    <!-- Bootstrap Core CSS -->
    <link href="../css/bootstrap.css" rel='stylesheet' type='text/css' />
    <!-- Custom CSS -->
    <link href="../css/style.css" rel='stylesheet' type='text/css' />
    <!-- font CSS -->
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <!-- font-awesome icons -->
    <link href="../css/font-awesome.css" rel="stylesheet">
    <!-- //font-awesome icons -->
    <!-- //chart -->
    <!-- js-->
    <script src="../js/jquery-1.11.1.min.js"></script>
    <script src="../js/modernizr.custom.js"></script>
    <!--webfonts-->
    <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css'>
    <!--//webfonts-->
    <!--animate-->
    <link href="../css/animate.css" rel="stylesheet" type="text/css" media="all">
    <script src="../js/wow.min.js"></script>
    <script>
        new WOW().init();
    </script>
    <!--//end-animate-->
    <script src="../js/custom.js"></script>
    <link href="../css/custom.css" rel="stylesheet">
    <link href='../css/jquery-loading.min.css' rel='stylesheet' type='text/css'>
    
    <script src="../js/jquery.form-validator.min.js"></script>
    <script src="../js/jquery-loading.js"></script>
    
    <link href="../css/jquery.datetimepicker.min.css" rel='stylesheet' type='text/css'>
    <script src="../js/jquery.datetimepicker.full.min.js"></script>

    <link href="../js/tagsInput/bootstrap-tagsinput.css" rel="stylesheet" />
    <script src="../js/tagsInput/bootstrap-tagsinput.min.js"></script>
</head>
<body class="cbp-spmenu-push">
    <div class="main-content">
        <!-- main content start-->
        <div id="page-wrapper" style="padding-top: 20px;margin-right:0px;padding: 0px;">
            <div class="main-page">
                <!--grids-->
                <div class="grids products">
                    <div class="panel panel-widget forms-panel" id="product_0">
                        <div class="forms">
                            <div class="form-grids widget-shadow" data-example-id="basic-forms">
                                <div class="form-title">
                                    <h4>Product Details :</h4>
                                </div>
                                <div class="form-body">
                                    <form>
                                         <div class="form-group">
                                            <label for="productNameEn">Name EN</label>
                                            <input required="required" type="text" class="form-control" id="productNameEn" required="required" placeholder="Product Name En" onkeydown="$(this).parents('.forms').find('h4').text('Product Details : ' + $(this).val());">
                                        </div>
                                        <div class="form-group">
                                            <label for="productNameAr">Name AR</label>
                                            <input required="required" type="text" class="form-control" id="productNameAr" required="required" placeholder="Product Name Ar">
                                        </div>
                                        <div class="form-group">
                                            <label for="productPrice">Price</label>
                                            <input required="required" type="number" class="form-control" id="productPrice" required="required" placeholder="Product Price">
                                        </div>
                                        <div class="form-group">
                                            <label for="manufactureDD">Manufacturer</label>
                                            <select required="required" name="manufactureDD" id="manufactureDD" class="form-control1" required="required">
                                                <option value="-1">Select Product Manufacturer</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="categoryDD">Category</label>
                                            <select required="required" name="categoryDD" id="categoryDD" class="form-control1" required="required">
                                                <option value="-1">Select Product Category</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="productTypeDD">Product Type</label>
                                            <select required="required" name="productTypeDD" id="productTypeDD" class="form-control1" required="required">
                                                <option value="-1">Select Product Type</option>
                                            </select>
                                        </div>
                                        <div class="hidden" id="prodSpecs">
                                            <label for="prodSpecsDD"></label>
                                            
                                        </div>
                                        <div class="form-group">
                                            <label for="productImageFile">Image</label>
                                            <input required="required" type="file" id="productImageFile" name="productImageFile" required="required">
                                            <p class="help-block">Upload Product Image - Available Formats : pdf/png/jpg</p>
                                        </div>
                                        <div class="form-group">
                                            <label for="productLocationDD">Product Location in Branch</label>
                                            <select required="required" name="productLocationDD" id="productLocationDD" class="form-control1" required="required">
                                                <option value="-1">Product Location in Branch</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="offerTypeDD">Offer Type</label>
                                            <select required="required" name="offerTypeDD" id="offerTypeDD" class="form-control1" required="required">
                                                <option value="-1">Select Product Type</option>
                                            </select>
                                        </div>
                                        <div id="prodOfferTypeDiv">

                                        </div>
                                        <div class="form-group">
                                            <label for="dateFrom">Date From</label>
                                            <input required="required" type="text" data-validation="required" ReadOnly="readonly" required="" Class="form-control datePicker" id="dateFrom" name="dateFrom" />
                                        </div>
                                        <div class="form-group">
                                            <label for="dateTo">Date To</label>
                                            <input required="required" type="text" data-validation="required" ReadOnly="readonly" required="" class="form-control datePicker" id="dateTo" name="dateTo" />
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_1">Product Attribute 1</label>
                                            <input required="required" type="text" class="form-control" id="productAttr_1" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_2">Product Attribute 2</label>
                                            <input required="required" type="text" class="form-control" id="productAttr_2" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_3">Product Attribute 3</label>
                                            <input required="required" type="text" class="form-control" id="productAttr_3" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_4">Product Attribute 4</label>
                                            <input required="required" type="text" class="form-control" id="productAttr_4" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_5">Product Attribute 5</label>
                                            <input required="required" type="text" class="form-control" id="productAttr_5" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="smartTags">Tags</label>
                                            <input required="required" type="text" data-role="tagsinput"  class="form-control" id="smartTags" required="required" placeholder="Smart tags For Product">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--//grids-->
                <div class="grids">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6"></div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <input type="submit" value="Submit Product" class="btn btn-default btn-warning btn-lg pull-right" ID="productSubmitBtn" OnClick="saveProductsInBundle()" />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
    </div>
    <!-- MODAL -->

   
    <!-- Bootstrap Core JavaScript -->

    <script type="text/javascript" src="../js/bootstrap.min.js"></script>


    <link href="/css/bootstrap.min.css" rel="stylesheet">

    <!--max-plugin-->
    <script type="text/javascript" src="../js/plugins.js"></script>
    <!--//max-plugin-->

    <!--scrolling js-->
    <script src="../js/jquery.nicescroll.js"></script>
    <script src="../js/scripts.js"></script>
    <script src="../js/Templates.js"></script>
    <script src="../js/Utils.js"></script>
    <script src="../js/app.js"></script>
    <script src="../js/Module/ProductsScripts.js"></script>

    <script>
        $(document).ready(function () {
            loadProductCategoriesData();
            getAllProductManufactures();
            getAllProductBranches();
            getAllProductOfferTypes(true);
            if(parent.bundleProduct != null)
            {
                loadBundleProductForEdit();
            }
        });
    </script>
</body>
</html>

