//-----------------------------------------------------
//--------- APeris 2017 -------------------------------
//Clase para la gestión de cookies del tipo JSON.
//
//> Ejemplo de uso:
//var galletaJSON = new cookieJSONString("JSONGalleta");
//----------------------------------------------------
function cookieJSONString(cookieName) {
    var cookie = $.cookie(cookieName);
    
    //Comprobamos si existe o no existe la cookie
    var jsonVal = cookie ? cookie : '';

    return {
    	//La entrada val es un JSON
    	/**
    	 * var miJSON = {
    		nombre: 'pepe',
    		apellido: 'perez',
    		email: 'pepePerez@email.com'
			}
    	 */
        "set": function(val) {
            jsonVal = JSON.stringify(val);
            $.cookie(cookieName, jsonVal);
        },
        //Añade un elemento a una cookie existente.
        "append":function(key,value){
        	//Miramos si esta bacia la cookie
        	if(!jQuery.isEmptyObject(jsonVal)){
        		//Leemos la cookie
        		jsonActual = JSON.parse(jsonVal);
        		//Añadimos la nueva información en la cookie
        		//Podemos darnos cuenta de que si no existe
        		//se creea y en caso de que exista se actualiza 
        		//la información.
        		jsonActual[key] = value;
        		//Actualizamos el valor de la cookie
        		jsonVal = JSON.stringify(jsonActual);
                $.cookie(cookieName, jsonVal);
        	}else console.log("[ERROR] CBPCookieJSONString append: Esta cookie(" +cookieName+ ") no tiene Información");
        },
        //Elimina la información de la cookie
        "clear": function() {
            $.cookie(cookieName, null);
        },
        
        //Devuelve la estructura JSON almacenada en la cookie
        "getJSON": function(){
        	if(!jQuery.isEmptyObject(jsonVal))
        		return JSON.parse(jsonVal);
        	else console.log("[ERROR] CBPCookieJSONString getJSON: Esta cookie("+cookieName+") no tiene Información");
        	
        },

        "getString": function(){
            return jsonVal;
        }
      }//End return
}//End array 