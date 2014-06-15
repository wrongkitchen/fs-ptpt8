$(document).ready(function () {
    $('.checkHrefPopup').live('click', function(){
        if($(this).attr('href') == 'javascript:void(0)')
            showLoginPopup();
        return false;
    });
    //    var length = $("#dealer-banner>a").length;
    //    var _index = length - $("#dealer-banner .current~a").length - 1;
    //    $("#dealer-banner").zAccordion({
    //        startingSlide: _index,
    //        auto: false,
    //        tabWidth: 101,
    //        width: 748,
    //        height: 354,
    //        speed: 400,
    //        trigger: "mouseover",
    //        slideClass: 'slide',
    //        animationStart: function () {
    //            $("#dealer-banner .slide").css({ "cursor": "pointer" });
    //            $("#dealer-banner .slide-open").removeClass("resize");
    //        },
    //        buildComplete: function () {
    //            $()
    //            $("#dealer-banner .slide").css({ "cursor": "pointer" });
    //        },
    //        animationComplete: function () {
    //            $("#dealer-banner .slide").css({ "cursor": "pointer" });
    //            $("#dealer-banner .slide").addClass("resize");
    //            $("#dealer-banner .slide-open").removeClass("resize");
    //        }
    //    });

//    $("[id^='btn_footer_play_']").click(function () {
//        var platform = $(this).prop("id").replace("btn_footer_play_", "");
//        $.ajax({
//            type: "post",
//            url: "/Game/Enter",
//            data: {
//                platform: platform
//            },
//            beforeSend: function () {
//                jInformation("正在进入游戏，请稍候...", "进入游戏");
//            },
//            complete: function () {
//            },
//            success: function (data) {
//                if (data.IsLoggedIn == false) {
//                    jAlert("登录超时，请重新登录", "登录超时", function () {
//                        location.reload();
//                    });
//                } else {
//                    if (data.Result == true) {
//                        window.open(data.LoginUrl, "mywindow");
//                        $.alerts._hide();
//                    } else {
//                        jAlert("登录超时，请重新登录", "进入游戏");
//                    }
//                }
//            },
//            error: function () {
//            }
//        });
//    });
});