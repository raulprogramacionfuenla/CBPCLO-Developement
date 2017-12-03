//----------------------------------
//LaCaixa / Everis 2017 ÁlvaroPeris
//----------------------------------
// Se encarga de transmitir una cookie por medio de POST sin AJAX
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
		function printInfo(){console.log("%c [CBPSubmitForm] Contenido Cookie: " + JSON.stringify(cookJSON),'background: green; color: white');}
		
		function logger(str){
			if(preferencias.debug) console.log("%c " + str,'background: green; color: white');
		}
		
		function compose(cJS,id){
			getCookie();
		
			var stri = JSON.stringify(cookJSON);
			console.log("%c [CBPSubmitForm] Creando formulario: " + "myform"+id +" path: " + preferencias.path ,  'background: green; color: white');
			//Creamos un formulario con la id del elemento type="hidden"
			$('body').append('<form id="myform'+id+'" action="'+preferencias.path+'" method="post"><input  id="inp'+id+'" type="hidden" name="msg"/></form>');
			$('#inp'+id).val(JSON.stringify(cookJSON));
			//$('<input type="hidden" name="msg"/>').val(JSON.stringify(cookJSON)).appendTo('#myform'+id);
		}
		
		function sendMessage(cJS,id){
			$('#myform'+id).submit();
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
		$.fn.CBPSubmitCookieForm = function(pJ) {
			preferencias = pJ;
			
			logger("Generando path de descarga de informes: " + pJ.path);
			
			//+++> Obtenemos la id del boton
			var id = $(this).attr('id');
			compose(cookJSON, id);
			//+++> EVENTOS -------------------------
			$(this).click(function(event) {
				sendMessage(cookJSON, id);
				if(pJ.debug) printInfo();
			});
			
		};//Fin del Pluguin
	}(jQuery));//End function container
	
	(function ($){
		$.fn.CBPSubmitForm = function(pJ) {
			preferencias = pJ;
			//+> Obtenemos la id del boton
			var id = $(this).attr('id');
			//+> EVENTOS -------------------------
			$(this).click(function(event) {
				console.log("clicking ...");
				createForm(pJ,id);
			});	
		};//Fin del Pluguin
		function createForm(pJ,id){
			$('#CBPSubForm'+id).remove();
			$('body').append('<form  style="display:none" id="CBPSubForm'+id+'" action="'+pJ.path+'"></form>');
				var fiArr = pJ.fields;
				for(var i = 0 ; i<fiArr.length ; i++){
					console.log(fiArr[i]);
					Object.keys(fiArr[i]).forEach(function(key) {
						$('#CBPSubForm'+id).append('<input type="text" value="'+fiArr[i][key]+'" name="'+key+'">');
					});//End for
				}
			$('#CBPSubForm'+id).submit();
		}//End func
	}(jQuery));//End function container
});