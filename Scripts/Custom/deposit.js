$(function () {
    var imgServer = "http://182.16.1.194";
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
                snapshotPath: $("#snapshot").val()
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