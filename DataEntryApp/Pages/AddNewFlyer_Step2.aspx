<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddNewFlyer_Step2.aspx.cs" Inherits="DataEntryApp.Pages.AddNewFlyer_Step2" %>


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

    <script src="../js/jquery-loading.js"></script>
</head>
<body class="cbp-spmenu-push">
    <div class="main-content">
        <!-- header-starts -->
        <div class="sticky-header header-section ">
            <div class="header-left">
                <!--logo -->
                <div class="logo">
                    <a href="index.html">
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
                    <ul>
                        <li class="dropdown profile_details_drop">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                <div class="profile_img">
                                    <span class="prfil-img">
                                        <img src="/images/a.png" alt="">
                                    </span>
                                    <div class="clearfix"></div>
                                </div>
                            </a>
                            
                        </li>
                    </ul>
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
                <div class="grids">
                    <div class="progressbar-heading grids-heading">
                        <h2>Add Product</h2>
                        <div style="text-align:right; margin-bottom:10px;">
                            <button type="button" class="btn btn-default btn-success btn-lg">Save Products</button>
                            <button type="button" class="btn btn-default btn-info btn-lg" onclick="AddMoreProduct()">Add more Product</button>
                        </div>
                    </div>
                   
                    <div class="panel panel-widget forms-panel">
                        <div class="forms">
                            <div class="form-grids widget-shadow" data-example-id="basic-forms">
                                <div class="form-title">
                                    <h4>Product Details :</h4>
                                    <ul class="panel-tools">
								        <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li>
								        <li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li>
							          </ul>
                                </div>
                                <div class="form-body">
                                    <form>
                                         <div class="form-group">
                                            <label for="productNameEn">Name EN</label>
                                            <input type="text" class="form-control" id="productNameEn" placeholder="Product Name En" onkeydown="$(this).parents('.forms').find('h4').text($(this).parents('.forms').find('h4').text() +  $(this).val());">
                                        </div>
                                        <div class="form-group">
                                            <label for="productNameAr">Name AR</label>
                                            <input type="text" class="form-control" id="productNameAr" placeholder="Product Name Ar">
                                        </div>
                                        <div class="form-group">
                                            <label for="categoryDD">Category</label>
                                            <select name="selector1" id="categoryDD" class="form-control1">
                                                <option>Category 1</option>
                                                <option>Category 2</option>
                                                <option>Category 3</option>
                                                <option>Category 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="productTypeDD">Type</label>
                                            <select name="selector1" id="productTypeDD" class="form-control1">
                                                <option>Type 1</option>
                                                <option>Type 2</option>
                                                <option>Type 3</option>
                                                <option>Type 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="providerDD">Provider</label>
                                            <select name="selector1" id="providerDD" class="form-control1">
                                                <option>Provider 1</option>
                                                <option>Provider 2</option>
                                                <option>Provider 3</option>
                                                <option>Provider 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="productImageFile">Image</label>
                                            <input type="file" id="productImageFile">
                                            <p class="help-block">Upload Product Image - Available Formats : pdf/png/jpg</p>
                                        </div>
                                        <div class="form-group">
                                            <label for="productSpecs">Product Specs</label>
                                            <input type="text" class="form-control" id="productSpecs" placeholder="Product Specs">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--//grids-->
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
    <script src="/js/jquery.nicescroll.js"></script>
    <script src="/js/scripts.js"></script>
    <!--//scrolling js-->
    <script src="/js/app.js"></script>
</body>
</html>

