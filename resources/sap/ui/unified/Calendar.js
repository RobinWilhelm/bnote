/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','./calendar/Header','./calendar/Month','./calendar/MonthPicker','./calendar/YearPicker','./calendar/CalendarDate','./library'],function(q,C,L,D,a,H,M,b,Y,c,l){"use strict";var d=C.extend("sap.ui.unified.Calendar",{metadata:{library:"sap.ui.unified",properties:{intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},months:{type:"int",group:"Appearance",defaultValue:1},firstDayOfWeek:{type:"int",group:"Appearance",defaultValue:-1},nonWorkingDays:{type:"int[]",group:"Appearance",defaultValue:null},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},secondaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null},showWeekNumbers:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},disabledDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"disabledDate"},header:{type:"sap.ui.unified.calendar.Header",multiple:false,visibility:"hidden"},month:{type:"sap.ui.unified.calendar.Month",multiple:true,visibility:"hidden"},monthPicker:{type:"sap.ui.unified.calendar.MonthPicker",multiple:false,visibility:"hidden"},yearPicker:{type:"sap.ui.unified.calendar.YearPicker",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},cancel:{},startDateChange:{}}}});d.prototype.init=function(){this._iBreakPointTablet=sap.ui.Device.media._predefinedRangeSets[sap.ui.Device.media.RANGESETS.SAP_STANDARD_EXTENDED].points[0];this._iBreakPointDesktop=sap.ui.Device.media._predefinedRangeSets[sap.ui.Device.media.RANGESETS.SAP_STANDARD_EXTENDED].points[1];this._iBreakPointLargeDesktop=sap.ui.Device.media._predefinedRangeSets[sap.ui.Device.media.RANGESETS.SAP_STANDARD_EXTENDED].points[2];var s=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",s);this.setProperty("secondaryCalendarType",s);this._iMode=0;this._oYearFormat=sap.ui.core.format.DateFormat.getDateInstance({format:"y",calendarType:s});this.data("sap-ui-fastnavgroup","true",true);this._oMinDate=a._minDate(this.getPrimaryCalendarType());this._oMaxDate=a._maxDate(this.getPrimaryCalendarType());this._initializeHeader();var i=this._createMonth(this.getId()+"--Month0");i.attachEvent("focus",this._handleFocus,this);i.attachEvent("select",j,this);i.attachEvent("_renderMonth",h,this);i.attachEvent("_bindMousemove",k,this);i.attachEvent("_unbindMousemove",m,this);i._bNoThemeChange=true;this.addAggregation("month",i);this._initilizeMonthPicker();this._initilizeYearPicker();this._resizeProxy=q.proxy(n,this);this._oSelectedMonth;};d.prototype.exit=function(){if(this._sInvalidateMonth){q.sap.clearDelayedCall(this._sInvalidateMonth);}if(this._sResizeListener){sap.ui.core.ResizeHandler.deregister(this._sResizeListener);this._sResizeListener=undefined;}this._oSelectedMonth=null;};d.prototype._initializeHeader=function(){var i=new H(this.getId()+"--Head");i.attachEvent("pressPrevious",this._handlePrevious,this);i.attachEvent("pressNext",this._handleNext,this);i.attachEvent("pressButton1",this._handleButton1,this);i.attachEvent("pressButton2",this._handleButton2,this);this.setAggregation("header",i);};d.prototype._initilizeMonthPicker=function(){var i=new b(this.getId()+"--MP");i.attachEvent("select",this._selectMonth,this);i._bNoThemeChange=true;this.setAggregation("monthPicker",i);};d.prototype._initilizeYearPicker=function(){var y=new Y(this.getId()+"--YP");y.attachEvent("select",this._selectYear,this);this.setAggregation("yearPicker",y);};d.prototype._createMonth=function(i){var p=new M(i,{width:"100%"});p.attachEvent("datehovered",this._handleDateHovered,this);return p;};d.prototype._handleDateHovered=function(E){var p=this.getAggregation("month"),r=E.getParameter("date1"),s=E.getParameter("date2"),i;for(i=0;i<p.length;i++){p[i]._markDatesBetweenStartAndHoveredDate(r,s);}};d.prototype.onBeforeRendering=function(){var p=this.getAggregation("month");var r;var s=p[0].getDate();var F=this._getFocusedDate();if(p.length>1&&s){r=c.fromLocalJSDate(s,this.getPrimaryCalendarType());}else if(p.length>1){r=o.call(this,this._getFocusedDate());}else{r=F;}for(var i=0;i<p.length;i++){s=new c(r);if(i>0){s.setDate(1);s.setMonth(s.getMonth()+i);}var t=s;if(F.getYear()===s.getYear()&&F.getMonth()===s.getMonth()){t=F;}p[i].displayDate(t.toLocalJSDate());p[i].setShowWeekNumbers(this.getShowWeekNumbers());}this._updateHeader(r);this._iSize=0;};d.prototype.onAfterRendering=function(E){if(!this._getSucessorsPickerPopup()){e.call(this);}if(g.call(this)>1||this._bInitMonth){E.size={width:this.getDomRef().offsetWidth};n.call(this,E,true);if(!this._sResizeListener){this._sResizeListener=sap.ui.core.ResizeHandler.register(this,this._resizeProxy);}this._bInitMonth=undefined;}};d.prototype.invalidate=function(O){if(!this._bDateRangeChanged&&(!O||!(O instanceof sap.ui.unified.DateRange))){C.prototype.invalidate.apply(this,arguments);}else if(this.getDomRef()&&this._iMode==0&&!this._sInvalidateMonth){this._sInvalidateMonth=q.sap.delayedCall(0,this,this._invalidateMonth,[O]);}};d.prototype.removeSelectedDate=function(s){this._bDateRangeChanged=true;return this.removeAggregation("selectedDates",s);};d.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var r=this.removeAllAggregation("selectedDates");return r;};d.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("selectedDates");return i;};d.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var r=this.removeAllAggregation("specialDates");return r;};d.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("specialDates");return i;};d.prototype.getSpecialDates=function(){var p=this.getParent();if(p&&p.getSpecialDates){return p.getSpecialDates();}else{return this.getAggregation("specialDates",[]);}};d.prototype.removeAllDisabledDates=function(){this._bDateRangeChanged=true;var r=this.removeAllAggregation("disabledDates");return r;};d.prototype.destroyDisabledDates=function(){this._bDateRangeChanged=true;var i=this.destroyAggregation("disabledDates");return i;};d.prototype.setLocale=function(s){if(this._sLocale!=s){this._sLocale=s;this._oLocaleData=undefined;this.invalidate();}return this;};d.prototype.getLocale=function(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};d.prototype._getFocusedDate=function(){if(!this._oFocusedDate){_.call(this);}return this._oFocusedDate;};d.prototype._setFocusedDate=function(i){a._checkCalendarDate(i);this._oFocusedDate=new c(i,this.getPrimaryCalendarType());};d.prototype.focusDate=function(i){f.call(this,i,false);return this;};d.prototype.displayDate=function(i){f.call(this,i,true);return this;};d.prototype.getStartDate=function(){var s;if(this.getDomRef()){var i=this.getAggregation("month");s=c.fromLocalJSDate(i[0].getDate(),this.getPrimaryCalendarType());}else{s=new c(this._getFocusedDate());}s.setDate(1);return s.toLocalJSDate();};d.prototype.setPopupMode=function(p){this._bPoupupMode=p;return this;};d.prototype.setMonths=function(p){this._bDateRangeChanged=undefined;this.setProperty("months",p,false);p=g.call(this);var r=this.getAggregation("month");var i=0;var s;if(r.length<p){for(i=r.length;i<p;i++){s=this._createMonth(this.getId()+"--Month"+i);s.attachEvent("focus",this._handleFocus,this);s.attachEvent("select",j,this);s.attachEvent("_renderMonth",h,this);s.attachEvent("_bindMousemove",k,this);s.attachEvent("_unbindMousemove",m,this);s._bNoThemeChange=true;this.addAggregation("month",s);}}else if(r.length>p){for(i=r.length;i>p;i--){s=this.removeAggregation("month",i-1);s.destroy();}if(p==1){this._bInitMonth=true;}}if(p>1&&r[0].getDate()){r[0].setProperty("date",null,true);}return this;};d.prototype.setPrimaryCalendarType=function(s){var p=this.getAggregation("month");var r=false;if(p.length>1){r=true;}this.setProperty("primaryCalendarType",s,!r);this._oYearFormat=sap.ui.core.format.DateFormat.getDateInstance({format:"y",calendarType:s});if(this._oFocusedDate){this._oFocusedDate=new c(this._oFocusedDate,s);}this._oMinDate=new c(this._oMinDate,s);this._oMaxDate=new c(this._oMaxDate,s);for(var i=0;i<p.length;i++){var t=p[i];t.setPrimaryCalendarType(s);}if(!this._getSucessorsPickerPopup()){var u=this.getAggregation("monthPicker");u.setPrimaryCalendarType(s);var y=this.getAggregation("yearPicker");y.setPrimaryCalendarType(s);}if(this.getDomRef()){this._updateHeader(this._oFocusedDate);if(!this._getSucessorsPickerPopup()){if(this.iMode!=1&&u.getDomRef()){u.$().remove();}if(this.iMode!=2&&y.getDomRef()){y.$().remove();}}}return this;};d.prototype.setSecondaryCalendarType=function(s){this._bSecondaryCalendarTypeSet=true;this.setProperty("secondaryCalendarType",s,true);this._oYearFormatSecondary=sap.ui.core.format.DateFormat.getDateInstance({format:"y",calendarType:s});var p=this.getAggregation("month");for(var i=0;i<p.length;i++){var r=p[i];r.setSecondaryCalendarType(s);}if(this.getDomRef()){this._updateHeader(this._getFocusedDate());this.$().toggleClass("sapUiCalSecType",!!this._getSecondaryCalendarType());}return this;};d.prototype._getSecondaryCalendarType=function(){var s;if(this._bSecondaryCalendarTypeSet){s=this.getSecondaryCalendarType();var p=this.getPrimaryCalendarType();if(s==p){s=undefined;}}return s;};d.prototype.setMinDate=function(i){if(q.sap.equal(i,this.getMinDate())){return this;}if(!i){this._oMinDate=a._minDate(this.getPrimaryCalendarType());}else{a._checkJSDateObject(i);this._oMinDate=c.fromLocalJSDate(i,this.getPrimaryCalendarType());var y=this._oMinDate.getYear();a._checkYearInValidRange(y);if(this._oMaxDate.isBefore(this._oMinDate)){q.sap.log.warning("minDate > maxDate -> maxDate set to end of the month",this);this._oMaxDate=c.fromLocalJSDate(i,this.getPrimaryCalendarType());this._oMaxDate.setDate(a._daysInMonth(this._oMaxDate));this.setProperty("maxDate",this._oMaxDate.toLocalJSDate(),true);}this._setMinMaxDateExtend(c.fromLocalJSDate(i,this.getPrimaryCalendarType()));}this.setProperty("minDate",i,false);if(!this._getSucessorsPickerPopup()){var p=this.getAggregation("yearPicker");p._oMinDate.setYear(this._oMinDate.getYear());}return this;};d.prototype.setMaxDate=function(i){if(q.sap.equal(i,this.getMaxDate())){return this;}if(!i){this._oMaxDate=a._maxDate(this.getPrimaryCalendarType());}else{a._checkJSDateObject(i);this._oMaxDate=c.fromLocalJSDate(i,this.getPrimaryCalendarType());var y=this._oMaxDate.getYear();a._checkYearInValidRange(y);if(this._oMinDate.isAfter(this._oMaxDate)){q.sap.log.warning("maxDate < minDate -> minDate set to begin of the month",this);this._oMinDate=c.fromLocalJSDate(i,this.getPrimaryCalendarType());this._oMinDate.setDate(1);this.setProperty("minDate",this._oMinDate.toLocalJSDate(),true);}this._setMinMaxDateExtend(c.fromLocalJSDate(i,this.getPrimaryCalendarType()));}this.setProperty("maxDate",i,false);if(!this._getSucessorsPickerPopup()){var p=this.getAggregation("yearPicker");p._oMaxDate.setYear(this._oMaxDate.getYear());}return this;};d.prototype._setMinMaxDateExtend=function(i){if(this._oFocusedDate){if(a._isOutside(this._oFocusedDate,this._oMinDate,this._oMaxDate)){q.sap.log.warning("focused date is not between [minDate - maxDate] -> refocus to the new max/min date: "+i.toString(),this);this.focusDate(i.toLocalJSDate());}}};d.prototype._getLocaleData=function(){if(!this._oLocaleData){var s=this.getLocale();var i=new sap.ui.core.Locale(s);this._oLocaleData=L.getInstance(i);}return this._oLocaleData;};d.prototype._getShowMonthHeader=function(){var i=g.call(this);if(i>2){return true;}else{return false;}};d.prototype.setWidth=function(w){this.setProperty("width",w,true);if(this.getDomRef()){w=this.getWidth();this.$().css("width",w);if(w){this.$().addClass("sapUiCalWidth");}else{this.$().removeClass("sapUiCalWidth");}}return this;};d.prototype.onclick=function(E){if(E.isMarked("delayedMouseEvent")){return;}if(E.target.id==this.getId()+"-cancel"){this.onsapescape(E);}};d.prototype.onmousedown=function(E){E.preventDefault();E.setMark("cancelAutoClose");};d.prototype.onsapescape=function(E){if(this._iMode==0){this.fireCancel();}this._closedPickers();};d.prototype.onsapshow=function(E){if(this._bPoupupMode){this._closedPickers();this.fireCancel();E.preventDefault();}};d.prototype.onsaphide=d.prototype.onsapshow;d.prototype.onsaptabnext=function(E){var p=this.getAggregation("header");if(q.sap.containsOrEquals(this.getDomRef("content"),E.target)){if(this._shouldFocusB2OnTabNext(E)){q.sap.focus(p.getDomRef("B2"));}else{q.sap.focus(p.getDomRef("B1"));}if(!this._bPoupupMode){var r=this.getAggregation("month");for(var i=0;i<r.length;i++){var s=r[i];q(s._oItemNavigation.getItemDomRefs()[s._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(!this._getSucessorsPickerPopup()){var t=this.getAggregation("monthPicker");var y=this.getAggregation("yearPicker");if(t.getDomRef()){q(t._oItemNavigation.getItemDomRefs()[t._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(y.getDomRef()){q(y._oItemNavigation.getItemDomRefs()[y._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}E.preventDefault();}else if(this._shouldFocusB2OnTabNext(E)){q.sap.focus(p.getDomRef("B2"));E.preventDefault();}};d.prototype._shouldFocusB2OnTabNext=function(E){var i=this.getAggregation("header");return(E.target.id==i.getId()+"-B1");};d.prototype._shouldFocusB2OnTabPrevious=function(E){return this._bPoupupMode;};d.prototype.onsaptabprevious=function(E){var p=this.getAggregation("header");if(q.sap.containsOrEquals(this.getDomRef("content"),E.target)){if(this._shouldFocusB2OnTabPrevious()){q.sap.focus(p.getDomRef("B2"));E.preventDefault();}}else if(E.target.id==p.getId()+"-B1"){var r=this.getAggregation("month");var F;switch(this._iMode){case 0:F=this._getFocusedDate();for(var i=0;i<r.length;i++){var s=r[i];var t=c.fromLocalJSDate(s.getDate(),this.getPrimaryCalendarType());if(F.isSame(t)){s._oItemNavigation.focusItem(s._oItemNavigation.getFocusedIndex());}else{q(s._oItemNavigation.getItemDomRefs()[s._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}break;case 1:if(!this._getSucessorsPickerPopup()){var u=this.getAggregation("monthPicker");u._oItemNavigation.focusItem(u._oItemNavigation.getFocusedIndex());}break;case 2:if(!this._getSucessorsPickerPopup()){var y=this.getAggregation("yearPicker");y._oItemNavigation.focusItem(y._oItemNavigation.getFocusedIndex());}break;}E.preventDefault();}else if(E.target.id==p.getId()+"-B2"){q.sap.focus(p.getDomRef("B1"));E.preventDefault();}};d.prototype.onfocusin=function(E){if(E.target.id==this.getId()+"-end"){var p=this.getAggregation("month");this._focusOnShiftTab();if(!this._bPoupupMode){for(var i=0;i<p.length;i++){var r=p[i];q(r._oItemNavigation.getItemDomRefs()[r._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(!this._getSucessorsPickerPopup()){var s=this.getAggregation("monthPicker");var y=this.getAggregation("yearPicker");if(s.getDomRef()){q(s._oItemNavigation.getItemDomRefs()[s._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(y.getDomRef()){q(y._oItemNavigation.getItemDomRefs()[y._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}}this.$("end").attr("tabindex","-1");};d.prototype._focusOnShiftTab=function(){var i=this.getAggregation("header");q.sap.focus(i.getDomRef("B2"));};d.prototype.onsapfocusleave=function(E){var p,r,s,y;if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){this.$("end").attr("tabindex","0");if(!this._bPoupupMode){p=this.getAggregation("month");switch(this._iMode){case 0:for(var i=0;i<p.length;i++){r=p[i];q(r._oItemNavigation.getItemDomRefs()[r._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}break;case 1:if(!this._getSucessorsPickerPopup()){s=this.getAggregation("monthPicker");q(s._oItemNavigation.getItemDomRefs()[s._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}break;case 2:if(!this._getSucessorsPickerPopup()){y=this.getAggregation("yearPicker");q(y._oItemNavigation.getItemDomRefs()[y._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}break;}}}};d.prototype.getFocusDomRef=function(){var i=this._oSelectedMonth?this._oSelectedMonth:this.getAggregation("month")[0];return i._oItemNavigation.getItemDomRefs()[i._oItemNavigation.getFocusedIndex()];};d.prototype.onThemeChanged=function(){var p;if(!this.getDomRef()){return;}this._bNamesLengthChecked=undefined;if(!this._getSucessorsPickerPopup()){p=this.getAggregation("monthPicker");this._showMonthPicker(true);p._bNoThemeChange=false;p.onThemeChanged(arguments);p._bNoThemeChange=true;this._bLongMonth=p._bLongMonth;this._hideMonthPicker(true);}var r=this.getAggregation("month");for(var i=0;i<r.length;i++){var s=r[i];s._bNoThemeChange=false;s.onThemeChanged(arguments);s._bNoThemeChange=true;}var t;if(r.length>1){t=c.fromLocalJSDate(r[0].getDate(),this.getPrimaryCalendarType());}else{t=this._getFocusedDate();}this._setHeaderText(t);if(!this._getSucessorsPickerPopup()){e.call(this);}};d.prototype._updateHeader=function(i){this._setHeaderText(i);this._togglePrevNext(i,true);};d.prototype._togglePrevNext=function(i,p){var y=this._oMaxDate.getYear();var r=this._oMinDate.getYear();var s=this._oMaxDate.getMonth();var t=this._oMinDate.getMonth();var u=this.getAggregation("header");var v=g.call(this);var w=new c(i,this.getPrimaryCalendarType());if(this._iMode==0&&v>1){w=o.call(this,i);w.setMonth(w.getMonth()+v-1);w.setDate(a._daysInMonth(w));}else{w.setDate(a._daysInMonth(w));}var x=w.getYear();var z=w.getMonth();if(x>y||(x==y&&(!p||z>=s))||(this._iMode==1&&this._getSucessorsPickerPopup())){u.setEnabledNext(false);}else{u.setEnabledNext(true);}if(this._iMode==0&&v>1){w.setMonth(w.getMonth()-v+1);w.setDate(1);}else{w.setDate(1);}x=w.getYear();z=w.getMonth();if(x<r||(x==r&&(!p||z<=t))||(this._iMode==1&&this._getSucessorsPickerPopup())){u.setEnabledPrevious(false);}else{u.setEnabledPrevious(true);}};d.prototype._togglePrevNexYearPicker=function(){var y=this.getAggregation("yearPicker");var i=y.getYears();var p=c.fromLocalJSDate(y.getFirstRenderedDate());p.setYear(p.getYear()+Math.floor(i/2));var r=this.getAggregation("header");var s=new c(this._oMaxDate,this.getPrimaryCalendarType());s.setYear(s.getYear()-Math.ceil(i/2));s.setMonth(11);s.setDate(31);var t=new c(this._oMinDate,this.getPrimaryCalendarType());t.setYear(t.getYear()+Math.floor(i/2)+1);t.setMonth(0);t.setDate(1);r.setEnabledNext(p.isSameOrBefore(s));r.setEnabledPrevious(p.isSameOrAfter(t));};d.prototype._handlePrevious=function(E){var F=this._getFocusedDate();var i=this.getAggregation("header");var y=this.getAggregation("yearPicker");var p=g.call(this);var r;var s;var S=false;switch(this._iMode){case 0:if(p>1){r=c.fromLocalJSDate(this.getAggregation("month")[0].getDate(),this.getPrimaryCalendarType());r.setDate(1);this._setFocusedDate(r);F=this._getFocusedDate();}else{F.setDate(1);}F.setDate(F.getDate()-1);this._renderMonth(S,true);break;case 1:F.setYear(F.getYear()-1);i.setTextButton2(this._oYearFormat.format(F.toUTCJSDate(),true));var t=this._getSecondaryCalendarType();if(t){s=new c(F,t);s.setMonth(0);s.setDate(1);i.setAdditionalTextButton2(this._oYearFormatSecondary.format(s.toUTCJSDate(),true));}else{i.setAdditionalTextButton2();}this._togglePrevNext(F);this._setDisabledMonths(F.getYear());break;case 2:y.previousPage();this._togglePrevNexYearPicker();break;}};d.prototype._handleNext=function(E){var F=this._getFocusedDate();var i=this.getAggregation("header");var y=this.getAggregation("yearPicker");var p=g.call(this);var r;var s;switch(this._iMode){case 0:if(p>1){r=c.fromLocalJSDate(this.getAggregation("month")[0].getDate(),this.getPrimaryCalendarType());this._setFocusedDate(r);F=this._getFocusedDate();}F.setDate(1);F.setMonth(F.getMonth()+p);this._renderMonth();break;case 1:F.setYear(F.getYear()+1);i.setTextButton2(this._oYearFormat.format(F.toUTCJSDate(),true));var S=this._getSecondaryCalendarType();if(S){s=new c(F,S);s.setMonth(0);s.setDate(1);i.setAdditionalTextButton2(this._oYearFormatSecondary.format(s.toUTCJSDate(),true));}else{i.setAdditionalTextButton2();}this._togglePrevNext(F);this._setDisabledMonths(F.getYear());break;case 2:y.nextPage();this._togglePrevNexYearPicker();break;}};d.prototype._getDisplayedMonths=function(p){var r=[];var s=p.getMonth();var t=g.call(this);if(t>1){for(var i=0;i<t;i++){r.push((s+i)%12);}}else{r.push(s);}return r;};d.prototype._getDisplayedSecondaryMonths=function(p,s){var i=this.getAggregation("month");var F=c.fromLocalJSDate(i[0].getDate(),p);F.setDate(1);F=new c(F,s);var S=F.getMonth();var r=c.fromLocalJSDate(i[i.length-1].getDate(),p);r.setDate(a._daysInMonth(r));r=new c(r,s);var E=r.getMonth();return{start:S,end:E};};d.prototype._closedPickers=function(){switch(this._iMode){case 0:break;case 1:this._hideMonthPicker();break;case 2:this._hideYearPicker();break;}};d.prototype._setDisabledMonths=function(y,i){var p=0;var r=11;if(y==this._oMinDate.getYear()){p=this._oMinDate.getMonth();}if(y==this._oMaxDate.getYear()){r=this._oMaxDate.getMonth();}if(!i){i=this.getAggregation("monthPicker");}i.setMinMax(p,r);};d.prototype._handleFocus=function(E){var i=c.fromLocalJSDate(E.getParameter("date"),this.getPrimaryCalendarType());var O=E.getParameter("otherMonth");var r=E.getParameter("restoreOldDate");if(r){if(!q.sap.equal(this._getFocusedDate(),i)){this._renderMonth(false,false,true);}}else{this._focusDate(i,O);}};d.prototype._getVisibleDays=function(){var i=this.getAggregation("month")[0];return i._getVisibleDays(i._getDate(),false);};d.prototype._renderMonth=function(s,I,N){var p=this._getFocusedDate();var r=this.getAggregation("month");var F=false;var t;var u;var v;var i=0;for(i=0;i<r.length;i++){t=r[i];if(t.checkDateFocusable(p.toLocalJSDate())){F=true;}if(F||r.length==1){if(!s){t.setDate(p.toLocalJSDate());}else{t.displayDate(p.toLocalJSDate());}break;}}if(!F){v=new c(p,this.getPrimaryCalendarType());if(r.length>1){v=o.call(this,v);for(i=0;i<r.length;i++){t=r[i];u=new c(v,this.getPrimaryCalendarType());u.setMonth(v.getMonth()+i);if(!s&&a._isSameMonthAndYear(u,p)){t.setDate(p.toLocalJSDate());}else{t.displayDate(u.toLocalJSDate());}}}this._updateHeader(v);if(!N){this.fireStartDateChange();}}};function _(){var s=this.getSelectedDates();var i=this.getPrimaryCalendarType();if(s&&s[0]&&s[0].getStartDate()){this._oFocusedDate=c.fromLocalJSDate(s[0].getStartDate(),i);}else{this._oFocusedDate=c.fromLocalJSDate(new Date(),i);}if(this._oFocusedDate.isBefore(this._oMinDate)){this._oFocusedDate=new c(this._oMinDate,i);}else if(this._oFocusedDate.isAfter(this._oMaxDate)){this._oFocusedDate=new c(this._oMaxDate,i);}}d.prototype._showMonthPicker=function(s){if(this._iMode==2){this._hideYearPicker(true);}var p=this._getFocusedDate();var r=this.getAggregation("monthPicker");if(r.getDomRef()){r.$().css("display","");}else{var R=sap.ui.getCore().createRenderManager();var $=this.$("content");R.renderControl(r);R.flush($[0],false,true);R.destroy();}this._showOverlay();if(!s){r.setMonth(p.getMonth());this._setDisabledMonths(p.getYear(),r);if(this._iMode==0){var t=this.getAggregation("month");for(var i=0;i<t.length;i++){var u=t[i];q(u._oItemNavigation.getItemDomRefs()[u._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}this._iMode=1;this._togglePrevNext(p,false);};d.prototype._hideMonthPicker=function(s){this._iMode=0;var p=this.getAggregation("monthPicker");p.$().css("display","none");this._hideOverlay();if(!s){this._renderMonth();if(g.call(this)>1){var r=this.getAggregation("month");for(var i=0;i<r.length;i++){var t=r[i];q(t._oItemNavigation.getItemDomRefs()[t._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}}this._togglePrevNext(this._getFocusedDate(),true);};d.prototype._showYearPicker=function(){if(this._iMode==1){this._hideMonthPicker(true);}var p=this._getFocusedDate();var y=this.getAggregation("yearPicker");if(y.getDomRef()){y.$().css("display","");}else{var r=sap.ui.getCore().createRenderManager();var $=this.$("content");r.renderControl(y);r.flush($[0],false,true);r.destroy();}this._showOverlay();y.setDate(p.toLocalJSDate());var s;if(g.call(this)==1){s=this.getAggregation("month")[0];var t=s.$("days").find(".sapUiCalItem");if(t.length==28){y.$().addClass("sapUiCalYearNoTop");}else{y.$().removeClass("sapUiCalYearNoTop");}}if(this._iMode==0){var u=this.getAggregation("month");for(var i=0;i<u.length;i++){s=u[i];q(s._oItemNavigation.getItemDomRefs()[s._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}this._togglePrevNexYearPicker();this._iMode=2;};d.prototype._hideYearPicker=function(s){this._iMode=0;var y=this.getAggregation("yearPicker");y.$().css("display","none");this._hideOverlay();if(!s){this._renderMonth();if(g.call(this)>1){var p=this.getAggregation("month");for(var i=0;i<p.length;i++){var r=p[i];q(r._oItemNavigation.getItemDomRefs()[r._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}}this._togglePrevNext(this._getFocusedDate(),true);};function e(){if(!this._bNamesLengthChecked){this._showMonthPicker(true);this._hideMonthPicker(true);var i=this.getAggregation("monthPicker");this._bLongMonth=i._bLongMonth;this._bNamesLengthChecked=true;if(!this._bLongMonth){var p=this.getAggregation("month");var r;if(p.length>1){r=c.fromLocalJSDate(p[0].getDate(),this.getPrimaryCalendarType());}else{r=this._getFocusedDate();}this._setHeaderText(r);}}else if(g.call(this)>1){this._focusDate(this._getFocusedDate(),true,true);}}d.prototype._focusDate=function(i,O,N){var F;var p=false;var r=false;if(i.isBefore(this._oMinDate)){F=this._oMinDate;p=true;}else if(i.isAfter(this._oMaxDate)){F=this._oMaxDate;p=true;}else{F=i;}if(this._focusDateExtend){r=this._focusDateExtend(i,O,N);}var I=F.isBefore(this._getFocusedDate());this._setFocusedDate(F);if(p||O){this._renderMonth(false,I,N);}if(r){this.fireStartDateChange();}};d.prototype._invalidateMonth=function(O){this._sInvalidateMonth=undefined;var p=this.getAggregation("month");if(p){for(var i=0;i<p.length;i++){var r=p[i];r._bDateRangeChanged=true;r._bInvalidateSync=true;r._bNoFocus=true;r.invalidate(O);r._bInvalidateSync=undefined;}}this._bDateRangeChanged=undefined;};d.prototype._setHeaderText=function(i){var p=this.getAggregation("header");var r=this._getLocaleData();var s=[];var t=[];var u=[];var A;var S=false;var T;var y;var P;var v=this.getPrimaryCalendarType();var w=this._getSecondaryCalendarType();if(this._bLongMonth||!this._bNamesLengthChecked){s=r.getMonthsStandAlone("wide",v);}else{S=true;s=r.getMonthsStandAlone("abbreviated",v);t=r.getMonthsStandAlone("wide",v);}if(w){u=r.getMonthsStandAlone("abbreviated",w);var x=this._getDisplayedSecondaryMonths(v,w);if(x.start==x.end){T=u[x.start];}else{P=r.getIntervalPattern();T=P.replace(/\{0\}/,u[x.start]).replace(/\{1\}/,u[x.end]);}}p.setAdditionalTextButton1(T);var z=this._getDisplayedMonths(i);if(z.length>1&&!this._bShowOneMonth){if(!P){P=r.getIntervalPattern();}T=P.replace(/\{0\}/,s[z[0]]).replace(/\{1\}/,s[z[z.length-1]]);if(S){A=P.replace(/\{0\}/,t[z[0]]).replace(/\{1\}/,t[z[z.length-1]]);}}else{T=s[z[0]];if(S){A=t[z[0]];}}p.setTextButton1(T);if(S){p.setAriaLabelButton1(A);}var F=new c(i,v);F.setDate(1);y=this._oYearFormat.format(F.toUTCJSDate(),true);p.setTextButton2(y);if(w){F=new c(F,w);p.setAdditionalTextButton2(this._oYearFormatSecondary.format(F.toUTCJSDate(),true));}else{p.setAdditionalTextButton2();}return{sMonth:T,sYear:y,sAriaLabel:A,bShort:S};};function f(i,s){if(!i){return;}var p=c.fromLocalJSDate(i,this.getPrimaryCalendarType());var y=p.getYear();a._checkYearInValidRange(y);if(a._isOutside(p,this._oMinDate,this._oMaxDate)){throw new Error("Date must not be in valid range (minDate and maxDate); "+this);}this._setFocusedDate(p);if(this.getDomRef()&&this._iMode==0){this._renderMonth(s,false,true);}}function g(){if(sap.ui.Device.system.phone){return 1;}else{return this.getMonths();}}d.prototype._handleButton1=function(E){if(this._iMode!=1){this._showMonthPicker();}else{this._hideMonthPicker();}};d.prototype._handleButton2=function(E){if(this._iMode!=2){this._showYearPicker();}else{this._hideYearPicker();}};function h(E){this.fireEvent("_renderMonth",{days:E.getParameter("days")});}function j(E){if(g.call(this)>1){var p=this.getAggregation("month");for(var i=0;i<p.length;i++){var r=p[i];if(r.getId()!=E.oSource.getId()){r._updateSelection();}}}this._oSelectedMonth=E.oSource;this.fireSelect();}function k(E){if(g.call(this)>1){var p=this.getAggregation("month");for(var i=0;i<p.length;i++){var r=p[i];if(r.getId()!=E.oSource.getId()){r._bindMousemove();}}}}function m(E){if(g.call(this)>1){var p=this.getAggregation("month");for(var i=0;i<p.length;i++){var r=p[i];if(r.getId()!=E.oSource.getId()){r._unbindMousemove();}}}}d.prototype._selectMonth=function(){var F=new c(this._getFocusedDate(),this.getPrimaryCalendarType()),i=this.getAggregation("monthPicker"),p=i.getMonth();F.setMonth(p);if(p!=F.getMonth()){F.setDate(0);}this._focusDate(F,true);this._hideMonthPicker();};d.prototype._getSucessorsPickerPopup=function(){return this.getPickerPopup&&this.getPickerPopup();};d.prototype._selectYear=function(){var F=new c(this._getFocusedDate(),this.getPrimaryCalendarType());var y=this.getAggregation("yearPicker");var i=c.fromLocalJSDate(y.getDate(),this.getPrimaryCalendarType());i.setMonth(F.getMonth());i.setDate(F.getDate());F=i;this._focusDate(F,true);this._hideYearPicker();};d.prototype._showOverlay=function(){this.$("contentOver").css("display","");};d.prototype._hideOverlay=function(){this.$("contentOver").css("display","none");};function n(E){var w=E.size.width;if(w<=0){return;}var O=this._iSize;if(w<this._iBreakPointTablet){this._iSize=0;}else if(w<this._iBreakPointDesktop){this._iSize=1;}else if(w<this._iBreakPointLargeDesktop){this._iSize=2;}else{this._iSize=3;}var p=g.call(this);var r;if(O!=this._iSize||this._bInitMonth){switch(this._iSize){case 1:r=2;break;case 2:r=3;break;case 3:r=4;break;default:r=1;break;}if(p<r){r=p;}if(r>2&&p>r){var s=r;var u=0.0;var U=r;while(s>=2){var t=p%s;if(t==0){U=s;break;}else{var N=t/s;if(N>u){u=N;U=s;}}s--;}r=U;}var W;var v=this.getAggregation("month");if(r>1){W=100/r+"%";this.$("content").removeClass("sapUiCalContentSingle");}else{W="100%";this.$("content").addClass("sapUiCalContentSingle");}for(var i=0;i<v.length;i++){var x=v[i];x.setWidth(W);}}}function o(i){var F=new c(i,this.getPrimaryCalendarType());F.setDate(1);var p=g.call(this);if(p<=12){var r=i.getMonth();r=r-r%p;if(12%p>0&&r+p>11){r=12-p;}F.setMonth(r);}return F;}return d;},true);
