//----------------------------------
//LaCaixa / Everis 2017 ÁlvaroPeris
//----------------------------------
// Se encarga de la tranmisión al servidor de una cookie por medio de AJAX.
$(document).ready(function(){
	(function ($){
		/**
		*PRIVATE
		*Obtiene la información de la cookie
		*@return cookJSON [actualiza]
		*/
		function getCookie(){
			var cook = new cookieJSONString(preferencias.cookieName);
			var cookJSN = cook.getJSON();

			var tmpJSON = {};
			//Hacemos un check de nulls del JSON
			jQuery.each(cookJSN, function(c,val) {
				tmpJSON[c] = lambdaNul(val);
			});
			cookJSON = tmpJSON;
		}

		/**
		*PRIVATE
		*Printa la información contenida en la cookie
		*@return consoleLog(String);
		*/
		function printInfo(){console.log(JSON.stringify(cookJSON));}

		function sendMessage(cJS){
			getCookie();
			var msg = {msg: JSON.stringify(cookJSON)};
			$.post(preferencias.path,msg,function(contenido){
				console.log("Contenidos: " + contenido);
				$(preferencias.canvas).html(contenido);
			});
		}
		/**
		*PRIVATE
		*Retorna un string con la palabra null si el campo de la cookie no tiene nada
		*@return val String/Int ...
		*@param  val String/Int ... 
		*/
		function lambdaNul(val){val = val == "" ? "null": val;return val = val == 0 ? "null": val;}
		
		var preferencias={};
		var cookJSON = {}; //Almacena en formato json el contenido de la cookie
		$.fn.CBPSendCookie = function(pJ) {
			preferencias = pJ;
			//EVENTOS -------------------------
			$(this).click(function(event) {
				sendMessage(cookJSON);
				if(pJ.debug) printInfo();
			});
		};//Fin del Pluguin
	}(jQuery));//End function container
});