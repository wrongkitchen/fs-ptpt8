$(document).ready(function () {
    //$(".fancybox").fancybox();
    if ($(".article.about-faq").length != 0) {
        $(window).hashchange(function () {
            switch (location.hash) {
                case "#deposit":
                case "#faq":
                case "#intro":
                case "#withdraw":
                    var str = location.hash;
                    str = str.substr(1);
                    $(".tabButton .tab").removeClass("active");
                    $("#tab-" + str).addClass("active");
                    $(".tabContent").removeClass("active");
                    $("#tabContent-" + str).addClass("active");
                    $(window).off("hashchange");
                    return;
                    break;
                default:
                    return;
                    break;
            }
        });
        $(window).hashchange();
    }

    $("[id^='tab-']").click(function () {
        var tabName = $(this).prop("id").replace("tab-", "");
        $(".tabButton .tab").removeClass("active");
        $("#tab-" + tabName).addClass("active");
        $(".tabContent").removeClass("active");
        $("#tabContent-" + tabName).addClass("active");
    });

    // $('.about-faq>.tabBlock>.tabButton>.tab').click(function(){
    //     var tabName = $(this).prop("id").replace("tab-", "");
    //     $(".tabButton .tab").removeClass("active");
    //     $("#tab-" + tabName).addClass("active");
    //     $(".tabContent").removeClass("active");
    //     $("#tabContent-" + tabName).addClass("active");
    // });

    $("#btn_footer_freetrial").click(function () {
        window.location.href = "BBINIntro";
    });
});