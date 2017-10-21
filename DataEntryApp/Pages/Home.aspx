<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="DataEntryApp.Pages.Home" %>

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
<link rel="icon" href="favicon.ico" type="image/x-icon" >
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
							<li><img src="../images/logo1.png" alt="" /></li>
							<li><h1>Data Entry</h1></li>
							<div class="clearfix"> </div>
						</ul>
					</a>
				</div>
				<div class="clearfix"> </div>
			</div>
			<div class="header-right">
				
				<!--notification menu end -->
				
				<div class="clearfix"> </div>				
			</div>
			<div class="clearfix"> </div>	
		</div>
		<!-- //header-ends -->
		<!-- main content start-->
		<div id="page-wrapper">
			<div class="main-page">
			
				<!-- four-grids -->
				<div class="row four-grids">
					<div class="col-md-4 ticket-grid">
						<div class="tickets" onclick="window.location='/Pages/AddNewFlyer.aspx';">
							<div class="grid-left">
								<div class="book-icon">
									<i class="fa fa-book"></i>
								</div>
							</div>
							<div class="grid-right">
								<h3>Offers<span>Flyer</span></h3>
								<p>Add New</p>
							</div>
							<div class="clearfix"> </div>
						</div>
					</div>
					<div class="col-md-4 ticket-grid">
						<div class="tickets">
							<div class="grid-left">
								<div class="book-icon">
									<i class="fa fa-rocket"></i>
								</div>
							</div>
							<div class="grid-right">
								<h3>View <span>Flyers</span></h3>
								<p>Rejected</p>
							</div>
							<div class="clearfix"> </div>
						</div>
					</div>
					<div class="col-md-4 ticket-grid">
						<div class="tickets" onclick="logOut();">
							<div class="grid-left">
								<div class="book-icon">
									<i class="fa fa-sign-out"></i>
								</div>
							</div>
							<div class="grid-right">
								<h3>Welcome<span id="uName"></span></h3>
								<p>Sign-out</p>
							</div>
							<div class="clearfix"> </div>
						</div>
					</div>
					<div class="clearfix"> </div>
				</div>
				<!-- //four-grids -->
				<!--row-->
				<div class="grids">
                    <div class="panel panel-widget">
                        <div class="tables">
                            <h4>List Of Flyers:</h4>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Flyer Name</th>
                                        <th>Image</th>
                                        <th>Status</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>View Products</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody id="flyerTBody">
                                    <!--tr>
                                        <th scope="row">#NUM#</th>
                                        <td>#NAME#</td>
                                        <td>#IMAGE#</td>
                                        <td>#STATUS#</td>
                                        <td>#FROM#</td>
                                        <td>#TO#</td>
                                        <td>#VIEW#</td>
                                        <td>#EDIT#</td>
                                    </tr-->
                                </tbody>
                            </table>
                        </div>
                    </div>
					<div class="clearfix"> </div>
				</div>
				<!--//row-->
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
		
	<!-- Bootstrap Core JavaScript --> 
		
        <script type="text/javascript" src="../js/bootstrap.min.js"></script>

        <script type="text/javascript" src="../js/dev-layout-default.js"></script>
		<link href="../css/bootstrap.min.css" rel="stylesheet">
		
	
		
		<!--max-plugin-->
		<script type="text/javascript" src="../js/plugins.js"></script>
		<!--//max-plugin-->
		
		<!--scrolling js-->
		<script src="../js/jquery.nicescroll.js"></script>
		<script src="../js/scripts.js"></script>
		<!--//scrolling js-->
		
		<script src="../js/app.js"></script>
		<script>
		    $(document).ready(function () {
		        var uname = localStorage.getItem('username');
		        $("#uName").text(uname);
		        loadAllFlyers();
		    });
			
		</script>
</body>
</html>