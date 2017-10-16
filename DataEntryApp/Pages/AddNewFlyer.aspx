<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddNewFlyer.aspx.cs" Inherits="DataEntryApp.Pages.AddNewFlyer" %>

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
                        <h2>Add New Flyer</h2>
                    </div>
                    <div class="panel panel-widget forms-panel">
                        <div class="forms">
                            <div class="form-grids widget-shadow" data-example-id="basic-forms">
                                <div class="form-title">
                                    <h4>Basic Flyer Details :</h4>
                                </div>
                                <div class="form-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="flyerNameEn">Name EN</label>
                                            <input type="text" class="form-control" id="flyerNameEn" placeholder="Flyer Name En">
                                        </div>
                                        <div class="form-group">
                                            <label for="flyerNameAr">Name AR</label>
                                            <input type="text" class="form-control" id="flyerNameAr" placeholder="Flyer Name Ar">
                                        </div>
                                        <div class="form-group">
                                            <label for="flyerImageFile">Image</label>
                                            <input type="file" id="flyerImageFile">
                                            <p class="help-block">Upload Flyer Image - Available Formats : pdf/png/jpg</p>
                                        </div>
                                        <div class="form-group">
                                            <label for="providerDD">Provider / Retailer</label>
                                            <select name="selector1" id="providerDD" class="form-control1">
                                                <option>Provider 1</option>
                                                <option>Provider 2</option>
                                                <option>Provider 3</option>
                                                <option>Provider 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="offerTypeDD">Offer Type</label>
                                            <select name="selector1" id="offerTypeDD" class="form-control1">
                                                <option>Offer Type 1</option>
                                                <option>Offer Type 2</option>
                                                <option>Offer Type 3</option>
                                                <option>Offer Type 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="timeFrameDD">Offer Time Frame</label>
                                            <select name="selector1" id="timeFrameDD" class="form-control1">
                                                <option>Time Frame 1</option>
                                                <option>Time Frame 2</option>
                                                <option>Time Frame 3</option>
                                                <option>Time Frame 4</option>
                                            </select>
                                        </div>
                                        <button type="button" class="btn btn-default btn-success btn-lg" onclick="window.location='/Pages/AddNewFlyer_Step2.aspx'">Add Products</button>
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
</body>
</html>
