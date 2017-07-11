var VEEVA=VEEVA||{};!function(window,document,$,undefined){VEEVA.iRep=function(settings){this.veevaTrackSubsceneField=settings.veevaTrackSubsceneField,this.product=settings.product,this.presentationPrimary=settings.presentationPrimary,this.presentationPDFs=settings.presentationPDFs,this.presentationVideos=settings.presentationVideos,this.currentSectionName=settings.section,this.currentSection="",this.currentKeyMessage="",this.rootURL="",this.isDeployed=settings.isDeployed===!0,this.debug=!settings.isDeployed,this.appConfigFile="global/app.json",this.eventClick=settings.isDeployed?"touchend":"click",this.appBody=$("#app-body"),this.containerMainISI="#main-isi",this.btnISI=$(".isi-bar"),this.fileISI="global/isi.html",this.startTimeout="",this.mainISI="",this.popup="",this.sectionNumber=0,this.slideNumber=0,this.state={},this.bottomAdded=!1,this._init()},VEEVA.iRep.prototype={constructor:VEEVA.iRep,log:function(){return this.debug&&window.top.console.log("",arguments),this},_init:function(){var $this=this;$this.log("Product: ",$this.product.name),$this.log("Loading: ",$this.appConfigFile),$.ajax({type:"GET",url:$this.appConfigFile,dataType:"json",success:function(data){utilKeyMessages.loadKeymessages(data),$this.log("Loading app.json",utilKeyMessages),$this.start()},error:function(){$this.log("Error: issue loading file ",$this.appConfigFile)}})},start:function(){var $this=this;$this.log("Init: App"),$this.log("This Object: ",$this);var hash=location.hash.substr(1);return"screenshot"===hash&&($this.isDeployed=!1),$this.currentSectionName=$this.product.name+$this.product.suffix+$this.currentSectionName,$this.btnISI.one($this.eventClick,function(e){$this.log("Event: ISI button ",$this.eventClick),e.preventDefault(),e.stopPropagation(),0===$($this.containerMainISI).length&&($this.appBody.append('<section id="main-isi" class="main-isi" />'),$this.mainISI=new MainISI($this))}),$this.appBody.find(".logo-product").on($this.eventClick,function(){$this.log("Event: Product logo ",$this.eventClick),$this.isDeployed?$this.goToSlide($this.product.name+$this.product.suffix+"home.zip",$this.presentationPrimary):document.location="../"+$this.product.name+$this.product.suffix+"home/"+$this.product.name+$this.product.suffix+"home.html"}),$this.appBody.on($this.eventClick,".btn-goto",function(event){event.preventDefault(),$this.log($this,"Event: btn-goto",event);var _this=$(this),_section=_this.attr("data-section")!==undefined?_this.attr("data-section"):"",_slide=_this.attr("data-slide")!==undefined?_this.attr("data-slide"):"0";$this.isDeployed&&$this.veevaUpdateUserObject(_slide,function(){$this.goToSlide(_section+".zip",$this.presentationPrimary)})}),$this.appBody.on($this.eventClick,".btn-external",function(event){event.preventDefault(),$this.log($this,"Event: btn-external",event);var _this=$(this),_keyMessage=_this.attr("data-key-message")!==undefined?_this.attr("data-key-message"):"",_presentation=_this.attr("data-veeva-presentation")||$this.presentationPrimary;$this.isDeployed&&""!==_keyMessage&&""!==_presentation?$this.veevaUpdateUserObject(_keyMessage,function(){$this.goToSlide(_keyMessage+".zip",_presentation)}):document.location="../"+_keyMessage+"/"+_keyMessage+".html"}),$this.appBody.on($this.eventClick,".btn-link",function(event){event.preventDefault(),$this.log($this,"Event: btn-link",event);var _this=$(this),_keyMessage=_this.attr("data-key-message")||"",_product=(_this.attr("data-slide")!==undefined?_this.attr("data-slide"):"0",_this.attr("data-product")||$this.product.name),_presentation=_this.attr("data-veeva-presentation")||$this.presentationPrimary;$this.isDeployed&&""!==_keyMessage&&""!==_presentation?$this.veevaUpdateUserObject(_keyMessage,function(){$this.goToSlide(_product+$this.product.suffix+_keyMessage+".zip",_presentation)}):document.location="../"+_product+$this.product.suffix+_keyMessage+"/"+_product+$this.product.suffix+_keyMessage+".html"}),$(window).on("hashchange",function(e){$this.pageChanged(e)}),document.addEventListener("touchmove",function(e){e.preventDefault()}),$this.appBody.on("show.popup.MD",function(event){$this.log("Event: ","triggered","show.popup.MD",event),event.url&&$this.openPopup(event),event.trackID&&$this.isDeployed&&$this.addCallClickstream(event)}),$this.isDeployed?$this.veevaCheckForSubScene(function(blnSceneChanged){blnSceneChanged||$(window).trigger("hashchange")}):$(window).trigger("hashchange"),this}},VEEVA.iRep.prototype.pageChanged=function(event){var $this=this;if($this.log("Event: hashchange firing",$this),$this.state=event.getState(),$this.state.section=$this.currentSectionName,$this.log("State: ",$this.state),!$this.state.pageChange&&$this.state.section){$this.appBody.find("section.main-content section.page-load"),$this.currentKeyMessage=utilKeyMessages.getKeyMessageByName($this.currentSectionName);var nextSection=utilKeyMessages.getKeyMessageByIndex($this.currentKeyMessage.index+1),prevSection=utilKeyMessages.getKeyMessageByIndex($this.currentKeyMessage.index-1),sectionDetails={page:$this.state.page||0,section:$this.currentKeyMessage,sectionKey:$this.currentSectionName,sectionIndex:$this.currentKeyMessage.index,numSlides:$this.currentKeyMessage.numSlides,sectionNextIndex:$this.currentKeyMessage.sectionNextIndex,nextSection:nextSection,nextSectionKey:nextSection.key_message,nextSectionURL:nextSection.key_message+".html",prevSection:prevSection,prevSectionKey:prevSection.key_message,prevSectionURL:prevSection.key_message+".html",prevSectionnNumSlides:prevSection.slides.length};$this.currentSection=new Section($this,sectionDetails,function(){var appReadyEvent=$.Event("veeva.app.ready");if($this.log("Event: veeva.app.ready"),$(".main-content").fadeIn("slow"),$this.appBody.trigger(appReadyEvent),$this.state["#popup"]){var pLink=$this.state["#popup"];pLink=pLink.slice(pLink.lastIndexOf("=")+1,pLink.length);var popEvent=$.Event("show.popup.MD");popEvent.url=pLink,popEvent.popupType="popup",$this.appBody.trigger(popEvent)}})}return $this};var Section=function(_that,_options,callback){var noSwipeZone,noSwipeZoneYtop,noSwipeZoneYbottom,$that=_that,$this=this,defaults={page:0},$container=$that.appBody.find(".main-content"),$sectionSlides=$container.find("section slide"),options=$.extend(defaults,_options),htmlSubNav='<div class="subnav"><ul>',slideNoSwipeZones=[],$slidesConfigured=$(options.section.slides);$this.name=options.sectionKey,$this.activeSlide=0!==options.page?options.page-1:options.page,$sectionSlides.each(function(i,slide){noSwipeZone=$slidesConfigured[i].noSwipeZone||!1,noSwipeZoneYtop=parseInt(noSwipeZone.yTop)||0,noSwipeZoneYbottom=parseInt(noSwipeZone.yBottom)||0,noSwipeZone&&slideNoSwipeZones.push({slide:i,yTop:noSwipeZoneYtop,yBottom:noSwipeZoneYbottom}),$slidesConfigured[i].track&&$(slide).attr("track-id",$slidesConfigured[i].id).attr("track-type",$slidesConfigured[i].track).attr("track-description",$slidesConfigured[i].slide),htmlSubNav+='<li><a href="#" class="page-button trigger-swipe" id="'+$slidesConfigured[i].id+'" slideindex="'+i+'"><span class="nav-outer"><span>'+$slidesConfigured[i].slide+"</span></span></a></li>"}),htmlSubNav+="</ul></div>",$that.appBody.append(htmlSubNav),$sectionSlides.wrapInner('<div class="content"></div>'),$container.popupLinks({eventClick:$that.eventClick}),$container.veevaLink({eventClick:$that.eventClick,primaryPresentation:$that.presentationPrimary,videoPresentation:$that.presentationVideos,pdfPresentation:$that.presentationPDFs}),$container.on($that.eventClick,".open-chart",function(e){e.preventDefault(),e.stopPropagation();var $this=$(this),popEvent=$.Event("show.popup.MD"),popupType="popupFull"===$this.attr("popup-type")?"popupFull":"popup",pLink=$this.attr("data-link");return pLink=pLink.slice(pLink.lastIndexOf("=")+1,pLink.length),popEvent.url=pLink,popEvent.popupType=popupType,popEvent.trackID=$this.attr("track-id"),popEvent.trackType=$this.attr("track-type"),popEvent.trackDescription=$this.attr("track-description"),$this.trigger(popEvent),!1}),$container.veevaSwipeSlider({sliderClass:"section.page",slideClass:"slide",debug:$that.debug,eventClick:$that.eventClick,speed:400,startIndex:options.page,subNav:$(".subnav ul li"),stateManager:!1,blnSwiping:!0,slideNoSwipeZones:slideNoSwipeZones||!1,controlsShow:!0,onSlideChange:function(slider,index){var slideEvent=$.Event("change.slider.MD");slideEvent.slide=index,slider.trigger(slideEvent),$that.log("Event: change.slider.MD",slider,index),$(".chart.reload").hide();var $activeSlide=$(this.slides[index]),hasTracking=$activeSlide.attr("track-id")!==undefined?$activeSlide.attr("track-id"):"";hasTracking.length>0&&$that.isDeployed&&(event.trackID=hasTracking,event.trackType=$activeSlide.attr("track-type"),event.trackDescription=$activeSlide.attr("track-description"),$that.addCallClickstream(event))},onSlideAfterChange:function(slider,index){var activeSlide=this.slides[index];$(activeSlide).find(".chart.reload").fadeIn()},onSectionChange:function(dir){var prevSectionLastSlide=$that.isDeployed?options.prevSectionURL.replace(".html",".zip"):"../"+options.prevSectionURL.slice(0,-5)+"/"+options.prevSectionURL+"#page="+options.prevSectionnNumSlides,nextSectionFirstSlide=$that.isDeployed?options.nextSectionURL.replace(".html",".zip"):"../"+options.nextSectionURL.slice(0,-5)+"/"+options.nextSectionURL,setURL="prev"===dir?prevSectionLastSlide:nextSectionFirstSlide;return $container.fadeOut(),(options.prevSectionKey!==undefined&&"prev"===dir||options.nextSectionKey!==undefined&&"next"===dir)&&($that.isDeployed?("prev"===dir&&"0"!==options.prevSectionnNumSlides&&$that.veevaUpdateUserObject(options.prevSectionnNumSlides,function(){}),setTimeout(function(){$that.goToSlide(setURL,$that.presentationPrimary)},200)):$("section.main-content").fadeOut(300,function(){window.location=setURL})),this}}),callback()},MainISI=function(_this){var $that=_this,$mainISI=$($that.containerMainISI),isiOpen=!1,isiSlider=null;$that.log("Function load: MainISI"),$mainISI.append().load($that.fileISI,function(response,status,xhr){if("error"===status){var loadError=xhr.status+" "+xhr.statusText;$(this).append('<h1 class="error">'+loadError+"</h1>")}"success"===status&&sectionLoaded()});var sectionLoaded=function(){$that.btnISI.on($that.eventClick,function(e){eventHandlerToggleISI(e),e.stopPropagation()});var eventHandlerToggleISI=function(e){e.preventDefault&&e.preventDefault(),isiSlider&&isiOpen?(isiOpen=!1,$that.btnISI.find(".btn-isi").removeClass("on").addClass("off").html("Open"),$mainISI.removeClass("open").addClass("close"),isiSlider.destroy(),isiSlider=null):e.type===$that.eventClick&&(isiOpen=!0,$that.btnISI.find(".btn-isi").removeClass("off").addClass("on").html("Close"),isiSlider=new IScroll("#main-isi",{mouseWheel:!0,momentum:!0,checkDOMChanges:!0,onDestroy:function(){$mainISI.css({"overflow-y":"auto"}).removeClass("open").addClass("close")}}),$mainISI.removeClass("close").addClass("open").css({"overflow-y":"auto"}))};$that.btnISI.trigger($that.eventClick)};return $that};VEEVA.iRep.prototype.openPopup=function(event){var $that=this,$element="",url=event.url;if(""===$that.popup){var buildPopup='<div id="popup-wrapper"><div id="'+event.popupType+'" class="popup-inner">';buildPopup+='<a href="javascript:void(0)" class="close-button" ></a></div></div>',$(buildPopup).appendTo($that.appBody),$that.popup=$("#popup-wrapper")}$that.popup.addClass("on"),$element=$that.popup.find("#popup"),$element.load(url,function(response,status,xhr){if($element.append($('<a href="javascript:void(0)" class="close-button" />')),"error"===status){var loadError=xhr.status+" "+xhr.statusText;$element.append('<h1 class="error">'+loadError+"</h1>")}"success"===status&&sectionLoaded()});var sectionLoaded=function(){"popup"===$element.attr("id")?$element.clearQueue().show("scale",{percent:70,direction:"both"},30,function(){$element.trigger("popup.Ready"),$element.veevaLink({eventClick:$that.eventClick,primaryPresentation:$that.presentationPrimary,videoPresentation:$that.presentationVideos,pdfPresentation:$that.presentationPDFs})}):$element.show().animate({opacity:1},function(){$element.trigger("popup.Ready")})};return $that.popup.off().on($that.eventClick,".close-button",function(e){e.preventDefault(),e.stopPropagation(),$element.animate({top:0,opacity:0},300,function(){$(this).removeAttr("style"),$element.find(".content").detach(),$that.popup.removeClass("on")})}),$that},VEEVA.iRep.prototype.changeState=function(page){var state={};state.page=page,$.bbq.pushState(state)},VEEVA.iRep.prototype.goToSlide=function(slide,presentation){document.location="veeva:gotoSlide("+slide+", "+presentation+")"},VEEVA.iRep.prototype.addCallClickstream=function(event){var clickStream={};clickStream.Track_Element_Id_vod__c=event.trackID,clickStream.Track_Element_Type_vod__c=event.trackType,clickStream.Track_Element_Description_vod__c=event.trackDescription,com.veeva.clm.createRecord("Call_Clickstream_vod__c",clickStream,function(){})},VEEVA.iRep.prototype.veevaCheckForSubScene=function(cb){var $this=this,customUserObject=$this.veevaTrackSubsceneField;""===customUserObject&&cb(!1),com.veeva.clm.getDataForCurrentObject("User",customUserObject,function(result){if(result.success){var subscene=result.User[customUserObject.toString()];if("0"!==subscene)return $this.changeState(subscene),void $this.veevaUpdateUserObject("0",cb,!0);cb(!1)}})},VEEVA.iRep.prototype.veevaUpdateUserObject=function(subscene,cb){var $this=this,dataString={},customUserObject=$this.veevaTrackSubsceneField;""===customUserObject&&cb(!1),dataString[customUserObject.toString()]=subscene,com.veeva.clm.getDataForCurrentObject("User","ID",function(result){com.veeva.clm.updateRecord("User",result.User.ID,dataString,cb)})}}(window,document,jQuery,void 0),function($){$.fn.veevaLink=function(options){var defaults={eventClick:"click",primaryPresentation:"",videoPresentation:"",pdfPresentation:""},breakUp=function(str){for(var querystring=str.replace("#","").split("&"),queryObj={},i=0,len=querystring.length;len>i;i++){var name=querystring[i].split("=")[0],value=querystring[i].split("=")[1];queryObj[name]=value}return queryObj},settings=$.extend(defaults,options);return this?this.each(function(){$('a[href*="veevaLink"]',$(this)).on(settings.eventClick,function(event){event.preventDefault();var $this=$(this),linkObj=breakUp($this.attr("href")),pLink=linkObj.veevaLink,pType=linkObj.type,veevaPresentation="pdf"===pType?settings.pdfPresentation:settings.videoPresentation;return document.location="veeva:gotoSlide("+pLink+".zip,"+veevaPresentation+")",!1})}):!1},$.fn.popupLinks=function(options){var defaults={eventClick:"click"},settings=$.extend(defaults,options);return this?this.each(function(){$('a[href*="#popup"]',$(this)).on(settings.eventClick,function(e){e.preventDefault();var $this=$(this),popEvent=$.Event("show.popup.MD"),popupType="popupFull"===$this.attr("popup-type")?"popupFull":"popup",pLink=$this.attr("href");pLink=pLink.slice(pLink.lastIndexOf("=")+1,pLink.length),popEvent.url=pLink,popEvent.popupType=popupType,popEvent.trackID=$this.attr("track-id"),popEvent.trackType=$this.attr("track-type"),popEvent.trackDescription=$this.attr("track-description"),$this.trigger(popEvent)})}):!1}}(jQuery);var utilKeyMessages={keyMessageIndex:0,keyMessages:[],keyMessageNames:[],keyMessage:{},slides:null,totalKeyMessages:0,setKeyMessageNames:function(){utilKeyMessages.keyMessageNames=utilKeyMessages.keyMessages.map(function(e){return e.key_message})},getKeyMessageByIndex:function(index){var keyMessage={},valideIndex=index||0;return valideIndex>utilKeyMessages.totalKeyMessages?valideIndex=0:0>valideIndex&&(valideIndex=utilKeyMessages.totalKeyMessages),keyMessage=utilKeyMessages.keyMessages[valideIndex],keyMessage.index=valideIndex,keyMessage.numSlides=keyMessage.slides.length||0,keyMessage.sectionNextIndex=valideIndex+1===utilKeyMessages.totalKeyMessages?0:valideIndex+1,keyMessage},getKeyMessageByName:function(name){var keyMessageIndex=utilKeyMessages.keyMessageNames.indexOf(name),keyMessage={};return-1!==keyMessageIndex&&(keyMessage=utilKeyMessages.getKeyMessageByIndex(keyMessageIndex)),keyMessage},getNextKeyMessage:function(index){var keyMessage={};return keyMessage=utilKeyMessages.getKeyMessageByIndex(index+1)},getPrevKeyMessage:function(index){var keyMessage={};return keyMessage=utilKeyMessages.getKeyMessageByIndex(index-1)},loadKeymessages:function(data){utilKeyMessages.keyMessages=data,utilKeyMessages.setKeyMessageNames(),utilKeyMessages.totalKeyMessages=utilKeyMessages.keyMessages.length-1}};!function($){var utils=function(){var me={};return me.log=function(){return this.debug&&window.top.console.log("",arguments),this},me}();$.fn.veevaSwipeSlider=function(options){var defaults={debug:!1,slideEvent:"change.slider.MD",eventClick:"click",triggerSlideClass:"trigger-swipe",prevId:"prevBtn",prevText:"Previous",nextId:"nextBtn",nextText:"Next",controlsShow:!1,controlsBefore:"",controlsAfter:"",controlsFade:!0,firstId:"firstBtn",firstText:"First",firstShow:!1,lastId:"lastBtn",lastText:"Last",lastShow:!1,speed:800,auto:!1,pause:2e3,continuous:!1,blnSwiping:!0,slideNoSwipeZones:!1,startIndex:0,slideIndex:0,subNav:!1,stateID:"page",stateManager:!1,sliderClass:"ul.slideObj",slideClass:"li.slideObj",indicator:!1,indicatorId:"sliderDots",threshold:{x:100,y:100},onSectionChange:function(){},onSlideChange:function(){},onSlideAfterChange:function(){},goToSlide:function(slide){skipTo(slide)}},plugin=this;return plugin.options=$.extend(defaults,options,utils),plugin.options.slides=[],plugin.each(function(){function handleStateManager(){if(plugin.options.stateManager){var state={pageChange:!0};$.bbq.pushState(state)}}function handleSlideEvent(){plugin.options.onSlideChange($element,plugin.options.slideIndex)}function handleSubNav(){$(plugin.options.subNav).find("a").removeClass("active"),$(plugin.options.subNav[plugin.options.slideIndex]).find("a").addClass("active")}function skipTo(index){var p=index*w*-1,$slide=$(plugin.options.sliderClass,$element);plugin.options.slideIndex=index,$(plugin.options.subNav[index]).find("a").addClass("active"),$slide.find(".content").hide(),$slide.css({marginLeft:p}),$slide.find(".content").fadeIn("slow"),!plugin.options.continuous&&plugin.options.controlsFade&&(index===ts?($("a","#"+plugin.options.nextId).hide(),$("a","#"+plugin.options.lastId).hide()):($("a","#"+plugin.options.nextId).show(),$("a","#"+plugin.options.lastId).show()),0===index?($("a","#"+plugin.options.prevId).hide(),$("a","#"+plugin.options.firstId).hide()):($("a","#"+plugin.options.prevId).show(),$("a","#"+plugin.options.firstId).show()))}function animate(dir,clicked){var ot=plugin.options.slideIndex;switch(dir){case"next":plugin.options.slideIndex=ot>=ts?plugin.options.continuous?0:ts:plugin.options.slideIndex+1;break;case"prev":plugin.options.slideIndex=plugin.options.slideIndex<=0?plugin.options.continuous?ts:0:plugin.options.slideIndex-1;break;case"first":plugin.options.slideIndex=0;break;case"last":plugin.options.slideIndex=ts}var diff=Math.abs(ot-plugin.options.slideIndex),speed=diff*plugin.options.speed,position=plugin.options.slideIndex*w*-1;handleSlideEvent(),$(plugin.options.sliderClass,$element).animate({marginLeft:position},speed,function(){handleSubNav(),$(plugin.options.slides).removeClass("active"),$(plugin.options.slides[plugin.options.slideIndex]).addClass("active"),plugin.options.onSlideAfterChange($element,plugin.options.slideIndex)}),handleStateManager(),(0===ot&&0===plugin.options.slideIndex||ot===ts&&plugin.options.slideIndex===ts)&&plugin.options.onSectionChange(dir)}function touchMove(event){event.preventDefault(),finalCoord.x=event.targetTouches[0].pageX,finalCoord.y=event.targetTouches[0].pageY}function touchEnd(event){plugin.options.log("Swipe Event: touchEnd",event),plugin.options.log("Slide Index: ",plugin.options.slideIndex);var changeY=originalCoord.y-finalCoord.y;if(changeY<plugin.options.threshold.y&&changeY>-1*plugin.options.threshold.y){var changeX=originalCoord.x-finalCoord.x,noSwipeZone=plugin.options.slideNoSwipeZones[plugin.options.slideIndex]||!1,noSwipeZoneYtop=parseInt(noSwipeZone.yTop)||0,noSwipeZoneYbottom=parseInt(noSwipeZone.yBottom)||0;changeX>plugin.options.threshold.x&&(originalCoord.y>noSwipeZoneYtop&&originalCoord.y<noSwipeZoneYbottom?plugin.options.log("in the noSwipeZone"):(plugin.options.log("not in the noSwipeZone"),animate("next",!0))),changeX<-1*plugin.options.threshold.x&&(originalCoord.y>noSwipeZoneYtop&&originalCoord.y<noSwipeZoneYbottom?plugin.options.log("in the noSwipeZone"):(plugin.options.log("not in the noSwipeZone"),animate("prev",!0)))}}function touchStart(event){originalCoord.x=event.targetTouches[0].pageX,originalCoord.y=event.targetTouches[0].pageY,plugin.options.log("Swipe Event: touchStart",event),plugin.options.log("originalCoord.x",originalCoord.x),plugin.options.log("originalCoord.y",originalCoord.y),finalCoord.x=originalCoord.x,finalCoord.y=originalCoord.y}function touchCancel(event){plugin.options.log("Swipe Event: touchCancel",event)}var $element=$(this),s=$element.find(plugin.options.slideClass).length,w=$element.find(plugin.options.slideClass).width(),h=$element.find(plugin.options.slideClass).height(),ts=s-1;if(plugin.options.slideIndex=0,plugin.options.log("Init: swipeSlider: ",plugin.options,plugin.options.slideIndex),plugin.options.slides=$element.find(plugin.options.sliderClass).find(plugin.options.slideClass),$element.width(w).height(h).css("overflow","hidden"),$(plugin.options.sliderClass,$element).css({width:s*w}),plugin.options.controlsShow){var html=plugin.options.controlsBefore;html+='<div class="ctrl-next-slide" id="'+plugin.options.nextId+'"></div><div class="ctrl-pre-slide" id="'+plugin.options.prevId+'"></div>',html+=plugin.options.controlsAfter,$($element).append(html)}if($($element).find("#"+plugin.options.nextId).on(plugin.options.eventClick,function(e){e.preventDefault(),animate("next",!0)}),$($element).find("#"+plugin.options.prevId).on(plugin.options.eventClick,function(e){e.preventDefault(),animate("prev",!0)}),$(plugin.options.subNav).find("a").on(plugin.options.eventClick,function(e){e.preventDefault();var islideIndex=parseInt($(this).attr("slideindex"));skipTo(islideIndex),handleStateManager(),handleSubNav(),handleSlideEvent(),$(plugin.options.slides).removeClass("active"),$(plugin.options.slides[plugin.options.slideIndex]).addClass("active"),plugin.options.onSlideAfterChange($element,plugin.options.slideIndex)}),plugin.options.startIndex>0?skipTo(plugin.options.startIndex-1):$(plugin.options.subNav[plugin.options.startIndex]).find("a").addClass("active"),plugin.options.blnSwiping){var originalCoord={x:0,y:0},finalCoord={x:0,y:0};this.addEventListener("touchstart",touchStart,!1),this.addEventListener("touchmove",touchMove,!1),this.addEventListener("touchend",touchEnd,!1),this.addEventListener("touchcancel",touchCancel,!1)}return $element}),plugin}}(jQuery);