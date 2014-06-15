$(document).ready(function(){

	$(window).hashchange(function () {
		if($(location.hash).length){
			$(location.hash).addClass('click');
		}
    });
    $(window).hashchange();


	$(".promotion-ads").click(function(){
		if($(this).hasClass("click")){
			$(this).removeClass("click");
		}else{
			$(this).addClass("click");
		}
	});
});