/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/ResizeHandler'],function(q,l,C,E,R){"use strict";var S=C.extend("sap.ui.commons.Slider",{metadata:{library:"sap.ui.commons",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},min:{type:"float",group:"Appearance",defaultValue:0},max:{type:"float",group:"Appearance",defaultValue:100},value:{type:"float",group:"Appearance",defaultValue:50},smallStepWidth:{type:"float",group:"Appearance",defaultValue:null},totalUnits:{type:"int",group:"Appearance",defaultValue:null},stepLabels:{type:"boolean",group:"Appearance",defaultValue:false},editable:{type:"boolean",group:"Behavior",defaultValue:true},enabled:{type:"boolean",group:"Behavior",defaultValue:true},labels:{type:"string[]",group:"Misc",defaultValue:null},vertical:{type:"boolean",group:"Appearance",defaultValue:false},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}}}});E.call(S.prototype);S.prototype.exit=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};S.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}var m=this.getMin();var M=this.getMax();if(m>M){q.sap.log.warning('Property wrong: Min:'+m+' > Max:'+M+'; values switched',this);this.setMin(M);this.setMax(m);M=m;m=this.getMin();}};S.prototype.onAfterRendering=function(){this.oGrip=this.getDomRef("grip");this.oBar=this.getDomRef("bar");this.oHiLi=this.getDomRef("hili");this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this.bAcc=sap.ui.getCore().getConfiguration().getAccessibility();this.bTextLabels=(this.getLabels()&&this.getLabels().length>0);this.oMovingGrip=this.oGrip;if(this.bTextLabels&&(this.getLabels().length-1)!=this.getTotalUnits()){q.sap.log.warning('label count should be one more than total units',this);}this.iDecimalFactor=this.calcDecimalFactor(this.getSmallStepWidth());this.iShiftGrip=Math.round(this.getOffsetWidth(this.oGrip)/2);var v=this.getValue();var m=this.getMin();var M=this.getMax();if(v>M){q.sap.log.warning('Property wrong: value:'+v+' > Max:'+M+'; value set to Max',this);v=M;}else if(v<m){q.sap.log.warning('Property wrong: value:'+v+' < Min:'+m+'; value set to Min',this);v=m;}var n=(v-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl||this.getVertical()){n=this.getBarWidth()-n;}this.changeGrip(v,n,this.oGrip);this.repositionTicksAndLabels();this.allowTextSelection(false);this.oDomRef=this.getDomRef();this.sResizeListenerId=R.register(this.oDomRef,q.proxy(this.onresize,this));};S.prototype.onclick=function(e){var m=this.oMovingGrip;if(this.getEditable()&&this.getEnabled()){var M;var s=e.target.getAttribute('ID');var n=this.getValue();var N=this.getOffsetLeft(this.oGrip)+this.iShiftGrip;var t=0;var o=0;var O=0;switch(s){case(this.oBar.id):case(this.oHiLi.id):if(this.getVertical()){M=this.getBarWidth()-this.getOffsetX(e);}else{M=this.getOffsetX(e);}if(s==this.oHiLi.id){if(this.getVertical()){M-=this.getOffsetLeft(this.oHiLi);}else{M+=this.getOffsetLeft(this.oHiLi);}}n=this.convertRtlValue(this.getMin()+(((this.getMax()-this.getMin())/this.getBarWidth())*M));N=this.getOffsetX(e);if(s==this.oHiLi.id){N+=this.getOffsetLeft(this.oHiLi);}if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget;}else if(this.targetIsGrip(s)){m=e.target;}else{m=this.getNearestGrip(N);}break;case(this.getId()+'-left'):N=0;if(this.getVertical()){n=this.getMax();m=this.getRightGrip();}else{n=this.getMin();m=this.getLeftGrip();}break;case(this.getId()+'-right'):N=this.getBarWidth();if(!this.getVertical()){n=this.getMax();m=this.getRightGrip();}else{n=this.getMin();m=this.getLeftGrip();}break;default:if(this.targetIsGrip(s)){return;}t=s.search('-tick');if(t>=0){var T=parseInt(s.slice(this.getId().length+5),10);N=this.fTickDist*T;var i;if(this.bTextLabels){i=this.getLabels().length-1;}else{i=this.getTotalUnits();}n=this.convertRtlValue(this.getMin()+(((this.getMax()-this.getMin())/i)*T));if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget;}else if(this.targetIsGrip(s)){m=e.target;}else{m=this.getNearestGrip(N);}break;}o=q(this.oBar).offset();O=q(e.target).offset();if(this.getVertical()){N=this.getOffsetX(e)-(o.top-O.top);}else{N=this.getOffsetX(e)-(o.left-O.left);}if(N<=0){N=0;if(this.getVertical()){n=this.getMax();}else{n=this.getMin();}}else{if(N>=this.getBarWidth()){N=this.getBarWidth();if(this.getVertical()){n=this.getMin();}else{n=this.getMax();}}else{if(this.getVertical()){M=this.getBarWidth()-N;}else{M=N;}n=this.getMin()+(((this.getMax()-this.getMin())/this.getBarWidth())*M);}}n=this.convertRtlValue(n);if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){m=this.oStartTarget;}else if(this.targetIsGrip(s)){m=e.target;}else{m=this.getNearestGrip(N);}break;}var v=this.validateNewPosition(n,N,m,(this.getValueForGrip(m)>n));n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,m);this.handleFireChange();}m.focus();this.oMovingGrip=m;this.oStartTarget=null;};S.prototype.onmousedown=function(e){if(this.getEditable()&&this.getEnabled()&&!this._cancelMousedown){var m=e.target.getAttribute('ID');if(this.targetIsGrip(m)){this.bGripMousedown=true;if(e.targetTouches){this.iStartDragX=e.targetTouches[0].pageX;this.iStartDragY=e.targetTouches[0].pageY;}else{this.iStartDragX=e.pageX;this.iStartDragY=e.pageY;}this.iStartLeft=this.getOffsetLeft(e.target)+this.iShiftGrip;this.oMovingGrip=e.target;var t=this;this.handleMoveCall=function(a){t.handleMove(a);};this.preventSelect=function(a){return false;};if(!e.targetTouches){q(window.document).bind('mousemove',this.handleMoveCall);q(window.document).bind('selectstart',this.preventSelect);q.sap.bindAnyEvent(q.proxy(this.onAnyEvent,this));}}this.oStartTarget=null;}};S.prototype.ontouchstart=function(e){if((e.originalEvent&&q.sap.startsWith(e.originalEvent.type,"mouse"))||(e.handleObj&&q.sap.startsWith(e.handleObj.origType,"mouse"))){return;}this._cancelMousedown=false;this.onmousedown(e);this._cancelMousedown=true;};S.prototype.onmouseup=function(e){if(this.getEditable()&&this.getEnabled()){this.bGripMousedown=false;if(this.handleMoveCall){q(window.document).unbind('mousemove',this.handleMoveCall);q(window.document).unbind('selectstart',this.preventSelect);q.sap.unbindAnyEvent(this.onAnyEvent);if(this.iStartLeft!=(this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip)){this.handleFireChange(true);}this.handleMoveCall=null;this.iStartDragX=null;this.iStartDragY=null;this.iStartLeft=null;}}};S.prototype.ontouchend=function(e){if((e.originalEvent&&q.sap.startsWith(e.originalEvent.type,"mouse"))||(e.handleObj&&q.sap.startsWith(e.handleObj.origType,"mouse"))){return;}this.onmouseup(e);};S.prototype.handleMove=function(e){if(this.getEditable()&&this.getEnabled()&&this.bGripMousedown){e=e||window.event;var p,P;if(e.targetTouches){p=e.targetTouches[0].pageX;P=e.targetTouches[0].pageY;}else{p=e.pageX;P=e.pageY;}var n;var N;if(this.getVertical()){n=this.iStartLeft+P-this.iStartDragY;}else{n=this.iStartLeft+p-this.iStartDragX;}if(n<=0){n=0;if(this.getVertical()){N=this.getMax();}else{N=this.getMin();}}else{if(n>=this.getBarWidth()){n=this.getBarWidth();if(this.getVertical()){N=this.getMin();}else{N=this.getMax();}}else{var m;if(this.getVertical()){m=this.getBarWidth()-n;}else{m=n;}N=this.getMin()+(((this.getMax()-this.getMin())/this.getBarWidth())*m);}}N=this.convertRtlValue(N);var o=this.getValueForGrip(this.oMovingGrip);var v=this.validateNewPosition(N,n,this.oMovingGrip,(o>N));N=v.fNewValue;n=v.iNewPos;this.changeGrip(N,n,this.oMovingGrip);N=this.getValueForGrip(this.oMovingGrip);this.fireLiveChangeForGrip(this.oMovingGrip,N,o);this.oStartTarget=this.oMovingGrip;}e.cancelBubble=true;return false;};S.prototype.ontouchmove=function(e){if((e.originalEvent&&q.sap.startsWith(e.originalEvent.type,"mouse"))||(e.handleObj&&q.sap.startsWith(e.handleObj.origType,"mouse"))){return;}this.handleMove(e);e.preventDefault();};S.prototype.fireLiveChangeForGrip=function(g,n,o){if(g==this.oGrip){if(o!=n){this.fireLiveChange({value:n});}}};S.prototype.onAnyEvent=function(e){q.sap.log.info('onAnyEvent fired: "'+e.type+'"');if((!this.getEditable())||(!this.getEnabled())||!this.bGripMousedown){return;}var s=e.target;if((!q.sap.containsOrEquals(this.oDomRef,s)||s.tagName=="BODY")&&e.type=='mouseup'){this.onmouseup(e);}};S.prototype.onsapright=function(e){if(this.getEditable()&&this.getEnabled()){var n=this.convertRtlValue(this.getValueForGrip(this.oMovingGrip));var N=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip;if(this.getSmallStepWidth()>0){var s=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(s>1){n=n+this.getSmallStepWidth();if(this.getVertical()){N=N-s;}else{N=N+s;}}else{n=n+(1/s*this.getSmallStepWidth());if(this.getVertical()){N=N-1;}else{N=N+1;}}}else{n=n+((this.getMax()-this.getMin())/this.getBarWidth());if(this.getVertical()){N=N-1;}else{N=N+1;}}n=this.convertRtlValue(n);var v=this.validateNewPosition(n,N,this.oMovingGrip,!this.getVertical()&&this.bRtl);n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange();}e.preventDefault();e.stopPropagation();};S.prototype.onsapleft=function(e){if(this.getEditable()&&this.getEnabled()){var n=this.convertRtlValue(this.getValueForGrip(this.oMovingGrip));var N=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip;if(this.getSmallStepWidth()>0){var s=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(s>1){n=n-this.getSmallStepWidth();if(this.getVertical()){N=N+s;}else{N=N-s;}}else{n=n-(1/s*this.getSmallStepWidth());if(this.getVertical()){N=N+1;}else{N=N-1;}}}else{n=n-((this.getMax()-this.getMin())/this.getBarWidth());if(this.getVertical()){N=N+1;}else{N=N-1;}}n=this.convertRtlValue(n);var v=this.validateNewPosition(n,N,this.oMovingGrip,this.getVertical()||!this.bRtl);n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange();}e.preventDefault();e.stopPropagation();};S.prototype.onsapup=function(e){if(this.bRtl&&!this.getVertical()){this.onsapleft(e);}else{this.onsapright(e);}};S.prototype.onsapdown=function(e){if(this.bRtl&&!this.getVertical()){this.onsapright(e);}else{this.onsapleft(e);}};S.prototype.onsapexpand=function(e){if(!this.bRtl){this.onsapright(e);}else{this.onsapleft(e);}};S.prototype.onsapcollapse=function(e){if(!this.bRtl){this.onsapleft(e);}else{this.onsapright(e);}};S.prototype.onsaphome=function(e){if(this.getEditable()&&this.getEnabled()){var n=0;if(this.getVertical()||(this.bRtl&&!this.getVertical())){n=this.getBarWidth();}this.changeGrip(this.getMin(),n,this.oMovingGrip);this.handleFireChange();}e.preventDefault();e.stopPropagation();};S.prototype.onsapend=function(e){if(this.getEditable()&&this.getEnabled()){var n=this.getBarWidth();if(this.getVertical()||(this.bRtl&&!this.getVertical())){n=0;}this.changeGrip(this.getMax(),n,this.oMovingGrip);this.handleFireChange();}e.preventDefault();e.stopPropagation();};S.prototype.onsaprightmodifiers=function(e){if(this.getEditable()&&this.getEnabled()){if(!this.fPageSize){if(this.getTotalUnits()>0){this.fPageSize=(this.getMax()-this.getMin())/this.getTotalUnits();}else{this.fPageSize=(this.getMax()-this.getMin())/10;}}var n;if(!this.bRtl||this.getVertical()){n=this.getValueForGrip(this.oMovingGrip)+this.fPageSize;}else{n=this.getValueForGrip(this.oMovingGrip)-this.fPageSize;}var N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N;}if(this.getVertical()){if(N>this.getBarWidth()){N=this.getBarWidth();}N=this.getBarWidth()-N;}var v=this.validateNewPosition(n,N,this.oMovingGrip,!this.getVertical()&&this.bRtl);n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange();}e.preventDefault();e.stopPropagation();};S.prototype.onsapleftmodifiers=function(e){if(this.getEditable()&&this.getEnabled()){if(!this.fPageSize){if(this.getTotalUnits()>0){this.fPageSize=(this.getMax()-this.getMin())/this.getTotalUnits();}else{this.fPageSize=(this.getMax()-this.getMin())/10;}}var n;if(!this.bRtl||this.getVertical()){n=this.getValueForGrip(this.oMovingGrip)-this.fPageSize;}else{n=this.getValueForGrip(this.oMovingGrip)+this.fPageSize;}var N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl&&!this.getVertical()){N=this.getBarWidth()-N;}if(this.getVertical()){if(N<0){N=0;}N=this.getBarWidth()-N;}var v=this.validateNewPosition(n,N,this.oMovingGrip,this.getVertical()||!this.bRtl);n=v.fNewValue;N=v.iNewPos;this.changeGrip(n,N,this.oMovingGrip);this.handleFireChange();}e.preventDefault();e.stopPropagation();};S.prototype.onsapdownmodifiers=function(e){if(this.bRtl&&!this.getVertical()){this.onsaprightmodifiers(e);}else{this.onsapleftmodifiers(e);}};S.prototype.onsapupmodifiers=function(e){if(this.bRtl&&!this.getVertical()){this.onsapleftmodifiers(e);}else{this.onsaprightmodifiers(e);}};S.prototype.onresize=function(e){if(!this.getDomRef()){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}return;}var n=this.getValue();var N=(n-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.getVertical()||this.bRtl){N=this.getBarWidth()-N;}this.changeGrip(n,N,this.oGrip);this.repositionTicksAndLabels();};S.prototype.repositionTicksAndLabels=function(){var t;if(this.bTextLabels){t=this.getLabels().length-1;}else{t=this.getTotalUnits();}if(t>0){var T=null;var o=null;this.fTickDist=this.getBarWidth()/t;for(var i=0;i<=t;i++){T=q.sap.domById(this.getId()+'-tick'+i);var L=0;if(!this.bRtl||this.getVertical()){L=Math.round(this.fTickDist*i)-Math.ceil(this.getOffsetWidth(T)/2);}else{L=Math.round(this.fTickDist*i)-Math.floor(this.getOffsetWidth(T)/2);}if(this.getVertical()){L=this.getBarWidth()-L-this.getOffsetWidth(T);}this.setLeft(L,T);if(this.getStepLabels()&&i>0&&i<t){o=q.sap.domById(this.getId()+'-text'+i);if(this.getSmallStepWidth()>0&&this.iDecimalFactor>0&&!this.bTextLabels){q(o).text(Math.round(parseFloat(q(o).text())*this.iDecimalFactor)/this.iDecimalFactor);}if(!this.bRtl||this.getVertical()){L=Math.round((this.fTickDist*i))-Math.round((this.getOffsetWidth(o)/2));}else{L=Math.round((this.fTickDist*(t-i)))-Math.round((this.getOffsetWidth(o)/2));}if(this.getVertical()){L=this.getBarWidth()-L-this.getOffsetWidth(o);}this.setLeft(L,o);}}}};S.prototype.onThemeChanged=function(e){if(this.getDomRef()){this.iShiftGrip=Math.round(this.getOffsetWidth(this.oGrip)/2);this.onresize();}};S.prototype.changeGrip=function(n,N,g){if(N!=(this.getOffsetLeft(g)+this.iShiftGrip)){if(this.getSmallStepWidth()>0){var s=parseInt((n-this.getMin())/this.getSmallStepWidth(),10);var L=(s*this.getSmallStepWidth())+this.getMin();var r=((s+1)*this.getSmallStepWidth())+this.getMin();if(r>this.getMax()){r=this.getMax();}var f=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if((n-L)<(r-n)){n=L;N=s*f;}else{n=r;N=(s+1)*f;if(N>this.getBarWidth()){N=this.getBarWidth();}}if(this.getVertical()||this.bRtl){N=this.getBarWidth()-N;}n=Math.round(n*this.iDecimalFactor)/this.iDecimalFactor;}var i=Math.round(N-this.iShiftGrip);if(isNaN(i)){return;}q.sap.log.info("iNewPos: "+N+" - iLeft: "+i+" - iShiftGrip: "+this.iShiftGrip);this.updateValueProperty(n,g);if(this.bTextLabels){g.title=this.getNearestLabel(n);}else{g.title=n;}this.setLeft(i,g);this.adjustHighlightBar(N,g);if(this.bAcc){this.setAriaState();}}};S.prototype.updateValueProperty=function(n,g){this.setProperty('value',n,true);};S.prototype.adjustHighlightBar=function(n,g){if(this.bRtl){if(this.getVertical()){this.oHiLi.style.height=this.getBarWidth()-Math.round(n)+'px';}else{this.oHiLi.style.width=this.getBarWidth()-Math.round(n)+'px';}}else{if(this.getVertical()){this.oHiLi.style.height=this.getBarWidth()-Math.round(n)+'px';}else{this.oHiLi.style.width=Math.round(n)+'px';}}};S.prototype.calcDecimalFactor=function(V){var f=1;if(!(V>0)){return f;}var m=String(V);var M=0;if(m.indexOf('.')>=0){M=m.length-m.indexOf('.')-1;}else{if(m.indexOf('e-')>=0){M=m.slice(m.indexOf('e-')+2);}else{return f;}}for(var i=1;i<=M;i++){f=f*10;}return f;};S.prototype.setEditable=function(e){this.setProperty('editable',e,true);if(this.oDomRef&&this.getEnabled()){if(e){q(this.oDomRef).removeClass('sapUiSliRo').addClass('sapUiSliStd');if(this.bAcc){q(this.oGrip).attr('aria-disabled',false).attr('aria-readonly',false);}}else{q(this.oDomRef).removeClass('sapUiSliStd').addClass('sapUiSliRo');if(this.bAcc){q(this.oGrip).attr('aria-disabled',true).attr('aria-readonly',true);}}}return this;};S.prototype.setEnabled=function(e){this.setProperty('enabled',e,true);if(this.oDomRef){q(this.oDomRef).toggleClass('sapUiSliDsbl',!e);if(e){q(this.oGrip).attr('tabindex','0');if(this.getEditable()){q(this.oDomRef).addClass('sapUiSliStd');if(this.bAcc){q(this.oGrip).attr('aria-disabled',false);}}else{q(this.oDomRef).addClass('sapUiSliRo');if(this.bAcc){q(this.oGrip).attr('aria-disabled',true);}}}else{q(this.oGrip).attr('tabindex','-1').attr('aria-disabled',true);if(this.getEditable()){q(this.oDomRef).removeClass('sapUiSliStd');}else{q(this.oDomRef).removeClass('sapUiSliRo');}}}return this;};S.prototype.setTotalUnits=function(t){this.setProperty('totalUnits',t,false);this.fPageSize=false;return this;};S.prototype.setValue=function(v){var n,m,M,b,i,N=parseFloat(v);this.setProperty('value',v,true);this._lastValue=v;if(!this.oBar||isNaN(v)){return this;}m=this.getMin();M=this.getMax();b=this.getBarWidth();i=this.getVertical();if(N>=M){N=M;if(i){n=0;}else{n=b;}}else if(N<=m){N=m;if(i){n=b;}else{n=0;}}else{n=((N-m)/(M-m))*b;}if(this.bRtl||i){n=b-n;}this.changeGrip(N,n,this.oGrip);this._lastValue=N;return this;};S.prototype.handleFireChange=function(n){var v=this.getValue();if(v!==this._lastValue){this.fireChange({value:v});if(!n){this.fireLiveChange({value:v});}this._lastValue=v;}};S.prototype.setAriaState=function(){var v=this.getValue();if(this.bTextLabels){v=this.getNearestLabel(v);}this.oGrip.setAttribute('aria-valuenow',v);};S.prototype.getValueForGrip=function(g){return this.getValue();};S.prototype.validateNewPosition=function(n,N,g,m){if(!this.bRtl||this.getVertical()){if(m){if(n<=this.getMin()||N<=0){n=this.getMin();if(this.getVertical()){N=this.getBarWidth();}else{N=0;}}}else{if(n>=this.getMax()||N>this.getBarWidth()){n=this.getMax();if(!this.getVertical()){N=this.getBarWidth();}else{N=0;}}}}else{if(m){if(n<=this.getMin()||N>this.getBarWidth()){n=this.getMin();N=this.getBarWidth();}}else{if(n>=this.getMax()||N<=0){n=this.getMax();N=0;}}}return{fNewValue:n,iNewPos:N};};S.prototype.getNearestLabel=function(v){var p=Math.round((this.getLabels().length-1)/(this.getMax()-this.getMin())*(v-this.getMin()));if(this.bRtl){p=this.getLabels().length-1-p;}return this.getLabels()[p];};S.prototype.getNearestGrip=function(o){return this.oGrip;};S.prototype.getLeftGrip=function(){return this.oGrip;};S.prototype.getRightGrip=function(){return this.oGrip;};S.prototype.setLeft=function(n,o){if(o==undefined){return;}if(this.getVertical()){o.style.top=n+'px';}else{o.style.left=n+'px';}};S.prototype.getOffsetWidth=function(o){if(this.getVertical()){return o.offsetHeight;}else{return o.offsetWidth;}};S.prototype.getBarWidth=function(){if(this.getVertical()){return this.oBar.clientHeight;}else{return this.oBar.clientWidth;}};S.prototype.getOffsetLeft=function(o){if(this.getVertical()){return o.offsetTop;}else{return o.offsetLeft;}};S.prototype.getOffsetX=function(e){if(this.getVertical()){return e.getOffsetY();}else{if(this.bRtl){return e.getOffsetX();}else{return e.getOffsetX();}}};S.prototype.convertRtlValue=function(n){if(this.bRtl&&!this.getVertical()){n=this.getMax()-n+this.getMin();}return n;};S.prototype.targetIsGrip=function(m){if(m==this.oGrip.id){return true;}return false;};S.prototype.getFocusDomRef=function(){return this.oGrip;};S.prototype.getIdForLabel=function(){return this.getId()+'-grip';};return S;},true);
