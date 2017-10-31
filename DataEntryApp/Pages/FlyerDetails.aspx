<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FlyerDetails.aspx.cs" Inherits="DataEntryApp.Pages.FlyerDetails" %>

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
                <div class="grids">
                    <div class="row">
                        <div class="progressbar-heading grids-heading col-lg-10 col-md-10 col-sm-10 col-xs-10">
                            <h2>Flyer Details</h2>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <button type="button" class="btn btn-default btn-info btn-lg" onclick="window.location='/Pages/Home.aspx'">
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                Back To Home
                            </button>
                        </div>
                    </div>
                    <div class="panel panel-widget forms-panel">
                        <div class="forms">
                            <div class="form-grids widget-shadow" data-example-id="basic-forms">
                                <div class="form-title">
                                    <h4>Basic Flyer Details :</h4>
                                </div>
                                <div class="form-body">
                                    <form class="form-horizontal">
                                        <div class="form-group">
                                           <label class="col-sm-2 control-label">Name EN</label> 
											<div class="col-sm-9">
                                                <label class="control-label" id="flyerNameEN"></label> 
											</div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">Name AR</label> 
											<div class="col-sm-9">
                                                <label class="control-label" id="flyerNameAR"></label> 
											</div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">Image</label> 
											<div class="col-sm-9">
                                                <a id="flyerImg" href=""></a>
											</div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">Provider / Retailer</label> 
											<div class="col-sm-9">
                                                <label class="control-label" id="flyerProvider"></label> 
											</div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">Offer Type</label> 
											<div class="col-sm-9">
                                                <label class="control-label" id="flyerOfferType"></label> 
											</div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">Offer Time Frame</label> 
											<div class="col-sm-9">
                                                <label class="control-label" id="flyerTimeFrame"></label> 
											</div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">Offer Date To</label> 
											<div class="col-sm-9">
                                                <label class="control-label" id="flyerFromDate"></label> 
											</div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">Offer Date From</label> 
											<div class="col-sm-9">
                                                <label class="control-label" id="flyerToDate"></label> 
											</div>
                                        </div>
                                    </form>
                                </div>
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
                                                <th>#</th>
                                                <th>Product Name</th>
                                                <th>Category</th>
                                                <th>Type</th>
                                                <th>Provider</th>
                                                <th>Image</th>
                                                <th>Specs</th>
                                            </tr>
                                        </thead>
                                        <tbody id="productTBody">
                                            
                                        </tbody>
                                    </table>
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
    <script src="/js/app.js"></script>
    <!--//scrolling js-->
    <script>
        $(document).ready(function () {
            loadFlyerDetails();
        });
    </script>
</body>
</html>
