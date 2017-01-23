$(document).ready(function(){
	var webData ={};
	webData.mlabApikey = "n6FXodWWCdM14KrePZHrRPPovbzboRn6";
	webData.loginerrortxt = "帳號或密碼錯誤，請重新輸入";
	webData.signerrortxt = "此帳號有人註冊過，請換一個帳號";
	webData.creatUsererrortxt = "請填寫完整資料";
	

	//Addlistener
	$('.login .submit').click(function(){userlogin($('.login .user_id').val(),$('.login .password').val());});
	

	$(window).load(function(){
		if(checkLogin()) userlogin($.cookie("useraccount"),$.cookie("userpassword"));
		else showLoading(false);
	});

	//Event
	function userlogin(_useraccount,_userpassword){
		var _url = 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/user?q={useraccount:"'+_useraccount+'",userpassword:"'+ _userpassword +'"}&apiKey='+ webData.mlabApikey;
		showLoading(true);
		$.ajax({
			url: _url,
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {
				webData.islogin = data;
				clearForm();
				afterLogin();				
			},error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function afterLogin(){
		if(webData.islogin!=''){			
			$.cookie("useraccount", webData.islogin[0].useraccount);
			$.cookie("userpassword", webData.islogin[0].userpassword);
			$.cookie("username", webData.islogin[0].username);
			window.location.href="main.html" + window.location.hash;
		}else{			
			showLoading(false);
			alert(webData.loginerrortxt);			
		}
	}
	function checkLogin(){
		var _t = false;
		if($.cookie("useraccount") && $.cookie("userpassword")) _t = true;
		return _t;
	}	
	function clearForm(){
		$('.login').find('input').val('');
	}	
	function showLoading(_t){
		if(_t) $('.loading').fadeIn();
		else $('.loading').fadeOut();
	}
	
})//ready end  
































































































