$(document).ready(function () {

    $("[id='Infosecurity']").click(function () {
        $.ajax({
            type: "post",
            url: "/Member/ForgetPassword",
            data: {
                Username: $("#Username").val(),
                Question: $("#Question").val(),
                Answer: $("#Answer").val()
            },
            beforeSend: function () {
                jInformation("正在提交...", "忘记密码");
            },
            complete: function () {
            },
            success: function (data) {
                jAlert(data.ResultMsg, "忘记密码", function () {
                    if (data.Result == true) {
                        location.href = "/Member/ForgetPasswordUsername";
                    }
                });
            },
            error: function () {
            }
        });
    });

    $("[id='Password']").click(function () {
        $.ajax({
            type: "post",
            url: "/Member/ForgetPasswordUsername",
            data: {
                Password1: $("#Password1").val(),
                Password2: $("#Password2").val()
            },
            beforeSend: function () {
                jInformation("正在提交...", "忘记密码");
            },
            complete: function () {
            },
            success: function (data) {
                jAlert(data.ResultMsg, "忘记密码", function () {
                    if (data.Result == true) {
                        parent.location.href = "/CN/Index";
                    }
                });
            },
            error: function () {
            }
        });
    });

    $("[id='PasswordEmail']").click(function () {
        $.ajax({
            type: "post",
            url: "/Member/ForgetPasswordEmail",
            data: {
                Username: $("#Username").val(),
                Email: $("#Email").val()
            },
            beforeSend: function () {
                jInformation("正在提交...", "忘记密码");
            },
            complete: function () {
            },
            success: function (data) {
                jAlert(data.ResultMsg, "忘记密码", function () {
                    if (data.Result == true) {
                        location.reload();
                    }
                });
            },
            error: function () {
            }
        });
    });

});