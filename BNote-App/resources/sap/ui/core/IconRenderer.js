/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var I={};I.render=function(r,c){var i=sap.ui.core.IconPool.getIconInfo(c.getSrc()),w=c.getWidth(),h=c.getHeight(),C=c.getColor(),b=c.getBackgroundColor(),s=c.getSize(),t=c.getTooltip_AsString(),u=c.getUseIconTooltip(),n=c.getNoTabStop();r.write("<span");r.writeControlData(c);r.writeAccessibilityState(c,c._getAccessibilityAttributes());if(t||(u&&i)){r.writeAttributeEscaped("title",t||i.text||i.name);}if(c.hasListeners("press")&&!n){r.writeAttribute("tabindex",0);}if(i){r.writeAttributeEscaped("data-sap-ui-icon-content",i.content);r.addStyle("font-family","'"+q.sap.encodeHTML(i.fontFamily)+"'");}if(w){r.addStyle("width",w);}if(h){r.addStyle("height",h);r.addStyle("line-height",h);}if(!(C in sap.ui.core.IconColor)){r.addStyle("color",q.sap.encodeHTML(C));}if(!(b in sap.ui.core.IconColor)){r.addStyle("background-color",q.sap.encodeHTML(b));}if(s){r.addStyle("font-size",s);}r.addClass("sapUiIcon");if(i&&!i.suppressMirroring){r.addClass("sapUiIconMirrorInRTL");}if(c.hasListeners("press")){r.addClass("sapUiIconPointer");}r.writeClasses();r.writeStyles();r.write("></span>");};return I;},true);
