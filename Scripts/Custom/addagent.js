$(document).ready(function () {

    var inputsValid = false;
    $("#regusername").blur(function () {


        if ($(this).val() == "") {
            $("#regusername_msg").addClass("red");
            $("#regusername_msg").html("请输入用户名！");
            inputsValid = false;
        } else {
            if ($(this).val().length > 10 || $(this).val().length < 6) {
                $("#regusername_msg").addClass("red");
                $("#regusername_msg").html("账号长度必须在6-10个字符");
                inputsValid = false;
            } else {
                $.ajax({
                    type: "post",
                    //url: "/Account/IsUserExisted", 
                    url: "/Agent/IsExisted", //sean@20131224:修正
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
                            inputsValid = false;
                        } else {
                            $("#regusername_msg").removeClass("red");
                            $("#regusername_msg").html(data.ResultMsg);
                            inputsValid = true;
                        }
                    },
                    error: function () {
                    }
                });
            }
        }

        /*
        if ($(this).val() == "") {
            $("#regusername_msg").addClass("red");
            $("#regusername_msg").html("请输入用户名！");
            inputsValid = false;
        } else {
            if ($(this).val().length > 10 || $(this).val().length < 6) {
                $("#regusername_msg").addClass("red");
                $("#regusername_msg").html("账号长度必须在6-10个字符");
                inputsValid = false;
            }
        }
        */
    });

    $("#regusername").keydown(function () {
        $("#regusername_msg").removeClass("red");
        $("#regusername_msg").html("帐号可输入6-10位字符，由英文和数字组成");
    });

    $("#regpassword").blur(function () {
        if ($(this).val() == "") {
            $("#regpassword_msg").addClass("red");
            $("#regpassword_msg").html("请输入密码！");
            inputsValid = false;
        } else {
            if ($(this).val().length > 16 || $(this).val().length < 6) {
                $("#regpassword_msg").addClass("red");
                $("#regpassword_msg").html("密码长度必须在6-16个字符");
                inputsValid = false;
            } else {
                $("#regpassword_msg").removeClass("red");
                $("#regpassword_msg").html("");
                inputsValid = true;
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
            inputsValid = false;
        } else {
            if ($(this).val() != $("#regpassword").val()) {
                $("#regpassword_confirm_msg").addClass("red");
                $("#regpassword_confirm_msg").html("两次输入的密码不一致！");
                inputsValid = false;
            } else {
                $("#regpassword_confirm_msg").removeClass("red");
                $("#regpassword_confirm_msg").html("");
                inputsValid = true;
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
            inputsValid = false;
        } else {
            var reg = /[^\u4E00-\u9FA5]/g;
            if (reg.test($(this).val())) {
                $("#regtruename_msg").addClass("red");
                $("#regtruename_msg").html("真实姓名请输入中文！");
                inputsValid = false;
            } else {
                $("#regtruename_msg").removeClass("red");
                $("#regtruename_msg").html("");
                inputsValid = true;
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
            $("#regcellphone_msg").html("请输入手机号码！");
            inputsValid = false;
        } else {
            var reg = /^0*(13|15|18)\d{9}$/;
            if (!reg.test($(this).val())) {
                $("#regcellphone_msg").addClass("red");
                $("#regcellphone_msg").html("请检查手机号码是否正确！");
                inputsValid = false;
            } else {
                $("#regcellphone_msg").removeClass("red");
                $("#regcellphone_msg").html("");
                inputsValid = true;
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
            $("#regemail_msg").html("请输入邮箱！");
            inputsValid = false;
        } else {
            var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!reg.test($(this).val())) {
                $("#regemail_msg").addClass("red");
                $("#regemail_msg").html("请检查邮箱是否是否正确！");
                inputsValid = false;
            } else {
                $("#regemail_msg").removeClass("red");
                $("#regemail_msg").html("");
                inputsValid = true;
            }
        }
    });

    $("#regemail").keydown(function () {
        $("#regemail_msg").removeClass("red");
        $("#regemail_msg").html("重要，请填写真实邮箱，忘记密码时可凭邮箱获取");
    });

    $("#regreset").click(function () {
        inputsValid = false;
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
        $("#content").val("");
        $("#regqq").val("");
    });

    $("#regsubmit").click(function () {
        if (inputsValid) {
                $.ajax({
                    type: "post",
                    url: "/Agent/Register",
                    data: {
                        username: $("#regusername").val(),
                        password: $("#regpassword").val(),
                        password_confirm: $("#regpassword_confirm").val(),
                        truename: $("#regtruename").val(),
                        cellphone: $("#regcellphone").val(),
                        email: $("#regemail").val(),
                        qq: $("#regqq").val(),
                        content:$("#content").val()
                    },
                    beforeSend: function () {
                        jInformation("正在注册...请稍候", "注册帐号");
                    },
                    complete: function () {
                    },
                    success: function (data) {
                        if (data.Result == true) {
                            jAlert('感谢您的申请，我们会在审核后和你联系', "注册帐号", function () {
                            // jAlert(data.ResultMsg, "注册帐号", function () {
                            location.reload();
                            });
                        } else {
                            jAlert(data.ResultMsg, "注册帐号");
                        }
                    },
                    error: function () {
                    }
                });
            
        } else {
            jAlert("请正确输入所有注册信息", "注册帐号");
        }
    });
});