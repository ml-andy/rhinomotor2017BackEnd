function getUrlVars(){for(var a,n=[],e=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),s=0;s<e.length;s++)a=e[s].split("="),n.push(a[0]),n[a[0]]=a[1];return n}$(document).ready(function(){function a(a){var n=a.height();a.parent().hasClass("on")?a.parent().removeClass("on"):(a.parent().addClass("on"),n=a.height()+a.parent().find(".box").outerHeight(!0)),a.parent().css("height",n)}function n(n){u.nowData=n,$(".menua.on").replaceWith('<li><span>產品介紹</span><div class="box"></div></li>');for(i in n)$(".menu ul li .box").append('<a class="menuain" href="javascript:;" data-brands="'+i+'">'+n[i].brands+"</a>");u.nowDataBrands=0,u.menulispan=$(".wrapper .menu li").find("span"),u.menulispan.click(function(){a($(this))}),u.menulispan.trigger("click"),u.menulia=$(".wrapper .menu li").find("a"),u.menulia.click(function(){e($(this).attr("data-brands"))}),e(u.nowDataBrands)}function e(a){var n=u.nowData;u.nowDataBrands=a,$(".title").html(n[a].brands+" 產品介紹"),u.cot=$(".content .list ul"),u.cot.html("");for(k in n[u.nowDataBrands].cars){u.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column name">'+n[u.nowDataBrands].cars[k].name+'</div><div class="column price">'+n[u.nowDataBrands].cars[k].price+'</div><div class="column date">'+n[u.nowDataBrands].cars[k].date+'</div><div class="column info">'+n[u.nowDataBrands].cars[k].info+'</div><div class="column infoAll">'+n[u.nowDataBrands].cars[k].infoAll+'</div><div class="column des">'+n[u.nowDataBrands].cars[k].des+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>'),u.cot.find("li:last .secData").append('<div class="eqi"><div class="st">配備</div></div>');for(x in n[u.nowDataBrands].cars[k].equipped)u.cot.find("li:last .secData .eqi").append('<div class="equData"><span>'+n[u.nowDataBrands].cars[k].equipped[x]+'</span><div class="btn"><a href="javascript:;" class="modify">修改</a><a href="javascript:;" class="delet">刪除</a></div></div>');var e="否";n[u.nowDataBrands].cars[k].recommend&&(e="是"),u.cot.find("li:last .secData").append('<div class="recommend" data-recd="'+n[u.nowDataBrands].cars[k].recommend+'"><div class="st">推薦</div><span>'+e+'</span><div class="btn change">更改</div></div>'),u.cot.find("li:last .secData").append('<div class="carsImg"><div class="st">圖片</div></div>');for(x in n[u.nowDataBrands].cars[k].carsImg)u.cot.find("li:last .secData .carsImg").append('<div class="photoData"><div class="photo"><img src="'+n[u.nowDataBrands].cars[k].carsImg[x]+'"></div><div class="btn"><a href="javascript:;" class="modify">修改</a><a href="javascript:;" class="delet">刪除</a></div></div>')}$(".function .motify").click(function(){$(this).hasClass("on")?$(this).removeClass("on"):($(this).addClass("on"),r(!0,u.nowDataBrands,$(this).parent().parent().find(".slbox").text()))}),$(".menu ul li .box a").removeClass("on").eq(u.nowDataBrands).addClass("on"),p(!1)}function s(a,n){var e={brands:n,cars:[]};$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+a+"?apiKey="+f.mlabApikey,type:"POST",contentType:"application/json",data:JSON.stringify(e),success:function(a){alert("新增成功"),window.location.reload()},error:function(a,n,e){_o.removeClass("on"),showloading(!1),console.log("error:",a,n,e)}})}function t(a,n){p(!0),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+a+"/"+u.nowData[n]._id.$oid+"?apiKey="+f.mlabApikey,type:"DELETE",async:!0,timeout:3e5,contentType:"application/json",success:function(a){location.reload()},error:function(a,n,e){console.log("error:",a,n,e)}})}function r(a,n,e){if(a){if(f.motifyPapering)return void alert(f.motifyerrortxt);f.motifyPapering=!0}else f.motifyPapering=!1;if(f.wrp.hasClass("news")){var s=$(".paper").find("li").eq(n);a?(s.find(".newstitle").html("<textarea>"+s.find(".newstitle").html().replace(/<br>/g,"\n")+"</textarea>"),s.find(".newsbword").html("<textarea>"+s.find(".newsbword").html().replace(/<br>/g,"\n")+"</textarea>"),s.find(".newssword").html("<textarea>"+s.find(".newssword").html().replace(/<br>/g,"\n")+"</textarea>"),s.find(".newsbpic").prepend('<input type="file" name="file" id="imgInputMotify" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify"><span>點擊更換</span></label>'),$("#imgInputMotify").change(function(){o(this,$(this),0)}),s.find(".newsspic").prepend('<input type="file" name="file" id="imgInputMotify2" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify2"><span>點擊更換</span></label>'),$("#imgInputMotify2").change(function(){o(this,$(this),1)})):(s.find(".newstitle").html(s.find(".newstitle textarea").val().replace(/\n\r?/g,"<br>")),s.find(".newsbword").html(s.find(".newsbword textarea").val().replace(/\n\r?/g,"<br>")),s.find(".newssword").html(s.find(".newssword textarea").val().replace(/\n\r?/g,"<br>")),s.find(".newsbpic").html('<img src="'+f.newPaperdata[n].bpic+'">'),s.find(".newsspic").html('<img src="'+f.newPaperdata[n].spic+'">'))}}function o(a,n,e){if(f.wrp.hasClass("about")||f.wrp.hasClass("learn")||f.wrp.hasClass("link")){if(a.files&&a.files[0]){var s=new FileReader;s.onload=function(a){f.uploadImg=a.target.result.replace(/.*,/,""),n.parent().addClass("on").find("img").addClass("on").attr("src",a.target.result)},s.readAsDataURL(a.files[0])}}else if(f.wrp.hasClass("news")){if(a.files&&a.files[0]){var s=new FileReader;s.onload=function(a){0==e?f.uploadImgbpic=a.target.result.replace(/.*,/,""):f.uploadImgspic=a.target.result.replace(/.*,/,""),n.parent().addClass("on").find("img").addClass("on").attr("src",a.target.result)},s.readAsDataURL(a.files[0])}}else if(f.wrp.hasClass("index")&&a.files&&a.files[0]){var s=new FileReader;s.onload=function(a){0==e?f.uploadImgindexbannerpic=a.target.result.replace(/.*,/,""):f.uploadImgindexphotopic=a.target.result.replace(/.*,/,""),console.log(n.parent().addClass("on").find("img").addClass("on")),n.parent().addClass("on").find("img").addClass("on").attr("src",a.target.result)},s.readAsDataURL(a.files[0])}}function l(a,n){$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+a+'?s={"_id":-1}&apiKey='+f.mlabApikey,type:"GET",contentType:"application/json",success:function(a){f.newPaperdata=a,n(a)},error:function(a,n,e){console.log("error:",a,n,e)}})}function c(a){window.location.href=a.attr("data-page")+"#access_token="+window.location.href.split("#access_token=")[1]}function d(){var a=!1;return $.cookie("useraccount")&&$.cookie("userpassword")&&(a=!0),a}function p(a){a?$(".loading").fadeIn():($(".loading").hasClass("on")||$(".loading").addClass("on"),$(".loading").fadeOut())}var f={};f.wrp=$(".wrapper"),f.mlabApikey="n6FXodWWCdM14KrePZHrRPPovbzboRn6",f.imgurappid="4dd8fdf80527e2a",f.creatUsererrortxt="請填寫完整資料",f.motifyerrortxt="上一筆資料還在修改中，請先完成上一筆修改再繼續。";var u={wrp:$(".wrapper")};try{f.nowpage=getUrlVars().page.replace("#access_token","")}catch(m){f.nowpage=1}f.wrp.hasClass("cars")?(u.nowPage="carsPage",l(u.nowPage,n)):p(!1),$(".menua").click(function(){c($(this))}),$(".searchbox .submit").click(function(){p(!0);var a=$(".searchbox .addBrands").val();""!=a||void 0!=a?s(u.nowPage,a):(alert(f.creatUsererrortxt),p(!1))}),$(".deleteBrands").click(function(){window.confirm("確定刪除?")&&t(u.nowPage,u.nowDataBrands)}),$(window).load(function(){if(d())try{f.imgurToken=window.location.href.split("#")[1].split("&")[0].replace("access_token=",""),$(".userMenu .icon").html($.cookie("useraccount").substring(0,1)),$(".userMenu .name").html($.cookie("username"))}catch(a){window.location.href="https://api.imgur.com/oauth2/authorize?response_type=token&client_id="+f.imgurappid}else window.location.href="index.html"+window.location.hash})});