<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>淘图片</title>
		<link rel="stylesheet" href="<?php echo _CSS_?>main.css">
		<link rel="stylesheet" href="http://a.tbcdn.cn/s/kissy/1.2.0/css/base.css">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js" type="text/javascript"></script> 
		<script src="http://docs.kissyui.com/assets/import-kissy.js"></script>
	</head>
	<body>
		<div id="page">
			<!-- header-->
			<div class="header">
				<div class="wrapper">
					<div class="logo">
						<a id="huaban" href="/"><img src="<?php echo _IMAGES_?>logo_38.png" width="80" height="26" alt="花瓣"></a>
					</div>
					<div class="menu_main" id="main_menu"><div class="nav"><a href="/" class="link">首页</a></div></div>
					<div class="menu_bar">
						<div id="search">
							<form id="search_form" method="get" action="/search/" class="text">
							<input id="query" type="text" size="27" name="q" autocomplete="off" placeholder="搜索你喜欢的" value="" class="default_value"><a id="search_lens" href="#" onclick="$('search_form').submit();return false;"></a>
							</form>
						</div>
					</div>
				</div>
			</div>
			<!-- end header-->
