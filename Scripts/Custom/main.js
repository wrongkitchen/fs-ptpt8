$(document).ready(function () {
    var enterSlider = {
        slideSpeed: 300,
        childWidth: function () {
            var w = 0;
            $(".entertainment").find(".col").each(function () {
                w += $(this).width();
            });
            return w;
        },
        containWidth: function () {
            return $(".entertainment>.content").width();
        },
        getSlider: function () {
            return $(".entertainment>.content>.contentContain");
        },
        enableLeft: function (status) {
            if (status) {
                $(".entertainment>.leftBtn").css("background-image", "url(/Content/Images/arrow/grey-left-box.gif)");
                $(".entertainment>.leftBtn").bind('click');
            }
            else {
                $(".entertainment>.leftBtn").css("background-image", "url(/Content/Images/arrow/grey-left-box-dim.gif)");
                $(".entertainment>.leftBtn").unbind('click');
                //$(".entertainment .leftBtn").unbind('click');
            }

        },
        enableRight: function (status) {
            if (status) {
                $(".entertainment>.rightBtn").css("background-image", "url(/Content/Images/arrow/grey-right-box.gif)");
                $(".entertainment>.rightBtn").bind('click');
            }
            else {
                $(".entertainment>.rightBtn").css("background-image", "url(/Content/Images/arrow/grey-right-box-dim.gif)");
                $(".entertainment>.rightBtn").unbind('click');
            }

        },
        init: function () {
            var _this = this;
            var lpos;
            // dim left button
            _this.enableLeft(false);
            $(".entertainment>.rightBtn").live("click", function () {
                var slider = _this.getSlider();
                slider.animate({ left: "-" + (_this.childWidth() - _this.containWidth()) }, _this.slideSpeed, function () {
                    lpos = slider.css('left');
                    lpos = parseInt(lpos.substr(0, lpos.length - 2));
                    if (lpos < 0) {
                        _this.enableLeft(true);
                        _this.enableRight(false);
                    }
                    else {
                        _this.enableLeft(false);
                        _this.enableRight(true);
                    }
                }); //function

            });
            $(".entertainment>.leftBtn").live("click", function () {
                var slider = _this.getSlider();
                slider.animate({ left: "0px" }, _this.slideSpeed, function () {
                    lpos = slider.css('left');
                    lpos = parseInt(lpos.substr(0, lpos.length - 2));

                    if (lpos < 0) {
                        _this.enableLeft(true);
                        _this.enableRight(false);
                    }
                    else {
                        _this.enableLeft(false);
                        _this.enableRight(true);
                    }
                }); //function

            });

        }
    };
    enterSlider.init();

    $("#slideshow").DivSlider({
        nav: "#slideshowNav",    // define navigator
        next: "#sliderRightArrow",
        prev: "#sliderLeftArrow",
        circular: true,         // infiniti loop image
        overPause: true,        // pause while hover div
        auto: true,             // auto play
        speed: 500,             // slide speed
        time: 5000,
        navTriggerEvent: "mouseover"
    });

    setTimeout(" $('#enlargeBanner').slideUp(500);", 5000);
    $("#enlargeBannerClose").live("click", function () {
        $("#enlargeBanner").slideUp(500);
    });
    $("#subNav .button").hover(function () {
        $("#subNav .overlay").css({ "display": "block" });
    }, function () {
        $("#subNav .overlay").css({ "display": "none" });
    });

    $("ul.zoneBtn li").hover(function () {
        $(".zoneBtn .overlay").css({ "display": "block" });
    }, function () {
        $(".zoneBtn .overlay").css({ "display": "none" });
    });

    $("#username, #password").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#index_login_link").trigger('click');
        }
    });

    // 用户操作
    $("#index_login_link").click(function () {
        if ($("#username").val() == "") {
            jAlert("请输入账户", "登录", function () {
                $("#username").focus();
            });
            return;
        }
        if ($("#password").val() == "") {
            jAlert("请输入密码", "登录", function () {
                $("#password").focus();
            });
            return;
        }

        $.ajax({
            type: "post",
            url: "/Account/ValidateUser",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            beforeSend: function () {
                $("#username").prop("disabled", true);
                $("#password").prop("disabled", true);
                $("#index_login_loader").show();
                $("#index_login").hide();
            },
            complete: function () {
            },
            success: function (data) { 
            
                if (data.Success == true) {

                    var url = getUrlVars()["returnUrl"];

////////=============================================================
//////// For Xmas :2013年12月23日中午12点 - 2013年12月30日中午12点
//////var currentPageUrl = document.location.toString().toLowerCase();
//////                  
//////if (currentPageUrl.indexOf("/events/xmas") != -1) {                        
//////    url = location.protocol + "//" + location.host + "/events/xmas";
//////}
////////=============================================================

                    if (!url) {
                        url = location.protocol + "//" + location.host + "/Member";
                    }
                    window.location = decodeURIComponent(url);
                } else {
                    jAlert(data.Result, "登录", function () {
                        $("#index_login_loader").hide();
                        $("#index_login").show();
                        $("#username, #password").val("");
                        $("#username").prop("disabled", false);
                        $("#password").prop("disabled", false);
                        //----------------------------------------
                        //sean@20131113
                        $("#username").val("888");
                        $("#password").prop("placeholder", "");
                        $("#username").focus();
                    });
                }
            },
            error: function () {
            }
        });
    });

    // 代理操作
    $("#agent_login_link").click(function () {
        if ($("#username").val() == "") {
            jAlert("请输入账户", "登录", function () {
                $("#username").focus();
            });
            return;
        }
        if ($("#password").val() == "") {
            jAlert("请输入密码", "登录", function () {
                $("#password").focus();
            });
            return;
        }

        $.ajax({
            type: "post",
            url: "/Agent/ValidateUser",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            beforeSend: function () {
                $("#username").prop("disabled", true);
                $("#password").prop("disabled", true);
                $("#Agent_login_loader").show();
                $("#Agent_login").hide();
            },
            complete: function () {
            },
            success: function (data) {
                if (data.Success == true) {
                    var url = getUrlVars()["returnUrl"];
                    if (!url) {
                        //url = location.href.replace(/\/$/, "") + "/Member";
                        url = location.protocol + "//" + location.host + "/Member";
                    }
                    window.location = decodeURIComponent(url);
                } else {
                    jAlert(data.Result, "登录", function () {
                        $("#Agent_login_loader").hide();
                        $("#Agent_login").show();
                        $("#username, #password").val("");
                        $("#username").prop("disabled", false);
                        $("#password").prop("disabled", false);
                        //----------------------------------------
                        //sean@20131113
                        $("#username").val("d");
                        $("#password").prop("placeholder", "");
                        $("#username").focus();
                    });
                }
            },
            error: function () {
            }
        });
    });
});

$(window).load(function () {
    // $("#enlargeBanner").slideDown(500);
});


