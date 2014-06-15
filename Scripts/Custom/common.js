var slider_speed = 1;
var t;
$(document).ready(function () {

    $("#sliderContainer").each(function (index, element) {
        var width = 0;
        $(element).children().each(function (_index, _element) {
            width = width + $(_element).outerWidth(true);
        });
        $(element).width(width);
    });
    t = setInterval(slider_function, 40);
    $("#sliderContainer").hover(function () {
        clearInterval(t);
    }, function () {
        t = setInterval(slider_function, 40);
    });
    //if ($(".tabBlock").length > 0) switchTab();

    backToTop();
    repositionTop();

    //click
    //	$("#btn_footer_freetrial").click(function(){
    //		window.location.href="#";
    //		});
    $(".forgot a").colorbox({
        iframe: true,
        innerWidth: "520px",
        innerHeight: "255px"
    });
    /*$("#btn_top_download a").attr('href',"client.html");
	
    $("#btn_top_download a").colorbox({
    iframe:true,
    innerWidth: "824px",
    innerHeight: "614px"
    });*/

    // 登录模版部分
    $("#username, #password").keypress(function (e) {
        if (e.keyCode == 13) {
            $("#shared_login_link").trigger('click');
        }
    });

    $("#shared_login_link").click(function () {

        if ($("#username").val() == "") {
            jAlert("请输入账户", "登录", function () {
                $("#username").val("888");
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
                $("#shared_login_loader").show();
                $("#shared_login").hide();
            },
            complete: function () {
            },
            success: function (data) {
                if (data.Success == true) {
                    //                    var url = getUrlVars()["returnUrl"];
                    //                    if (!url) {
                    //                        url = location.protocol + "//" + location.host + "/Member";
                    //                    }
                    //                    window.location = decodeURIComponent(url);

                   

                    //-------------------------

                    location.href = "/Member";
                } else {
                    jAlert(data.Result, "登录", function () {
                        $("#shared_login_loader").hide();
                        $("#shared_login").show();
                        $("#username").val("888");
                        $("#password").val("");
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

    $("#shared_logout").click(function () {
        //window.location = "/Account/Logout";
        $.ajax({
            type: "post",
            url: "/Account/Logout",
            data: {
        },
        beforeSend: function () {
            jInformation("正在安全退出...请稍候", "安全退出");
        },
        complete: function () {
        },
        success: function (data) {
            if (data.Result == true) {
                jAlert(data.ResultMsg, "登录", function () {
                    location.href = data.Url;
                });
            }
        },
        error: function () {
        }
    });
});

$("#shared_logout_deposit").click(function () {
 
    //        window.location = "/Member/RapidDeposit";
    window.location = "/Member/DepositSwitch"; ///sean@2013-11-28:VIP adjest

});

$("#shared_deposit").click(function () {
    //window.location = "/Member/YBpay";
    window.location = "/Member/DepositSwitch";///sean@2013-11-28:VIP adjest

});

$("#shared_logout_withdraw").click(function () {
    window.location = "/Member/Withdraw";
});

$("#refresh_balance").click(function () {
    GetBalance();
});

GetBalance();

$("#browser_social_06").click(function () {
    jAlert("<img src='/Content/Images/home/weico.jpg'>", "微信二维码");
});


// 代理登录模版部分
$("#username, #password").keypress(function (e) {
    if (e.keyCode == 13) {
        $("#agent_login_link").trigger('click');
    }
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
                    url = location.protocol + "//" + location.host + "/Agent";
                }
                window.location = decodeURIComponent(url);
                // window.open(decodeURIComponent(url));
                $("#Agent_login_loader").hide();
                $("#Agent_login").show();
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
function slider_function() {
    if ($("#sliderContainer").length == 0) return;
    var xpos = $("#sliderContainer").position().left;
    if (xpos < -($("#sliderContainer").width() / 2)) {
        $("#sliderContainer").css({ left: "0px" });
    } else {
        $("#sliderContainer").css({ left: xpos - window.slider_speed });
    }
}
function switchTab() {
    $(".tabBlock").each(function (index, element) {
        $(element).children(".tabButton").find(".tab").each(function (subindex, subelement) {
            $(subelement).click(function (e) {
                $(element).children(".tabButton").find(".tab").removeClass("active");
                $(element).children(".tabButton").find(".tab:eq(" + subindex + ")").addClass("active");
                $(element).children(".tabContent").removeClass("active");
                $(element).children(".tabContent:eq(" + subindex + ")").addClass("active");
            });
        });
    });
}
function repositionTop() {
    var _width = $(window).width();
    if (_width < 1000) $("#topButton").css({ "right": 0 });
    else {
        var _right = (_width - 1000) / 2 - 70;
        if (_right < 0) _right = 0;
        $("#topButton").css({ "right": _right });
    }
}
function backToTop() {
    $(window).resize(function () {
        repositionTop();
    });

    $(window).scroll(function () {
        var _top = $(window).scrollTop();
        if (_top > 300) $("#topButton").css({ "display": "inline" });
        else $("#topButton").css({ "display": "none" });
    });
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function GetBalance() {
    $.ajax({
        type: "post",
        url: "/Member/GetBalanceFromAllPlatforms",
        data: {
        },
        beforeSend: function () {
            $("#refresh_balance").html("<img src=\"/Content/Images/ajax-loader.gif\" width=\"20\" height=\"20\" />");
        },
        complete: function () {
            $("#refresh_balance").html("<img src=\"/Content/Images/member/refresh.jpg\" width=\"20\" height=\"20\" />");
        },
        success: function (data) {
            if (data.Result == true) {
                $(".member_balance").html(data.Balance);
            }
        },
        error: function () {
        }
    });
}

var showLoginPopup = function(){
    $.colorbox({ html:$('#loginPopup').html(), closeButton:false });
};

function setHome() {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(window.location);
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config ,然后将项为signed.applets.codebase_principal_support的值改为true");
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', window.location);
    }
}
function addtoFavor() {
    var sURL = window.location.href;
    var sTitle = document.title;
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}