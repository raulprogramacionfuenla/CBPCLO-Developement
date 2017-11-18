(function($){
    $.fn.validationEngineLanguage = function(){
    };
    
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = Globalize.cultures[getCurrentServerLanguage()].validationEngine; 
        }
    };

    $.validationEngineLanguage.newLang();
    
})(jQuery);
