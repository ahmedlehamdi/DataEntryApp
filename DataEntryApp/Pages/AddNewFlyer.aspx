<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddNewFlyer.aspx.cs" EnableEventValidation="false" Inherits="DataEntryApp.Pages.AddNewFlyer" %>

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
                    <div class="row">
                        <div class="progressbar-heading grids-heading col-lg-10 col-md-10 col-sm-10 col-xs-10">
                            <h2>Add New Flyer</h2>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                            <button type="button" class="btn btn-default btn-info btn-lg" onclick="window.location='/Pages/Home.aspx'">
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                Back To Home
                            </button>
                        </div>
                    </div>
                    <div class="panel panel-widget forms-panel">
                         <asp:Label ID="errorLbl" Text=""  ForeColor="#CC3300" runat="server" />
                        <div class="forms">
                            <div class="form-grids widget-shadow" data-example-id="basic-forms">
                                <div class="form-title">
                                    <h4>Basic Flyer Details :</h4>
                                </div>
                                <div class="form-body">
                                    <form id="flyerDataForm" method="post" enctype="multipart/form-data" runat="server">
                                        <div class="form-group">
                                            <label for="flyerNameEn">Name EN</label>
                                            <asp:TextBox data-validation="required  alphanumeric" required="" CssClass="form-control" id="flyerNameEn" ViewStateMode="Enabled" runat="server" placeholder="Flyer Name En" />
                                        </div>
                                        <div class="form-group">
                                            <label for="flyerNameAr">Name AR</label>
                                            <asp:TextBox data-validation="required" required=""  CssClass="form-control" id="flyerNameAr" ViewStateMode="Enabled" runat="server" placeholder="Flyer Name Ar" />
                                        </div>
                                        <div class="form-group">
                                            <label for="flyerImageFile">Image</label>
                                            <asp:FileUpload data-validation="required" required="" id="flyerImageFile" name="flyerImageFile" runat="server"  />
                                            <p class="help-block">Upload Flyer Image - Available Formats : pdf/png/jpg</p>
                                        </div>
                                        <div class="form-group">
                                            <label for="providerDD">Provider / Retailer</label>
                                            <asp:DropDownList runat="server" name="providerDD" id="providerDD" class="form-control1" data-validation="selected" required="" ViewStateMode="Enabled">
                                                <asp:ListItem Text="Please select an option" Value="-1" />
                                            </asp:DropDownList>
                                        </div>
                                        <div class="form-group">
                                            <label for="offerTypeDD">Offer Type</label>
                                            <asp:DropDownList runat="server" name="offerTypeDD" id="offerTypeDD" class="form-control1" data-validation="selected" required="">
                                                <asp:ListItem Text="Please select an option" Value="-1" />
                                            </asp:DropDownList>
                                        </div>
                                        <div class="form-group">
                                            <label for="timeFrameDD">Offer Time Frame</label>
                                            <asp:DropDownList runat="server" name="timeFrameDD" id="timeFrameDD" CssClass="form-control1" data-validation="selected" required="">
                                                <asp:ListItem Text="Please select an option" Value="-1" />
                                            </asp:DropDownList>
                                        </div>
                                        <div class="form-group">
                                            <label for="frameNameAr">Time Frame Name Ar</label>
                                            <asp:TextBox data-validation="required" required="" ViewStateMode="Enabled" runat="server" CssClass="form-control" id="frameNameAr" name="frameNameAr" />
                                        </div>
                                        <div class="form-group">
                                            <label for="frameNameEn">Time Frame Name En</label>
                                            <asp:TextBox data-validation="required" required="" ViewStateMode="Enabled" runat="server" CssClass="form-control" id="frameNameEn" name="frameNameEn" />
                                        </div>
                                        <div class="form-group">
                                            <label for="dateFrom">Date From</label>
                                            <asp:TextBox data-validation="required" ReadOnly="true" required="" ViewStateMode="Enabled" runat="server" CssClass="form-control" id="dateFrom" name="dateFrom" />
                                        </div>
                                        <div class="form-group">
                                            <label for="dateTo">Date To</label>
                                            <asp:TextBox data-validation="required" ReadOnly="true" required="" ViewStateMode="Enabled" runat="server" CssClass="form-control" id="dateTo" name="dateTo" />
                                        </div>
                                        <input type="submit" value="Add Products" class="btn btn-default btn-success btn-lg" ID="flyerSubmitBtn" OnClick="submitFlyerForm()" />
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
     <script src="/js/app.js"></script>
    <!--//scrolling js-->
    <script>
        $(document).ready(function () {
            loadAddFlyerData();
            $.formUtils.addValidator({
                name: 'selected',
                validatorFunction: function (value, $el, config, language, $form) {
                    return value != -1;
                },
                errorMessage: 'You have to Select Option from the list',
                errorMessageKey: 'SelectOption'
            });
            $.validate();
            jQuery('#dateFrom, #dateTo').datetimepicker();

        });
        
    </script>
</body>
</html>
