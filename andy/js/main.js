function getUrlVars(){for(var a,n=[],e=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),t=0;t<e.length;t++)a=e[t].split("="),n.push(a[0]),n[a[0]]=a[1];return n}$(document).ready(function(){function a(a,e){L.nowData=a,R.motifyPapering=!1,n()}function n(){var a=L.nowData;L.cot=$(".content .list ul"),L.cot.html("");for(k in a)L.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column username">'+a[k].username+'</div><div class="column userpassword">'+a[k].userpassword+'</div><div class="column useremail">'+a[k].useremail+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>');$(".function .delete").click(function(){$(this).parent().find(".motify").hasClass("on")?($(this).parent().find(".motify").removeClass("on"),w(!1,$(this).parent().parent().find(".slbox").text())):window.confirm("確定刪除嗎?")&&P($(this).parent().parent().find(".slbox").text())}),$(".function .motify").click(function(){$(this).hasClass("on")?($(this).removeClass("on"),b($(this).parent().parent().find(".slbox").text())):($(this).addClass("on"),w(!0,$(this).parent().parent().find(".slbox").text()))}),E(!1)}function e(a,n){L.nowData=a,R.motifyPapering=!1,t()}function t(){var a=L.nowData;L.cot=$(".content .list ul"),L.cot.html("");for(k in a)L.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column useraccount">'+a[k].useraccount+'</div><div class="column userpassword">'+a[k].userpassword+'</div><div class="column username">'+a[k].username+'</div><div class="column useremail">'+a[k].useremail+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>');$(".function .delete").click(function(){$(this).parent().find(".motify").hasClass("on")?($(this).parent().find(".motify").removeClass("on"),w(!1,$(this).parent().parent().find(".slbox").text())):window.confirm("確定刪除嗎?")&&P($(this).parent().parent().find(".slbox").text())}),$(".function .motify").click(function(){$(this).hasClass("on")?($(this).removeClass("on"),b($(this).parent().parent().find(".slbox").text())):($(this).addClass("on"),w(!0,$(this).parent().parent().find(".slbox").text()))}),E(!1)}function o(a,n){L.nowData=a,R.motifyPapering=!1,s()}function s(){var a=L.nowData;L.cot=$(".content .list ul"),L.cot.html("");for(k in a)L.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column customername">'+a[k].customername+'</div><div class="column customertel">'+a[k].customertel+'</div><div class="column customeremail">'+a[k].customeremail+'</div><div class="column customeraddress">'+a[k].customeraddress+'</div><div class="column date">'+a[k].date+'</div><div class="column customercontent">'+a[k].customercontent+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>');$(".function .delete").click(function(){$(this).parent().find(".motify").hasClass("on")?($(this).parent().find(".motify").removeClass("on"),w(!1,$(this).parent().parent().find(".slbox").text())):window.confirm("確定刪除嗎?")&&P($(this).parent().parent().find(".slbox").text())}),$(".function .motify").click(function(){$(this).hasClass("on")?($(this).removeClass("on"),b($(this).parent().parent().find(".slbox").text())):($(this).addClass("on"),w(!0,$(this).parent().parent().find(".slbox").text()))}),E(!1)}function r(a,n){L.nowData=a,R.motifyPapering=!1,$(".indexImgInput").change(function(){T(this)}),l()}function l(){var a=L.nowData;L.cot=$(".content .list ul"),L.cot.html("");for(k in a)L.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column photo main"><img src="'+a[k].photo+'"></div><div class="column bTitle">'+a[k].bTitle+'</div><div class="column sTitle">'+a[k].sTitle+'</div><div class="column href">'+a[k].href+'</div><div class="column textColor"><span>'+a[k].textColor+'</span><div class="btn change">更改</div></div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>');$(".function .delete").click(function(){$(this).parent().find(".motify").hasClass("on")?($(this).parent().find(".motify").removeClass("on"),w(!1,$(this).parent().parent().find(".slbox").text())):window.confirm("確定刪除嗎?")&&P($(this).parent().parent().find(".slbox").text())}),$(".function .motify").click(function(){$(this).hasClass("on")?($(this).removeClass("on"),b($(this).parent().parent().find(".slbox").text())):($(this).addClass("on"),w(!0,$(this).parent().parent().find(".slbox").text()))}),$(".textColor .change").click(function(){E(!0),_($(this).parent().parent().parent().find(".slbox").text())}),E(!1)}function c(a,n){L.nowData=a,R.motifyPapering=!1,$(".menua.on").replaceWith('<li><span>最新消息</span><div class="box"></div></li>'),$(".menu ul li .box").html("");for(i in a)$(".menu ul li .box").append('<a class="menuain" href="javascript:;" data-brands="'+i+'">'+a[i].brands+"</a>");L.menulispan=$(".wrapper .menu li").find("span"),L.menulispan.click(function(){K($(this))}),L.menulispan.parent().hasClass("on")||L.menulispan.trigger("click"),L.menulia=$(".wrapper .menu li").find("a"),L.menulia.click(function(){d($(this).attr("data-brands"))}),d(n)}function d(a){var n=L.nowData;L.nowDataBrands=a;try{$(".title").html(n[a].brands)}catch(e){return $(".addbox").remove(),$(".list").remove(),$(".deleteBrands").remove(),void E(!1)}L.cot=$(".content .list ul"),L.cot.html("");for(k in n[L.nowDataBrands].press){L.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column date">'+n[L.nowDataBrands].press[k].date+'</div><div class="column mainTitle">'+n[L.nowDataBrands].press[k].title+'</div><div class="column mainContent">'+n[L.nowDataBrands].press[k].content+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>');var t="否";n[L.nowDataBrands].press[k].recommend&&(t="是"),L.cot.find("li:last .secData").append('<div class="recommend" data-recd="'+n[L.nowDataBrands].press[k].recommend+'"><div class="st">推薦</div><span>'+t+'</span><div class="btn change">更改</div></div>'),L.cot.find("li:last .secData").append('<div class="pressImg"><div class="st">圖片</div><div class="addImgBox"><input type="file" name="file" class="pressImgInput" accept="image/*" capture="camera"><div class="submit">確定新增</div></div><div class="photoDataBox"></div></div>');for(x in n[L.nowDataBrands].press[k].photo)L.cot.find("li:last .secData .pressImg .photoDataBox").append('<div class="photoData"><div class="photo"><img src="'+n[L.nowDataBrands].press[k].photo[x]+'"></div><div class="btn"><a href="javascript:;" class="delet"></a></div></div>')}$(".function .motify").click(function(){$(this).hasClass("on")?($(this).removeClass("on"),b($(this).parent().parent().find(".slbox").text())):($(this).addClass("on"),w(!0,$(this).parent().parent().find(".slbox").text()))}),$(".function .delete").click(function(){$(this).parent().find(".motify").hasClass("on")?($(this).parent().find(".motify").removeClass("on"),w(!1,$(this).parent().parent().find(".slbox").text())):window.confirm("確定刪除嗎?")&&P($(this).parent().parent().find(".slbox").text())}),$(".recommend .change").click(function(){E(!0),_($(this).parent().parent().parent().find(".slbox").text())}),$(".pressImgInput").change(function(){T(this)}),$(".addImgBox .submit").click(function(){return""==L.UploadImg?void alert("請先選擇檔案"):(E(!0),L.nowUploadImgNum=$(this).parent().parent().parent().parent().find(".slbox").text(),void j(L.UploadImg,B))}),$(".photoDataBox .delet").click(function(){window.confirm("確定刪除?")&&(E(!0),I($(this).parent().parent().index(),$(this).parent().parent().parent().parent().parent().parent().find(".slbox").text()))}),$(".menu ul li .box a").removeClass("on").eq(L.nowDataBrands).addClass("on"),E(!1)}function p(a,n){L.nowData=a,R.motifyPapering=!1,$(".menua.on").replaceWith('<li><span>產品介紹</span><div class="box"></div></li>'),$(".menu ul li .box").html("");for(i in a)$(".menu ul li .box").append('<a class="menuain" href="javascript:;" data-brands="'+i+'">'+a[i].brands+"</a>");L.menulispan=$(".wrapper .menu li").find("span"),L.menulispan.click(function(){K($(this))}),L.menulispan.parent().hasClass("on")||L.menulispan.trigger("click"),L.menulia=$(".wrapper .menu li").find("a"),L.menulia.click(function(){m($(this).attr("data-brands"))}),m(n)}function m(a){var n=L.nowData;L.nowDataBrands=a;try{$(".title").html(n[a].brands)}catch(e){return $(".addbox").remove(),$(".list").remove(),$(".deleteBrands").remove(),void E(!1)}L.cot=$(".content .list ul"),L.cot.html("");for(k in n[L.nowDataBrands].cars){L.cot.append('<li><div class="mainData"><div class="slbox">'+k+'</div><div class="column name">'+n[L.nowDataBrands].cars[k].name+'</div><div class="column price">'+n[L.nowDataBrands].cars[k].price+'</div><div class="column date">'+n[L.nowDataBrands].cars[k].date+'</div><div class="column info">'+n[L.nowDataBrands].cars[k].info+'</div><div class="column infoAll">'+n[L.nowDataBrands].cars[k].infoAll+'</div><div class="column des">'+n[L.nowDataBrands].cars[k].des+'</div><div class="function"><a class="motify" href="javascript:;"></a><a class="delete" href="javascript:;"></a></div></div><div class="secData"></div></li>'),L.cot.find("li:last .secData").append('<div class="eqi"><div class="st">配備</div><div class="addEqiBox"><input type="text" class="addEqi" placeholder="新增配備"><div class="submit">確定新增</div></div><div class="eqDataBox"></div></div>');for(x in n[L.nowDataBrands].cars[k].equipped)L.cot.find("li:last .secData .eqi .eqDataBox").append('<div class="equData"><span>'+n[L.nowDataBrands].cars[k].equipped[x]+'</span><div class="btn"><a href="javascript:;" class="delet">刪除</a></div></div>');var t="否";n[L.nowDataBrands].cars[k].recommend&&(t="是"),L.cot.find("li:last .secData").append('<div class="recommend" data-recd="'+n[L.nowDataBrands].cars[k].recommend+'"><div class="st">推薦</div><span>'+t+'</span><div class="btn change">更改</div></div>'),L.cot.find("li:last .secData").append('<div class="carsImg"><div class="st">圖片</div><div class="addImgBox"><input type="file" name="file" class="carsImgInput" accept="image/*" capture="camera"><div class="submit">確定新增</div></div><div class="changePhotoOrder"></div><div class="photoDataBox"></div></div>');for(x in n[L.nowDataBrands].cars[k].carsImg)L.cot.find("li:last .secData .carsImg .photoDataBox").append('<div class="photoData"><div class="photo"><img src="'+n[L.nowDataBrands].cars[k].carsImg[x]+'"></div><div class="btn"><a href="javascript:;" class="delet"></a></div><div class="order"><span>'+x+"</span></div></div>")}$(".function .motify").click(function(){$(this).hasClass("on")?($(this).removeClass("on"),b($(this).parent().parent().find(".slbox").text())):($(this).addClass("on"),w(!0,$(this).parent().parent().find(".slbox").text()))}),$(".function .delete").click(function(){$(this).parent().find(".motify").hasClass("on")?($(this).parent().find(".motify").removeClass("on"),w(!1,$(this).parent().parent().find(".slbox").text())):window.confirm("確定刪除嗎?")&&P($(this).parent().parent().find(".slbox").text())}),$(".addEqiBox .submit").click(function(){var a=$(this).parent().find(".addEqi").val();""!=a&&void 0!=a?(E(!0),U($(this).parent().parent().parent().parent().find(".slbox").text(),a)):alert(R.motifyerrortxt)}),$(".eqDataBox .delet").click(function(){window.confirm("確定刪除?")&&(E(!0),A($(this).parent().parent().index(),$(this).parent().parent().parent().parent().parent().parent().find(".slbox").text()))}),$(".recommend .change").click(function(){E(!0),_($(this).parent().parent().parent().find(".slbox").text())}),$(".carsImgInput").change(function(){T(this)}),$(".addImgBox .submit").click(function(){return""==L.UploadImg?void alert("請先選擇檔案"):(E(!0),L.nowUploadImgNum=$(this).parent().parent().parent().parent().find(".slbox").text(),void j(L.UploadImg,B))}),$(".photoDataBox .delet").click(function(){window.confirm("確定刪除?")&&(E(!0),I($(this).parent().parent().index(),$(this).parent().parent().parent().parent().parent().parent().find(".slbox").text()))}),$(".changePhotoOrder").click(function(){$(this).hasClass("on")?f(!0,$(this)):f(!1,$(this))}),$(".menu ul li .box a").removeClass("on").eq(L.nowDataBrands).addClass("on"),E(!1)}function f(a,n){if(a){n.removeClass("on");for(var e=n.parent().find(".photoDataBox .photoData"),t=[],i=0;i<e.length;i++)t.push(e.eq(i).find(".order input").val());if(u(t))alert("有重複的順序，請修正。");else{var o=[];t.sort(function(a,n){return a-n});for(var s=0;s<t.length;s++)for(var i=0;i<e.length;i++){var r=e.eq(i);r.find(".order input").val()===t[s]&&o.push(r.find(".photo img").attr("src"))}h(n.parent().parent().parent().find(".mainData .slbox").text(),o)}}else{n.addClass("on");for(var e=n.parent().find(".photoDataBox .photoData"),l=1*e.length-1,i=0;i<e.length;i++)e.eq(i).find(".order").html('<input type="number" min="0" max="'+l+'" value="'+i+'">')}}function u(a){for(var n=[],e=0;e<a.length;++e){var t=a[e];if(n.indexOf(t)!==-1)return!0;n.push(t)}return!1}function h(a,n){E(!0);var e=L.nowData[L.nowDataBrands];e.cars[a].carsImg=n,$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+e._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(e),success:function(a){O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}function v(a,n){var e={brands:n,cars:[]};$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+a+"?apiKey="+R.mlabApikey,type:"POST",contentType:"application/json",data:JSON.stringify(e),success:function(a){alert("新增成功"),window.location.reload()},error:function(a,n,e){_o.removeClass("on"),showloading(!1),console.log("error:",a,n,e)}})}function g(a,n){E(!0),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+a+"/"+L.nowData[n]._id.$oid+"?apiKey="+R.mlabApikey,type:"DELETE",async:!0,timeout:3e5,contentType:"application/json",success:function(a){location.reload()},error:function(a,n,e){console.log("error:",a,n,e)}})}function w(a,n,e){var t=$(".list").find("li").eq(n);if(a){if(R.motifyPapering)return alert(R.motifyerrortxt),void t.find(".motify").removeClass("on");R.motifyPapering=!0}else R.motifyPapering=!1;if(R.wrp.hasClass("cars")){var t=$(".list").find("li").eq(n);a?(t.find(".name").html("<textarea>"+t.find(".name").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".price").html("<textarea>"+t.find(".price").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".date").html("<textarea>"+t.find(".date").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".info").html("<textarea>"+t.find(".info").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".infoAll").html("<textarea>"+t.find(".infoAll").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".des").html("<textarea>"+t.find(".des").html().replace(/<br>/g,"\n")+"</textarea>")):(t.find(".name").html(t.find(".name textarea").val().replace(/\n\r?/g,"<br>")),t.find(".price").html(t.find(".price textarea").val().replace(/\n\r?/g,"<br>")),t.find(".date").html(t.find(".date textarea").val().replace(/\n\r?/g,"<br>")),t.find(".info").html(t.find(".info textarea").val().replace(/\n\r?/g,"<br>")),t.find(".infoAll").html(t.find(".infoAll textarea").val().replace(/\n\r?/g,"<br>")),t.find(".des").html(t.find(".des textarea").val().replace(/\n\r?/g,"<br>")))}else if(R.wrp.hasClass("press")){var t=$(".list").find("li").eq(n);a?(t.find(".date").html("<textarea>"+t.find(".date").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".mainTitle").html("<textarea>"+t.find(".mainTitle").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".mainContent").html("<textarea>"+t.find(".mainContent").html().replace(/<br>/g,"\n")+"</textarea>")):(t.find(".date").html(t.find(".date textarea").val().replace(/\n\r?/g,"<br>")),t.find(".mainTitle").html(t.find(".mainTitle textarea").val().replace(/\n\r?/g,"<br>")),t.find(".mainContent").html(t.find(".mainContent textarea").val().replace(/\n\r?/g,"<br>")))}else if(R.wrp.hasClass("main")){var t=$(".list").find("li").eq(n);a?(t.find(".bTitle").html("<textarea>"+t.find(".bTitle").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".sTitle").html("<textarea>"+t.find(".sTitle").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".href").html("<textarea>"+t.find(".href").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".photo").prepend('<input type="file" name="file" id="imgInputMotify" accept="image/*" capture="camera"><label class="imgInputlabel" for="imgInputMotify"><span>點擊更換</span></label>'),$("#imgInputMotify").change(function(){N(this,$(this))})):(t.find(".bTitle").html(t.find(".bTitle textarea").val().replace(/\n\r?/g,"<br>")),t.find(".sTitle").html(t.find(".sTitle textarea").val().replace(/\n\r?/g,"<br>")),t.find(".href").html(t.find(".href textarea").val().replace(/\n\r?/g,"<br>")),t.find(".photo").html('<img src="'+L.nowData[n].photo+'">'))}else if(R.wrp.hasClass("contact")){var t=$(".list").find("li").eq(n);a?(t.find(".customername").html("<textarea>"+t.find(".customername").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".customertel").html("<textarea>"+t.find(".customertel").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".customeremail").html("<textarea>"+t.find(".customeremail").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".customeraddress").html("<textarea>"+t.find(".customeraddress").html().replace(/<br>/g,"\n")+"</textarea>"),t.find(".customercontent").html("<textarea>"+t.find(".customercontent").html().replace(/<br>/g,"\n")+"</textarea>")):(t.find(".customername").html(t.find(".customername textarea").val().replace(/\n\r?/g,"<br>")),t.find(".customertel").html(t.find(".customertel textarea").val().replace(/\n\r?/g,"<br>")),t.find(".customeremail").html(t.find(".customeremail textarea").val().replace(/\n\r?/g,"<br>")),t.find(".customeraddress").html(t.find(".customeraddress textarea").val().replace(/\n\r?/g,"<br>")),t.find(".customercontent").html(t.find(".customercontent textarea").val().replace(/\n\r?/g,"<br>")))}else if(R.wrp.hasClass("user")){var t=$(".list").find("li").eq(n);a?(t.find(".useraccount").html('<input value="'+t.find(".useraccount").html()+'">'),t.find(".userpassword").html('<input value="'+t.find(".userpassword").html()+'">'),t.find(".username").html('<input value="'+t.find(".username").html()+'">'),t.find(".useremail").html('<input value="'+t.find(".useremail").html()+'">')):(t.find(".useraccount").html(t.find(".useraccount input").val()),t.find(".userpassword").html(t.find(".userpassword input").val()),t.find(".username").html(t.find(".username input").val()),t.find(".useremail").html(t.find(".useremail input").val()))}else if(R.wrp.hasClass("member")){var t=$(".list").find("li").eq(n);a?(t.find(".username").html('<input value="'+t.find(".username").html()+'">'),t.find(".userpassword").html('<input value="'+t.find(".userpassword").html()+'">'),t.find(".useremail").html('<input value="'+t.find(".useremail").html()+'">')):(t.find(".username").html(t.find(".username input").val()),t.find(".userpassword").html(t.find(".userpassword input").val()),t.find(".useremail").html(t.find(".useremail input").val()))}}function b(n){E(!0);var t=$(".list").find("li").eq(n),i=L.nowData[L.nowDataBrands];R.wrp.hasClass("cars")?(i.cars[n].name=t.find(".name").find("textarea").val().replace(/\n\r?/g,"<br>"),i.cars[n].price=t.find(".price").find("textarea").val().replace(/\n\r?/g,"<br>"),i.cars[n].date=t.find(".date").find("textarea").val().replace(/\n\r?/g,"<br>"),i.cars[n].info=t.find(".info").find("textarea").val().replace(/\n\r?/g,"<br>"),i.cars[n].infoAll=t.find(".infoAll").find("textarea").val().replace(/\n\r?/g,"<br>"),i.cars[n].des=t.find(".des").find("textarea").val().replace(/\n\r?/g,"<br>"),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+i._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(i),success:function(a){O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})):R.wrp.hasClass("press")?(i.press[n].date=t.find(".date").find("textarea").val().replace(/\n\r?/g,"<br>"),i.press[n].title=t.find(".mainTitle").find("textarea").val().replace(/\n\r?/g,"<br>"),i.press[n].content=t.find(".mainContent").find("textarea").val().replace(/\n\r?/g,"<br>"),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+i._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(i),success:function(a){O(L.nowPage,c,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})):R.wrp.hasClass("main")?(L.nowDataMainNum=n,L.nowData[L.nowDataMainNum].bTitle=t.find(".bTitle").find("textarea").val().replace(/\n\r?/g,"<br>"),L.nowData[L.nowDataMainNum].sTitle=t.find(".sTitle").find("textarea").val().replace(/\n\r?/g,"<br>"),L.nowData[L.nowDataMainNum].href=t.find(".href").find("textarea").val().replace(/\n\r?/g,"<br>"),""==L.uploadMainImg?$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[L.nowDataMainNum]._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(L.nowData[L.nowDataMainNum]),success:function(a){L.uploadMainImg="",L.uploadImgTrue="",O(L.nowPage,r)},error:function(a,n,e){console.log("error:",a,n,e)}}):j(L.uploadMainImg,y)):R.wrp.hasClass("contact")?(L.nowData[n].customername=t.find(".customername").find("textarea").val().replace(/\n\r?/g,"<br>"),L.nowData[n].customertel=t.find(".customertel").find("textarea").val().replace(/\n\r?/g,"<br>"),L.nowData[n].customeremail=t.find(".customeremail").find("textarea").val().replace(/\n\r?/g,"<br>"),L.nowData[n].customeraddress=t.find(".customeraddress").find("textarea").val().replace(/\n\r?/g,"<br>"),L.nowData[n].customercontent=t.find(".customercontent").find("textarea").val().replace(/\n\r?/g,"<br>"),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[n]._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(L.nowData[n]),success:function(a){O(L.nowPage,o)},error:function(a,n,e){console.log("error:",a,n,e)}})):R.wrp.hasClass("user")?(L.nowData[n].useraccount=t.find(".useraccount").find("input").val(),L.nowData[n].userpassword=t.find(".userpassword").find("input").val(),L.nowData[n].username=t.find(".username").find("input").val(),L.nowData[n].useremail=t.find(".useremail").find("input").val(),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[n]._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(L.nowData[n]),success:function(a){O(L.nowPage,e)},error:function(a,n,e){console.log("error:",a,n,e)}})):R.wrp.hasClass("member")&&(L.nowData[n].userpassword=t.find(".userpassword").find("input").val(),L.nowData[n].username=t.find(".username").find("input").val(),L.nowData[n].useremail=t.find(".useremail").find("input").val(),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[n]._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(L.nowData[n]),success:function(n){O(L.nowPage,a)},error:function(a,n,e){console.log("error:",a,n,e)}}))}function y(){L.nowData[L.nowDataMainNum].photo=L.uploadImgTrue,$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[L.nowDataMainNum]._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(L.nowData[L.nowDataMainNum]),success:function(a){L.uploadMainImg="",L.uploadImgTrue="",O(L.nowPage,r)},error:function(a,n,e){console.log("error:",a,n,e)}})}function D(){var a=$(".addbox .box");if(R.wrp.hasClass("cars")){var n={name:a.find(".addname").val().replace(/\n\r?/g,"<br>"),price:a.find(".addprice").val().replace(/\n\r?/g,"<br>"),date:a.find(".adddate").val().replace(/\n\r?/g,"<br>"),info:a.find(".addinfo").val().replace(/\n\r?/g,"<br>"),infoAll:a.find(".addinfoAll").val().replace(/\n\r?/g,"<br>"),des:a.find(".adddes").val().replace(/\n\r?/g,"<br>")};if(!C(n))return alert(R.creatUsererrortxt),void E(!1);n.equipped=[],n.carsImg=[L.defaultCarsImg],n.recommend=!1,E(!0),M(".addbox");var e=L.nowData[L.nowDataBrands];e.cars.push(n),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+e._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(e),success:function(a){alert("新增成功"),O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}else if(R.wrp.hasClass("press")){var n={date:a.find(".addDate").val().replace(/\n\r?/g,"<br>"),title:a.find(".addTitle").val().replace(/\n\r?/g,"<br>"),content:a.find(".addContent").val().replace(/\n\r?/g,"<br>")};if(!C(n))return alert(R.creatUsererrortxt),void E(!1);n.photo=[L.defaultPressImg],n.recommend=!1,E(!0),M(".addbox");var e=L.nowData[L.nowDataBrands];e.press.push(n),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+e._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(e),success:function(a){alert("新增成功"),O(L.nowPage,c,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}else if(R.wrp.hasClass("main"))E(!0),j(L.indexUploadImg,B);else if(R.wrp.hasClass("user")){var n={username:a.find(".addUsername").val().replace(/\n\r?/g,"<br>"),userpassword:a.find(".addUserpassword").val().replace(/\n\r?/g,"<br>"),useraccount:a.find(".addUseraccount").val().replace(/\n\r?/g,"<br>"),useremail:a.find(".addUseremail").val().replace(/\n\r?/g,"<br>")};if(!C(n))return alert(R.creatUsererrortxt),void E(!1);E(!0),M(".addbox"),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/user?apiKey="+R.mlabApikey,type:"POST",contentType:"application/json",data:JSON.stringify(n),success:function(a){alert("新增成功"),window.location.reload()},error:function(a,n,e){alert("新增失敗"),window.location.reload(),console.log("error:",a,n,e)}})}}function P(a){if(E(!0),R.wrp.hasClass("cars")){var n=L.nowData[L.nowDataBrands];n.cars.splice(a,1),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+n._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(n),success:function(a){O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}else if(R.wrp.hasClass("press")){var n=L.nowData[L.nowDataBrands];n.press.splice(a,1),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+n._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(n),success:function(a){O(L.nowPage,c,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}else R.wrp.hasClass("main")?$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[a]._id.$oid+"?apiKey="+R.mlabApikey,type:"DELETE",async:!0,timeout:3e5,contentType:"application/json",success:function(a){location.reload()},error:function(a,n,e){location.reload(),console.log("error:",a,n,e)}}):R.wrp.hasClass("contact")?$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[a]._id.$oid+"?apiKey="+R.mlabApikey,type:"DELETE",async:!0,timeout:3e5,contentType:"application/json",success:function(a){location.reload()},error:function(a,n,e){location.reload(),console.log("error:",a,n,e)}}):R.wrp.hasClass("user")?$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[a]._id.$oid+"?apiKey="+R.mlabApikey,type:"DELETE",async:!0,timeout:3e5,contentType:"application/json",success:function(a){location.reload()},error:function(a,n,e){location.reload(),console.log("error:",a,n,e)}}):R.wrp.hasClass("member")&&$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+L.nowData[a]._id.$oid+"?apiKey="+R.mlabApikey,type:"DELETE",async:!0,timeout:3e5,contentType:"application/json",success:function(a){location.reload()},error:function(a,n,e){location.reload(),console.log("error:",a,n,e)}})}function C(a){var n=!0;for(var e in a)""==a[e]&&(n=!1);return n}function T(a){if(a.files&&a.files[0]){var n=new FileReader;n.onload=function(a){R.wrp.hasClass("main")?L.indexUploadImg=a.target.result.replace(/.*,/,""):L.UploadImg=a.target.result.replace(/.*,/,"")},n.readAsDataURL(a.files[0])}}function j(a,n){$.ajax({url:"https://api.imgur.com/3/image",method:"POST",headers:{Authorization:"Bearer "+R.imgurToken,Accept:"application/json"},data:{image:a,type:"base64"},success:function(a){L.uploadImgTrue=a.data.link,n()},error:function(a,n,e){console.log("error:",a,n,e),window.location.href="https://api.imgur.com/oauth2/authorize?response_type=token&client_id="+R.imgurappid}})}function B(){if("carsPage"==L.nowPage){var a=L.nowData[L.nowDataBrands];a.cars[L.nowUploadImgNum].carsImg.push(L.uploadImgTrue),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+a._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(a),success:function(a){L.uploadImgTrue=L.UploadImg="",alert("新增成功"),O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}else if("pressPage"==L.nowPage){var a=L.nowData[L.nowDataBrands];a.press[L.nowUploadImgNum].photo.push(L.uploadImgTrue),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+a._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(a),success:function(a){L.uploadImgTrue=L.UploadImg="",alert("新增成功"),O(L.nowPage,c,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}else if("indexBanner"==L.nowPage){var n=$(".addbox .box"),e={bTitle:n.find(".addBtitle").val().replace(/\n\r?/g,"<br>"),sTitle:n.find(".addStitle").val().replace(/\n\r?/g,"<br>"),href:n.find(".addHref").val().replace(/\n\r?/g,"<br>"),photo:L.uploadImgTrue};if(!C(e))return alert(R.creatUsererrortxt),void E(!1);e.textColor="black",M(".addbox"),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/indexBanner?apiKey="+R.mlabApikey,type:"POST",contentType:"application/json",data:JSON.stringify(e),success:function(a){alert("新增成功"),window.location.reload()},error:function(a,n,e){showloading(!1),console.log("error:",a,n,e)}})}}function I(a,n){var e=L.nowData[L.nowDataBrands];"carsPage"==L.nowPage?(e.cars[n].carsImg.splice(a,1),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+e._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(e),success:function(a){O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})):"pressPage"==L.nowPage&&(e.press[n].photo.splice(a,1),$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+e._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(e),success:function(a){O(L.nowPage,c,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}}))}function U(a,n){if("carsPage"==L.nowPage){var e=L.nowData[L.nowDataBrands];e.cars[a].equipped.push(n)}$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+e._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(e),success:function(a){alert("新增成功"),O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}function A(a,n){if("carsPage"==L.nowPage){var e=L.nowData[L.nowDataBrands];
e.cars[n].equipped.splice(a,1)}$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+e._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(e),success:function(a){O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}})}function _(a){var n=L.nowData[L.nowDataBrands];if(R.wrp.hasClass("cars"))n.cars[a].recommend?n.cars[a].recommend=!1:n.cars[a].recommend=!0,$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+n._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(n),success:function(a){O(L.nowPage,p,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}});else if(R.wrp.hasClass("press"))n.press[a].recommend?n.press[a].recommend=!1:n.press[a].recommend=!0,$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+n._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(n),success:function(a){O(L.nowPage,c,L.nowDataBrands)},error:function(a,n,e){console.log("error:",a,n,e)}});else if(R.wrp.hasClass("main")){var n=L.nowData[a];"black"==n.textColor?n.textColor="white":n.textColor="black",$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+L.nowPage+"/"+n._id.$oid+"?apiKey="+R.mlabApikey,type:"PUT",contentType:"application/json",data:JSON.stringify(n),success:function(a){O(L.nowPage,r)},error:function(a,n,e){console.log("error:",a,n,e)}})}}function N(a,n){if(R.wrp.hasClass("main")&&a.files&&a.files[0]){var e=new FileReader;e.onload=function(a){L.uploadMainImg=a.target.result.replace(/.*,/,""),n.parent().addClass("on").find("img").addClass("on").attr("src",a.target.result)},e.readAsDataURL(a.files[0])}}function O(a,n,e){$.ajax({url:"https://api.mlab.com/api/1/databases/rhinomotor2017/collections/"+a+'?s={"_id":-1}&apiKey='+R.mlabApikey,type:"GET",contentType:"application/json",success:function(a){e||(e=0),n(a,e)},error:function(a,n,e){console.log("error:",a,n,e)}})}function K(a){var n=a.height();a.parent().hasClass("on")?a.parent().removeClass("on"):(a.parent().addClass("on"),n=a.height()+a.parent().find(".box").outerHeight(!0)),a.parent().css("height",n)}function S(a){window.location.href=a.attr("data-page")+"#access_token="+window.location.href.split("#access_token=")[1]}function q(){$.cookie("useraccount",""),$.cookie("userpassword",""),window.location.href="index.html"}function J(){var a=!1;return $.cookie("useraccount")&&$.cookie("userpassword")&&(a=!0),a}function M(a){$(a+" input").val(""),$(a+" textarea").val("")}function E(a){a?$(".loading").fadeIn():($(".loading").hasClass("on")||$(".loading").addClass("on"),$(".loading").fadeOut())}var R={};R.wrp=$(".wrapper"),R.mlabApikey="n6FXodWWCdM14KrePZHrRPPovbzboRn6",R.imgurappid="4dd8fdf80527e2a",R.creatUsererrortxt="請填寫完整資料",R.motifyerrortxt="上一筆資料還在修改中，請先完成上一筆修改再繼續。";var L={wrp:$(".wrapper"),defaultCarsImg:"https://ml-andy.github.io/RhinoMotor/andy/images/cars_content_pic1.jpg",defaultPressImg:"https://ml-andy.github.io/RhinoMotor/andy/images/press_b_slide1.jpg",UploadImg:"",indexUploadImg:"",uploadMainImg:"",offsetTop:$(".content .list .t").offset().top};try{R.nowpage=getUrlVars().page.replace("#access_token","")}catch(z){R.nowpage=1}R.wrp.hasClass("cars")?(L.nowPage="carsPage",O(L.nowPage,p)):R.wrp.hasClass("press")?(L.nowPage="pressPage",O(L.nowPage,c)):R.wrp.hasClass("main")?(L.nowPage="indexBanner",O(L.nowPage,r)):R.wrp.hasClass("contact")?(L.nowPage="emailbox",O(L.nowPage,o)):R.wrp.hasClass("user")?(L.nowPage="user",O(L.nowPage,e)):R.wrp.hasClass("member")?(L.nowPage="memberData",O(L.nowPage,a)):E(!1),$(".logoutbtn").click(function(){q()}),$(".menua").click(function(){S($(this))}),$(".searchbox .submit").click(function(){E(!0);var a=$(".searchbox .addBrands").val();""!=a||void 0!=a?v(L.nowPage,a):(alert(R.creatUsererrortxt),E(!1))}),$(".deleteBrands").click(function(){window.confirm("確定刪除嗎?")&&g(L.nowPage,L.nowDataBrands)}),$(".addbox .submit").click(function(){D()}),$(window).on("scroll",function(){window.pageYOffset>=L.offsetTop?$(".content .list .t").addClass("ontop"):$(".content .list .t").removeClass("ontop")}),$(window).load(function(){if(console.log("v 170502"),J())try{R.imgurToken=window.location.href.split("#")[1].split("&")[0].replace("access_token=",""),$(".userMenu .icon").html($.cookie("useraccount").substring(0,1)),$(".userMenu .name").html($.cookie("username"))}catch(a){window.location.href="https://api.imgur.com/oauth2/authorize?response_type=token&client_id="+R.imgurappid}else window.location.href="index.html"+window.location.hash})});