$(document).ready(function(){
	$(".calendarYear").find("table td").each(function(index,element){
		$(element).click(function(){
			if(!$("img.month_calendar:eq("+index+")").is(".display")){
				$(".calendarYear").find("table td").removeClass("current");
				$(element).addClass("current");
				$("img.month_calendar.display").fadeOut(300,function(){
					$("img.month_calendar.display").removeClass("display");
					$("img.month_calendar:eq("+index+")").fadeIn(300,function(){
						$(this).addClass("display");
					});
				});
			}
		});
	});
});