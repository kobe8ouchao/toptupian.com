<!-- container waterall-->
<div class="waterfall">
	<div id="container" style="position: relative;">
<!--
<?php
foreach($json as $key=>$val) {
	?>
		<div class="ks-waterfall wfc">
		<a href="##" class="imgs"><img src="<?php echo $val->image?>" width="192" height="282"></a>
		<p class="description"><?php echo $val->title?></p>
		<p class="stats less"></p>
		<div class="convo attribution clearfix">
		<p><a href="##" title="---暖时光---" class="img x"><img src="<?php echo _IMAGES_?>tou.jpg"></a>
		<a href="##" class="author x">---暖时光---</a>&nbsp;通过&nbsp;<a href="##" class="x">---暖时光---</a>&nbsp;采集到&nbsp;<a href="/boards/114206/" class="x">天使在人间</a></p><a title="回复" class="replyButton"></a>
		</div>
		</div>
		<?php
}
?>
-->
	</div>
</div>
<script type="tpl" id="tpl">
	<div class="ks-waterfall wfc">
		<a href="info.php" class="imgs"><img src="{{image}}" height="{{height}}"></a>
		<p class="description">{{title}}</p>
		<p class="stats less"></p>
		<div class="convo attribution clearfix">
			<p><a href="##" title="---暖时光---" class="img x"><img src="<?php echo _IMAGES_?>tou.jpg"></a>
			<a href="##" class="author x">---暖时光---</a>&nbsp;通过&nbsp;<a href="##" class="x">---暖时光---</a>&nbsp;采集到&nbsp;<a href="/boards/114206/" class="x">天使在人间</a></p><a title="回复" class="replyButton"></a>
		</div>
	</div>
</script>
			<!-- end container waterall-->
<script>
KISSY.use("waterfall,ajax,template,node,button", function(S, Waterfall, io, Template, Node, Button) {
    var $ = Node.all;

    var tpl = Template($('#tpl').html()),
        nextpage = 1,
        waterfall = new Waterfall.Loader({
        container:"#container",
        load:function(success, end) {
            $('.loading').show();
            S.ajax({
                url: 'data.php',
                dataType: "json",
                success: function(d) {
                    // 拼装每页数据
                    var items = [];
                    S.each(d, function(item) {
                        item.height = Math.round(Math.random()*(300 - 180) + 180); // fake height
                        items.push(new S.Node(tpl.render(item)));
                    });
                    success(items);
                },
                complete: function() {
                    $('.loading').hide();
                }
            });
        },
        minColCount:2,
        colWidth:235
    });
	// scrollTo
    $('#elevator').on('click', function(e) {
        e.halt();
        e.preventDefault();
        $(window).stop();
        $(window).animate({
            scrollTop:0
        },0.5,"easeOut");
    });


});
$(document).ready(function () {
	var backtop = $('#elevator');
	$(window).scroll(function(){
		if($(window).scrollTop() != 0){
			backtop.removeClass("off");
		}else {
			backtop.addClass("off");
		}
	});
})
</script>
</div>
<div class="loading"><img src="<?php echo _IMAGES_?>loading.gif"><span>正在加载...</span></div>
