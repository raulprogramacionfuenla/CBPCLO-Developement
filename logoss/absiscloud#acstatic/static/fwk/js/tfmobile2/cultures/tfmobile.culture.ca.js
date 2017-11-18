Globalize.addCultureInfo( "ca", {  
    messages: {  
        "jquery.mobile.loading": "Carregant",  
        "jquery.mobile.error.page": "Pàgina d'error",
		"error_estandar_al_cargar_json":"S'ha produït un error inesperat al intentar carregar les dades sol·licitades.",
		"binding_cabecera_listado_errores": "S'han detectat els següents errors:",
		"error_en_campos":"Alguns dels camps contenen errors",
		"error_en_patron": "El campo no s'ajusta al patró",
		"error_en_nif": "NIF no vàlid"
    },
	/*
	 * jQuery Mobile Framework : plugin to provide a date and time picker.
	 * Copyright (c) JTSage
	 * CC 3.0 Attribution.  May be relicensed without permission/notifcation.
	 * https://github.com/jtsage/jquery-mobile-datebox
	 *
	 * Translation by: Unknown
	 *
	 */
	datebox: {
		setDateButtonLabel: "Tanca",
		setTimeButtonLabel: "Tanca",
		setDurationButtonLabel: "Tanca",
		calTodayButtonLabel: "Vés a avui",
		titleDateDialogLabel: "Tria la data",
		titleTimeDialogLabel: "Esculli temps",
		daysOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
		daysOfWeekShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
		monthsOfYear: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
		monthsOfYearShort: ["Gen", "Feb", "Març", "Abr", "Maig", "Juny", "Jul", "Ag", "Set", "Oct", "Nov", "Des"],
		durationLabel: ["Dies", "Hores", "Minuts", "Segons"],
		durationDays: ["Dia", "Dies"],
		tooltip: "Selector de la data obert",
		nextMonth: "Següent",
		prevMonth: "Anterior",
		timeFormat: 24,
		headerFormat: '%A, %B %-d, %Y',
		dateFieldOrder: ['d','m','y'],
		timeFieldOrder: ['h', 'i', 'a'],
		slideFieldOrder: ['y', 'm', 'd'],
		dateFormat: "%d/%m/%y",
		useArabicIndic: false,
		isRTL: false,
		calStartDay: 0,
		clearButton: "Clar",
		durationOrder: ['d', 'h', 'i', 's'],
		meridiem: ["AM", "PM"],
		timeOutput: "%k:%M",
		durationFormat: "%Dd %DA, %Dl:%DM:%DS",
		calDateListLabel: "Altres Dates"
	},
	validationEngine: {
		/*TFMobile custom*/
		 "nif": {
	            "regex":  /\d{8}[\-]{0,1}[a-zA-Z]{1}$/,
	            "alertText": "* El format del nif es incorrecte"
	        },
		 "employee": {
	            // credit: jquery.h5validate.js / orefalo
	            "regex": /\d{5}[\-]{0,1}\d{2}$/,
	            "alertText": "* El format del codi d'empleat no es correcte"
	        },
	    /*FIN TFMobile custom*/
        "required": { // Add your regex rules here, you can take telephone as an example
            "regex": "none",
            "alertText": "* Aquest camp és obligatori",
            "alertTextCheckboxMultiple": "* Si us plau seleccioni una opció",
            "alertTextCheckboxe": "* Aquest checkbox és obligatori"
        },
        "requiredInFunction": { 
            "func": function(field, rules, i, options){
                return (field.val() == "test") ? true : false;
            },
            "alertText": "* Field must equal test"
        },
        "minSize": {
            "regex": "none",
            "alertText": "* Mínim de ",
            "alertText2": " caràcters autoritzats"
        },
		"groupRequired": {
            "regex": "none",
            "alertText": "* Ha d'omplir al menys un dels següents camps"
        },
        "maxSize": {
            "regex": "none",
            "alertText": "* Màxim de ",
            "alertText2": " caràcters autoritzats"
        },
        "min": {
            "regex": "none",
            "alertText": "* El valor mínim és "
        },
        "max": {
            "regex": "none",
            "alertText": "* El valor màxim és "
        },
        "past": {
            "regex": "none",
            "alertText": "* Data anterior a "
        },
        "future": {
            "regex": "none",
            "alertText": "* Data posterior a "
        },	
        "maxCheckbox": {
            "regex": "none",
            "alertText": "* S'ha superat el número d'opcions permeses"
        },
        "minCheckbox": {
            "regex": "none",
            "alertText": "* Si us plau seleccioni ",
            "alertText2": " opcions"
        },
        "equals": {
            "regex": "none",
            "alertText": "* Els camps no coincideixen"
        },
        "creditCard": {
            "regex": "none",
            "alertText": "* La targeta de crèdit no és vàlida"
        },
        "phone": {
            // credit: jquery.h5validate.js / orefalo
            "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
            "alertText": "* Número de telèfon invàlid"
        },
        "email": {
            // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
            "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            "alertText": "* Correu invàlid"
        },
        "integer": {
        	/*ERROR DETECTADO "regex": /^[\-\+]?\d+$/,*/
       	    /*CORRECCION*/ "regex": /^[\-\+]?((([0-9]{1,3})([.][0-9]{3})*)|([0-9]+))?$/,
            "alertText": "* No és un valor enter vàlid"
        },
        "number": {
            // Number, including positive, negative, and floating decimal. credit: orefalo
        	/*ERROR DETECTADO "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,*/
       	    /*CORRECCION*/ "regex": /^[\-\+]?((([0-9]{1,3})([.][0-9]{3})*)|([0-9]+))?([\,]([0-9]+))?$/,
           "alertText": "* No és un valor decimal vàlid"
        },
        "date": {
            "regex": /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
            "alertText": "* Data invàlida, si us plau faci servir el format DD/MM/AAAA"
        },
        "ipv4": {
        	"regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
            "alertText": "* Adreça IP invàlida"
        },
        "url": {
            "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
            "alertText": "* URL Invàlida"
        },
        "onlyNumberSp": {
            "regex": /^[0-9\ ]+$/,
            "alertText": "* Només números"
        },
	    "onlyLetterSp": {
            "regex": /^[a-zA-Z\ \']+$/,
            "alertText": "* Només lletres"
        },
        "onlyLetterNumber": {
            "regex": /^[0-9a-zA-Z]+$/,
            "alertText": "* No es permeten caràcters especials"
        },
		// --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
        "ajaxUserCall": {
            "url": "ajaxValidateFieldUser",
			// you may want to pass extra data on the ajax call
            "extraData": "name=eric",
            "alertTextLoad": "* Carregant, esperi si us plau",
            "alertText": "* Aquest nom d'usuari ja s'està fent servir"
        },
        "ajaxNameCall": {
			// remote json service location
            "url": "ajaxValidateFieldName",
			// error
            "alertText": "* Aquest nom ja s'està fent servir",
			// if you provide an "alertTextOk", it will show as a green prompt when the field validates
            "alertTextOk": "* Aquest nom està disponible",
			// speaks by itself
            "alertTextLoad": "* Carregant, esperi si us plau"
        },
        "validate2fields": {
            "alertText": "* Si us plau entri HELLO"
        }
    }
});  




