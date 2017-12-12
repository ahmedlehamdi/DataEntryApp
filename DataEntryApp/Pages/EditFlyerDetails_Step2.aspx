<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EditFlyerDetails_Step2.aspx.cs" Inherits="DataEntryApp.Pages.EditFlyerDetails_Step2" %>


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
        <!-- header-starts -->
        <div class="sticky-header header-section ">
            <div class="header-left">
                <!--logo -->
                <div class="logo">
                    <a  href="/Pages/Home.aspx">
                        <ul>
                            <li>
                                <img src="/images/logo1.png" alt="" /></li>
                            <li>
                                <h1>Data Entry</h1>
                            </li>
                            <div class="clearfix"></div>
                        </ul>
                    </a>
                </div>

                <div class="clearfix"></div>
            </div>

            <div class="header-right">

                <!--notification menu end -->
                <div class="profile_details">
                    

                </div>

                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>
        <!-- //header-ends -->
        <!-- main content start-->
        <div id="page-wrapper">
            <div class="main-page">
                <!--grids-->
                <div class="grids products">
                    <div class="progressbar-heading grids-heading">
                        <div class="row">
                            <div class="progressbar-heading grids-heading col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                <h2>Edit Flyer Products</h2>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <button type="button" class="btn btn-default btn-success btn-lg" onclick="submitProducts()">Submit Products</button>
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-widget forms-panel">
                        <div class="forms">
                            <div class="form-grids widget-shadow" data-example-id="basic-forms">
                                <div class="form-title">
                                    <h4>List Of Products</h4>
                                </div>
                                <div class="form-body">
                                    <table class="table table-striped table-bordered bootstrap-datatable datatable">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Manufacture</th>
                                                <th>Category</th>
                                                <th>Type</th>
                                                <th>Branch</th>
                                                <th>Offer Type</th>
                                                <th>Offer Specs</th>
                                                <th>Remove</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody id="productTBody">
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel panel-widget forms-panel" id="product_0">
                        <div class="forms">
                            <div class="form-grids widget-shadow" data-example-id="basic-forms">
                                <div class="form-title">
                                    <h4>Product Details :</h4>
                                    <ul class="panel-tools">
                                        <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li>
							          </ul>
                                </div>
                                <div class="form-body">
                                    <form>
                                         <div class="form-group">
                                            <label for="productNameEn">Name EN</label>
                                            <input type="text" required="required" class="form-control" id="productNameEn" required="required" placeholder="Product Name En" onkeydown="$(this).parents('.forms').find('h4').text('Product Details : ' + $(this).val());">
                                        </div>
                                        <div class="form-group">
                                            <label for="productNameAr">Name AR</label>
                                            <input type="text" required="required" class="form-control" id="productNameAr" required="required" placeholder="Product Name Ar">
                                        </div>
                                        <div class="form-group">
                                            <label for="productPrice">Price</label>
                                            <input type="number" required="required" class="form-control" id="productPrice" required="required" placeholder="Product Price">
                                        </div>
                                        <div class="form-group">
                                            <label for="manufactureDD">Manufacturer</label>
                                            <select name="manufactureDD" required="required" id="manufactureDD" class="form-control1" required="required">
                                                <option value="-1">Select Product Manufacturer</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="categoryDD">Category</label>
                                            <select name="categoryDD" required="required" id="categoryDD" class="form-control1" required="required">
                                                <option value="-1">Select Product Category</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="productTypeDD">Product Type</label>
                                            <select name="productTypeDD" required="required" id="productTypeDD" class="form-control1" required="required">
                                                <option value="-1">Select Product Type</option>
                                            </select>
                                        </div>
                                        <div class="hidden" id="prodSpecs">
                                            <label for="prodSpecsDD"></label>
                                            
                                        </div>
                                        <div class="form-group">
                                            <label for="productImageFile">Image</label>
                                            <input type="file" id="productImageFile" name="productImageFile" required="required">
                                            <p class="help-block">Upload Product Image - Available Formats : pdf/png/jpg</p>
                                        </div>
                                        <div class="form-group">
                                            <label for="productImageFile">Image</label>
                                            <table style="width: 100%;">
                                                <tr>
                                                    <td>
                                                         <div style="width: 200px; height: 200px; border: 1px solid #d2d2d2;" id="pasteTarget">
                                                            Click and paste here.
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <ul id="uploadedImagesList">
                                                            <li>Pasted Files : </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </table>
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
                                            <input type="text" required="required" data-validation="required" ReadOnly="readonly" required="" Class="form-control datePicker" id="dateFrom" name="dateFrom" />
                                        </div>
                                        <div class="form-group">
                                            <label for="dateTo">Date To</label>
                                            <input type="text" required="required" data-validation="required" ReadOnly="readonly" required="" class="form-control datePicker" id="dateTo" name="dateTo" />
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_1">Product Attribute 1</label>
                                            <input type="text" required="required" class="form-control" id="productAttr_1" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_2">Product Attribute 2</label>
                                            <input type="text" class="form-control" id="productAttr_2" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_3">Product Attribute 3</label>
                                            <input type="text" class="form-control" id="productAttr_3" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_4">Product Attribute 4</label>
                                            <input type="text" class="form-control" id="productAttr_4" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="productAttr_5">Product Attribute 5</label>
                                            <input type="text" class="form-control" id="productAttr_5" placeholder="Product Specs">
                                        </div>
                                        <div class="form-group">
                                            <label for="smartTags">Tags</label>
                                            <input type="text" data-role="tagsinput" class="form-control" id="smartTags" required="required" placeholder="Smart tags For Product">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                   
                   
                    
                </div>
                <!--//grids-->
                <div class="grids">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <button type="button" class="btn btn-default btn-info btn-lg pull-left" onclick="window.location='/Pages/Home.aspx'">
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                Back To Home
                            </button>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <input type="button" value="Save Products" class="btn btn-default btn-warning btn-lg pull-right" ID="productSubmitBtn" OnClick="SaveProduct()" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--footer-->
        <div class="dev-page">

            <!-- page footer -->
            <!-- dev-page-footer-closed dev-page-footer-fixed -->
            <div class="dev-page-footer dev-page-footer-fixed">
                <!-- container -->
                <div class="container">
                    <div class="copyright">
                        <p>© 2018 Best Offers . All Rights Reserved . Design by <a href="http://w3layouts.com/">W3layouts</a></p>
                    </div>
                    <!-- page footer container -->

                    <!-- //page footer container -->

                </div>
                <!-- //container -->
            </div>
            <!-- /page footer -->
        </div>
        <!--//footer-->
    </div>
    <!-- MODAL -->

    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog modal-lg">
    
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" id="modalClose">&times;</button>
              <h4 class="modal-title" id="modalHeader"></h4>
            </div>
            <div class="modal-body" id="modalBody">
              
            </div>
            <div class="modal-footer" id="modalFooter">
              
            </div>
          </div>
      
        </div>
      </div>
    <!-- Classie -->
    <script>
			
    </script>
    <!-- Bootstrap Core JavaScript -->

    <script type="text/javascript" src="/js/bootstrap.min.js"></script>


    <link href="/css/bootstrap.min.css" rel="stylesheet">

    <!--max-plugin-->
    <script type="text/javascript" src="/js/plugins.js"></script>
    <!--//max-plugin-->

    <!--scrolling js-->
    <script src="../js/jquery.nicescroll.js"></script>
    <script src="../js/scripts.js"></script>
    <script src="../js/Templates.js"></script>
    <script src="../js/Utils.js"></script>
    <script src="../js/app.js"></script>
    <script src="../js/Module/ProductsScripts.js"></script>
    <script src="../js/FileUploader-CopyPaste.js"></script>

    <script>
        $(document).ready(function () {
            localStorage.setItem('actionType', 'edit');
            loadFlyerProductsForEdit();
        });
    </script>
</body>
</html>

