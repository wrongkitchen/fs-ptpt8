$(document).ready(function () {

    var usernameValid = false, passwordValid = false, passwordconfirmValid = false, truenameValid = false, cellphoneValid = false, emailValid = false, qqValid = true;
    $("#regusername").blur(function () {
        if ($(this).val() == "") {
            $("#regusername_msg").addClass("red");
            $("#regusername_msg").html("请输入用户名！");
            usernameValid = false;
        } else {
            if ($(this).val().length > 10 || $(this).val().length < 6) {
                $("#regusername_msg").addClass("red");
                $("#regusername_msg").html("账号长度必须在6-10个字符");
                usernameValid = false;
            } else {
                $.ajax({
                    type: "post",
                    url: "/Account/IsUserExisted",
                    data: {
                        username: $("#regusername").val()
                    },
                    beforeSend: function () {
                        $("#regusername_msg").removeClass("red");
                        $("#regusername_msg").html("正在查询...");
                    },
                    complete: function () {
                    },
                    success: function (data) {
                        if (data.Result == true) {
                            $("#regusername_msg").addClass("red");
                            $("#regusername_msg").html(data.ResultMsg);
                            usernameValid = false;
                        } else {
                            $("#regusername_msg").removeClass("red");
                            $("#regusername_msg").html(data.ResultMsg);
                            usernameValid = true;
                        }
                    },
                    error: function () {
                    }
                });
            }
        }
    });

    $("#regusername").keydown(function () {
        $("#regusername_msg").removeClass("red");
        $("#regusername_msg").html("帐号可输入6-10位字符，由英文和数字组成");
    });

    $("#regpassword").blur(function () {
        if ($(this).val() == "") {
            $("#regpassword_msg").addClass("red");
            $("#regpassword_msg").html("请输入密码！");
            passwordValid = false;
        } else {
            if ($(this).val().length > 16 || $(this).val().length < 6) {
                pwStrength($(this).val());
                $("#regpassword_msg").addClass("red");
                $("#regpassword_msg").html("密码长度必须在6-16个字符");
                passwordValid = false;
            } else {
                pwStrength($(this).val());
                $("#regpassword_msg").removeClass("red");
                $("#regpassword_msg").html("");
                passwordValid = true;
            }
        }
    });

    $("#regpassword").keydown(function () {
        $("#regpassword_msg").removeClass("red");
        $("#regpassword_msg").html("密码可输入6-16位字符");
    });

    $("#regpassword_confirm").blur(function () {
        if ($(this).val() == "") {
            $("#regpassword_confirm_msg").addClass("red");
            $("#regpassword_confirm_msg").html("请输入确认密码！");
            passwordconfirmValid = false;
        } else {
            if ($(this).val() != $("#regpassword").val()) {
                $("#regpassword_confirm_msg").addClass("red");
                $("#regpassword_confirm_msg").html("两次输入的密码不一致！");
                passwordconfirmValid = false;
            } else {
                $("#regpassword_confirm_msg").removeClass("red");
                $("#regpassword_confirm_msg").html("");
                passwordconfirmValid = true;
            }
        }
    });

    $("#regpassword_confirm").keydown(function () {
        $("#regpassword_confirm_msg").removeClass("red");
        $("#regpassword_confirm_msg").html("请在此输入密码");
    });

    $("#regtruename").blur(function () {
        if ($(this).val() == "") {
            $("#regtruename_msg").addClass("red");
            $("#regtruename_msg").html("请输入真实姓名！");
            truenameValid = false;
        } else {
            var reg = /[^\u4E00-\u9FA5]/g;
            if (reg.test($(this).val())) {
                $("#regtruename_msg").addClass("red");
                $("#regtruename_msg").html("真实姓名请输入中文！");
                truenameValid = false;
            } else {
                $("#regtruename_msg").removeClass("red");
                $("#regtruename_msg").html("");
                truenameValid = true;
            }
        }
    });

    $("#regtruename").keydown(function () {
        $("#regtruename_msg").removeClass("red");
        $("#regtruename_msg").html("真实姓名必须与取款时提款人名一致");
    });

    $("#regcellphone").blur(function () {
        if ($(this).val() == "") {
            $("#regcellphone_msg").addClass("red");
            $("#regcellphone_msg").html("输入正确手机号， 及时获取红利和优惠！");
            cellphoneValid = false;
        } else {
            var reg = /^0*(13|15|18|14)\d{9}$/;
            if (!reg.test($(this).val())) {
                $("#regcellphone_msg").addClass("red");
                $("#regcellphone_msg").html("请检查手机号码是否正确！");
                cellphoneValid = false;
            } else {
                $("#regcellphone_msg").removeClass("red");
                $("#regcellphone_msg").html("");
                cellphoneValid = true;
            }
        }
    });

    $("#regcellphone").keydown(function () {
        $("#regcellphone_msg").removeClass("red");
        $("#regcellphone_msg").html("");
    });

    $("#regemail").blur(function () {
        if ($(this).val() == "") {
            $("#regemail_msg").addClass("red");
            $("#regemail_msg").html("电邮用于随时找回密码！");
            emailValid = false;
        } else {
            var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!reg.test($(this).val())) {
                $("#regemail_msg").addClass("red");
                $("#regemail_msg").html("请检查邮箱是否是否正确！");
                emailValid = false;
            } else {
                $("#regemail_msg").removeClass("red");
                $("#regemail_msg").html("");
                emailValid = true;
            }
        }
    });

    $("#regemail").keydown(function () {
        $("#regemail_msg").removeClass("red");
        $("#regemail_msg").html("重要，请填写真实邮箱，忘记密码时可凭邮箱获取");
    });

    $("#regqq").blur(function () {
        if ($(this).val() == "") {
            //$("#regqq_msg").addClass("red");
            //$("#regqq_msg").html("请输入QQ！");
            qqValid = true;
        } else {
            var reg = /^[1-9]\d{4,10}$/;
            //var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!reg.test($(this).val())) {
                $("#regqq_msg").addClass("red");
                $("#regqq_msg").html("请检查QQ是否正确！");
                qqValid = false;
            } else {
                $("#regqq_msg").removeClass("red");
                $("#regqq_msg").html("");
                qqValid = true;
            }
        }
    });

    $("#regqq").keydown(function () {
        $("#regqq_msg").removeClass("red");
        $("#regqq_msg").html("");
    });

    $("#regreset").click(function () {
        usernameValid = false, passwordValid = false, passwordconfirmValid = false, truenameValid = false, cellphoneValid = false, emailValid = false, qqValid = false;
        $("#regusername").val("");
        $("#regusername_msg").html("");
        $("#regpassword").val("");
        $("#regpassword_msg").html("");
        $("#regpassword_confirm").val("");
        $("#regpassword_confirm_msg").html("");
        $("#regtruename").val("");
        $("#regtruename_msg").html("");
        $("#regcellphone").val("");
        $("#regcellphone_msg").html("");
        $("#regemail").val("");
        $("#regemail_msg").html("");
        $("#regqq").val("");
        $("#regqq").html("");
        $("#regterms").prop("checked", false);
    });

    $("#regsubmit").click(function () {
        if (usernameValid && passwordValid && passwordconfirmValid && truenameValid && cellphoneValid && emailValid && qqValid) {
            if (!$("#regterms").prop("checked")) {
                jAlert("请阅读协议条款后勾选", "注册帐号");
            } else {
                $.ajax({
                    type: "post",
                    url: "/Account/Register",
                    data: {
                        username: $("#regusername").val(),
                        password: $("#regpassword").val(),
                        password_confirm: $("#regpassword_confirm").val(),
                        truename: $("#regtruename").val(),
                        cellphone: $("#regcellphone").val(),
                        email: $("#regemail").val(),
                        qq: $("#regqq").val()
                    },
                    beforeSend: function () {
                        jInformation("正在注册...请稍候", "注册帐号");
                    },
                    complete: function () {
                    },
                    success: function (data) {
                        if (data.Result == true) {
                            jAlert(data.ResultMsg, "注册帐号", function () {
                                location.href = "/Member/Welcome";
                            });
                        } else {
                            jAlert(data.ResultMsg, "注册帐号");
                        }
                    },
                    error: function () {
                    }
                });
            }
        } else {
            jAlert("请正确输入所有注册信息", "注册帐号");
        }
    });
});

function clearMsg(name) {
    $("#" + name).hide();
}

//返回强度级别 
function checkStrong(sPW) {
    if (sPW.length < 4) {
        //位数不够
        return 0;
    }
    if (sPW.length == 4) {
        //长度等于4位，强度：低
        return 1;
    }
    var level = 0;
    if (hasCapital(sPW)) {
        //有大写字母
        level++;
    }
    if (hasLowercase(sPW)) {
        //有小写字母
        level++;
    }
    if (hasNumber(sPW)) {
        //有数字
        level++;
    }
    if (hasOther(sPW)) {
        //有其他字符
        level++;
    }
    if (level == 1) {
        //只有一种组合，强度：低
        return 1;
    }
    else if (level == 2) {
        //只有两种组合，强度：中
        return 2;
    }
    else if (level > 2) {
        //有三种或以上组合，强度：高
        return 3;
    }

}

// 判断是否含有大写字母
function hasCapital(str) {
    var result = str.match(/^.*[A-Z]+.*$/);
    if (result == null) return false;
    return true;
}
// 判断是否含有小写字母
function hasLowercase(str) {
    var result = str.match(/^.*[a-z]+.*$/);
    if (result == null) return false;
    return true;
}
// 判断是否含有数字
function hasNumber(str) {
    var result = str.match(/^.*[0-9]+.*$/);
    if (result == null) return false;
    return true;
}
// 判断是否含有其他字符
function hasOther(str) {
    var result = str.match(/^.*[^0-9A-Za-z]+.*$/);
    if (result == null) return false;
    return true;
}

     //显示颜色 
    function pwStrength(pwd) {
        clearMsg('regpassword_msg');
        $("#userpwd_strength").show();

        var O_color = "#eeeeee";
        var L_color = "#eb0027";
        var M_color = "#ffc200";
        var H_color = "#11b100";

        $("#strength_L").css("color", "#000000");
        $("#strength_M").css("color", "#000000");
        $("#strength_H").css("color", "#000000");

        if (pwd == null || pwd == '') {
            Lcolor = Mcolor = Hcolor = O_color;
        }
        else {
            S_level = checkStrong(pwd);

            switch (S_level) {
                case 0:
                    Lcolor = Mcolor = Hcolor = O_color;
                case 1:
                    Lcolor = L_color;
                    Mcolor = Hcolor = O_color;
                    $("#strength_L").css("color", "#ffffff");
                    break;
                case 2:
                    Lcolor = Mcolor = M_color;
                    Hcolor = O_color;
                    $("#strength_L").css("color", "#ffffff");
                    $("#strength_M").css("color", "#ffffff");
                    break;
                case 3:
                    Lcolor = Mcolor = Hcolor = H_color;
                    $("#strength_L").css("color", "#ffffff");
                    $("#strength_M").css("color", "#ffffff");
                    $("#strength_H").css("color", "#ffffff");
            }
        }
        $("#strength_L").css("background", Lcolor);
        $("#strength_M").css("background", Mcolor);
        $("#strength_H").css("background", Hcolor);
        return;
    }
