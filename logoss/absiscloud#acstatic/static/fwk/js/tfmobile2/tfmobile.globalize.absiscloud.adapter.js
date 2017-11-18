/* Retorna el locale actual de la plataforma */
function getCurrentAbsisCloudLocale() {
        var currentLocale = $.cookie('absiscloud.locale');
        /* locale por defecto */
        var locale = 'es_ES';
        
        if (currentLocale) {
                locale = currentLocale;                        
        }
        
        return locale;
}

/* Retorna el idioma actual de la plataforma */
function getCurrentAbsisCloudLanguage() {
        var currentLang = $.cookie('absiscloud.locale');
        /* idimoa por defecto */
        var lang = 'es';
        
        if (currentLang) {
                var language = getLanguageFromLocale(currentLang);
                if (language) {
                        lang = language;
                }
        }
        
        return lang;
}

/* Extrae el idioma del locale */
function getLanguageFromLocale(locale) {
        var parts = locale.split('_');
        /* Si no hay idioma retorna el idimoa por defecto */
        var language = (parts.length > 0 ? parts[0] : 'es');
        return language;
}

function configureGlobalizeServerMessages(){
}
function getCurrentServerLocale() {
		return  getCurrentAbsisCloudLocale();
}
function getCurrentServerLanguage() {
        return getCurrentAbsisCloudLanguage();
}
function getCurrentServerPlatform() { 
        return "ABSISCloud"; 
}