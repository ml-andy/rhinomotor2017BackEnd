$(document).ready(function(){
	var webData ={};
	webData.wrp=$('.wrapper');
	webData.mlabApikey = "n6FXodWWCdM14KrePZHrRPPovbzboRn6";
	webData.imgurappid = "4dd8fdf80527e2a";
	webData.creatUsererrortxt = "請填寫完整資料";
	webData.motifyerrortxt = "上一筆資料還在修改中，請先完成上一筆修改再繼續。";
	var o = {
		wrp: $('.wrapper')
	}

	//init
	try{webData.nowpage = getUrlVars()['page'].replace('#access_token','');}
	catch(err){webData.nowpage = 1;}

	if(webData.wrp.hasClass('cars')) getDataCollection('carsPage',carsfunction);
	else showLoading(false);

	//Addlistener	
	// $("#indeximgInput").change(function(){indexreadURL(this,$(this),0);});
	// $("#indeximgInput2").change(function(){indexreadURL(this,$(this),1);});
	// $('.maingobtn').click(function(){insertmainPaper($(this).parent().attr('nam'));});
	// $('.gogamebtn').click(function(){insertgame();});
	$('.menua').click(function(){menuaclick($(this));});
	// $("#imgInput").change(function(){readURL(this,$(this));});
	// $("#newsimgInput").change(function(){newsreadURL(this,$(this),0);});
	// $("#newsimgInput2").change(function(){newsreadURL(this,$(this),1);});
	// $('.logoutbtn').click(function(){logout();});	
	// $(".new .gobtn").click(function(){insertPaper();});
	// o.menulispan.click(function(){
	// 	menulispanclick($(this));
	// });

	$(window).load(function(){
		if(checkLogin()){
			try{
				webData.imgurToken = window.location.href.split('#')[1].split('&')[0].replace('access_token=','');
				$('.userMenu .icon').html($.cookie("useraccount").substring(0, 1));
				$('.userMenu .name').html($.cookie("username"));
			}
			catch(err){
				window.location.href = 'https://api.imgur.com/oauth2/authorize?response_type=token&client_id='+webData.imgurappid;
			}												
		}
		else window.location.href="index.html" + window.location.hash;
	});

	//Event	
	function menulispanclick(_o){
		var _height = _o.height();
		if(_o.parent().hasClass('on')){
			_o.parent().removeClass('on');
		}else{
			_o.parent().addClass('on');
			_height = _o.height() + _o.parent().find('.box').outerHeight(true);
		}
		_o.parent().css('height',_height);
	}
	function carsfunction(data){
		o.nowData = data;
		//menulist
		$('.menua.on').replaceWith('<li><span>產品介紹</span><div class="box"></div></li>');
		for(i in data){
			$('.menu ul li .box').append('<a class="menuain" href="javascript:;" data-brands="'+i+'">'+data[i].brands+'</a>');
		}
		o.nowDataBrands = 0;
		o.menulispan = $(".wrapper .menu li").find('span');
		o.menulispan.click(function(){
			menulispanclick($(this));
		});
		o.menulispan.trigger('click');
		o.menulia = $(".wrapper .menu li").find('a');
		o.menulia.click(function(){
			afterinsertCarsdata($(this).attr('data-brands'));
		});
		$('.searchbox .submit').click(function(){
			showLoading(true);
			var _brands = $('.searchbox .addBrands').val();
			console.log($('.searchbox .addBrands').val());
			if(_brands!='' || _brands!=undefined) addCarsBrands(_brands);
			else{
				alert(webData.creatUsererrortxt);
				showLoading(false);
			}
		});

		if(getUrlVars()['brands']) o.nowDataBrands = getUrlVars()['brands'];
		else o.nowDataBrands = 0;

		//content list
		afterinsertCarsdata(o.nowDataBrands);
	}
	function afterinsertCarsdata(_n){
		var data = o.nowData;
		o.nowDataBrands = _n;
		$('.title').html(data[_n].brands+' 產品介紹');

		o.cot = $('.content .list ul');
		o.cot.html('');
		for(k in data[o.nowDataBrands].cars){
			o.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column name">'+data[o.nowDataBrands].cars[k].name+'</div><div class="column price">'+data[o.nowDataBrands].cars[k].price+'</div><div class="column date">'+data[o.nowDataBrands].cars[k].date+'</div><div class="column info">'+data[o.nowDataBrands].cars[k].info+'</div><div class="column infoAll">'+data[o.nowDataBrands].cars[k].infoAll+'</div><div class="column des">'+data[o.nowDataBrands].cars[k].des+'</div><div class="function"><a href="javascript:;">修改</a><a href="javascript:;">刪除</a></div></div><div class="secData"></div></li>');
			//equipped
			o.cot.find('li:last .secData').append('<div class="eqi"><div class="st">配備</div></div>');
			for(x in data[o.nowDataBrands].cars[k].equipped){
				o.cot.find('li:last .secData .eqi').append('<div class="equData"><span>'+data[o.nowDataBrands].cars[k].equipped[x]+'</span><div class="btn"><a href="javascript:;" class="modify">修改</a><a href="javascript:;" class="delet">刪除</a></div></div>');
			}
			//recommend
			var _txt ='否';
			if(data[o.nowDataBrands].cars[k].recommend) _txt = '是';
			o.cot.find('li:last .secData').append('<div class="recommend" data-recd="'+data[o.nowDataBrands].cars[k].recommend+'"><div class="st">推薦</div><span>'+_txt+'</span><div class="btn change">更改</div></div>');

			//carsImg
			o.cot.find('li:last .secData').append('<div class="carsImg"><div class="st">圖片</div></div>');
			for(x in data[o.nowDataBrands].cars[k].carsImg){
				o.cot.find('li:last .secData .carsImg').append('<div class="photoData"><div class="photo"><img src="'+data[o.nowDataBrands].cars[k].carsImg[x]+'"></div><div class="btn"><a href="javascript:;" class="modify">修改</a><a href="javascript:;" class="delet">刪除</a></div></div>');
			}
		}

		// $('.paper .delbtn').click(function(){	
		// 	if($(this).parent().find('.motify').hasClass('on')){
		// 		$(this).parent().find('.motify').removeClass('on');
		// 		motifyPaper(false,$(this).parent().parent().index(),$(this).parent().parent().parent().attr('num'));
		// 	}
		// 	else deletPaper($(this).parent().parent().index(),$(this).parent().parent().parent().attr('num'));			
		// });
		// $('.paper .motify').click(function(){			
		// 	if($(this).hasClass('on')){
		// 		$(this).removeClass('on');				
		// 		motifyPaperEnd($(this).parent().parent().index(),$(this).parent().parent().parent().attr('num'));
		// 	}
		// 	else{
		// 		$(this).addClass('on');
		// 		motifyPaper(true,$(this).parent().parent().index(),$(this).parent().parent().parent().attr('num'));
		// 	}
		// });
		$('.menu ul li .box a').removeClass('on').eq(o.nowDataBrands).addClass('on');
		showLoading(false);
	}
	function addCarsBrands(_brandsName){
		var user_data = {
			brands:_brandsName,
			cars:[]
		};
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/carsPage?apiKey='+ webData.mlabApikey,
			type: 'POST',
			contentType: 'application/json',
			data:JSON.stringify(user_data),
			success: function(data) {				
				alert('新增成功');
				window.location.reload();
				// console.log(window.location.href+'&brands='+o.nowDataBrands);
				// showloading(false);
			},error: function(xhr, textStatus, errorThrown) {           
				_o.removeClass('on');
				showloading(false);
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});

	}
	/*不要動*/
	
	function motifyPaper(_t,_n,_num){
		if(_t){
			if(webData.motifyPapering){
				alert(webData.motifyerrortxt);
				if(_num){
					for(var i = 0; i<$('ul').length;i++){
						if($('ul').eq(i).attr('num')==_num) $('ul').eq(i).find('li').eq(_n).find('.motify').removeClass('on');
					}
				}
				else $('ul li').eq(_n).find('.motify').removeClass('on');
				return;
			}
			else webData.motifyPapering=true;
		}else webData.motifyPapering=false;
		//About
		if(webData.wrp.hasClass('about')){
			var _tmp = $('.paper').eq(_num).find('li').eq(_n);
			if(_t){
				_tmp.find('.posttitle').html('<textarea>'+_tmp.find('.posttitle').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.postdes').html('<textarea>'+_tmp.find('.postdes').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.postphoto').prepend('<input type="file" name="file" id="imgInputMotify" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify"><span>點擊更換</span></label>');
				$("#imgInputMotify").change(function(){readURL(this,$(this));});
			}else{			
				_tmp.find('.posttitle').html(_tmp.find('.posttitle textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.postdes').html(_tmp.find('.postdes textarea').val().replace(/\n\r?/g, '<br>'));			
				_tmp.find('.postphoto').html('<img src="' + webData.newPaperdata[0].list[_n].pic + '">');
			}
		}
		//News
		else if(webData.wrp.hasClass('news')){
			var _tmp = $('.paper').find('li').eq(_n);
			if(_t){				
				_tmp.find('.newstitle').html('<textarea>'+_tmp.find('.newstitle').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.newsbword').html('<textarea>'+_tmp.find('.newsbword').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.newssword').html('<textarea>'+_tmp.find('.newssword').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.newsbpic').prepend('<input type="file" name="file" id="imgInputMotify" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify"><span>點擊更換</span></label>');
				$("#imgInputMotify").change(function(){readURL(this,$(this),0);});
				_tmp.find('.newsspic').prepend('<input type="file" name="file" id="imgInputMotify2" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify2"><span>點擊更換</span></label>');
				$("#imgInputMotify2").change(function(){readURL(this,$(this),1);});
			}else{			
				_tmp.find('.newstitle').html(_tmp.find('.newstitle textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.newsbword').html(_tmp.find('.newsbword textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.newssword').html(_tmp.find('.newssword textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.newsbpic').html('<img src="' + webData.newPaperdata[_n].bpic + '">');
				_tmp.find('.newsspic').html('<img src="' + webData.newPaperdata[_n].spic + '">');				
			}
		}
		//learn
		else if(webData.wrp.hasClass('learn')){
			var _tmp = $('.paper').eq(_num).find('li').eq(_n);
			if(_t){
				if(_num==0){
					_tmp.find('.posttitle').html('<textarea>'+_tmp.find('.posttitle').html().replace(/<br>/g,'\n')+'</textarea>');
					_tmp.find('.postdes').html('<textarea>'+_tmp.find('.postdes').html().replace(/<br>/g,'\n')+'</textarea>');					
				}
				_tmp.find('.postphoto').prepend('<input type="file" name="file" id="imgInputMotify" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify"><span>點擊更換</span></label>');
				$("#imgInputMotify").change(function(){readURL(this,$(this));});				
			}else{	
				_tmp.find('.postphoto').html('<img src="' + webData.learndata[1][_n].pic + '">');
			}
		}
		//link
		else if(webData.wrp.hasClass('link')){
			var _tmp = $('.paper li').eq(_n);			
			if(_t){				
				_tmp.find('.posttitle').html('<textarea>'+_tmp.find('.posttitle a').html()+'</textarea>');								
				_tmp.find('.postphoto').prepend('<input type="file" name="file" id="imgInputMotify" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify"><span>點擊更換</span></label>');
				$("#imgInputMotify").change(function(){readURL(this,$(this));});				
			}else{	
				_tmp.find('.posttitle').html('<a href="'+webData.newPaperdata[_n].link+'">'+webData.newPaperdata[_n].link+'</a>');
				_tmp.find('.postphoto').html('<img src="' + webData.newPaperdata[_n].pic + '">');
			}
		}	
		//contact
		else if(webData.wrp.hasClass('contact')){
			if(_t) $('.paper_addr li').eq(_n).find('.posttitle').html('<textarea>'+ $('.paper_addr li').eq(_n).find('.posttitle').html().replace(/<br>/g,'\n')+'</textarea>');
			else $('.paper_addr li').eq(_n).find('.posttitle').html(webData.learndata[_num][_n].addr);
		}	
		//index
		else if(webData.wrp.hasClass('index')){
			if(webData.learndata[_num].collectname=="index_banner"){
				var _tmp = $('.paper.banner li').eq(_n);
				if(_t){
					_tmp.find('.postphoto').prepend('<input type="file" name="file" id="imgInputMotify" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify"><span>點擊更換</span></label>');
					$("#imgInputMotify").change(function(){readURL(this,$(this),0);});				
				}else{						
					_tmp.find('.postphoto').html('<img src="' + webData.learndata[_num][_n].pic + '">');
				}
			}
			else if(webData.learndata[_num].collectname=="index_photo"){
				var _tmp = $('.paper.photo li').eq(_n);
				if(_t){
					_tmp.find('.postphoto').prepend('<input type="file" name="file" id="imgInputMotify2" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify2"><span>點擊更換</span></label>');
					$("#imgInputMotify2").change(function(){readURL(this,$(this),1);});				
				}else{	
					_tmp.find('.postphoto').html('<img src="' + webData.learndata[_num][_n].pic + '">');
				}
			}
			else if(webData.learndata[_num].collectname=="index_video"){
				var _tmp = $('.paper.video li').eq(_n);
				if(_t){
					_tmp.find('.posttitle').html('<textarea>'+_tmp.find('.posttitle a').html()+'</textarea>');
				}else{	
					_tmp.find('.posttitle').html('<a href="'+webData.learndata[_num][_n].video+'">'+webData.learndata[_num][_n].video+'</a>');					
				}
			}			
		}				
	}
	function motifyPaperEnd(_n,_num){		
		showLoading(true);
		//About
		if(webData.wrp.hasClass('about')){
			webData._n = _n;
			webData._num = _num;
			if($('.paper').eq(_num).find('li').eq(_n).find('.postphoto').find('img').hasClass('on')) uploadimgtoImgur(webData.uploadImg,motifyPaperFinal);
			else{
				webData.uploadImgTrue = $('.paper').eq(_num).find('li').eq(_n).find('.postphoto').find('img').attr('src');
				motifyPaperFinal();
			}
		}
		//News
		else if(webData.wrp.hasClass('news')){
			webData._n = _n;
			webData.newspiccheck=0;
			if($('.paper').find('li').eq(_n).find('.newsbpic').find('img').hasClass('on')) uploadimgtoImgur(webData.uploadImgbpic,motifyPaperFinal,0);
			else{webData.newspiccheck+=1; webData.uploadImgbpic = $('.paper').find('li').eq(_n).find('.newsbpic').find('img').attr('src');}
			if($('.paper').find('li').eq(_n).find('.newsspic').find('img').hasClass('on')) uploadimgtoImgur(webData.uploadImgspic,motifyPaperFinal,1);
			else{webData.newspiccheck+=1; webData.uploadImgspic = $('.paper').find('li').eq(_n).find('.newsspic').find('img').attr('src');}
			motifyPaperFinal();
		}
		//learn
		else if(webData.wrp.hasClass('learn')){
			webData._n = _n;
			webData._num = _num;
			if($('.paper').eq(_num).find('li').eq(_n).find('.postphoto').find('img').hasClass('on')) uploadimgtoImgur(webData.uploadImg,motifyPaperFinal);
			else{
				webData.uploadImgTrue = $('.paper').eq(_num).find('li').eq(_n).find('.postphoto').find('img').attr('src');
				motifyPaperFinal();
			}
		}
		//link
		else if(webData.wrp.hasClass('link')){
			webData._n = _n;			
			if($('.paper li').eq(_n).find('.postphoto').find('img').hasClass('on')) uploadimgtoImgur(webData.uploadImg,motifyPaperFinal);
			else{
				webData.uploadImgTrue = $('.paper li').eq(_n).find('.postphoto').find('img').attr('src');
				motifyPaperFinal();
			}
		}
		//contact
		else if(webData.wrp.hasClass('contact')){
			webData._n = _n;	
			webData._num = _num;			
			motifyPaperFinal();			
		}
		//index
		else if(webData.wrp.hasClass('index')){
			webData._n = _n;	
			webData._num = _num;
			if(webData.learndata[webData._num].collectname == "index_banner"){
				if($('.paper.banner li').eq(webData._n).find('.postphoto').find('img').hasClass('on')) uploadimgtoImgur(webData.uploadImgindexbannerpic,motifyPaperFinal);
				else{
					webData.uploadImgTrue = $('.paper.banner li').eq(webData._n).find('.postphoto').find('img').attr('src');
					motifyPaperFinal();
				}
			}
			else if(webData.learndata[webData._num].collectname == "index_photo"){
				if($('.paper.photo li').eq(webData._n).find('.postphoto').find('img').hasClass('on')) uploadimgtoImgur(webData.uploadImgindexphotopic,motifyPaperFinal);
				else{
					webData.uploadImgTrue = $('.paper.photo li').eq(webData._n).find('.postphoto').find('img').attr('src');
					motifyPaperFinal();
				}
			}
			else if(webData.learndata[webData._num].collectname == "index_video"){				
				motifyPaperFinal();
			}
		}
	}	
	function motifyPaperFinal(){
		if(webData.wrp.hasClass('about')){
			if(webData._num==0){
				webData.newPaperdata[0].title = $('.paper').eq(webData._num).find('li').eq(webData._n).find('.posttitle').find('textarea').val().replace(/\n\r?/g, '<br>');
				webData.newPaperdata[0].info = $('.paper').eq(webData._num).find('li').eq(webData._n).find('.postdes').find('textarea').val().replace(/\n\r?/g, '<br>');
				webData.newPaperdata[0].cover = webData.uploadImgTrue;			
			}else if(webData._num==1){
				webData.newPaperdata[0].list[webData._n].name = $('.paper').eq(webData._num).find('li').eq(webData._n).find('.posttitle').find('textarea').val().replace(/\n\r?/g, '<br>');
				webData.newPaperdata[0].list[webData._n].des = $('.paper').eq(webData._num).find('li').eq(webData._n).find('.postdes').find('textarea').val().replace(/\n\r?/g, '<br>');
				webData.newPaperdata[0].list[webData._n].pic = webData.uploadImgTrue;			
			}
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/aboutus_page'+webData.nowpage+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(webData.newPaperdata),
				success: function(data) {
					getDataCollection('aboutus_page',aboutfunction);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('news')){
			if(webData.newspiccheck<2) return;
			webData.newPaperdata[webData._n].title = $('.paper').find('li').eq(webData._n).find('.newstitle').find('textarea').val().replace(/\n\r?/g, '<br>');
			webData.newPaperdata[webData._n].spic = webData.uploadImgspic;
			webData.newPaperdata[webData._n].bpic = webData.uploadImgbpic;
			webData.newPaperdata[webData._n].date = new Date().getFullYear()+"/"+ (new Date().getMonth()*1+1) + "/"+new Date().getDate() + "星期"+changeDay(new Date().getDay());
			webData.newPaperdata[webData._n].sword = $('.paper').find('li').eq(webData._n).find('.newssword').find('textarea').val().replace(/\n\r?/g, '<br>');
			webData.newPaperdata[webData._n].bword = $('.paper').find('li').eq(webData._n).find('.newsbword').find('textarea').val().replace(/\n\r?/g, '<br>');
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/news_page'+webData.nowpage+'/'+webData.newPaperdata[webData._n]._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(webData.newPaperdata[webData._n]),
				success: function(data) {
					getDataCollection('news_page',newsfunction);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('learn')){
			if(webData._num==0){
				webData.learndata[0][0].classinfo = $('.paper').eq(webData._num).find('li').eq(webData._n).find('.posttitle').find('textarea').val().replace(/\n\r?/g, '<br>');
				webData.learndata[0][0].classdes = $('.paper').eq(webData._num).find('li').eq(webData._n).find('.postdes').find('textarea').val().replace(/\n\r?/g, '<br>');
				webData.learndata[0][0].photo = webData.uploadImgTrue;
				webData.learndata[0][0].title = webData.learndata[0][0].title;
				console.log(webData.learndata[0][0].title);
				$.ajax({
					url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/learning_page'+webData.nowpage+'?apiKey='+ webData.mlabApikey,
					type: 'PUT',
					contentType: 'application/json',
					data:JSON.stringify(webData.learndata[0]),
					success: function(data) {
						location.reload();
					},error: function(xhr, textStatus, errorThrown) {             
						console.log("error:", xhr, textStatus, errorThrown);
					}
				});
			}else if(webData._num==1){
				webData.learndata[1][webData._n].pic = webData.uploadImgTrue;
				$.ajax({
					url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/learning_photo_page'+webData.nowpage+'?apiKey='+ webData.mlabApikey,
					type: 'PUT',
					contentType: 'application/json',
					data:JSON.stringify(webData.learndata[1]),
					success: function(data) {
						location.reload();
					},error: function(xhr, textStatus, errorThrown) {             
						console.log("error:", xhr, textStatus, errorThrown);
					}
				});
			}			
		}
		else if(webData.wrp.hasClass('link')){			
			webData.newPaperdata[webData._n].link = $('.paper li').eq(webData._n).find('.posttitle textarea').val();
			webData.newPaperdata[webData._n].pic = webData.uploadImgTrue;			
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/otherlink'+webData.nowpage+'/'+webData.newPaperdata[webData._n]._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(webData.newPaperdata[webData._n]),
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});	
		}
		else if(webData.wrp.hasClass('contact')){
			webData.learndata[webData._num][webData._n].addr = $('.paper_addr li').eq(webData._n).find('.posttitle textarea').val();
			if(!webData.learndata[webData._num][webData._n].addr){alert(webData.creatUsererrortxt);return;}
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/contactus'+webData.nowpage+'/'+webData.learndata[webData._num][webData._n]._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(webData.learndata[webData._num][webData._n]),
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});	
		}
		else if(webData.wrp.hasClass('index')){			
			if(webData.learndata[webData._num].collectname == "index_banner"){
				webData.learndata[webData._num][webData._n].pic = webData.uploadImgTrue;				
				$.ajax({
					url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/index_banner'+webData.nowpage+'/'+webData.learndata[webData._num][webData._n]._id.$oid+'?apiKey='+ webData.mlabApikey,
					type: 'PUT',
					contentType: 'application/json',
					data:JSON.stringify(webData.learndata[webData._num][webData._n]),
					success: function(data) {
						location.reload();
					},error: function(xhr, textStatus, errorThrown) {
						console.log("error:", xhr, textStatus, errorThrown);
					}
				});
			}
			else if(webData.learndata[webData._num].collectname == "index_photo"){
				webData.learndata[webData._num][webData._n].pic = webData.uploadImgTrue;				
				$.ajax({
					url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/index_photo'+webData.nowpage+'/'+webData.learndata[webData._num][webData._n]._id.$oid+'?apiKey='+ webData.mlabApikey,
					type: 'PUT',
					contentType: 'application/json',
					data:JSON.stringify(webData.learndata[webData._num][webData._n]),
					success: function(data) {
						location.reload();
					},error: function(xhr, textStatus, errorThrown) {
						console.log("error:", xhr, textStatus, errorThrown);
					}
				});
			}
			else if(webData.learndata[webData._num].collectname == "index_video"){				
				webData.learndata[webData._num][webData._n].video = $('.paper.video li').eq(webData._n).find('.posttitle textarea').val();
				if(!webData.learndata[webData._num][webData._n].video){alert(webData.creatUsererrortxt);return;}
				$.ajax({
					url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/index_video'+webData.nowpage+'/'+webData.learndata[webData._num][webData._n]._id.$oid+'?apiKey='+ webData.mlabApikey,
					type: 'PUT',
					contentType: 'application/json',
					data:JSON.stringify(webData.learndata[webData._num][webData._n]),
					success: function(data) {
						location.reload();
					},error: function(xhr, textStatus, errorThrown) {
						console.log("error:", xhr, textStatus, errorThrown);
					}
				});
			}
		}
	}
	function deletPaper(_n,_num){
		showLoading(true);
		if(webData.wrp.hasClass('about')){
			webData.newPaperdata[0].list.splice(_n,1);
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/aboutus_page'+webData.nowpage+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(webData.newPaperdata),
				success: function(data) {
					getDataCollection('aboutus_page',aboutfunction);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}		
		else if(webData.wrp.hasClass('news')){
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/news_page'+webData.nowpage+'/'+webData.newPaperdata[_n]._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: "DELETE",
				async: true,
				timeout: 300000,
				contentType: 'application/json',			
				success: function(data) {
					getDataCollection('news_page',newsfunction);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('learn')){
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/learning_photo_page'+webData.nowpage+'/'+webData.learndata[_num][_n]._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: "DELETE",
				async: true,
				timeout: 300000,
				contentType: 'application/json',			
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('link')){
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/otherlink'+webData.nowpage+'/'+webData.newPaperdata[_n]._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: "DELETE",
				async: true,
				timeout: 300000,
				contentType: 'application/json',			
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('contact')){
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/emailbox'+webData.nowpage+'/'+webData.learndata[_num][_n]._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: "DELETE",
				async: true,
				timeout: 300000,
				contentType: 'application/json',			
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('index')){
			var _url;
			if(webData.learndata[_num].collectname=="index_banner"){
				_url = 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/index_banner'+webData.nowpage+'/'+webData.learndata[_num][_n]._id.$oid+'?apiKey='+ webData.mlabApikey;
			}
			else if(webData.learndata[_num].collectname=="index_photo"){
				_url = 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/index_photo'+webData.nowpage+'/'+webData.learndata[_num][_n]._id.$oid+'?apiKey='+ webData.mlabApikey;
			}
			else if(webData.learndata[_num].collectname=="index_video"){
				_url = 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/index_video'+webData.nowpage+'/'+webData.learndata[_num][_n]._id.$oid+'?apiKey='+ webData.mlabApikey;
			}			
			$.ajax({
				url: _url,
				type: "DELETE",
				async: true,
				timeout: 300000,
				contentType: 'application/json',			
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
	}
	function indexreadURL(input,_o,_n){
		if (input.files && input.files[0]) {
            var reader = new FileReader();            
            reader.onload = function (e) {
            	if(_n == 0) webData.indexbanneruploadImg = e.target.result.replace(/.*,/, '');
            	else webData.indexphotouploadImg = e.target.result.replace(/.*,/, '');	            	
            	_o.parent().addClass('on').find('img').addClass('on').attr('src',e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
	}
	function newsreadURL(input,_o,_n){
		if (input.files && input.files[0]) {
            var reader = new FileReader();            
            reader.onload = function (e) {
            	if(_n == 0) webData.newsuploadImgbpic = e.target.result.replace(/.*,/, '');
            	else webData.newsuploadImgspic = e.target.result.replace(/.*,/, '');	            	
            	_o.parent().addClass('on').find('img').addClass('on').attr('src',e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
	}
	function readURL(input,_o,_n) {
		if(webData.wrp.hasClass('about') || webData.wrp.hasClass('learn') || webData.wrp.hasClass('link')){
			if (input.files && input.files[0]) {
	            var reader = new FileReader();            
	            reader.onload = function (e) {
	            	webData.uploadImg = e.target.result.replace(/.*,/, '');
	            	_o.parent().addClass('on').find('img').addClass('on').attr('src',e.target.result);
	            }
	            reader.readAsDataURL(input.files[0]);
	        }
		}
		else if(webData.wrp.hasClass('news')){
			if (input.files && input.files[0]) {
	            var reader = new FileReader();            
	            reader.onload = function (e) {
	            	if(_n == 0) webData.uploadImgbpic = e.target.result.replace(/.*,/, '');
	            	else webData.uploadImgspic = e.target.result.replace(/.*,/, '');	            	
	            	_o.parent().addClass('on').find('img').addClass('on').attr('src',e.target.result);
	            }
	            reader.readAsDataURL(input.files[0]);
	        }
		}
		else if(webData.wrp.hasClass('index')){
			if (input.files && input.files[0]) {
	            var reader = new FileReader();            
	            reader.onload = function (e) {
	            	if(_n == 0) webData.uploadImgindexbannerpic = e.target.result.replace(/.*,/, '');
	            	else webData.uploadImgindexphotopic = e.target.result.replace(/.*,/, '');	            	
	            	console.log(_o.parent().addClass('on').find('img').addClass('on'));
	            	_o.parent().addClass('on').find('img').addClass('on').attr('src',e.target.result);
	            }
	            reader.readAsDataURL(input.files[0]);
	        }
		}        
    }
	function insertPaper(){
		if(webData.wrp.hasClass('about')){
			webData.posttitleval = $('.new .posttitle').val();
			webData.postdesval = $('.new .postdes').val();
			if(!webData.posttitleval || !webData.postdesval){
				alert(webData.creatUsererrortxt);
				return;
			}
			showLoading(true);
			if(webData.uploadImg){
				uploadimgtoImgur(webData.uploadImg,insertPaperEnd);
			}
			else insertPaperEnd();	
		}
		else if(webData.wrp.hasClass('news')){
			webData.insertdata = {
				title:$('.new .newstitle').val().replace(/\n\r?/g, '<br>'),
				date:new Date().getFullYear()+"/"+ (new Date().getMonth()*1+1) + "/"+new Date().getDate() + "星期"+changeDay(new Date().getDay()),
				sword:$('.new .newssword').val().replace(/\n\r?/g, '<br>'),
				bword:$('.new .newsbword').val().replace(/\n\r?/g, '<br>')
			};
			
			if(!webData.insertdata.title || !webData.insertdata.sword || !webData.insertdata.bword){
				alert(webData.creatUsererrortxt);
				return;
			}
			showLoading(true);
			webData.newsinsertpiccheck =0;
			if(webData.newsuploadImgbpic) newsuploadimgtoImgur(webData.newsuploadImgbpic,insertPaperEnd,0);
			else{webData.newsinsertpiccheck+=1;webData.newsuploadImgbpic = 'images/space.png';}
			if(webData.newsuploadImgspic) newsuploadimgtoImgur(webData.newsuploadImgspic,insertPaperEnd,1);
			else{webData.newsinsertpiccheck+=1;webData.newsuploadImgspic = 'images/space.png';}
			insertPaperEnd();
		}
		else if(webData.wrp.hasClass('learn')){
			showLoading(true);
			if(webData.uploadImg) uploadimgtoImgur(webData.uploadImg,insertPaperEnd);
			else alert(webData.creatUsererrortxt);
		}
		else if(webData.wrp.hasClass('link')){
			showLoading(true);
			webData.insertdata={link: $('.new .posttitle').val()};
			if(!webData.insertdata.link){alert(webData.creatUsererrortxt);return;}
			if(webData.uploadImg) uploadimgtoImgur(webData.uploadImg,insertPaperEnd);
			else alert(webData.creatUsererrortxt);
		}
	}	
	function insertPaperEnd(){		
		if(webData.wrp.hasClass('about')){
			webData.newPaperdata[0].list.push({
				name:webData.posttitleval.replace(/\n\r?/g, '<br>'),
				des:webData.postdesval.replace(/\n\r?/g, '<br>'),
				pic:webData.uploadImgTrue,
			});
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/aboutus_page'+webData.nowpage+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(webData.newPaperdata),
				success: function(data) {
					clearForm();
					getDataCollection('aboutus_page',aboutfunction);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('news')){
			if(webData.newsinsertpiccheck<2) return;
			webData.insertdata.bpic = webData.newsuploadImgbpic;
			webData.insertdata.spic = webData.newsuploadImgspic;
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/news_page'+webData.nowpage+'?apiKey='+ webData.mlabApikey,
				type: 'POST',
				contentType: 'application/json',
				data:JSON.stringify(webData.insertdata),
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('learn')){
			webData.insertdata={pic:webData.uploadImgTrue};
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/learning_photo_page'+webData.nowpage+'?apiKey='+ webData.mlabApikey,
				type: 'POST',
				contentType: 'application/json',
				data:JSON.stringify(webData.insertdata),
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('link')){
			webData.insertdata.pic=webData.uploadImgTrue;
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/otherlink'+webData.nowpage+'?apiKey='+ webData.mlabApikey,
				type: 'POST',
				contentType: 'application/json',
				data:JSON.stringify(webData.insertdata),
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
	}	
	function newsuploadimgtoImgur(_imgurl,callback,_n){
		$.ajax({
            url: 'https://api.imgur.com/3/image',
            method: 'POST',
            headers: {
              Authorization: 'Bearer '+webData.imgurToken,
              Accept: 'application/json'
            },
            data: {
              image: _imgurl,
              type: 'base64'
            },
            success: function(result) {            	
            	if(webData.wrp.hasClass('news')){
            		webData.newsinsertpiccheck+=1;
            		if(_n==0) webData.newsuploadImgbpic = result.data.link;
            		else webData.newsuploadImgspic = result.data.link;
            	}
            	callback();
            },error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
				window.location.href = 'https://api.imgur.com/oauth2/authorize?response_type=token&client_id='+webData.imgurappid;
			}
        });        
	}
	function uploadimgtoImgur(_imgurl,callback,_n){
		$.ajax({
            url: 'https://api.imgur.com/3/image',
            method: 'POST',
            headers: {
              Authorization: 'Bearer '+webData.imgurToken,
              Accept: 'application/json'
            },
            data: {
              image: _imgurl,
              type: 'base64'
            },
            success: function(result) {
            	if(webData.wrp.hasClass('about') || webData.wrp.hasClass('learn') || webData.wrp.hasClass('link') || webData.wrp.hasClass('index')) webData.uploadImgTrue = result.data.link;
            	if(webData.wrp.hasClass('news')){
            		webData.newspiccheck+=1;
            		if(_n==0) webData.uploadImgbpic = result.data.link;
            		else webData.uploadImgspic = result.data.link;
            	}
            	callback();
            },error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
				window.location.href = 'https://api.imgur.com/oauth2/authorize?response_type=token&client_id='+webData.imgurappid;
			}
        });        
	}
	function getDataCollection(_collectname,_callback){
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+_collectname+'?s={"_id":-1}&apiKey='+ webData.mlabApikey,
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {
				webData.newPaperdata = data;
				_callback(data);
			},error: function(xhr, textStatus, errorThrown) {
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function getDataLearnCollection(_collectname,_callback){
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/'+_collectname+webData.nowpage+'?s={"_id":-1}&apiKey='+ webData.mlabApikey,
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {
				webData.learndata.push(data);
				webData.learndata[webData.learndata.length-1].collectname = _collectname;
				_callback();
			},error: function(xhr, textStatus, errorThrown) {
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function changeDay(_d){		
		if(_d==0) _d="日";
		else if(_d==1) _d="一";
		else if(_d==2) _d="二";
		else if(_d==3) _d="三";
		else if(_d==4) _d="四";
		else if(_d==5) _d="五";
		else if(_d==6) _d="六";
		return _d;
	}
	function menuaclick(_o){
		window.location.href = _o.attr('data-page') + "#access_token=" + window.location.href.split('#access_token=')[1];
	}
	function logout(){
		$.cookie("useraccount", '');
		$.cookie("userpassword", '');
		window.location.href="index.html";
	}	
	function checkLogin(){
		var _t = false;
		if($.cookie("useraccount") && $.cookie("userpassword")) _t = true;
		return _t;
	}
	function clearForm(){
		webData.posttitleval = '';
		webData.nowtime = '';
		webData.postdesval = '';
		webData.uploadImg='';
		webData.uploadImgTrue='';
		$('.new .posttitle').val('');
		$('.new .postdes').val('');
		$('.new .addImg').removeClass('on').find('img').attr('src','');		
	}	
	function showLoading(_t){
		if(_t) $('.loading').fadeIn();
		else{
			if(!$('.loading').hasClass('on')) $('.loading').addClass('on');
			$('.loading').fadeOut();
		}
	}
	
})//ready end  
function getUrlVars(){
  var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
  for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1]}
  return vars
}
