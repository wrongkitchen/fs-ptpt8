$(document).ready(function () {

    //    $("[id^='checkbox']").click(function () {
    //        var tabName = $(this).prop("id").replace("tab-", "");
    //        $(".tabButton .tab").removeClass("active");
    //        $("#tab-" + tabName).addClass("active");
    //        $(".tabContent").removeClass("active");
    //        $("#tabContent-" + tabName).addClass("active");
    //    });

    $("[id='Infosecurity']").click(
        function () {
            $.ajax({
                type: "post",
                url: "/Account/ValidateUser?loginType=pt",
                data:
                {
                    userName: $("#userName").val(),
                    password: $("#password").val()
                },
                beforeSend: function () {
                    jInformation("正在提交...", "转入额度");
                    //setCookie();
                },
                complete: function () {

                },
                success: function (data) {
                    jAlert(data.Result, "温馨提示", function () {
                        if (data.Success == true) {
                            if (data.Url !== undefined) {
                                window.open(data.Url);
                            }
                            //window.opener = null;
                            //window.open("", "_self");
                            window.close();




                            //关闭窗口
//                            var ua = navigator.userAgent;
//                            var ie = navigator.appName == "Microsoft Internet Explorer" ? true : false;
//                            if (ie) {
//                                var IEversion = parseFloat(ua.substring(ua.indexOf("MSIE") + 5, ua.indexOf(";", ua.indexOf("MSIE"))));
//                                alert(IEversion);
//                                if (IEversion < 5.5) {
//                                    var str = "<object id = 'noTipClose' classid='clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11'>";
//                                    str += "<param name='Command' value='Close'/></object>";
//                                    document.body.insertAdjacentHTML("beforeEnd", str);
//                                    document.all.noTipClose.Click();
//                                } else {
//                                    window.parent.opener = null;
//                                    //window.parent.open('', '_self', '');
//                                    window.parent.open('', '_self');
//                                    window.parent.close();
//                                }
//                            }
//                            else {
//                                //widow.parent.close();
//                                window.parent.opener = null;
//                                window.parent.close();
//                            }




                        }
                    });
                },
                error: function () {
                }
            });
        });


    //if (!data.Url) {
    //}
    //if (data.Url !== undefined) {
    //window.open(data.Url, "_blank");
    //window.open(data.Url);
    //location.href = data.Url;
    //}





    //    $("[id='Password']").click(function () {
    //        $.ajax({
    //            type: "post",
    //            url: "/Member/ForgetPasswordUsername",
    //            data: {
    //                Password1: $("#Password1").val(),
    //                Password2: $("#Password2").val()
    //            },
    //            beforeSend: function () {
    //                jInformation("正在提交...", "忘记密码");
    //            },
    //            complete: function () {
    //            },
    //            success: function (data) {
    //                jAlert(data.ResultMsg, "忘记密码", function () {
    //                    if (data.Result == true) {
    //                        parent.location.href = "/CN/Index";
    //                    }
    //                });
    //            },
    //            error: function () {
    //            }
    //        });
    //    });

    //    $("[id='PasswordEmail']").click(function () {
    //        $.ajax({
    //            type: "post",
    //            url: "/Member/ForgetPasswordEmail",
    //            data: {
    //                Username: $("#Username").val(),
    //                Email: $("#Email").val()
    //            },
    //            beforeSend: function () {
    //                jInformation("正在提交...", "忘记密码");
    //            },
    //            complete: function () {
    //            },
    //            success: function (data) {
    //                jAlert(data.ResultMsg, "忘记密码", function () {
    //                    if (data.Result == true) {
    //                        location.reload();
    //                    }
    //                });
    //            },
    //            error: function () {
    //            }
    //        });
    //    });

});


function setCookie() { //设置cookie  
    //var loginCode = $("#login_code").val(); //获取用户名信息  
    var pwd = $("#password").val(); //获取登陆密码信息  
    var checked = $("[id='checkbox']:checked"); //获取“是否记住密码”复选框  
    if (checked && checked.length > 0) 
    { 
        //判断是否选中了“记住密码”复选框  
        //$.cookie("login_code", loginCode); //调用jquery.cookie.js中的方法设置cookie中的用户名  
        $.cookie("pwd", $.base64.encode(pwd)); //调用jquery.cookie.js中的方法设置cookie中的登陆密码，并使用base64（jquery.base64.js）进行加密  
    } else {
        $.cookie("pwd", null);
    }
}

function getCookie() { //获取cookie  
    //var loginCode = $.cookie("login_code"); //获取cookie中的用户名  
    var pwd = $.cookie("pwd"); //获取cookie中的登陆密码  
    if (pwd) 
    {
        //密码存在的话把“记住用户名和密码”复选框勾选住  
        $("[id='checkbox']").attr("checked", "true");
    }
    //if (loginCode) {//用户名存在的话把用户名填充到用户名文本框  
        //$("#login_code").val(loginCode);
    //}
    if (pwd) 
    {
        //密码存在的话把密码填充到密码文本框  
        $("#password").val($.base64.decode(pwd));
    }
} 