$(document).ready(function () {
    // 取消秒冲订单
    $("[id^='cancelOrder_']").click(function () {
        var orderId = $(this).prop("id").replace("cancelOrder_", "");
        jConfirm("您确定要取消订单吗？", "取消订单", function (r) {
            if (r == true) {
                $.ajax({
                    type: "post",
                    url: "/Member/CancelRapidDepositOrder",
                    data: {
                        clientOrderId: orderId
                    },
                    beforeSend: function () {
                        jInformation("正在取消订单...", "取消订单");
                    },
                    complete: function () {
                    },
                    success: function (data) {
                        if (data.IsLoggedIn == false) {
                            jAlert("登录超时，请重新登录", "登录超时", function () {
                                location.reload();
                            });
                        } else {
                            jAlert(data.ResultMsg, "取消订单", function () {
                                location.reload();
                            });
                        }
                    },
                    error: function () {
                    }
                });
            }
        });
    });

    // 首存红利申请
    $("[id^='applyIDB_']").click(function () {
        var idbParams = $(this).prop("id").replace("applyIDB_", "");
        jConfirm("您确定要申请" + idbParams.split("_")[0] + "%红利吗？", "申请红利", function (r) {
            if (r == true) {
                $.ajax({
                    type: "post",
                    url: "/Member/ApplyForInitialDepositBonus",
                    data: {
                        transId: idbParams.split("_")[1],
                        idbType: idbParams.split("_")[0]
                    },
                    beforeSend: function () {
                        jInformation("正在申请" + idbParams.split("_")[0] + "%红利...", "申请红利");
                    },
                    complete: function () {
                    },
                    success: function (data) {
                        if (data.IsLoggedIn == false) {
                            jAlert("登录超时，请重新登录", "登录超时", function () {
                                location.reload();
                            });
                        } else {
                            jAlert(data.ResultMsg, "申请红利", function () {
                                location.href = "/Member/Bonuses";
                            });
                        }
                    },
                    error: function () {
                    }
                });
            }
        });
    });

    // 修改安全问题
    $("[id='Infosecurity']").click(function () {
        var txt = "修改";

        if (!$("#sq_old").val()) {
            txt = "添加";
        }
        jConfirm("您确定要" + txt + "密保问题吗？", "密保问题", function (r) {
            if (r == true) {
                $.ajax({
                    type: "post",
                    url: "/Member/Infosecurity",
                    data: {
                        sq_old: $("#sq_old").val(),
                        uan_old: $("#uan_old").val(),
                        sq_new: $("#sq_new").val(),
                        uan_new: $("#uan_new").val()
                    },
                    beforeSend: function () {
                        jInformation("正在保存...", "密保问题");
                    },
                    complete: function () {
                    },
                    success: function (data) {
                        if (data.IsLoggedIn == false) {
                            jAlert("登录超时，请重新登录", "登录超时", function () {
                                location.reload();
                            });
                        } else {
                            jAlert(data.ResultMsg, "密保问题", function () {
                                location.reload();
                            });
                        }
                    },
                    error: function () {
                    }
                });
            }
        });
    });

    $("[id='Infosubmit']").click(function () {
        jConfirm("您确定修改吗？", "修改资料", function (r) {
            if (r == true) {
                $.ajax({
                    type: "post",
                    url: "/Member/Info",
                    data: {
                        email: $("#email").val(),
                        qq: $("#qq").val()
                    },
                    beforeSend: function () {
                        jInformation("正在保存...", "修改资料");
                    },
                    complete: function () {
                    },
                    success: function (data) {
                        if (data.IsLoggedIn == false) {
                            jAlert("登录超时，请重新登录", "登录超时", function () {
                                location.reload();
                            });
                        } else {
                            jAlert(data.ResultMsg, "修改资料", function () {
                                location.reload();
                            });
                        }
                    },
                    error: function () {
                    }
                });
            }
        });
    });

    $("[id='passwordsubmit']").click(function () {
        jConfirm("您确定修改吗？", "修改资料", function (r) {
            if (r == true) {
                $.ajax({
                    type: "post",
                    url: "/Member/Infopassword",
                    data: {
                        password1: $("#password1").val(),
                        password2: $("#password2").val(),
                        password3: $("#password3").val()
                    },
                    beforeSend: function () {
                        jInformation("正在保存...", "修改资料");
                    },
                    complete: function () {
                    },
                    success: function (data) {
                        if (data.IsLoggedIn == false) {
                            jAlert("登录超时，请重新登录", "登录超时", function () {
                                location.reload();
                            });
                        } else {
                            jAlert(data.ResultMsg, "修改资料", function () {
                                location.reload();
                            });
                        }
                    },
                    error: function () {
                    }
                });
            }
        });
    });

    // 首存红利浮动提示
    $("[id^='applyIDB_10']").tipTip();
    $("[id^='applyIDB_20']").tipTip();
    $("[id^='applyIDB_30']").tipTip();


    // 设置手动/自动转账
    $("#auto_transfer").click(function () {
        setTransferType("auto");
    });
    $("#manual_transfer").click(function () {
        setTransferType("manual");
    });

    // 绑定银行卡
    $("#cities").cities({
        p_name: "province",
        c_name: "city",
        p_width: "100",
        c_width: "100",
        p_val: "",
        c_val: ""
    });

    $("#addBankAccount").click(function () {


        if ($("#province").val() == "") {
            jAlert("请选择省份", "新增银行卡");
            return false;
        }
        if ($("#city").val() == "") {
            jAlert("请选择市县", "新增银行卡");
            return false;
        }
        if ($("#shortName").val() == "") {
            jAlert("请选择开户银行", "新增银行卡");
            return false;
        }
        if ($("#bankBranch").val() == "") {
            jAlert("请输入支行", "新增银行卡");
            return false;
        }
        if ($("#bankAcct").val() == "") {
            jAlert("请输入银行卡号", "新增银行卡");
            return false;
        }
        if ($("#bankAcct_confirm").val() == "") {
            jAlert("请输入确认银行卡号", "新增银行卡");
            return false;
        }

        //-----------------------------------
        //sean@20140208
        function isnum(str) {
            var value = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            var intRegex = /^\d+$/;
            return (!intRegex.test(value))
        }
 
        function isIdCardalphanumber(str) {
            var result = str.match(/^[a-zA-Z0-9]+$/);
            if (result == null) {
                return false;
            }
            return true;
        }


        if (isnum($("#bankAcct").val())) {
            jAlert("银行卡号请输入数字", "新增银行卡");
            return false;
        }
        if (isnum($("#bankAcct_confirm").val())) {
            jAlert("银行卡号请输入数字", "新增银行卡");
            return false;
        }
        //-----------------------------------
        else {
            if ($("#bankAcct").val() != $("#bankAcct_confirm").val()) {
                jAlert("银行卡号输入不一致", "新增银行卡");
                return false;
            }
        }

        if ($("#idcard").val().length > 0) {
  
            if (!isIdCardalphanumber($("#idcard").val())) {
                jAlert("身份证请输入英文字母数字", "新增银行卡");
                return false;
            }
            else if ($("#idcard").val().length < 15 || $("#idcard").val().length > 18) {
                jAlert("身份证号位数不正确", "新增银行卡");
                return false;
            } 
        }

        $.ajax({
            type: "post",
            url: "/Member/AddUserBank",
            data: {
                province: $("#province").val(),
                city: $("#city").val(),
                shortName: $("#shortName").val(),
                bankBranch: $("#bankBranch").val(),
                bankAcct: $("#bankAcct").val(),
                bankAcct_confirm: $("#bankAcct_confirm").val(),
                idcard: $("#idcard").val()
            },
            beforeSend: function () {
                jInformation("正在新增银行卡...", "新增银行卡");
            },
            complete: function () {
            },
            success: function (data) {
                if (data.IsLoggedIn == false) {
                    jAlert("登录超时，请重新登录", "登录超时", function () {
                        location.reload();
                    });
                } else {
                    jAlert(data.ResultMsg, "新增银行卡", function () {
                        if (data.Result == true) {
                            location.reload();
                        }
                    });
                }
            },
            error: function () {
            }
        });
    });

    $('#banks').change(function () {
        var bankid = $(this).val();
        if (bankid == "") {
            $("#cardHolder").html("");
            $("#area").html("");
            $("#bank").html("");
            $("#acctNum").html("");
            return;
        }

        $.ajax({
            type: "post",
            url: "/Member/GetUserBank",
            data: {
                bankid: bankid
            },
            beforeSend: function () {
                jInformation("正在获取银行卡信息...", "取款");
            },
            complete: function () {
                $.alerts._hide();
            },
            success: function (data) {
                if (data.IsLoggedIn == false) {
                    jAlert("登录超时，请重新登录", "登录超时", function () {
                        location.reload();
                    });
                } else {
                    if (data.Result == true) {
                        $("#cardHolder").html(data.CardHolder);
                        $("#area").html(data.Area);
                        $("#bank").html(data.Bank);
                        $("#acctNum").html(data.AccountNumber);
                    } else {
                        jAlert("获取银行卡信息失败，请重试", "取款", function () {
                            location.reload();
                        });
                    }
                }
            },
            error: function () {
            }
        });
    });

    $("#submitWithdraw").click(function () {
        if ($("#banks").val() == "") {
            jAlert("请选择取款银行卡", "取款");
            return;
        }
        if ($("#amount").val() < 100 || $("#amount").val() == "") {
            jAlert("取款金额必须大于等于100元", "取款");
            return;
        }

        $.ajax({
            type: "post",
            url: "/Member/RequestWithdraw",
            data: {
                bankid: $("#banks").val(),
                amount: $("#amount").val()
            },
            beforeSend: function () {
                jInformation("正在提交取款请求...", "取款");
            },
            complete: function () {
            },
            success: function (data) {
                if (data.IsLoggedIn == false) {
                    jAlert("登录超时，请重新登录", "登录超时", function () {
                        location.reload();
                    });
                } else {
                    jAlert(data.ResultMsg, "取款", function () {
                        if (date.Result == true) {
                            location.href = "/Member/Transactions";
                        } else {
                            location.reload();
                        }
                    });
                }
            },
            error: function () {
            }
        });
    });
});

function setTransferType (type) {
    $.ajax({
        type: "post",
        url: "/Member/SetTransferType",
        data: {
            type: type
        },
        beforeSend: function () {
            jInformation("正在切换额度转移方式...", "额度转移方式");
        },
        complete: function () {
        },
        success: function (data) {
            if (data.IsLoggedIn == false) {
                jAlert("登录超时，请重新登录", "登录超时", function () {
                    location.reload();
                });
            } else {
                jAlert(data.ResultMsg, "额度转移方式", function () {
                    if (data.Result == true) {
                        location.reload();
                    }
                });
            }
        },
        error: function () {
        }
    });
}