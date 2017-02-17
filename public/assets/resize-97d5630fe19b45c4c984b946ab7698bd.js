// Copyright (c) 2005-2008 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// The above copyright notice and this permission notice shall be
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
function endCropHandler(e,t){$("x1").value=e.x1,$("y1").value=e.y1,$("x2").value=e.x2,$("y2").value=e.y2,$("width").value=t.width,$("height").value=t.height}var Scriptaculous={Version:"1.8.2",require:function(e){document.write('<script type="text/javascript" src="'+e+'"></script>')},REQUIRED_PROTOTYPE:"1.6.0.3",load:function(){function e(e){var t=e.replace(/_.*|\./g,"");return t=parseInt(t+"0".times(4-t.length)),e.indexOf("_")>-1?t-1:t}if("undefined"==typeof Prototype||"undefined"==typeof Element||"undefined"==typeof Element.Methods||e(Prototype.Version)<e(Scriptaculous.REQUIRED_PROTOTYPE))throw"script.aculo.us requires the Prototype JavaScript framework >= "+Scriptaculous.REQUIRED_PROTOTYPE;var t=/scriptaculous\.js(\?.*)?$/;$$("head script[src]").findAll(function(e){return e.src.match(t)}).each(function(e){var i=e.src.replace(t,""),n=e.src.match(/\?.*load=([a-z,]*)/);(n?n[1]:"builder,effects,dragdrop,controls,slider").split(",").each(function(e){Scriptaculous.require(i+e+".js")})})}};Scriptaculous.load();
// Copyright (c) 2005-2008 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(e){e=e.toUpperCase();var t=this.NODEMAP[e]||"div",i=document.createElement(t);try{i.innerHTML="<"+e+"></"+e+">"}catch(e){}var n=i.firstChild||null;if(n&&n.tagName.toUpperCase()!=e&&(n=n.getElementsByTagName(e)[0]),n||(n=document.createElement(e)),n){if(arguments[1])if(this._isStringOrNumber(arguments[1])||arguments[1]instanceof Array||arguments[1].tagName)this._children(n,arguments[1]);else{var s=this._attributes(arguments[1]);if(s.length){try{i.innerHTML="<"+e+" "+s+"></"+e+">"}catch(e){}if(n=i.firstChild||null,!n){n=document.createElement(e);for(attr in arguments[1])n["class"==attr?"className":attr]=arguments[1][attr]}n.tagName.toUpperCase()!=e&&(n=i.getElementsByTagName(e)[0])}}return arguments[2]&&this._children(n,arguments[2]),$(n)}},_text:function(e){return document.createTextNode(e)},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(e){var t=[];for(attribute in e)t.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+e[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"');return t.join(" ")},_children:function(e,t){return t.tagName?void e.appendChild(t):void("object"==typeof t?t.flatten().each(function(t){"object"==typeof t?e.appendChild(t):Builder._isStringOrNumber(t)&&e.appendChild(Builder._text(t))}):Builder._isStringOrNumber(t)&&e.appendChild(Builder._text(t)))},_isStringOrNumber:function(e){return"string"==typeof e||"number"==typeof e},build:function(e){var t=this.node("div");return $(t).update(e.strip()),t.down()},dump:function(e){"object"!=typeof e&&"function"!=typeof e&&(e=window);var t="A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR".split(/\s+/);t.each(function(t){e[t]=function(){return Builder.node.apply(Builder,[t].concat($A(arguments)))}})}},CropDraggable=Class.create();Object.extend(Object.extend(CropDraggable.prototype,Draggable.prototype),{initialize:function(e){this.options=Object.extend({drawMethod:function(){}},arguments[1]||{}),this.element=$(e),this.handle=this.element,this.delta=this.currentDelta(),this.dragging=!1,this.eventMouseDown=this.initDrag.bindAsEventListener(this),Event.observe(this.handle,"mousedown",this.eventMouseDown),Draggables.register(this)},draw:function(e){var t=Position.cumulativeOffset(this.element),i=this.currentDelta();t[0]-=i[0],t[1]-=i[1];var n=[0,1].map(function(i){return e[i]-t[i]-this.offset[i]}.bind(this));this.options.drawMethod(n)}});var Cropper={};Cropper.Img=Class.create(),Cropper.Img.prototype={initialize:function(e,t){if(this.options=Object.extend({ratioDim:{x:0,y:0},minWidth:0,minHeight:0,displayOnInit:!1,onEndCrop:Prototype.emptyFunction,captureKeys:!0,onloadCoords:null,maxWidth:0,maxHeight:0},t||{}),this.img=$(e),this.clickCoords={x:0,y:0},this.dragging=!1,this.resizing=!1,this.isWebKit=/Konqueror|Safari|KHTML/.test(navigator.userAgent),this.isIE=/MSIE/.test(navigator.userAgent),this.isOpera8=/Opera\s[1-8]/.test(navigator.userAgent),this.ratioX=0,this.ratioY=0,this.attached=!1,this.fixedWidth=this.options.maxWidth>0&&this.options.minWidth>=this.options.maxWidth,this.fixedHeight=this.options.maxHeight>0&&this.options.minHeight>=this.options.maxHeight,"undefined"!=typeof this.img){if(this.options.ratioDim.x>0&&this.options.ratioDim.y>0){var i=this.getGCD(this.options.ratioDim.x,this.options.ratioDim.y);this.ratioX=this.options.ratioDim.x/i,this.ratioY=this.options.ratioDim.y/i}this.subInitialize(),this.img.complete||this.isWebKit?this.onLoad():Event.observe(this.img,"load",this.onLoad.bindAsEventListener(this))}},getGCD:function(e,t){return 0==t?e:this.getGCD(t,e%t)},onLoad:function(){var e="imgCrop_",t=this.img.parentNode,i="";this.isOpera8&&(i=" opera8"),this.imgWrap=Builder.node("div",{"class":e+"wrap"+i}),this.north=Builder.node("div",{"class":e+"overlay "+e+"north"},[Builder.node("span")]),this.east=Builder.node("div",{"class":e+"overlay "+e+"east"},[Builder.node("span")]),this.south=Builder.node("div",{"class":e+"overlay "+e+"south"},[Builder.node("span")]),this.west=Builder.node("div",{"class":e+"overlay "+e+"west"},[Builder.node("span")]);var n=[this.north,this.east,this.south,this.west];this.dragArea=Builder.node("div",{"class":e+"dragArea"},n),this.handleN=Builder.node("div",{"class":e+"handle "+e+"handleN"}),this.handleNE=Builder.node("div",{"class":e+"handle "+e+"handleNE"}),this.handleE=Builder.node("div",{"class":e+"handle "+e+"handleE"}),this.handleSE=Builder.node("div",{"class":e+"handle "+e+"handleSE"}),this.handleS=Builder.node("div",{"class":e+"handle "+e+"handleS"}),this.handleSW=Builder.node("div",{"class":e+"handle "+e+"handleSW"}),this.handleW=Builder.node("div",{"class":e+"handle "+e+"handleW"}),this.handleNW=Builder.node("div",{"class":e+"handle "+e+"handleNW"}),this.selArea=Builder.node("div",{"class":e+"selArea"},[Builder.node("div",{"class":e+"marqueeHoriz "+e+"marqueeNorth"},[Builder.node("span")]),Builder.node("div",{"class":e+"marqueeVert "+e+"marqueeEast"},[Builder.node("span")]),Builder.node("div",{"class":e+"marqueeHoriz "+e+"marqueeSouth"},[Builder.node("span")]),Builder.node("div",{"class":e+"marqueeVert "+e+"marqueeWest"},[Builder.node("span")]),this.handleN,this.handleNE,this.handleE,this.handleSE,this.handleS,this.handleSW,this.handleW,this.handleNW,Builder.node("div",{"class":e+"clickArea"})]),this.imgWrap.appendChild(this.img),this.imgWrap.appendChild(this.dragArea),this.dragArea.appendChild(this.selArea),this.dragArea.appendChild(Builder.node("div",{"class":e+"clickArea"})),t.appendChild(this.imgWrap),this.startDragBind=this.startDrag.bindAsEventListener(this),Event.observe(this.dragArea,"mousedown",this.startDragBind),this.onDragBind=this.onDrag.bindAsEventListener(this),Event.observe(document,"mousemove",this.onDragBind),this.endCropBind=this.endCrop.bindAsEventListener(this),Event.observe(document,"mouseup",this.endCropBind),this.resizeBind=this.startResize.bindAsEventListener(this),this.handles=[this.handleN,this.handleNE,this.handleE,this.handleSE,this.handleS,this.handleSW,this.handleW,this.handleNW],this.registerHandles(!0),this.options.captureKeys&&(this.keysBind=this.handleKeys.bindAsEventListener(this),Event.observe(document,"keypress",this.keysBind)),new CropDraggable(this.selArea,{drawMethod:this.moveArea.bindAsEventListener(this)}),this.setParams()},registerHandles:function(e){for(var t=0;t<this.handles.length;t++){var i=$(this.handles[t]);if(e){var n=!1;if(this.fixedWidth&&this.fixedHeight)n=!0;else if(this.fixedWidth||this.fixedHeight){var s=i.className.match(/([S|N][E|W])$/),o=i.className.match(/(E|W)$/),r=i.className.match(/(N|S)$/);s?n=!0:this.fixedWidth&&o?n=!0:this.fixedHeight&&r&&(n=!0)}n?i.hide():Event.observe(i,"mousedown",this.resizeBind)}else i.show(),Event.stopObserving(i,"mousedown",this.resizeBind)}},setParams:function(){this.imgW=this.img.width,this.imgH=this.img.height,$(this.north).setStyle({height:0}),$(this.east).setStyle({width:0,height:0}),$(this.south).setStyle({height:0}),$(this.west).setStyle({width:0,height:0}),$(this.imgWrap).setStyle({width:this.imgW+"px",height:this.imgH+"px"}),$(this.selArea).hide();var e={x1:0,y1:0,x2:0,y2:0},t=!1;null!=this.options.onloadCoords?(e=this.cloneCoords(this.options.onloadCoords),t=!0):this.options.ratioDim.x>0&&this.options.ratioDim.y>0&&(e.x1=Math.ceil((this.imgW-this.options.ratioDim.x)/2),e.y1=Math.ceil((this.imgH-this.options.ratioDim.y)/2),e.x2=e.x1+this.options.ratioDim.x,e.y2=e.y1+this.options.ratioDim.y,t=!0),this.setAreaCoords(e,!1,!1,1),this.options.displayOnInit&&t&&(this.selArea.show(),this.drawArea(),this.endCrop()),this.attached=!0},remove:function(){this.attached&&(this.attached=!1,this.imgWrap.parentNode.insertBefore(this.img,this.imgWrap),this.imgWrap.parentNode.removeChild(this.imgWrap),Event.stopObserving(this.dragArea,"mousedown",this.startDragBind),Event.stopObserving(document,"mousemove",this.onDragBind),Event.stopObserving(document,"mouseup",this.endCropBind),this.registerHandles(!1),this.options.captureKeys&&Event.stopObserving(document,"keypress",this.keysBind))},reset:function(){this.attached?this.setParams():this.onLoad(),this.endCrop()},handleKeys:function(e){var t={x:0,y:0};if(!this.dragging){switch(e.keyCode){case 37:t.x=-1;break;case 38:t.y=-1;break;case 39:t.x=1;break;case 40:t.y=1}0==t.x&&0==t.y||(e.shiftKey&&(t.x*=10,t.y*=10),this.moveArea([this.areaCoords.x1+t.x,this.areaCoords.y1+t.y]),Event.stop(e))}},calcW:function(){return this.areaCoords.x2-this.areaCoords.x1},calcH:function(){return this.areaCoords.y2-this.areaCoords.y1},moveArea:function(e){this.setAreaCoords({x1:e[0],y1:e[1],x2:e[0]+this.calcW(),y2:e[1]+this.calcH()},!0,!1),this.drawArea()},cloneCoords:function(e){return{x1:e.x1,y1:e.y1,x2:e.x2,y2:e.y2}},setAreaCoords:function(e,t,i,n,s){if(t){var o=e.x2-e.x1,r=e.y2-e.y1;e.x1<0&&(e.x1=0,e.x2=o),e.y1<0&&(e.y1=0,e.y2=r),e.x2>this.imgW&&(e.x2=this.imgW,e.x1=this.imgW-o),e.y2>this.imgH&&(e.y2=this.imgH,e.y1=this.imgH-r)}else if(e.x1<0&&(e.x1=0),e.y1<0&&(e.y1=0),e.x2>this.imgW&&(e.x2=this.imgW),e.y2>this.imgH&&(e.y2=this.imgH),null!=n){this.ratioX>0?this.applyRatio(e,{x:this.ratioX,y:this.ratioY},n,s):i&&this.applyRatio(e,{x:1,y:1},n,s);var a=[this.options.minWidth,this.options.minHeight],l=[this.options.maxWidth,this.options.maxHeight];if(a[0]>0||a[1]>0||l[0]>0||l[1]>0){var c={a1:e.x1,a2:e.x2},u={a1:e.y1,a2:e.y2},h={min:0,max:this.imgW},d={min:0,max:this.imgH};0==a[0]&&0==a[1]||!i||(a[0]>0?a[1]=a[0]:a[1]>0&&(a[0]=a[1])),0==l[0]&&0==l[0]||!i||(l[0]>0&&l[0]<=l[1]?l[1]=l[0]:l[1]>0&&l[1]<=l[0]&&(l[0]=l[1])),a[0]>0&&this.applyDimRestriction(c,a[0],n.x,h,"min"),a[1]>1&&this.applyDimRestriction(u,a[1],n.y,d,"min"),l[0]>0&&this.applyDimRestriction(c,l[0],n.x,h,"max"),l[1]>1&&this.applyDimRestriction(u,l[1],n.y,d,"max"),e={x1:c.a1,y1:u.a1,x2:c.a2,y2:u.a2}}}this.areaCoords=e},applyDimRestriction:function(e,t,i,n,s){var o;o="min"==s?e.a2-e.a1<t:e.a2-e.a1>t,o&&(1==i?e.a2=e.a1+t:e.a1=e.a2-t,e.a1<n.min?(e.a1=n.min,e.a2=t):e.a2>n.max&&(e.a1=n.max-t,e.a2=n.max))},applyRatio:function(e,t,i,n){var s;"N"==n||"S"==n?(s=this.applyRatioToAxis({a1:e.y1,b1:e.x1,a2:e.y2,b2:e.x2},{a:t.y,b:t.x},{a:i.y,b:i.x},{min:0,max:this.imgW}),e.x1=s.b1,e.y1=s.a1,e.x2=s.b2,e.y2=s.a2):(s=this.applyRatioToAxis({a1:e.x1,b1:e.y1,a2:e.x2,b2:e.y2},{a:t.x,b:t.y},{a:i.x,b:i.y},{min:0,max:this.imgH}),e.x1=s.a1,e.y1=s.b1,e.x2=s.a2,e.y2=s.b2)},applyRatioToAxis:function(e,t,i,n){var s,o,r=Object.extend(e,{}),a=r.a2-r.a1,l=Math.floor(a*t.b/t.a),c=null;return 1==i.b?(s=r.b1+l,s>n.max&&(s=n.max,c=s-r.b1),r.b2=s):(s=r.b2-l,s<n.min&&(s=n.min,c=s+r.b2),r.b1=s),null!=c&&(o=Math.floor(c*t.a/t.b),1==i.a?r.a2=r.a1+o:r.a1=r.a1=r.a2-o),r},drawArea:function(){var e=this.calcW(),t=this.calcH(),i="px",n=[this.areaCoords.x1+i,this.areaCoords.y1+i,e+i,t+i,this.areaCoords.x2+i,this.areaCoords.y2+i,this.img.width-this.areaCoords.x2+i,this.img.height-this.areaCoords.y2+i],s=this.selArea.style;s.left=n[0],s.top=n[1],s.width=n[2],s.height=n[3];var o=Math.ceil((e-6)/2)+i,r=Math.ceil((t-6)/2)+i;this.handleN.style.left=o,this.handleE.style.top=r,this.handleS.style.left=o,this.handleW.style.top=r,this.north.style.height=n[1];var a=this.east.style;a.top=n[1],a.height=n[3],a.left=n[4],a.width=n[6];var l=this.south.style;l.top=n[5],l.height=n[7];var c=this.west.style;c.top=n[1],c.height=n[3],c.width=n[0],this.subDrawArea(),this.forceReRender()},forceReRender:function(){if(this.isIE||this.isWebKit){var e,t,i,n=document.createTextNode(" ");if(this.isIE)fixEl=this.selArea;else if(this.isWebKit){fixEl=document.getElementsByClassName("imgCrop_marqueeSouth",this.imgWrap)[0],e=Builder.node("div",""),e.style.visibility="hidden";var s=["SE","S","SW"];for(i=0;i<s.length;i++)t=document.getElementsByClassName("imgCrop_handle"+s[i],this.selArea)[0],t.childNodes.length&&t.removeChild(t.childNodes[0]),t.appendChild(e)}fixEl.appendChild(n),fixEl.removeChild(n)}},startResize:function(e){this.startCoords=this.cloneCoords(this.areaCoords),this.resizing=!0,this.resizeHandle=Event.element(e).classNames().toString().replace(/([^N|NE|E|SE|S|SW|W|NW])+/,""),Event.stop(e)},startDrag:function(e){this.selArea.show(),this.clickCoords=this.getCurPos(e),this.setAreaCoords({x1:this.clickCoords.x,y1:this.clickCoords.y,x2:this.clickCoords.x,y2:this.clickCoords.y},!1,!1,null),this.dragging=!0,this.onDrag(e),Event.stop(e)},getCurPos:function(e){for(var t=this.imgWrap,i=Position.cumulativeOffset(t);"BODY"!=t.nodeName;)i[1]-=t.scrollTop||0,i[0]-=t.scrollLeft||0,t=t.parentNode;return curPos={x:Event.pointerX(e)-i[0],y:Event.pointerY(e)-i[1]}},onDrag:function(e){if(this.dragging||this.resizing){var t=null,i=this.getCurPos(e),n=this.cloneCoords(this.areaCoords),s={x:1,y:1};this.dragging?(i.x<this.clickCoords.x&&(s.x=-1),i.y<this.clickCoords.y&&(s.y=-1),this.transformCoords(i.x,this.clickCoords.x,n,"x"),this.transformCoords(i.y,this.clickCoords.y,n,"y")):this.resizing&&(t=this.resizeHandle,t.match(/E/)?(this.transformCoords(i.x,this.startCoords.x1,n,"x"),i.x<this.startCoords.x1&&(s.x=-1)):t.match(/W/)&&(this.transformCoords(i.x,this.startCoords.x2,n,"x"),i.x<this.startCoords.x2&&(s.x=-1)),t.match(/N/)?(this.transformCoords(i.y,this.startCoords.y2,n,"y"),i.y<this.startCoords.y2&&(s.y=-1)):t.match(/S/)&&(this.transformCoords(i.y,this.startCoords.y1,n,"y"),i.y<this.startCoords.y1&&(s.y=-1))),this.setAreaCoords(n,!1,e.shiftKey,s,t),this.drawArea(),Event.stop(e)}},transformCoords:function(e,t,i,n){var s=[e,t];e>t&&s.reverse(),i[n+"1"]=s[0],i[n+"2"]=s[1]},endCrop:function(){this.dragging=!1,this.resizing=!1,this.options.onEndCrop(this.areaCoords,{width:this.calcW(),height:this.calcH()})},subInitialize:function(){},subDrawArea:function(){}},Cropper.ImgWithPreview=Class.create(),Object.extend(Object.extend(Cropper.ImgWithPreview.prototype,Cropper.Img.prototype),{subInitialize:function(){this.hasPreviewImg=!1,"undefined"!=typeof this.options.previewWrap&&this.options.minWidth>0&&this.options.minHeight>0&&(this.previewWrap=$(this.options.previewWrap),this.previewImg=this.img.cloneNode(!1),this.previewImg.id="imgCrop_"+this.previewImg.id,this.options.displayOnInit=!0,this.hasPreviewImg=!0,this.previewWrap.addClassName("imgCrop_previewWrap"),this.previewWrap.setStyle({width:this.options.minWidth+"px",height:this.options.minHeight+"px"}),this.previewWrap.appendChild(this.previewImg))},subDrawArea:function(){if(this.hasPreviewImg){var e=this.calcW(),t=this.calcH(),i={x:this.imgW/e,y:this.imgH/t},n={x:e/this.options.minWidth,y:t/this.options.minHeight},s={w:Math.ceil(this.options.minWidth*i.x)+"px",h:Math.ceil(this.options.minHeight*i.y)+"px",x:"-"+Math.ceil(this.areaCoords.x1/n.x)+"px",y:"-"+Math.ceil(this.areaCoords.y1/n.y)+"px"},o=this.previewImg.style;o.width=s.w,o.height=s.h,o.left=s.x,o.top=s.y}}}),Event.observe(window,"load",function(){new Cropper.ImgWithPreview("avatar",{minWidth:200,minHeight:200,ratioDim:{x:50,y:50},displayOnInit:!0,onEndCrop:endCropHandler,previewWrap:"previewArea"})});