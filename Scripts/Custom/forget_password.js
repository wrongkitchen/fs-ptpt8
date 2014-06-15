$(document).ready(function(){
	$("#forget_password_email").submit(function(e){
		e.preventDefault();
		alert("密碼重置成功，新密碼已發送到您的郵箱，請注意查收！");
		alert("你已經通過驗證，請點擊確定後立即設置新密碼！");
		parent.$.colorbox.close();
		return false;
	});
});