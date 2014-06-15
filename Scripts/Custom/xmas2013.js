
//Call by flash
function goPlay(type) {

    if ((type == 's' || type == 'm' || type == 'b') && validCookie != null )
    {
        if (type == 's' && !is_s) jAlert('您的姜饼额度不足！');
        else if (type == 'm' && !is_m) jAlert('您的姜饼额度不足！请试试其他礼盒');
        else if (type == 'b' && !is_b) jAlert('您的姜饼额度不足！请试试其他礼盒');
        else {

            var title = "姜饼开好礼！吴亚馨邀您共度圣诞周";

            //alert(type);
            //jAlert(validCookie, title); return;

           
            $.ajax({
                type: "post",
                url: "/Events/startPlay",
                data: {
                    boxType: type,
                    vCookie: validCookie
                },
                beforeSend: function () {
                    jInformation("正在开好礼...", title);
                },
                complete: function () {
                },
                success: function (data) {
                    if (data.IsLoggedIn == false) {
                        jAlert("登录超时，请重新登录", "登录超时", function () {
                            location.reload();
                        });
                    } 
                    else 
                    {
                        if (data.Result == true) {

                            jAlert(data.ResultMsg, title
                            , function () {
                                if (data.Result == true) {
                                    location.reload();
                                }
                            }
                            );
                        }
                        else {
                            jAlert("抽奖失败，请再试一次", title, function () {
                                location.reload();
                            });
                        }
                    }
                },
                error: function () {
                }
            });
        }

    }
    else
    {
        //return;
    }
     
   
    
    


}