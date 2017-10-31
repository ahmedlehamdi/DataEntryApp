<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="DataEntryApp.Pages.Login" %>


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
<!--webfonts-->
<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css'>
<!--//webfonts--> 
<link href='../css/jquery-loading.min.css' rel='stylesheet' type='text/css'>
<!--//Spinner--> 
<!-- js -->
<script src="../js/jquery-1.11.1.min.js"></script>
<script src="../js/app.js"></script>
<script src="../js/jquery.form-validator.min.js"></script>
<script src="../js/jquery-loading.js"></script>

<!-- //js -->
</head> 
<body class="login-bg">
		<div class="login-body">
			<div class="login-heading">
				<h1>Login</h1>
			</div>
			<div class="login-info" >
				<form id="loginForm" method="post">
					<input id="userNameTxt" type="text" class="user" name="username" data-validation-event="submit" data-validation="required  alphanumeric" placeholder="Enter username" required="">
					<input id="passwordTxt" type="password" data-validation-event="submit" name="password" class="lock" data-validation="required  alphanumeric" placeholder="Enter Password" required="" >
					<!--<div class="forgot-top-grids">
						<div class="forgot-grid">
							<ul>
								<li>
									<input type="checkbox" id="brand1" value="">
									<label for="brand1"><span></span>Remember me</label>
								</li>
							</ul>
						</div>
						<div class="forgot">
							<a href="#">Forgot password?</a>
						</div>
						<div class="clearfix"> </div>
					</div>-->
                    <input id="submitButton" type="submit" name="Sign In" value="Login"  />
					<!--<div class="signup-text">
						<a href="signup.html">Don't have an account? Create one now</a>
					</div>
					<hr>
					<h2>or login with</h2>
					<div class="login-icons">
						<ul>
							<li><a href="#" class="facebook"><i class="fa fa-facebook"></i></a></li>
							<li><a href="#" class="twitter"><i class="fa fa-twitter"></i></a></li>
							<li><a href="#" class="google"><i class="fa fa-google-plus"></i></a></li>
							<li><a href="#" class="dribbble"><i class="fa fa-dribbble"></i></a></li>
						</ul>
					</div>-->
				</form>
			</div>
		</div>
		<!--<div class="go-back login-go-back">
				<a  href="/Pages/Home.apsx">Go To Home</a>
			</div>-->
		<div class="copyright login-copyright">
           <p>© 2018 Best Offers . All Rights Reserved . Design by <a href="http://w3layouts.com/">W3layouts</a></p>    
		</div>
    <script>
        $(document).ready(function () {
            $.validate({
                lang: 'en',
                validateOnEvent: true
            });
        });
    </script>
</body>
</html>