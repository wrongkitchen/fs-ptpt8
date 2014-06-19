$(function () {
    var imgServer = "http://192.126.118.47";
    $("#uploadify").uploadify({
        "buttonText": "选择文件",
        "auto": true,
        "uploader": imgServer + "/UploadImage/Upload?date=" + new Date().getTime(),
        "swf": "/Content/Styles/uploadify/uploadify.swf",
        "fileTypeDesc": "支持的图片：",
        "fileTypeExts": "*.jpg;*.png;*.gif;*.bmp",
        "queueSizeLimit": 1,
        "fileSizeLimit": "2MB",
        "onUploadStart": function (file) {
        },
        "onUploadSuccess": function (file, data, response) {
            if (response) {
                var jsonData = $.parseJSON(data);
                if (jsonData.Result == true) {
                    $("#preview").html("<img style='display: inline;' src='" + imgServer + jsonData.ReturnUrl + "' width='120' height='90' alt='' />");
                    $("#snapshot").val(imgServer + jsonData.ReturnUrl);

                } else {
                    jAlert(jsonData.ResultMsg, "上传");
                }
            }
        }
    });

    $("#btnCopy").mouseover(function () {
        if (!$.browser.msie) {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#code").val());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将验证码 " + text + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopy");
        }
    });

    $("#btnCopy").click(function () {
        if ($.browser.msie) {
            if (window.clipboardData) {
                window.clipboardData.clearData();
                window.clipboardData.setData('Text', $("#code").val());
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将验证码 " + $("#code").val() + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            }
        }
        else {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#code").val());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将验证码 " + text + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopy");
        }
    });

    $("[id='btnCopy2']").mouseover(function () {
        if (!$.browser.msie) {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#code").val());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg2").fadeOut(500, function () {
                    $("#spnmsg2").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg2").html("已将验证码 " + text + " 复制到剪贴板");
                });
                $("#spnmsg2").fadeIn(2500, function () {
                    $("#spnmsg2").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg2").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopy2");
        }
    });

    $("[id='btnCopy2']").click(function () {
        if ($.browser.msie) {
            if (window.clipboardData) {
                window.clipboardData.setData('Text', $("#code").val());
                $("#spnmsg2").fadeOut(500, function () {
                    $("#spnmsg2").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg2").html("已将验证码 " + $("#code").val() + " 复制到剪贴板");
                });
                $("#spnmsg2").fadeIn(2500, function () {
                    $("#spnmsg2").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg2").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            }
        } else {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#code").val());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg2").fadeOut(500, function () {
                    $("#spnmsg2").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg2").html("已将验证码 " + text + " 复制到剪贴板");
                });
                $("#spnmsg2").fadeIn(2500, function () {
                    $("#spnmsg2").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg2").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopy2");
        }
    });

    $("#btnCopyName").mouseover(function () {
        if (!$.browser.msie) {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#name").html());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将收款人姓名 " + text + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopyName");
        }
    });

    $("#btnCopyName").click(function () {
        if ($.browser.msie) {
            if (window.clipboardData) {
                window.clipboardData.setData('Text', $("#name").html());
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将收款人姓名 " + $("#name").html() + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            }
        } else {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#name").html());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将收款人姓名 " + text + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopyName");
        }
    });

    $("#btnCopyCardNo").mouseover(function () {
        if (!$.browser.msie) {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#cardNo").html());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将银行卡号 " + text + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopyCardNo");
        } 
    });

    $("#btnCopyCardNo").click(function () {
        if ($.browser.msie) {
            if (window.clipboardData) {
                window.clipboardData.setData('Text', $("#cardNo").html());
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将银行卡号 " + $("#cardNo").html() + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            }
        } else {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#cardNo").html());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将银行卡号 " + text + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopyCardNo");
        }
    });

    $("#btnCopySubBank").mouseover(function () {
        if (!$.browser.msie) {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#subBank").html());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将开户网点 " + text + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopySubBank");
        }
    });

    $("#btnCopySubBank").click(function () {
        if ($.browser.msie) {
            if (window.clipboardData) {
                window.clipboardData.setData('Text', $("#subBank").html());
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将开户网点 " + $("#subBank").html() + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            }
        } else {
            clip = new ZeroClipboard.Client();
            clip.setHandCursor(true);
            clip.setText($("#subBank").html());
            clip.addEventListener('complete', function (client, text) {
                $("#spnmsg").fadeOut(500, function () {
                    $("#spnmsg").css("color", "red").css("font-weight", "bold").css("font-size", "14px;");
                    $("#spnmsg").html("已将开户网点 " + text + " 复制到剪贴板");
                });
                $("#spnmsg").fadeIn(2500, function () {
                    $("#spnmsg").css("color", "").css("font-weight", "").css("font-size", "");
                    $("#spnmsg").html("如果是网银转账,请在“备注”里面填写该验证码。");
                });
            });
            clip.glue("btnCopySubBank");
        }
    });

    $("#manualReset").click(function () {
        location.href = "/Member/Deposit";


        //        if ($("#imgProcess").is(":visible") == false && $("#btnSubmit").is(":visible") == true) {
        //            $("#hdbankinfor").val("");
        //            $("#hdcardmemo").val("");
        //            $("#name").html("");
        //            $("#tdcardNo").html("");
        //            $("#tdArea").html("");
        //            document.frmPayMoney.reset();
        //        }


        //        $("#banks").val("");
        //        $("#amount").val("");
        //        $("#cardHolder").html("");
        //        $("#area").html("");
        //        $("#bank").html("");
        //        $("#acctNum").html("");
    });

    // $("#manualReset").click(function(){
    //     $("#shortName").val('');
    //     $("#cardmemo").val('');
    //     $("#amount").val('');
    //     $("#receiver").val('');
    //     $("#sender").val('');
    //     $("#cardno").val('');
    //     $("#snapshot").val('');
    //     $("#code").val('');
    // });

    $("#manualDeposit").click(function () {

        $.ajax({
            type: "post",
            url: "/Member/Deposit",
            data: {
                bankCode: $("#shortName").val(),
                recCard: $("#cardmemo").val(),
                amount: $("#amount").val(),
                receiver: $("#receiver").val(),
                sender: $("#sender").val(),
                cardno: $("#cardno").val(),
                interbank: $("#interbank").prop("checked"),
                depositType: $("input[name='bank_account_type']:checked").val(),
                snapshotPath: $("#snapshot").val(),
                code: $("#code").val()
            },
            beforeSend: function () {
                jInformation("正在提交手工存款...", "手工存款");
            },
            complete: function () {

            },
            success: function (data) {

                if (data.IsLoggedIn == false) {
                    jAlert("登录超时，请重新登录", "登录超时", function () {
                        location.reload();
                    });
                } else {
                    if (data.Result == true) {
                        jAlert("手工存款提交成功", "手工存款", function () {
                            location.href = "/Member/Transactions";
                        });
                    } else {
                        jAlert(data.ResultMsg, "手工存款");
                    }
                }
            },
            error: function () {
            }
        });
    });
});