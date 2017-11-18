/**
 * Retorna el path estático en funcion de la plataforma
 */
function getStaticPath(){
	if(getCurrentServerPlatform()=="ABSISCloud"){
		return "/static/fwk/";
	}else if(getCurrentServerPlatform()=="ABSIS"){
		return "/absismobile/static/";
	}
}


/*Modificación de los valores por defecto del framework*/
function jQueryMobileSettings(){
	$.mobile.defaultPageTransition = "slide";
	$.mobile.loadingMessage = Globalize.localize('jquery.mobile.loading');
	$.mobile.pageLoadErrorMessage = Globalize.localize('jquery.mobile.error.page');
}


/*Inicializaciones del framework*/
$(document).bind("mobileinit", function(){
	/*Configuramos el locale*/
	setGlobalizeCurrentTFMobileCulture();  	

	/*Cargamos los literales del server*/
	try{ configureGlobalizeServerMessages(); } catch(err) {}

	/*Parametrizamos jQueryMobile*/
	jQueryMobileSettings();
});


/* Aplica la globalización al iniciar la página*/
$(document).bind('pageshow',function () {
	
	applyGlobalize();
	initMenus();
	initValidableForm();
	
	if(getCurrentServerPlatform()=="ABSIS"){
		bindForm();
	}
	
	initFieldFormaters();
	initList();
	initAutomaticallyList();
	initProcessToolbar();
	initButtonDateBox();
	initUIAutomaticList();
	initSelectList();
	
	initTooltipToolbar();
	
	$('li.list-expanded[data-link]').each(function(){
		$(this).append('<a href="'+$(this).attr("data-link")+'" class="ui-li-link-alt ui-btn link-detail" ><span class="ui-btn-inner"><img src="../static/images/icona-fletxa-gris.png"/></span></a>');
	})
});


/**
 * Inicializamos los formularios validables
 */
function initValidableForm(){
	
	$("form.validable").validationEngine({promptPosition:"inline"});
	
	var i = 0;
	$("form.validable input").each(function(){
		$this = $(this);
		var name = $this.attr("name");
		$this.attr("data-prompt-target",'errorprompt'+i+"for"+name);
		$this.parent("div.ui-input-text").parent().append("<label id='errorprompt"+i+"for"+name+"' class='error'></div>");
		i++;
	});
	
}

/**
 * Inicializamos el toolbar de proceso 
 */
function initProcessToolbar() {
	$(".process-toolbar").each(function() {
		$this = $(this);
		var numeral = "<span class='numeral-back'>&nbsp;</span>";
		$this.prepend(numeral);
		$this.find(".numeral-back").width($this.find(".numeral").width() + 12);
	});
}

/**
 * Inicializamos los formateadores de campos especiales.
 */
function initFieldFormaters(){
	
	// Añadimos las reglas según el tipo de campo
	$('input[type="email"]').addClass("validate[custom[email]]");
	$('input[type="tel"]').addClass("validate[custom[phone]]");
	
	// CAMPOS DE TEXTO
	
	// NIF
	$('input[data-role="nif"]').addClass("validate[maxSize[10], custom[nif]]");
	$('input[data-role="nif"]').bind("blur", function(){
		$this = $(this);
		var nif = $this.val();
		if (nif=="") return;
		$this.val(nif.replace("-",""));		
	});
	
	// Oficina
	$('input[data-role="office"]').addClass("validate[maxSize[5], custom[integer]]");
	$('input[data-role="office"]').bind("blur", function(){
		$this = $(this);
		var office = "00000" + $this.val();
		var office = office.substring(office.length - 5);
		$this.val(office);
	});
	
	// Empleado
	$('input[data-role="employee"]').addClass("validate[custom[employee], maxSize[8]]");
	$('input[data-role="employee"]').bind("blur", function(){
		$this = $(this);
		var employee = $this.val();
		if (employee=="") return;	
		employee = employee.replace("-","");
		if (employee.length!=7) return;
		employee = employee.replace(/(\d{5})(\d{2})/, '$1-$2');
		$this.val(employee);	
	});
	
	/*Campo precio*/
	$("input.number-price-format").addClass("validate[custom[number]]");
	
	$("input.number-price-format").each(function() {
		if (!isNaN(Globalize.parseFloat(this.value))){
			this.value = Globalize.format(Globalize.parseFloat(this.value),"n2");
		}		 
	});
	
	$("input.number-price-format").blur(function() {
		if (!isNaN(Globalize.parseFloat(this.value))){
			this.value = Globalize.format(Globalize.parseFloat(this.value),"n2"); 
		}		 
	});
	
	//NUMERICO
	$("input.number-integer-format").addClass("validate[custom[integer]]");
	
	$("input.number-integer-format").each(function() {
		if (!isNaN(Globalize.parseFloat(this.value))){
			this.value = Globalize.format(Globalize.parseFloat(this.value),"n0"); 
		}		 
	});
		
	$("input.number-integer-format").blur(function() {
		if (!isNaN(Globalize.parseFloat(this.value))){
			this.value = Globalize.format(Globalize.parseFloat(this.value),"n0"); 
		}		 
	});
	/* Texto */
	// Email
	$('a[data-role="email"]').each(function(){
		$this = $(this);
		$this.addClass("ui-link-email");
		var email = $this.attr("data-value");
		$this.html(email);
		$this.attr("href","mailto:" + email);
	});
	
	// Telefono
	$('a[data-role="telf"]').each(function(){
		$this = $(this);
		$this.addClass("ui-link-tel");
		var telephone = $this.attr("data-value");
		$this.html(telephone.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4'));
		$this.attr("href","tel:" + telephone);		
	});
	
	// Date
	$('div[data-role="data-time"]').each(function(){
		$this = $(this);
		
		var formatInput = $this.attr("data-format-input");	
		if (formatInput==null || formatInput=="") {		
			formatInput = "dd/MM/yyyy HH:mm"
		}
		
		var dateS = $this.attr("data-value");
		var date = Globalize.parseDate(dateS, formatInput);
		
		var pattern = "dd/MM/yyyy HH:mm";
		var tipus = $this.attr("data-type");
		if (tipus=="date") {
			pattern = "dd/MM/yyyy";
		} else if (tipus == "time") {
			pattern = "HH:mm";
		} else if (tipus="datetime"){
			pattern = "dd/MM/yyyy HH:mm";
		}
	
		var dateF = Globalize.format(date, pattern);
		$this.html('<span class="ui-date-time">' + dateF + '</span>');
			
	});
	
	// Texto numérico
	$('div[data-role="text-number"]').each(function(){
		$this = $(this);
		
		var numberS = parseFloat($this.attr("data-value"));
		var locale = $this.attr("data-locale");
		
		var tipus = $this.attr("data-type");
		if (tipus==null || tipus=="" || tipus=="post-text") {
			tipus = "n";
		} else if (tipus=="currency") {
			tipus = "c";
		} else if (tipus=="percent") {
			tipus = "p";
		} 
		
		
		
		var numberF = "";
		if (locale!=null && locale!="") {
			numberF = Globalize.format(numberS, tipus, locale);
		} else {
			numberF = Globalize.format(numberS, tipus);
		}
		if ($this.attr("data-type")=="post-text") {
			$this.html('<span class="ui-number">' + numberF + '</span><span class="post-text">'+$this.attr("data-post-text")+'</span>');
		} else{
			$this.html('<span class="ui-number">' + numberF + '</span>');
		}
		
			
	});
		
	// Texto cliente
	$('div[data-role="text-customer"]').each(function(){
		$this = $(this);
		
		var value = $this.attr("data-value");
		var name = $this.attr("data-name");
		var surname1 = $this.attr("data-surname-1");
		var surname2 = $this.attr("data-surname-2");
		
		var format = $this.attr("data-format");
		if (format == "first-name") {			
			value = name + " " + surname1 + " " + surname2;
		} else if (format == "first-surname") {
			value = surname1 + " " + surname2 + ", " + name;
		}
				
		$this.html('<span class="ui-customer">' + value + '</span>');			
	});	
	
	// Texto cuenta
	$('div[data-role="text-account"]').each(function(){
		$this = $(this);
		
		var account = $this.attr("data-value");
		var pattern = $this.attr("data-pattern");
		
		var value = "";
		if (pattern == "4-4-2-10") {
			value = account.replace(/(\d{4})(\d{4})(\d{2})(\d{1})/, '$1 $2 $3 $4');
		} else if (pattern == "4-3-6-2") {
			value = account.replace(/(\d{4})(\d{3})(\d{6})(\d{2})/, '$1 $2 $3$4');
		} else if (pattern == "4-2-6-2") {
			value = account.replace(/(\d{4})(\d{2})(\d{6})(\d{2})/, '$1 $2 $3$4');
		} else if (pattern == "4-2-7-2") {
			value = account.replace(/(\d{4})(\d{2})(\d{7})(\d{2})/, '$1 $2 $3$4');
		} else if (pattern == "4-3-7-2") {
			value = account.replace(/(\d{4})(\d{3})(\d{7})(\d{2})/, '$1 $2 $3$4');
		} 
				
		
		$this.html('<span class="ui-account">' + value + '</span>');		
	});
	
	
	// Texto de NIF
	$('div[data-role="text-nif"]').each(function(){
		$this = $(this);
		
		var nif = $this.attr("data-value");					
		
		$this.html('<span class="ui-nif">' + nif + '</span>');		
	});
	
	
	// Texto de oficina
	$('div[data-role="text-office"]').each(function(){
		$this = $(this);
		
		var office = "00000" + $this.attr("data-value");					
		office = office.substring(office.length-5);
		
		$this.html('<span class="ui-office">' + office + '</span>');		
	});
	
	
	
	// Texto PAN
	$('div[data-role="text-pan"]').each(function(){
		$this = $(this);
		
		var pan = $this.attr("data-value");
		var pattern = $this.attr("data-pattern");
		
		var value = pan;
		if (pattern == "4-4-4-4") {
			value = pan.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
		} else if (pattern == "4-6-5") {
			value = pan.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
		} 				
		
		$this.html('<span class="ui-account">' + value + '</span>');		
	});
	
	// Texto plano
	$('div[data-role="text-plain"]').each(function() {
		$this = $(this);
		var myHtml = "";
		var value = $this.attr('data-value');
		myHtml += "<span class='source'>"+value+"</span>";
		var img = $this.attr('data-img');
		var img_title = $this.attr('data-img-title');
		if (img!=null && img != "") myHtml += '<img src="'+img+'" title="'+img_title+'" />';
		var complementary = $this.attr('data-complementary-text');
		if (complementary !=null && complementary!=""){
			myHtml += "<span class='complementary'>"+complementary+"</span>";
		}
		$this.html(myHtml);
		
	});
	
	
}

/**
 * Inicializa los menus
 */
function initMenus(){
	/* Menu navegación */
	$('div[data-subrole="menunav"]').addClass("ui-menu-navigator");
	$('div[data-role="sublistview"]').addClass("sublist");
	$('ul[data-role="sublistview"] li').append('<span class="ui-select-li">&nbsp;</span>');
	$('li[data-role="item-selected"]').addClass("ui-section-selected");
	$('li[data-role="subitem-selected"]').addClass("ui-subsection-selected");
	
	
	/* Menú acciones */
	$('div[data-subrole="menuactions"]').addClass("ui-menu-actions");
}


/**
 * Inicializa la carga automatica de las listas 
 */
function initAutomaticallyList() {
	if ($('.automaticallyList').length>0) {
				
		var timer  = setInterval(function () {
		        scrollOK = true;
		    }, 100),
		    count=20,
	    scrollOK = true;
		
		$(window).bind('scroll', function () {
		    if (scrollOK) {
		        scrollOK = false;
		        if ($(this).scrollTop() + $(this).height() >= ($(document).height() - 100)) {
		        	var out = [];
		            for (var i = 0; i < 10; i++) {
		                out.push('<li>' + (count++) + '</li>');
		            }
		            $('.automaticallyList').append(out.join('')).listview('refresh');
		        }
		    }
		});
	}
}

/**
 * Inicializa las listas 
 */
function initList() {
	
	/* Listview con checkbox */
	$('.checkBoxLeft input[type="checkbox"]').each(function(){
        ($(this).attr('checked')=='checked') ? $(this).parent().parent().addClass('checked') : $(this).parent().parent().addClass('not-checked');
    });
	
	$('.checkBoxLeft').bind('click', function(e) {
	    if($(this).find('input[type="checkbox"]').attr('checked')=='checked'){
	       $(this).removeClass('checked').addClass('not-checked'); 
	       $(this).find('input[type="checkbox"]').attr('checked' , false);
	    } else {
	       $(this).removeClass('not-checked').addClass('checked');             
	       $(this).find('input[type="checkbox"]').attr('checked' , true);
	    }
	});
}


/**
 * Inicializa los botones para la selección de fecha 
 */
function initButtonDateBox() {
	
	$('input[data-role="datebox"]').each(function(){
		$this = $(this);
		$this.datebox("option", {
		    mode: "calbox",
		    useNewStyle: false, 
		    focusMode: false, 
		    noButton: true, 
		    useButton:false, 
		    themeDateHigh: "c", 
		    themeDateHighAlt: "b"
		});
		$this.attr("readonly", true);
		$this.attr("type", "date");
		$this.removeClass("input-date-box").addClass("input-date-box");
		
	});
	
	
	$('.datebox').each(function(){
		$this = $(this);		
		$this.removeClass("ui-btn-inline").addClass("ui-btn-inline");
		$this.removeClass("ui-btn-icon-notext").addClass("ui-btn-icon-notext");
		$this.removeClass("ui-btn-icon-left");
		
		//$this.find('ui-icon').removeClass("ui-icon-calendari").addClass("ui-icon-calendari");	
		$this.bind('click', function() {
			$this = $(this);
			$this.parent().find('input[data-role="datebox"]').datebox('open');
			$this.parent().find('input[data-role="datebox"]').hide();			
		});
	});
	
	
	
}

/**
 * Esta función permite obtener el objeto JSON recuperado del servidor 
 * tratando los errores y retornando nulo cuando la respuesta no sea de 
 * tipo JSON.
 * 
 * @param data
 * @returns retorna null cuando no se puede parsear el objeto
 */
function parseJSON(data){
	if(!$.isPlainObject(data)) {
		feedbackError(Globalize.localize("error_estandar_al_cargar_json"));
		return null;
	}
	return data;
}


var TFMobile_bind_object = null;
function bindForm(){
	if (TFMobile_bind_object!=null){
		var formulario = TFMobile_bind_object;
		var formName = formulario.formName;
		if ($("form[name=" + formName +"]").length>0){
			//Seteando los valores del formulario
			$.each(formulario.dto,function(key,input){
				$("form[name=" + formName +"] :input[name="+ input.field_name+"]").val(input.field_value);
			});
			
			//Seteando los valores de los errores de campos
			$.each(formulario.field_errors,function(key,input){
				marcarCampoErroneo(formName, input.field_name, input.field_message);
			});
			
			//Seteando los valores de los errores globales de página
			if (formulario.global_errors !=null && formulario.global_errors.length>1){
				var feebackerror = ""
										+Globalize.localize("binding_cabecera_listado_errores")
										+"<ul>";
				$.each(formulario.global_errors,function(key,input){
					feebackerror+="<li>"+input+"</li>";
				});
				feebackerror+="</ul>";
				feedbackError(feebackerror);
			}else if(formulario.global_errors !=null && formulario.global_errors.length==1){
				var feebackerror = formulario.global_errors[0];
				feedbackError(feebackerror);
			}
			
		
		}
		TFMobile_bind_object = null;
	} 
}

/**
 * Esta funcion te marca un campo como campo erroneo.
 * 
 * @param formName
 * @param nameCampo
 * @param mensaje
 */
function marcarCampoErroneo(formName, nameCampo, mensaje){
	$("form[name=" + formName +"] :input[name="+ nameCampo +"]").addClass("error");
	$("form[name=" + formName +"] :input[name="+ nameCampo +"]")
			.parent("div").after('<label class="error" for="'+nameCampo+'">'+mensaje+'</label>');
}

/**
 * Esta función limpia el área de mensajes
 * 
 * @param mensaje
 */
function feedbackClear(idFeedbackArea){
	$("#" + idFeedbackArea).html("");
}

/**
 * Esta función te renderiza un mensaje de feedbak como error.
 * 
 * @param mensaje
 */
function feedbackError(idFeedbackArea, mensaje){
	var span= "<div class='feedback error-feedback'><span>" + mensaje + "</span></div>";
	$("#" + idFeedbackArea).append(span);	
}


/**
 * Esta función te renderiza un mensaje de feedbak como ok.
 * 
 * @param mensaje
 */
function feedbackOk(idFeedbackArea, mensaje){
	var span= "<div class='feedback ok-feedback'><span>" + mensaje + "</span></div>";
	$("#" + idFeedbackArea).append(span);
}

/**
 * Esta función te renderiza un mensaje de feedbak como alert.
 * 
 * @param mensaje
 */
function feedbackAlert(idFeedbackArea, mensaje){
	var span= "<div class='feedback alert-feedback'><span>" + mensaje + "</span></div>";
	$("#" + idFeedbackArea).append(span);
}

/**
 * Esta función te renderiza un mensaje de feedbak como alert.
 * 
 * @param mensaje
 */
function feedbackInfo(idFeedbackArea, mensaje){
	var span= "<div class='feedback info-feedback'><span>" + mensaje + "</span></div>";
	$("#" + idFeedbackArea).append(span);
}


/**
 * Funciones para las listas automáticas
*/
// Función para crear el div del gif de progeso
function initUIAutomaticList() {	
	$(".ui-automatic-list").each(function(){
		$this = $(this);
		$this.addClass("ui-icon-alt");
		
		var idLista = $this.attr("id");
		var idProgres = getIdProgressDiv(idLista);
		var img = "<br/><div id='" + idProgres + "' class='width-hundred-percent display-none'>";
		img += "<div class='width-two-hundred-pixels center-element align-center ui-automatic-loading'>&nbsp;</div></div><br class='clear' />";
		
		$this.after(img);
	});		
}

// Función para obtener el div del gif de progreso
function getIdProgressDiv(idLista) {
	 return "ui-progressDiv-" + idLista;
}

// Función para inicializar las listas automáticas
function initListaAutomatica(idPagina, idLista, tamPagina, elementosRecuperados, url){//}, callback) {	
	if ($("#" + idPagina).length>0) {
		
		// Inicialización para la carga automática de listas
		$( "#" + idPagina ).lazyloader(); 	
		
	    threshold = $(window).height();
	    
	    // opciones
	    var options = { "threshold"   : threshold,	
	                    "retrieve"    : tamPagina,
	                    "retrieved"   : elementosRecuperados,
	                    "bubbles"     : true };
	
	    var progressDiv = getIdProgressDiv(idLista);
	    
	    // configuración
	    var settings = {  "templateType"	:	"icanhaz",
	    				  "templateId"		: 	idLista+"-template",
	    				  "pageId"                : idPagina,					// Id de la página (data-role=page) que contiene la lista
	                      "progressDivId"         : progressDiv,				// Id del div que contiene la imagen de loading
	                      "mainId"                : idLista,					// Id de la lista (ul)
	                      "moreUrl"               : url,						// Url para la petición de más elementos
	                      "JSONP"				  : false,						// La respuesta es un json
	                      "JSONPCallback"		  : function(){ }				// funcion callback que se ejecutará tras la respuesta
	                   	};
	
	    // parámetros para pasar al lazyloader para enviar en el post por ajax
	    var parameters = {  "retrieve"    : options.retrieve,					// Paginación
	                        "retrieved"   : options.retrieved,					// Paginación
	                        "offset"      : options.offset,						// Paginación
	                        "mainId"	  : settings.mainId						// Id de la lista (ul) 
	                     };
	
	
	    $( "#" + idPagina ).lazyloader( "reInitialize", options, settings, parameters );
	    
	    // Parámetros de tiempo para el scroll y el gif de progreso
	    $.mobile.lazyloader.prototype.timeoutOptions.mousewheel = 300;
	    $.mobile.lazyloader.prototype.timeoutOptions.scrollstart = 700;
	    $.mobile.lazyloader.prototype.timeoutOptions.scrollstop = 100;
	    $.mobile.lazyloader.prototype.timeoutOptions.showprogress = 100;    
	    

	}
}


/**
* Esta función hace que al pinchar a un elemento de lista tipo selección se seleccione
*/
function initSelectList() {
	$(".checkBoxLeft").each(function(){
		$this = $(this);
		$parent = $this.parent();
		$parent.bind("click",function(){
			$this = $(this);
			$check = $this.find('.checkBoxLeft');
			if ($check.hasClass("checked")) {
				$check.removeClass("checked").addClass("not-checked");
				$check.find("input[type=checkbox]").attr("checked",false);
			} else {
				$check.removeClass("not-checked").addClass("checked");
				$check.find("input[type=checkbox]").attr("checked",true);
			}
			
		});
	});
}

/**
* Esta función hace que al pinchar en el toolbar aparezca un tooltip con el texto
*/
function initTooltipToolbar() {
	$('.ui-header').each(function(){
		$this = $(this);
		if ($this.find(".tooltip").length==0) {
			$this.append("<div class=\"tooltip ui-popup-container pop\" style=\"display:none\"><div class=\"ui-content ui-popup ui-body-d ui-overlay-shadow ui-corner-all\" >" + $this.find('h1.ui-title').html() + "</div></div>");
		}
	});
	
	$('.ui-header h1.ui-title').bind('tap',function(event) {
		$this = $(this);
	    $this.parent().find(".tooltip").toggle(); 
	});

	$('.ui-panel-content-wrap').bind('tap',function(event) {
		$('.ui-header h1.ui-title').parent().find(".tooltip").hide();
	})
}


/**
 * Esta función hace que el botón de ordenar del header cambie de estado a encendido (azul claro) o apagado (azul oscuro)
 */

function toggleOrderButton (on) {
	if (on) {
		$('.ui-header .ui-icon-order').addClass('ui-icon-order-toggled');
	} else {
		$('.ui-header .ui-icon-order').removeClass('ui-icon-order-toggled');
	}
}