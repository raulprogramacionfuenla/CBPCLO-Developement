/* Default class modification */
$.extend($.fn.dataTableExt.oStdClasses, {
	"sWrapper" : "dataTables_wrapper form-inline"
});

/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
	return {
		"iStart" : oSettings._iDisplayStart,
		"iEnd" : oSettings.fnDisplayEnd(),
		"iLength" : oSettings._iDisplayLength,
		"iTotal" : oSettings.fnRecordsTotal(),
		"iFilteredTotal" : oSettings.fnRecordsDisplay(),
		"iPage" : Math.ceil(oSettings._iDisplayStart
				/ oSettings._iDisplayLength),
		"iTotalPages" : Math.ceil(oSettings.fnRecordsDisplay()
				/ oSettings._iDisplayLength)
	};
}

/* Bootstrap style pagination control */
$
		.extend(
				$.fn.dataTableExt.oPagination,
				{
					"bootstrap" : {
						"fnInit" : function(oSettings, nPaging, fnDraw) {
							var oLang = oSettings.oLanguage.oPaginate;
							var fnClickHandler = function(e) {
								e.preventDefault();
								if (oSettings.oApi._fnPageChange(oSettings,
										e.data.action)) {
									fnDraw(oSettings);
								}
							};

							$(nPaging)
									.addClass('pagination')
									.append(
											'<ul>'
													+ '<li class="prev disabled"><a href="#">«</a></li>'
													+ '<li class="next disabled"><a href="#">»</a></li>'
													+ '</ul>');
							var els = $('a', nPaging);
							$(els[0]).bind('click.DT', {
								action : "previous"
							}, fnClickHandler);
							$(els[1]).bind('click.DT', {
								action : "next"
							}, fnClickHandler);
						},

						"fnUpdate" : function(oSettings, fnDraw) {
							var iListLength = 5;
							var oPaging = oSettings.oInstance.fnPagingInfo();
							var an = oSettings.aanFeatures.p;
							var i, j, sClass, iStart, iEnd, iHalf = Math
									.floor(iListLength / 2);

							if (oPaging.iTotalPages < iListLength) {
								iStart = 1;
								iEnd = oPaging.iTotalPages;
							} else if (oPaging.iPage <= iHalf) {
								iStart = 1;
								iEnd = iListLength;
							} else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
								iStart = oPaging.iTotalPages - iListLength + 1;
								iEnd = oPaging.iTotalPages;
							} else {
								iStart = oPaging.iPage - iHalf + 1;
								iEnd = iStart + iListLength - 1;
							}

							for (i = 0, iLen = an.length; i < iLen; i++) {
								// Remove the middle elements
								$('li:gt(0)', an[i]).filter(':not(:last)')
										.remove();

								// Add the new list items and their event
								// handlers
								for (j = iStart; j <= iEnd; j++) {
									sClass = (j == oPaging.iPage + 1) ? 'class="active"'
											: '';
									$(
											'<li ' + sClass + '><a href="#">'
													+ j + '</a></li>')
											.insertBefore(
													$('li:last', an[i])[0])
											.bind(
													'click',
													function(e) {
														e.preventDefault();
														oSettings._iDisplayStart = (parseInt(
																$('a', this)
																		.text(),
																10) - 1)
																* oPaging.iLength;
														fnDraw(oSettings);
													});
								}

								// Add / remove disabled classes from the static
								// elements
								if (oPaging.iPage === 0) {
									$('li:first', an[i]).addClass('disabled');
								} else {
									$('li:first', an[i])
											.removeClass('disabled');
								}

								if (oPaging.iPage === oPaging.iTotalPages - 1
										|| oPaging.iTotalPages === 0) {
									$('li:last', an[i]).addClass('disabled');
								} else {
									$('li:last', an[i]).removeClass('disabled');
								}
							}
						}
					}
				});

/* Datepicker */

function initDatePickers() {
	var datePikerJSPath = "/static/fwk/components/bootstrap-datepiker-eternicode/1.3.0_custom/js/";
	if ($('.datepicker').length <= 0)
		return;
//	if ($('script[src="' + datePikerJSPath + "bootstrap-datepicker.js" + '"]').length <= 0)
//		return;

	var language = getCurrentAbsisCloudLanguage();
	
	$(".datepicker").each(function(){
		var checkCssClass = $(this).attr("data-check-class");
		if (checkCssClass==null){
			checkCssClass = "lkxaStandarCheckedDate";
		}
		
		var dateFormat = $(this).attr("data-date-format");
		if (dateFormat==null||dateFormat==""){
			dateFormat = "mm/dd/yyyy";
		}
		var checkCssArrayList=new Array();
		var checkCsslist = $(this).attr("data-check-list");
		if (checkCsslist!=null){
			checkCssArrayList=checkCsslist.split(",");
		}
		
		var dateList = new Array();
		$.each(checkCssArrayList,function(key, item){
			dateList.push( $.fn.datepicker.DPGlobal.parseDate(item, $.fn.datepicker.DPGlobal.parseFormat(dateFormat), language) );
		});
		
		var datePickerConfig = {
				language : language,
				weekStart : "1",
				autoclose : true,
				beforeShowDay: function(fecha){
					var deboMarcar = false;
					$.each(dateList,function(key, item){
						if (		fecha.getDate() == item.getDate() 
								&& 	fecha.getFullYear() == item.getFullYear() 
								&& 	fecha.getMonth() == item.getMonth())
							deboMarcar= true;
					}); 
					if ( deboMarcar ) return checkCssClass;
					return "";
					
				}
			};
		
		$('.date.datepicker').datepicker(datePickerConfig);
	});
	
}

/*Click 2 call*/
var c2cTesting = 1;
var appName="noapps";
function getC2CBackend(){
	if (document.domain.indexOf(".pro.")>0){
		appName=document.domain.substring(0,document.domain.indexOf(".pro."));
		return getDominioABSIS()+"/CA.OFI/ArquitecturCanalClickToCall/getJson.tf7";
	}else if(document.domain.indexOf(".pre.")>0){
		appName=document.domain.substring(0,document.domain.indexOf(".pre."));
		return getDominioABSIS()+"/CA.OFI/ArquitecturCanalClickToCall/getJson.tf7";
	}else if(document.domain.indexOf(".lab.")>0){
		appName=document.domain.substring(0,document.domain.indexOf(".lab."));
		return "https://tst01.tf7.lacaixa.es/CA.OFI/ArquitecturCanalClickToCall/getJson.tf7";
	}else{
		return "/docs/c2c/c2c_test"+c2cTesting+".json";
	}
}

function c2cRunApp(targetnumber) {
    try{
      document.C2CWrapper.DialNumber(targetnumber);
    }catch(err){
      alert(err);
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getDominioABSIS(){
	var cookie = $.cookie("tf7_domini");
	if (cookie == null){
		return "https://default.tf7.domain";
	}
	return cookie;
}

function click2callInit(){
	if($('span[data-role="c2c"]').length > 0){
		if (applicationName == undefined) applicationName = "acfwktests";
		$.getJSON("/fwk/c2c", function( data ) {
			$('span[data-role="c2c"]').each( function(){
				$(this).empty();
				if (data.ind_c2c.toUpperCase() == "NO"){
					$(this).append('<span class="telefono">'+$(this).attr("data-tel")+"</span>");
				}else if(data.ind_c2c.toUpperCase() == "ND"){
					$(this).append('<span class="telefonoND">'+$(this).attr("data-tel")+"</span>");
				}else if (data.ind_c2c.toUpperCase() == "SI"){
					if (data.tipus_c2c.toUpperCase() != "lync".toUpperCase()){
						$(this).append('<span class="telefonoNO"><a class="NO-Lync" href="#" data-url="'+getDominioABSIS()+''+data.url_c2c+'&application='+appName+'&targetDevice='+$(this).attr("data-tel")+'">'+$(this).attr("data-tel")+"</a></span>");
					}else{
						$(this).append('<object classid="CLSID:38DD6816-DB7A-4de6-AE6A-1F7D08E4E795" style="display:none" id="C2CWrapper" name="C2CWrapper"></object>');
						$(this).append('<span class="telefonoNO"><a class="SI-Lync" href="#" data-tel="'+$(this).attr("data-tel")+'">'+$(this).attr("data-tel")+"</a></span>");
					}
				}else {
					$(this).append('<span class="telefono backend-error">'+$(this).attr("data-tel")+"</span>");
				}
				
			});
			
			$(".telefonoNO a.NO-Lync").click(function(){
				window.open($(this).attr("data-url"),'','width=800,height=250,titlebar=0,scrollbars=0,location=0' );
			});

			$(".telefonoNO a.SI-Lync").click(function(){
				c2cRunApp($(this).attr("data-tel"));
			});
			
		});
	} 	
}

/*FIN Clock 2 call*/

/* Absis renderize */
function absisCloudRenderize() {
	// Prepare label for error and disabled
	$('.help-block').parent().parent(".form-group").addClass('error');
	$('input[disabled="disabled"]').parent().parent(".form-group").addClass('disabled');
	$('input[readonly="readonly"]').parent().parent(".form-group").addClass('disabled');

	// Prepare campo titulo
	$("#titol-aplicacio span.canal").append('<span class="se"><\/span><span class="sd"><\/span><span class="ie"><\/span><span class="id"><\/span>');
	$(".page-header span.canal").append('<span class="se"><\/span><span class="sd"><\/span><span class="ie"><\/span><span class="id"><\/span>');
	// Redondeando el emphasized
	$(".content-title.emphasized, .content-title.super-emphasized").append('<span class="tl" \/><span class="bl" \/><span class="br" \/><span class="tr" \/>');
	// Redondeando el buttonlink
	$('a.buttonlink').append('<span class="tl" \/><span class="bl" \/><span class="br" \/><span class="tr" \/>');

	// Reset browser button styles
	$('.btn').addClass('btnABSIS');
	$('.btnABSIS').removeClass('btn');
	// Pasamos los eventos definidos en botsrtamp al botonAbsis
	$(document).on('click.button.data-api', '[data-toggle^=button]',
			function(e) {
				var $btn = $(e.target)
				if (!$btn.hasClass('btnABSIS'))
					$btn = $btn.closest('.btnABSIS')
				$btn.button('toggle')
			});

}

/* Seleccion del autofocus */
function selectLinkAutofocus() {
	$("a.autofocus")
			.eq(0)
			.each(
					function() {
						if ((document.activeElement && document.activeElement != document.body)
								|| this.disabled)
							return false;
						try {
							this.focus();
						} catch (e) {
						}
						return false;
					});
}

/*Toggle boxes*/
function initToogleBoxes() {
	
	//comportamiento de los botones de contraer y expandir el filtro
	$('.panel-collapse').on('shown.bs.collapse', function() {
		$enlace = $(this).siblings(".toggle-box-boton-contraer");
		$enlace.text($enlace.attr("data-contraer"));
	});
	$('.panel-collapse').on('hidden.bs.collapse', function() {
		$enlace = $(this).siblings(".toggle-box-boton-contraer");
		$enlace.text($enlace.attr("data-expandir"));
	});
	
	$(".panel-collapse").each(function(){
		if ($(this).hasClass("in")) {
			$(this).siblings().text($(this).siblings().attr("data-contraer"));
		}
		else {
			$(this).siblings().text($(this).siblings().attr("data-expandir"));
			$(this).siblings().addClass("collapsed");
		}
	});
	
	//Aquí definimos el comportamiento de los botones de ver más información
	$("div.toggle-box .toggle-box-boton-resumir").click(function(){
		$(this).parent(".toggle-box-content").parent("div.panel-body").parent(".panel-collapse").parent("div.toggle-box").removeClass("completo");
		$(this).closest('.toggle-box-content').children("form").removeClass("row");
		$(this).closest('.toggle-box-content').children("form.super-expandido").addClass("inline-fields");
		$(this).closest('.toggle-box-content').children("form.super-expandido").removeClass("row");
	});
	
	$("div.toggle-box .toggle-box-boton-completar").click(function(){
		$(this).parent().parent("div.panel-body").parent(".panel-collapse").parent("div.toggle-box").addClass("completo");
		$(this).closest('.toggle-box-content').children("form").addClass("row");
		$(this).closest('.toggle-box-content').children("form.super-expandido").removeClass("inline-fields");
		$(this).closest('.toggle-box-content').children("form.super-expandido").removeClass("row");
	});
	$("div.toggle-box.completo .toggle-box-content form").addClass("row");
	$("div.toggle-box.completo .toggle-box-content form.super-expandido").removeClass("inline-fields");
	$("div.toggle-box.completo .toggle-box-content form.super-expandido").removeClass("row");
}


/* document ready */
$(document).ready(function() {
	
	initDatePickers();
	initTimePickers();
	absisCloudRenderize();
	selectLinkAutofocus();
	initToogleBoxes();
	initFeedBack();
	initCheckBox();
	initRTAs();
	click2callInit();
});
/*inicializa los timepikers*/
var timePikerJSPath = "/static/fwk/components/bootstrap-timepicker/0.2.3_custom/js/";

function initTimePickers() {

	
	if ($('.timepiker').length <= 0)
		return;
//	if ( ( $('script[src="' + timePikerJSPath + "bootstrap-timepicker.js" + '"]').length + $('script[src="' + timePikerJSPath + "bootstrap-timepicker.min.js" + '"]').length)<= 0)
//		return;
	
	$('.timepiker').timepicker({ 
		showMeridian:false, 
		minuteStep:5 ,
        showInputs: false,
        disableFocus: true});

	//Customizacion especifica del widget para IE7
	if ($.browser.msie  && parseInt($.browser.version, 10) === 7) {
		$("span.timepiker-button-container").click(function(evento){
			x=evento.pageX-10;
			y=evento.pageY+5;
			$(".bootstrap-timepicker-widget").css({left:x,top:y, width:"150px"});
		});
		$(".bootstrap-timepicker-widget").appendTo($(".bootstrap-timepicker-widget").parent().parent());
	}
}

function initFeedBack() {
	$(".feedback-notificacio").slideToggle("slow");
	
	$(".feedback-notificacio").append("<i class='icono-fblite-cerrar feedback-notificacio-close-button ' ></i>");
	
	$(".feedback-notificacio-close-button").on("click", function(){
		$(this).parent().slideToggle("hidden");
	})
}

function initRTAs(){
	var location =window.location.hostname;
	var realScript_url = '';

	
	if (location.indexOf("localhost") > -1) 
		realScript_url ="/absiscloud/acstatic/static/fwk/components/tinymce/3.5.8/tiny_mce.js";

	if (location.indexOf("pre") > -1) 
		realScript_url = "https://acstatic.pre.absiscloud.lacaixa.es/static/fwk/components/tinymce/3.5.8/tiny_mce.js";

	if (location.indexOf("pro") > -1) 
		realScript_url = "https://acstatic.pro.absiscloud.lacaixa.es/static/fwk/components/tinymce/3.5.8/tiny_mce.js";

	if ($('textarea.rich-text-area').length <= 0)
		return;
		
	 $('textarea.rich-text-area').tinymce({
         script_url :realScript_url,
         mode:"textareas",
         language : 'es',
         theme_advanced_buttons1 : "bold,italic,underline,separator,justifyleft,justifycenter,justifyright,justifyfull,separator,undo,redo,separator,link,unlink,separator,removeformat,image",
         theme_advanced_resizing : true
	 });
}

function initCheckBox() {
	$('div[class=consultas-controls] input[type=checkbox]').each(function () {
        if (this.checked) {
        	$('<span class="input-group-addon"><i class="icono-bullet-check-OK"></i></span>').insertBefore(this);
        } else {
        	$('<span class="input-group-addon"><i class="icono-bullet-check-KO"></i></span>').insertBefore(this);
        }
	});
}

/**
 * Añade funcionalidades extendidas al componente DataTables
 */
function applyRowGroupingHeaders(){

	//$("table[data-role='grouping-headers']").hide();
	
	$("table[data-role='grouping-headers']").each(function () {
		var tablaCabeceras = this;
		var idTable=$(tablaCabeceras).attr("data-table-id");
		var locator = "#"+$(tablaCabeceras).attr("data-table-id")+ " td.group";
		$(locator).each(function () {
			var groupingTD = this;
			var groupingTR = $(groupingTD).parent();
			var newGroupingTDs = $("table[data-role='grouping-headers'][data-table-id='"+idTable+"'] tr[data-locator-text='"+$(groupingTD).html()+"'] td");
			var primeraEntrada = true;
			$(newGroupingTDs).each(function(){
				$(this).addClass($(groupingTD).attr("class"));
				$(this).addClass("custom-row");
				$(this).attr("data-group",$(groupingTD).attr("data-group") );
				$(this).attr("data-group-level",$(groupingTD).attr("data-group-level") );
				var eventos = jQuery._data( groupingTD, "events" );
				$(this).dblclick(eventos.click[0].handler);
				if (primeraEntrada){
					$(this).prepend("<i class='boton-row'></i>");
					
					$(this).find("i.boton-row").click(function(){
						$(this).parent().dblclick();
					});
					primeraEntrada=false;
				}
				$(groupingTR).append($(this));
				
			});
			$(groupingTR).find("td").first().remove();
		});
	});
}