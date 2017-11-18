/* Scripts de customizacion del comportamiento para TFMobile */

/*Inicialización del datebox.*/
/*Los idiomas se setean en los ficheros de cultures del framework TFMobile.*/
jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'es':  Globalize.cultures['es'].datebox ,
	'ca':  Globalize.cultures['ca'].datebox 
});

jQuery.extend(jQuery.mobile.datebox.prototype.options, {
	useLang: getCurrentTFMobileLanguage()
});



