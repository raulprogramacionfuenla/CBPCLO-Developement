Globalize.addCultureInfo( "es", {  
    messages: {  
        "jquery.mobile.loading": "Cargando",  
        "jquery.mobile.error.page": "Página de error",
		"error_estandar_al_cargar_json":"Se ha producido un error al intentar recuperar los datos solicitados",
		"binding_cabecera_listado_errores": "Se han detectado los siguientes errores:",
		"error_en_campos":"Algunos de los campos contiene errores",
		"error_en_patron": "El campo no cumple con el patrón",
		"error_en_nif": "NIF no válido"
    },
	/*
	 * jQuery Mobile Framework : plugin to provide a date and time picker.
	 * Copyright (c) JTSage
	 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
	 * https://github.com/jtsage/jquery-mobile-datebox
	 *
	 * Translation by: J.T.Sage <jtsage@gmail.com>
	 *
	 */
	datebox: {
		setDateButtonLabel: "Aceptar",
		setTimeButtonLabel: "Aceptar",
		setDurationButtonLabel: "Aceptar",
		calTodayButtonLabel: "Hoy",
		titleDateDialogLabel: "Selecciona Fecha",
		titleTimeDialogLabel: "Selecciona Hora",
		daysOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		daysOfWeekShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
		monthsOfYear: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		monthsOfYearShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		durationLabel: ["Días", "Horas", "Minutos", "Segundos"],
		durationDays: ["Día", "Días"],
		tooltip: "Abrir calendario",
		nextMonth: "Mes siguiente",
		prevMonth: "Mes anterior",
		timeFormat: 24,
		headerFormat: '%A, %B %-d, %Y',
		dateFieldOrder: ['m', 'd', 'y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: "%d/%m/%Y",
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0,
		clearButton: "Borra",
		durationOrder: ['d', 'h', 'i', 's'],
		meridiem: ["AM", "PM"],
		timeOutput: "%l:%M %p",
		durationFormat: "%Dd %DA, %Dl:%DM:%DS",
		calDateListLabel: "Otras Fechas"
	},
	validationEngine: {
		/*TFMobile custom*/
		 "nif": {
	            "regex":  /\d{8}[\-]{0,1}[a-zA-Z]{1}$/,
	            "alertText": "* El formato del nif es incorrecto"
	        },
		 "employee": {
	            // credit: jquery.h5validate.js / orefalo
	            "regex": /\d{5}[\-]{0,1}\d{2}$/,
	            "alertText": "* Número de empleado inválido"
	        },
	    /*FIN TFMobile custom*/
        "required": { // Add your regex rules here, you can take telephone as an example
            "regex": "none",
            "alertText": "* Este campo es obligatorio",
            "alertTextCheckboxMultiple": "* Por favor seleccione una opción",
            "alertTextCheckboxe": "* Este checkbox es obligatorio"
        },
        "requiredInFunction": { 
            "func": function(field, rules, i, options){
                return (field.val() == "test") ? true : false;
            },
            "alertText": "* Field must equal test"
        },
        "minSize": {
            "regex": "none",
            "alertText": "* Mínimo de ",
            "alertText2": " caracteres autorizados"
        },
		"groupRequired": {
            "regex": "none",
            "alertText": "* Debe de rellenar al menos uno de los siguientes campos"
        },
        "maxSize": {
            "regex": "none",
            "alertText": "* Máximo de ",
            "alertText2": " caracteres autorizados"
        },
        "min": {
            "regex": "none",
            "alertText": "* El valor mínimo es "
        },
        "max": {
            "regex": "none",
            "alertText": "* El valor máximo es "
        },
        "past": {
            "regex": "none",
            "alertText": "* Fecha anterior a "
        },
        "future": {
            "regex": "none",
            "alertText": "* Fecha posterior a "
        },	
        "maxCheckbox": {
            "regex": "none",
            "alertText": "* Se ha excedido el número de opciones permitidas"
        },
        "minCheckbox": {
            "regex": "none",
            "alertText": "* Por favor seleccione ",
            "alertText2": " opciones"
        },
        "equals": {
            "regex": "none",
            "alertText": "* Los campos no coinciden"
        },
        "creditCard": {
            "regex": "none",
            "alertText": "* La tarjeta de crédito no es válida"
        },
        "phone": {
            // credit: jquery.h5validate.js / orefalo
            "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
            "alertText": "* Número de teléfono inválido"
        },
        "email": {
            // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
            "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            "alertText": "* Correo inválido"
        },
        "integer": {
        	/*ERROR DETECTADO "regex": /^[\-\+]?\d+$/,*/
        	 /*CORRECCION*/ "regex": /^[\-\+]?((([0-9]{1,3})([.][0-9]{3})*)|([0-9]+))?$/,
             "alertText": "* No es un valor entero válido"
        },
        "number": {
            // Number, including positive, negative, and floating decimal. credit: orefalo
        	 /*ERROR DETECTADO "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,*/
        	 /*CORRECCION*/ "regex": /^[\-\+]?((([0-9]{1,3})([.][0-9]{3})*)|([0-9]+))?([\,]([0-9]+))?$/,
            "alertText": "* No es un valor decimal válido"
        },
        "date": {
            "regex": /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
            "alertText": "* Fecha inválida, por favor utilize el formato DD/MM/AAAA"
        },
        "ipv4": {
        	"regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
            "alertText": "* Direccion IP inválida"
        },
        "url": {
            "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
            "alertText": "* URL Inválida"
        },
        "onlyNumberSp": {
            "regex": /^[0-9\ ]+$/,
            "alertText": "* Sólo números"
        },
	    "onlyLetterSp": {
            "regex": /^[a-zA-Z\ \']+$/,
            "alertText": "* Sólo letras"
        },
        "onlyLetterNumber": {
            "regex": /^[0-9a-zA-Z]+$/,
            "alertText": "* No se permiten caracteres especiales"
        },
		// --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
        "ajaxUserCall": {
            "url": "ajaxValidateFieldUser",
			// you may want to pass extra data on the ajax call
            "extraData": "name=eric",
            "alertTextLoad": "* Cargando, espere por favor",
            "alertText": "* Este nombre de usuario ya se encuentra usado"
        },
        "ajaxNameCall": {
			// remote json service location
            "url": "ajaxValidateFieldName",
			// error
            "alertText": "* Este nombre ya se encuentra usado",
			// if you provide an "alertTextOk", it will show as a green prompt when the field validates
            "alertTextOk": "* Este nombre está disponible",
			// speaks by itself
            "alertTextLoad": "* Cargando, espere por favor"
        },
        "validate2fields": {
            "alertText": "* Por favor entrar HELLO"
        }
    }
	

});  


