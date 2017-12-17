/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global',"sap/m/semantic/SemanticPage","sap/m/semantic/SemanticConfiguration","sap/m/semantic/SemanticPageRenderer","sap/m/semantic/SegmentedContainer","sap/m/semantic/ShareMenu","sap/m/ActionSheet","sap/m/Button"],function(q,S,a,b,c,d,A,B){"use strict";var e=S.extend("sap.m.semantic.ShareMenuPage",{metadata:{library:"sap.m",aggregations:{customShareMenuContent:{type:"sap.m.Button",multiple:true,singularName:"customShareMenuContent"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"}},designTime:true},renderer:b.render});e.prototype._getSemanticPositionsMap=function(C,o){if(!this._oPositionsMap){this._oPositionsMap=S.prototype._getSemanticPositionsMap.apply(this,arguments);this._oPositionsMap[a.prototype._PositionInPage.shareMenu]={oContainer:this._getSegmentedShareMenu().getSection("semantic"),sAggregation:"content"};}return this._oPositionsMap;};e.prototype.exit=function(){S.prototype.exit.apply(this,arguments);if(this._oSegmentedShareMenu){this._oSegmentedShareMenu.destroy();this._oSegmentedShareMenu=null;}};e.prototype.getCustomShareMenuContent=function(){return this._getSegmentedShareMenu().getSection("custom").getContent();};e.prototype.addCustomShareMenuContent=function(o,s){this._getSegmentedShareMenu().getSection("custom").addContent(o,s);return this;};e.prototype.indexOfCustomShareMenuContent=function(o){return this._getSegmentedShareMenu().getSection("custom").indexOfContent(o);};e.prototype.insertCustomShareMenuContent=function(o,i,s){this._getSegmentedShareMenu().getSection("custom").insertContent(o,i,s);return this;};e.prototype.removeCustomShareMenuContent=function(o,s){return this._getSegmentedShareMenu().getSection("custom").removeContent(o,s);};e.prototype.removeAllCustomShareMenuContent=function(s){return this._getSegmentedShareMenu().getSection("custom").removeAllContent(s);};e.prototype.destroyCustomShareMenuContent=function(s){var C=this.getCustomShareMenuContent();if(!C){return this;}if(s){this.iSuppressInvalidate++;}this._getSegmentedShareMenu().getSection("custom").destroy();if(!this.isInvalidateSuppressed()){this.invalidate();}if(s){this.iSuppressInvalidate--;}return this;};e.prototype.setSemanticRuleSet=function(n){var o=this.getSemanticRuleSet();if(o===n){return this;}this.setProperty("semanticRuleSet",n,true);var O=a.getShareMenuConfig(o),s=this._getShareBaseButtonContainer(O.baseButtonPlacement).getSection("shareMenu");if(s){this._moveShareMenu(O,a.getShareMenuConfig(this.getSemanticRuleSet()));}return this;};e.prototype._moveShareMenu=function(o,n){var O=this._getShareBaseButtonContainer(o.baseButtonPlacement).getSection("shareMenu"),f=O&&O.removeAllContent(),g=f.length&&f[0];this._placeShareMenu(g,n);};e.prototype._getActionSheet=function(){var o=this.getAggregation("_actionSheet");if(!o){this.setAggregation("_actionSheet",new A(),true);o=this.getAggregation("_actionSheet");}return o;};e.prototype._getSegmentedShareMenu=function(){if(!this._oSegmentedShareMenu){var s=new d(this._getActionSheet());var o=s.getBaseButton();if(s&&o){this._oSegmentedShareMenu=new c(s);this._oSegmentedShareMenu.addSection({sTag:"custom"});this._oSegmentedShareMenu.addSection({sTag:"semantic"});this._placeShareMenu(o,a.getShareMenuConfig(this.getSemanticRuleSet()));}}return this._oSegmentedShareMenu;};e.prototype._placeShareMenu=function(s,o){var f=o.baseButtonPlacement,v=o.actionSheetPlacement;var D=this._getShareBaseButtonContainer(f),g=D.getSection("shareMenu");if(!g){D.addSection({sTag:"shareMenu"});g=D.getSection("shareMenu");}if(s){g.addContent(s);}this._getActionSheet().setPlacement(v);};e.prototype._getShareBaseButtonContainer=function(v){return(v===sap.m.PlacementType.Bottom)?this._getSegmentedFooter():this._getSegmentedHeader();};return e;},false);
