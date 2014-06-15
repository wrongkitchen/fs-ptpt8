$(document).ready(function () {


    $(".gamesSelection").each(function (index, element) {
        $(element).click(function (e) {
            $(".gamesSelection ").removeClass("current");
            $(element).addClass("current");
            e.preventDefault();
            $(".gamesList table.gameList").css("display", "none");
            $(".gamesList table.gameList:eq(" + index + ")").css("display", "inline");
        });
    });
	
	$(window).hashchange(function () {
        if(location.hash){
            if($(".gamesSelection."+location.hash.replace('#', '')).length){
            	$(".gamesSelection").removeClass("current");
           	 	$(".gamesSelection."+location.hash.replace('#', '')).addClass('current');
           	 	$(".gamesSelection").each(function (index, element) {
    	            if($(element).hasClass("current")){
    		            $(".gamesList table.gameList").css("display", "none");
    		            $(".gamesList table.gameList:eq(" + index + ")").css("display", "inline");
    	            }
    		    });
            }
        }
    });
    $(window).hashchange();
});
