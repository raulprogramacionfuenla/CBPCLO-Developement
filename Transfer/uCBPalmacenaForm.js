/**
*-----> util de CBP <----- 
*-----by: Álvaro Peris Zaragozá----
*-----AbsisCloud
*-----CBPCLO v1.0 2017-------
* Almacena en una cookie del tipo cookieJSONString la información de X formularios
* input: Array con el nombre de identificadores a almacenar y nombre de la cookie
**/
$(document).ready(function(){
	(function ($) {
		//MiniPlugin private  para obtener el tipo de campo
		$.fn.getType = function(){ return this[0].tagName == "INPUT" ? this[0].type.toLowerCase() : this[0].tagName.toLowerCase(); }
		//Retorna un string con los campos:
		function creaJSON(listaIds,extras){
			//Creamos un json con el nombre de los elementos en formato json
			var first = true;
			var jsonBase = {};
			listaIds.forEach(function(element) {
				if(debug) console.log("%c Leyendo elemento : " + element, "background:blue; color:white");
				//Obtenemos el valor que tienen estos ids en el formulario
				//Controlamos que el elemento exista en el DOM pese a que figure en la lista
				if($(element).length){
						var tipo = $(element).getType();
						var  id = $(element).attr('id');
						var valId = '';
						if( tipo == 'text')
							valId = $(element).val();
						else if($(element).attr('cbp')=='radio'){
							valId = String($(element + ' input:checked').val());
						}
						else if(tipo == 'select')
							valId = $(element + ' option:selected').val();
						else if(tipo == 'checkbox'){
							if($(element).is(':checked')){
								valId = '1';
							}else 
								valId = '0'; 
						}
						jsonBase[id] = valId;
				}else{
					if(debug) console.log("%c El elemento " + element + " no se ha encontrado en el DOM", "background:red; color:white");
				}
			});//foreach
		
			//-> Añadimos los campos extras:
			$.each(extras, function(k, v) {
				jsonBase[k] = v;
			});
			//-> Retornamos el JSON
			return jsonBase;
		}//End crea JSON

		//Almacena en una cookie la información extraida del formulario
		function almacenaEnCookie(miJson,name, debug){
			var cookie = new cookieJSONString(name);
			cookie.set(miJson);
			if(debug) console.log(" > Información en la Cookie: \n" + cookie.getString());
			//if(debug)alert(" > Información en la Cookie: \n" + cookie.getString());}
		 }	
	
		//Plugin principal.
		var debug;
		$.fn.uCBPalmacenaForm = function(pJ) {
			debug = pJ.debug;
			var nombreCookie = pJ.nombreCookie; //Nombre de la cookie
			var listaIds = pJ.listaIds; //Lista de contenidos de ids a almacenar en la cookie
			var debug = pJ.debug; //Opción que muestra logs de debug por la consola
			var camposAdicionales = pJ.informacionAdicional //Campos adicionales que se le añaden a la cookie
			//Evento de trigger del formulario
			$(this).click(function(event) {
				//1.-Leemos el formulario y lo almacenamos en un JSON
				var miJson = creaJSON(listaIds,pJ.infoExtra);
				//2.-Almacenamos el JSON anterior en una cookie
				almacenaEnCookie(miJson,nombreCookie, debug,camposAdicionales);
				//3.-Hacemos un submit del formulario en caso de que se haya especificado en las preferencias
				$(pJ.form).submit();
				if(debug) console.log("Submit triggered ...");
			});//Fin del evento de trigger
		}//Fin del Pluguin
	}(jQuery));//End function container
});//FinJQUERY


/**Ejemplo de uso del plugin:
$('#trigger').uCBPalmacenaForm({
	nombreCookie: 'miCookie', //Cookie en la que se almacenará el formulario
	listaIds: ['#nombre', '#apellido', '#email','#genero'], //Campos que se van a almacenar
	form: '#formulario', //Tag del formulario a almacenar
	debug: true
});
*/