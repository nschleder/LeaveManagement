<?php 
	get_header();
	$current_user = wp_get_current_user();
	// show_admin_bar(false);
	$path = '../wp-content/themes/twentyeleven-child/';
	$inc = 'inc/';
	$ng = 'ngModules/';
	$ap = 'leaveManagement/';
	$c = 'controllers/';
?>
<!-- Foundation-->
<link rel="stylesheet" href="<?=$path.$inc?>/foundation-5.5.0/css/foundation.darkblue.min.css" />
<link rel="stylesheet" href="<?=$path.$inc?>/foundation-5.5.0/foundation-icons/foundation-icons.css" />

<!--css-->
<link rel="stylesheet" href="<?=$path.$inc.$ng?>/growlNotifications/angular-growl-foundation.css" />
<link rel="stylesheet" href="<?=$path.$inc.$ng?>/ngDialog/ngDialog.css" />
<link rel="stylesheet" href="<?=$path.$inc.$ng?>/ngDialog/ngDialog-theme-default.min.css" />
<link rel="stylesheet" href="<?=$path.$inc.$ng?>/angular-datepicker.min.css" />
<link rel="stylesheet" href="<?=$path.$ap?>/style.css" />

<!-- ngModules -->
<script type="text/javascript" src="<?=$path.$inc?>/angular.min.js"></script>
<script type="text/javascript" src="<?=$path.$inc.$ng?>/angular-route.js"></script>
<script type="text/javascript" src="<?=$path.$inc.$ng?>/growlNotifications/angular-growl.min.js"></script>
<script type="text/javascript" src="<?=$path.$inc.$ng?>/angular-animate.js"></script>
<script type="text/javascript" src="<?=$path.$inc.$ng?>/ngDialog/ngDialog.min.js"></script>
<script type="text/javascript" src="<?=$path.$inc.$ng?>/angular-datepicker.min.js"></script>

<!-- moment -->
<script type="text/javascript" src="<?=$path.$inc?>/moment.js"></script>
<script type="text/javascript" src="<?=$path.$inc.$ng?>/ngMoment/angular-moment.min.js"></script>	
	
<!--Foundation -->
<script type="text/javascript" src="<?=$path.$inc?>/mm-foundation-tpls-0.5.1.min.js"></script>

<!--App -->
<script type="text/javascript" src="<?=$path.$ap?>/app.js"></script>

<!-- controllers -->
<script type="text/javascript" src="<?=$path.$ap.$c?>ManagerController.js"></script>
<script type="text/javascript" src="<?=$path.$ap.$c?>NavBarController.js"></script>
<script type="text/javascript" src="<?=$path.$ap.$c?>ProfileController.js"></script>
<script type="text/javascript" src="<?=$path.$ap.$c?>RequestModalController.js"></script>

<head><base href="/?page_id=1030/"></head>

<body ng-app="leaveManagement">
	<nav-bar></nav-bar>
	<div growl></div>
	<div ng-view></div>
</body>

<?php get_footer(); ?>