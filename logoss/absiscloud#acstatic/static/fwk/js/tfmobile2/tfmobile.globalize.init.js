var alertaMostrada = false;
/* Retorna el locale actual de la plataforma */
function getCurrentTFMobileLocale() {
	var currentLocale = null;
	try{
		currentLocale =getCurrentServerLocale();
	}catch(err) {
		if(!alertaMostrada){
			alert("No se han cargado los literales desde el servidor.");
			alertaMostrada=true;
		}
	}
	
	
	/* locale por defecto */
	var locale = 'es_ES';
	
	if (currentLocale!=null) {
		locale = currentLocale;			
		
	}
	
	return locale;
}

/* Retorna el idioma actual de la plataforma */
function getCurrentTFMobileLanguage() {
	var currentLang = null;
	try{
		currentLang = getCurrentServerLanguage();
	}catch(err) {
		if(!alertaMostrada){
			alert("No se han cargado los literales desde el servidor.");
			alertaMostrada=true;
		}
	}
	
	/* idioma por defecto */
	var lang = 'es';
	
	if (currentLang!=null) {
		lang = currentLang;
	}
	
	return lang;
}

/* Extrae el idioma del locale */
function getLanguageFromLocale(locale) {
	var parts = locale.split('_');
	/* Si no hay idioma retorna el idioma por defecto */
	var language = (parts.length > 0 ? parts[0] : 'es');
	return language;
}

/* Aplica el locale actual de la plataforma al componente Globalize */
function setGlobalizeCurrentTFMobileCulture() {
	Globalize.culture(getCurrentTFMobileLanguage());
}

/* Aplica el locale deseado al componente Globalize */
function setGlobalizeTFMobileCulture(locale) {
	Globalize.culture(getLangFromLocale(locale));
}

/* Aplica la globalización actual a los elementos span */
function applyGlobalize() {
    $('span.global').each(function(i){
		var str = Globalize.localize(this.id);         
		$(this).html(str);
    });
}



