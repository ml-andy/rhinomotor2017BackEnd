$(document).ready(function(){
	var webData ={};
	webData.wrp=$('.wrapper');
	webData.mlabApikey = "n6FXodWWCdM14KrePZHrRPPovbzboRn6";
	webData.imgurappid = "4dd8fdf80527e2a";
	webData.creatUsererrortxt = "請填寫完整資料";
	webData.motifyerrortxt = "上一筆資料還在修改中，請先完成上一筆修改再繼續。";
	var o = {
		wrp: $('.wrapper'),
		defaultCarsImg:'https://ml-andy.github.io/RhinoMotor/andy/images/cars_content_pic1.jpg',
		defaultPressImg:'https://ml-andy.github.io/RhinoMotor/andy/images/press_b_slide1.jpg',
		UploadImg:'',
		indexUploadImg:''
	}

	//init
	try{webData.nowpage = getUrlVars()['page'].replace('#access_token','');}
	catch(err){webData.nowpage = 1;}

	if(webData.wrp.hasClass('cars')){
		o.nowPage = 'carsPage';
		getDataCollection(o.nowPage,carsfunction);
	}
	else if(webData.wrp.hasClass('press')){
		o.nowPage = 'pressPage';
		getDataCollection(o.nowPage,pressfunction);
	}
	else if(webData.wrp.hasClass('main')){
		o.nowPage = 'indexBanner';
		getDataCollection(o.nowPage,mainfunction);
	}
	else showLoading(false);

	//Addlistener
	$('.logoutbtn').click(function(){
		logout();
	})
	$('.menua').click(function(){menuaclick($(this));});
	$('.searchbox .submit').click(function(){
		showLoading(true);
		var _brands = $('.searchbox .addBrands').val();
		if(_brands!='' || _brands!=undefined) addBrands(o.nowPage,_brands);
		else{
			alert(webData.creatUsererrortxt);
			showLoading(false);
		}
	});
	$('.deleteBrands').click(function(){
		if(window.confirm("確定刪除嗎?")) deletBrands(o.nowPage,o.nowDataBrands);
	});
	$('.addbox .submit').click(function(){
		addPaper();
	});
	

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
	function mainfunction(data,nowDataBrands){
		o.nowData = data;
		webData.motifyPapering = false;
		$(".indexImgInput").change(function(){ReadURL(this);});
		
		//content list
		insertMaindata();
	}
	function insertMaindata(){
		var data = o.nowData;
		o.cot = $('.content .list ul');
		o.cot.html('');
		for(k in data){
			o.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column photo main"><img src="'+ data[k].photo+'"></div><div class="column bTitle">'+ data[k].bTitle +'</div><div class="column sTitle">'+ data[k].sTitle+'</div><div class="column href">'+ data[k].href+'</div><div class="column textColor">'+data[k].textColor+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>');
		}
		$('.function .delete').click(function(){			
			if($(this).parent().find('.motify').hasClass('on')){
				$(this).parent().find('.motify').removeClass('on');
				motifyPaper(false,$(this).parent().parent().find('.slbox').text());
			}
			else{
				if(window.confirm("確定刪除嗎?")) deletPaper($(this).parent().parent().find('.slbox').text());
			}
		});
		
		$('.function .motify').click(function(){			
			if($(this).hasClass('on')){
				$(this).removeClass('on');				
				motifyPaperEnd($(this).parent().parent().find('.slbox').text());
			}
			else{
				$(this).addClass('on');
				motifyPaper(true,$(this).parent().parent().find('.slbox').text());
			}
		});
		

		// //recommend
		// $('.recommend .change').click(function(){
		// 	showLoading(true);
		// 	changeRecommend($(this).parent().parent().parent().find('.slbox').text())
		// });

		// //photo
		// $(".pressImgInput").change(function(){ReadURL(this);});
		// $('.addImgBox .submit').click(function(){
		// 	if(o.UploadImg==''){
		// 		alert('請先選擇檔案');
		// 		return;
		// 	}
		// 	showLoading(true);
		// 	o.nowUploadImgNum = $(this).parent().parent().parent().parent().find('.slbox').text();
		// 	uploadimgtoImgur(o.UploadImg,insertImg);
		// });
		// $('.photoDataBox .delet').click(function(){
		// 	if(window.confirm('確定刪除?')){
		// 		showLoading(true);
		// 		deleteImg($(this).parent().parent().index(),$(this).parent().parent().parent().parent().parent().parent().find('.slbox').text())
		// 	}
		// });

		showLoading(false);
	}
	function pressfunction(data,nowDataBrands){
		o.nowData = data;
		webData.motifyPapering = false;
		//menulist
		$('.menua.on').replaceWith('<li><span>最新消息</span><div class="box"></div></li>');
		$('.menu ul li .box').html('');
		for(i in data){
			$('.menu ul li .box').append('<a class="menuain" href="javascript:;" data-brands="'+i+'">'+data[i].brands+'</a>');
		}
		o.menulispan = $(".wrapper .menu li").find('span');
		o.menulispan.click(function(){
			menulispanclick($(this));
		});
		if(!o.menulispan.parent().hasClass('on')) o.menulispan.trigger('click');
		o.menulia = $(".wrapper .menu li").find('a');
		o.menulia.click(function(){
			insertPressdata($(this).attr('data-brands'));
		});

		//content list
		insertPressdata(nowDataBrands);
	}
	function insertPressdata(_n){
		var data = o.nowData;
		o.nowDataBrands = _n;
		$('.title').html(data[_n].brands);

		o.cot = $('.content .list ul');
		o.cot.html('');
		for(k in data[o.nowDataBrands].press){
			o.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column date">'+data[o.nowDataBrands].press[k].date+'</div><div class="column mainTitle">'+data[o.nowDataBrands].press[k].title+'</div><div class="column mainContent">'+data[o.nowDataBrands].press[k].content+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>');

			//recommend
			var _txt ='否';
			if(data[o.nowDataBrands].press[k].recommend) _txt = '是';
			o.cot.find('li:last .secData').append('<div class="recommend" data-recd="'+data[o.nowDataBrands].press[k].recommend+'"><div class="st">推薦</div><span>'+_txt+'</span><div class="btn change">更改</div></div>');

			//photo
			o.cot.find('li:last .secData').append('<div class="pressImg"><div class="st">圖片</div><div class="addImgBox"><input type="file" name="file" class="pressImgInput" accept="image/*" capture="camera"><div class="submit">確定新增</div></div><div class="photoDataBox"></div></div>');
			for(x in data[o.nowDataBrands].press[k].photo){
				o.cot.find('li:last .secData .pressImg .photoDataBox').append('<div class="photoData"><div class="photo"><img src="'+data[o.nowDataBrands].press[k].photo[x]+'"></div><div class="btn"><a href="javascript:;" class="delet"></a></div></div>');
			}
		}
		
		$('.function .motify').click(function(){			
			if($(this).hasClass('on')){
				$(this).removeClass('on');				
				motifyPaperEnd($(this).parent().parent().find('.slbox').text());
			}
			else{
				$(this).addClass('on');
				motifyPaper(true,$(this).parent().parent().find('.slbox').text());
			}
		});
		$('.function .delete').click(function(){			
			if($(this).parent().find('.motify').hasClass('on')){
				$(this).parent().find('.motify').removeClass('on');
				motifyPaper(false,$(this).parent().parent().find('.slbox').text());
			}
			else{
				if(window.confirm("確定刪除嗎?")) deletPaper($(this).parent().parent().find('.slbox').text());
			}
		});

		//recommend
		$('.recommend .change').click(function(){
			showLoading(true);
			changeRecommend($(this).parent().parent().parent().find('.slbox').text())
		});

		//photo
		$(".pressImgInput").change(function(){ReadURL(this);});
		$('.addImgBox .submit').click(function(){
			if(o.UploadImg==''){
				alert('請先選擇檔案');
				return;
			}
			showLoading(true);
			o.nowUploadImgNum = $(this).parent().parent().parent().parent().find('.slbox').text();
			uploadimgtoImgur(o.UploadImg,insertImg);
		});
		$('.photoDataBox .delet').click(function(){
			if(window.confirm('確定刪除?')){
				showLoading(true);
				deleteImg($(this).parent().parent().index(),$(this).parent().parent().parent().parent().parent().parent().find('.slbox').text())
			}
		});

		$('.menu ul li .box a').removeClass('on').eq(o.nowDataBrands).addClass('on');
		showLoading(false);
	}
	function carsfunction(data,nowDataBrands){
		o.nowData = data;
		webData.motifyPapering = false;
		//menulist
		$('.menua.on').replaceWith('<li><span>產品介紹</span><div class="box"></div></li>');
		$('.menu ul li .box').html('');
		for(i in data){
			$('.menu ul li .box').append('<a class="menuain" href="javascript:;" data-brands="'+i+'">'+data[i].brands+'</a>');
		}
		o.menulispan = $(".wrapper .menu li").find('span');
		o.menulispan.click(function(){
			menulispanclick($(this));
		});
		if(!o.menulispan.parent().hasClass('on')) o.menulispan.trigger('click');
		o.menulia = $(".wrapper .menu li").find('a');
		o.menulia.click(function(){
			insertCarsdata($(this).attr('data-brands'));
		});

		//content list
		insertCarsdata(nowDataBrands);
	}
	function insertCarsdata(_n){
		var data = o.nowData;
		o.nowDataBrands = _n;
		$('.title').html(data[_n].brands);

		o.cot = $('.content .list ul');
		o.cot.html('');
		for(k in data[o.nowDataBrands].cars){
			o.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column name">'+data[o.nowDataBrands].cars[k].name+'</div><div class="column price">'+data[o.nowDataBrands].cars[k].price+'</div><div class="column date">'+data[o.nowDataBrands].cars[k].date+'</div><div class="column info">'+data[o.nowDataBrands].cars[k].info+'</div><div class="column infoAll">'+data[o.nowDataBrands].cars[k].infoAll+'</div><div class="column des">'+data[o.nowDataBrands].cars[k].des+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>');
			//equipped
			o.cot.find('li:last .secData').append('<div class="eqi"><div class="st">配備</div><div class="addEqiBox"><input type="text" class="addEqi" placeholder="新增配備"><div class="submit">確定新增</div></div><div class="eqDataBox"></div></div>');
			for(x in data[o.nowDataBrands].cars[k].equipped){
				o.cot.find('li:last .secData .eqi .eqDataBox').append('<div class="equData"><span>'+data[o.nowDataBrands].cars[k].equipped[x]+'</span><div class="btn"><a href="javascript:;" class="delet">刪除</a></div></div>');
			}
			//recommend
			var _txt ='否';
			if(data[o.nowDataBrands].cars[k].recommend) _txt = '是';
			o.cot.find('li:last .secData').append('<div class="recommend" data-recd="'+data[o.nowDataBrands].cars[k].recommend+'"><div class="st">推薦</div><span>'+_txt+'</span><div class="btn change">更改</div></div>');

			//carsImg
			o.cot.find('li:last .secData').append('<div class="carsImg"><div class="st">圖片</div><div class="addImgBox"><input type="file" name="file" class="carsImgInput" accept="image/*" capture="camera"><div class="submit">確定新增</div></div><div class="photoDataBox"></div></div>');
			for(x in data[o.nowDataBrands].cars[k].carsImg){
				o.cot.find('li:last .secData .carsImg .photoDataBox').append('<div class="photoData"><div class="photo"><img src="'+data[o.nowDataBrands].cars[k].carsImg[x]+'"></div><div class="btn"><a href="javascript:;" class="delet"></a></div></div>');
			}
		}
		
		$('.function .motify').click(function(){			
			if($(this).hasClass('on')){
				$(this).removeClass('on');				
				motifyPaperEnd($(this).parent().parent().find('.slbox').text());
			}
			else{
				$(this).addClass('on');
				motifyPaper(true,$(this).parent().parent().find('.slbox').text());
			}
		});
		$('.function .delete').click(function(){			
			if($(this).parent().find('.motify').hasClass('on')){
				$(this).parent().find('.motify').removeClass('on');
				motifyPaper(false,$(this).parent().parent().find('.slbox').text());
			}
			else{
				if(window.confirm("確定刪除嗎?")) deletPaper($(this).parent().parent().find('.slbox').text());
			}
		});

		//equipped
		$('.addEqiBox .submit').click(function(){
			var _txt = $(this).parent().find('.addEqi').val();
			if(_txt !='' && _txt !=undefined){
				showLoading(true);
				addEquipped($(this).parent().parent().parent().parent().find('.slbox').text(),_txt);
			}else alert(webData.motifyerrortxt);
		});
		$('.eqDataBox .delet').click(function(){
			if(window.confirm('確定刪除?')){
				showLoading(true);
				deleteEquipped($(this).parent().parent().index(),$(this).parent().parent().parent().parent().parent().parent().find('.slbox').text())
			}
		});

		//recommend
		$('.recommend .change').click(function(){
			showLoading(true);
			changeRecommend($(this).parent().parent().parent().find('.slbox').text())
		});

		//carsImg
		$(".carsImgInput").change(function(){ReadURL(this);});
		$('.addImgBox .submit').click(function(){
			if(o.UploadImg==''){
				alert('請先選擇檔案');
				return;
			}
			showLoading(true);
			o.nowUploadImgNum = $(this).parent().parent().parent().parent().find('.slbox').text();
			uploadimgtoImgur(o.UploadImg,insertImg);
		});
		$('.photoDataBox .delet').click(function(){
			if(window.confirm('確定刪除?')){
				showLoading(true);
				deleteImg($(this).parent().parent().index(),$(this).parent().parent().parent().parent().parent().parent().find('.slbox').text())
			}
		});

		$('.menu ul li .box a').removeClass('on').eq(o.nowDataBrands).addClass('on');
		showLoading(false);
	}

	
	function addBrands(_collectname,_brandsName){
		var user_data = {
			brands:_brandsName,
			cars:[]
		};
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+_collectname+'?apiKey='+ webData.mlabApikey,
			type: 'POST',
			contentType: 'application/json',
			data:JSON.stringify(user_data),
			success: function(data) {				
				alert('新增成功');
				window.location.reload();
			},error: function(xhr, textStatus, errorThrown) {           
				_o.removeClass('on');
				showloading(false);
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function deletBrands(_collectname,_n){
		showLoading(true);
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+_collectname+'/'+o.nowData[_n]._id.$oid+'?apiKey='+ webData.mlabApikey,
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
	function motifyPaper(_t,_n,_num){
		var _tmp = $('.list').find('li').eq(_n);
		if(_t){
			if(webData.motifyPapering){
				alert(webData.motifyerrortxt);
				_tmp.find('.motify').removeClass('on');
				return;
			}
			else webData.motifyPapering=true;
		}else webData.motifyPapering=false;

		//cars
		if(webData.wrp.hasClass('cars')){
			var _tmp = $('.list').find('li').eq(_n);
			if(_t){				
				_tmp.find('.name').html('<textarea>'+_tmp.find('.name').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.price').html('<textarea>'+_tmp.find('.price').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.date').html('<textarea>'+_tmp.find('.date').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.info').html('<textarea>'+_tmp.find('.info').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.infoAll').html('<textarea>'+_tmp.find('.infoAll').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.des').html('<textarea>'+_tmp.find('.des').html().replace(/<br>/g,'\n')+'</textarea>');
			}else{			
				_tmp.find('.name').html(_tmp.find('.name textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.price').html(_tmp.find('.price textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.date').html(_tmp.find('.date textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.info').html(_tmp.find('.info textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.infoAll').html(_tmp.find('.infoAll textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.des').html(_tmp.find('.des textarea').val().replace(/\n\r?/g, '<br>'));
			}
		}
		//press
		else if(webData.wrp.hasClass('press')){
			var _tmp = $('.list').find('li').eq(_n);
			if(_t){
				_tmp.find('.date').html('<textarea>'+_tmp.find('.date').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.mainTitle').html('<textarea>'+_tmp.find('.mainTitle').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.mainContent').html('<textarea>'+_tmp.find('.mainContent').html().replace(/<br>/g,'\n')+'</textarea>');
			}else{
				_tmp.find('.date').html(_tmp.find('.date textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.mainTitle').html(_tmp.find('.mainTitle textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.mainContent').html(_tmp.find('.mainContent textarea').val().replace(/\n\r?/g, '<br>'));
			}
		}
		//main
		else if(webData.wrp.hasClass('main')){
			var _tmp = $('.list').find('li').eq(_n);
			if(_t){
				_tmp.find('.bTitle').html('<textarea>'+_tmp.find('.bTitle').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.sTitle').html('<textarea>'+_tmp.find('.sTitle').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.href').html('<textarea>'+_tmp.find('.href').html().replace(/<br>/g,'\n')+'</textarea>');
				_tmp.find('.photo').prepend('<input type="file" name="file" id="imgInputMotify" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify"><span>點擊更換</span></label>');
				$("#imgInputMotify").change(function(){readURLMain(this,$(this));});
				// o.uploadMainImg
			}else{
				_tmp.find('.bTitle').html(_tmp.find('.bTitle textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.sTitle').html(_tmp.find('.sTitle textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.href').html(_tmp.find('.href textarea').val().replace(/\n\r?/g, '<br>'));
				_tmp.find('.photo').html('<img src="' + o.nowData[_n].photo + '">');
			}
		}
	}
	function motifyPaperEnd(_n){		
		showLoading(true);
		var _tmp = $('.list').find('li').eq(_n);
		var _now = o.nowData[o.nowDataBrands];
		//cars
		if(webData.wrp.hasClass('cars')){
			_now.cars[_n].name=_tmp.find('.name').find('textarea').val().replace(/\n\r?/g, '<br>');
			_now.cars[_n].price=_tmp.find('.price').find('textarea').val().replace(/\n\r?/g, '<br>');
			_now.cars[_n].date=_tmp.find('.date').find('textarea').val().replace(/\n\r?/g, '<br>');
			_now.cars[_n].info=_tmp.find('.info').find('textarea').val().replace(/\n\r?/g, '<br>');
			_now.cars[_n].infoAll=_tmp.find('.infoAll').find('textarea').val().replace(/\n\r?/g, '<br>');
			_now.cars[_n].des=_tmp.find('.des').find('textarea').val().replace(/\n\r?/g, '<br>');
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					getDataCollection(o.nowPage,carsfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		//press
		else if(webData.wrp.hasClass('press')){
			_now.press[_n].date=_tmp.find('.date').find('textarea').val().replace(/\n\r?/g, '<br>');
			_now.press[_n].title=_tmp.find('.mainTitle').find('textarea').val().replace(/\n\r?/g, '<br>');
			_now.press[_n].content=_tmp.find('.mainContent').find('textarea').val().replace(/\n\r?/g, '<br>');
			
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					getDataCollection(o.nowPage,pressfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		//main
		else if(webData.wrp.hasClass('main')){
			o.nowDataMainNum = _n;
			uploadimgtoImgur(o.uploadMainImg,motifyPaperEndIndex);
		}
	}	
	function motifyPaperEndIndex(){
		var _now = o.nowData[o.nowDataMainNum];
		_now.bTitle=_tmp.find('.bTitle').find('textarea').val().replace(/\n\r?/g, '<br>');
		_now.sTitle=_tmp.find('.sTitle').find('textarea').val().replace(/\n\r?/g, '<br>');
		_now.href=_tmp.find('.href').find('textarea').val().replace(/\n\r?/g, '<br>');
		_now.photo=o.uploadImgTrue;
		
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
			type: 'PUT',
			contentType: 'application/json',
			data:JSON.stringify(_now),
			success: function(data) {
				getDataCollection(o.nowPage,mainfunction);
			},error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function addPaper(){
		var _o = $('.addbox .box');
		//cars
		if(webData.wrp.hasClass('cars')){
			var _add = {
				name:_o.find('.addname').val().replace(/\n\r?/g, '<br>'),
				price:_o.find('.addprice').val().replace(/\n\r?/g, '<br>'),
				date:_o.find('.adddate').val().replace(/\n\r?/g, '<br>'),
				info:_o.find('.addinfo').val().replace(/\n\r?/g, '<br>'),
				infoAll:_o.find('.addinfoAll').val().replace(/\n\r?/g, '<br>'),
				des:_o.find('.adddes').val().replace(/\n\r?/g, '<br>')
			};
			if(!checkNoEmpty(_add)){
				alert(webData.creatUsererrortxt);
				showLoading(false);
				return;
			}
			_add.equipped = [];
			_add.carsImg =[o.defaultCarsImg];
			_add.recommend = false;
			showLoading(true);
			clearForm('.addbox');
			var _now = o.nowData[o.nowDataBrands];
			_now.cars.push(_add);

			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					alert('新增成功');
					getDataCollection(o.nowPage,carsfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		//press
		else if(webData.wrp.hasClass('press')){
			var _add = {
				date:_o.find('.addDate').val().replace(/\n\r?/g, '<br>'),
				title:_o.find('.addTitle').val().replace(/\n\r?/g, '<br>'),
				content:_o.find('.addContent').val().replace(/\n\r?/g, '<br>')
			};
			if(!checkNoEmpty(_add)){
				alert(webData.creatUsererrortxt);
				showLoading(false);
				return;
			}
			_add.photo =[o.defaultPressImg];
			_add.recommend = false;
			showLoading(true);
			clearForm('.addbox');
			var _now = o.nowData[o.nowDataBrands];
			_now.press.push(_add);

			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					alert('新增成功');
					getDataCollection(o.nowPage,pressfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		//main
		else if(webData.wrp.hasClass('main')){
			showLoading(true);
			uploadimgtoImgur(o.indexUploadImg,insertImg);
		}
	}
	function deletPaper(_n){
		showLoading(true);
		//cars
		if(webData.wrp.hasClass('cars')){
			var _now = o.nowData[o.nowDataBrands];
			_now.cars.splice(_n,1);

			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					getDataCollection(o.nowPage,carsfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('press')){
			var _now = o.nowData[o.nowDataBrands];
			_now.press.splice(_n,1);

			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					getDataCollection(o.nowPage,pressfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(webData.wrp.hasClass('main')){
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+o.nowData[_n]._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: "DELETE",
				async: true,
				timeout: 300000,
				contentType: 'application/json',			
				success: function(data) {
					location.reload();
				},error: function(xhr, textStatus, errorThrown) {      
					location.reload();       
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
	}	
	function checkNoEmpty(obj){
		var _t = true;
		for(var i in obj){
			if(obj[i]=='') _t = false;
		}
		return _t;
	}
	function ReadURL(input){
		if (input.files && input.files[0]) {
            var reader = new FileReader();            
            reader.onload = function (e) {
				if(webData.wrp.hasClass('main')) o.indexUploadImg = e.target.result.replace(/.*,/, '');
				else o.UploadImg = e.target.result.replace(/.*,/, '');
            }
            reader.readAsDataURL(input.files[0]);
        }
	}
	function uploadimgtoImgur(_imgurl,callback){
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
            	o.uploadImgTrue = result.data.link;
            	callback();
            },error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
				window.location.href = 'https://api.imgur.com/oauth2/authorize?response_type=token&client_id='+webData.imgurappid;
			}
        });        
	}
	function insertImg(){
		if(o.nowPage == 'carsPage'){
			var _now = o.nowData[o.nowDataBrands];
			_now.cars[o.nowUploadImgNum].carsImg.push(o.uploadImgTrue);
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					o.uploadImgTrue = o.UploadImg ='';
					alert('新增成功');
					getDataCollection(o.nowPage,carsfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(o.nowPage == 'pressPage'){
			var _now = o.nowData[o.nowDataBrands];
			_now.press[o.nowUploadImgNum].photo.push(o.uploadImgTrue);
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					o.uploadImgTrue = o.UploadImg ='';
					alert('新增成功');
					getDataCollection(o.nowPage,pressfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		else if(o.nowPage == 'indexBanner'){
			var _o = $('.addbox .box');
			var _add = {
				bTitle:_o.find('.addBtitle').val().replace(/\n\r?/g, '<br>'),
				sTitle:_o.find('.addStitle').val().replace(/\n\r?/g, '<br>'),
				href:_o.find('.addHref').val().replace(/\n\r?/g, '<br>'),
				photo:o.uploadImgTrue
			};
			if(!checkNoEmpty(_add)){
				alert(webData.creatUsererrortxt);
				showLoading(false);
				return;
			}
			_add.textColor = 'black';
			clearForm('.addbox');

			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/indexBanner?apiKey='+ webData.mlabApikey,
				type: 'POST',
				contentType: 'application/json',
				data:JSON.stringify(_add),
				success: function(data) {				
					alert('新增成功');
					window.location.reload();
				},error: function(xhr, textStatus, errorThrown) {
					showloading(false);
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		
	}
	function deleteImg(_n,_num){
		var _now = o.nowData[o.nowDataBrands];
		//cars
		if(o.nowPage == 'carsPage'){
			_now.cars[_num].carsImg.splice(_n,1);
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					getDataCollection(o.nowPage,carsfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		//press
		else if(o.nowPage == 'pressPage'){
			_now.press[_num].photo.splice(_n,1);
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					getDataCollection(o.nowPage,pressfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		
		
	}
	function addEquipped(_num,_txt){
		if(o.nowPage == 'carsPage'){
			var _now = o.nowData[o.nowDataBrands];
			_now.cars[_num].equipped.push(_txt);
		}
		
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
			type: 'PUT',
			contentType: 'application/json',
			data:JSON.stringify(_now),
			success: function(data) {
				alert('新增成功');
				getDataCollection(o.nowPage,carsfunction,o.nowDataBrands);
			},error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function deleteEquipped(_n,_num){
		if(o.nowPage == 'carsPage'){
			var _now = o.nowData[o.nowDataBrands];
			_now.cars[_num].equipped.splice(_n,1);
		}
		
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
			type: 'PUT',
			contentType: 'application/json',
			data:JSON.stringify(_now),
			success: function(data) {
				getDataCollection(o.nowPage,carsfunction,o.nowDataBrands);
			},error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function changeRecommend(_num){
		var _now = o.nowData[o.nowDataBrands];
		//cars
		if(webData.wrp.hasClass('cars')){
			if(_now.cars[_num].recommend) _now.cars[_num].recommend = false;
			else _now.cars[_num].recommend = true;
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					getDataCollection(o.nowPage,carsfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		//press
		else if(webData.wrp.hasClass('press')){
			if(_now.press[_num].recommend) _now.press[_num].recommend = false;
			else _now.press[_num].recommend = true;
			$.ajax({
				url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+o.nowPage+'/'+_now._id.$oid+'?apiKey='+ webData.mlabApikey,
				type: 'PUT',
				contentType: 'application/json',
				data:JSON.stringify(_now),
				success: function(data) {
					getDataCollection(o.nowPage,pressfunction,o.nowDataBrands);
				},error: function(xhr, textStatus, errorThrown) {             
					console.log("error:", xhr, textStatus, errorThrown);
				}
			});
		}
		
		
	}
	function readURLMain(input,_o) {
		if(webData.wrp.hasClass('main')){
			if (input.files && input.files[0]) {
	            var reader = new FileReader();            
	            reader.onload = function (e) {
	            	o.uploadMainImg = e.target.result.replace(/.*,/, '');
	            	_o.parent().addClass('on').find('img').addClass('on').attr('src',e.target.result);
	            }
	            reader.readAsDataURL(input.files[0]);
	        }
		}
    }
	/*=====================*/
	/*
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
	*/

	/*=====================*/
	function getDataCollection(_collectname,_callback,_nowdatabrands){
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/rhinomotor2017/collections/'+_collectname+'?s={"_id":-1}&apiKey='+ webData.mlabApikey,
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {
				if(!_nowdatabrands) _nowdatabrands=0;
				_callback(data,_nowdatabrands);
			},error: function(xhr, textStatus, errorThrown) {
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
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
	function clearForm(obj){
		$(obj + ' input').val('');
		$(obj + ' textarea').val('');
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
