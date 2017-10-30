//-----------------------------------------------------
//--------- APeris 2017 -------------------------------
//Clase para la gestión de cookies del tipo JSON.
//----------------------------------------------------

function cookieJSONString(cookieName) {
    var cookie = $.cookie(cookieName);
    //Comprobamos si existe o no existe la cookie
    var jsonVal = cookie ? cookie : '';

    if(jsonVal == '') console.log('Creating new cookie!!');
    else console.log('Getting existing cookie');

    var time = null;

    
    return {
        /**
         * Hace un set de la cookie en formato JSON
         *
         * @param      JSON  val     
         */
        "set": function(val) {
            jsonVal = JSON.stringify(val);
            $.cookie(cookieName, jsonVal,{ path: "/" });
        },
        /**
         * La cookie expira después de los minutos seleccionados
         *
         * @param      int  minutes  The minutes
         */
        "expireMinutes": function(minutes){
            var expDate = new Date();
            expDate.setTime(expDate.getTime() + (minutes * 60 * 1000));
            time = expDate;
            $.cookie(cookieName, jsonVal,{path: '/', expires: expDate});

        },
        /**
         * La cookie expira después de los dias seleccionados
         *
         * @param      int  minutes  The days
         */
        "expireDays": function(days){
            var expDate = new Date();
            expDate.setTime(expDate.getTime() + (days * 1440 * 60 * 1000));
            time = expDate;
            $.cookie(cookieName, jsonVal,{path: '/', expires: expDate});

        },

        /**
         * Borra el contenido de la cookie
         */
        "clear": function() {
            $.cookie(cookieName, null);
        },

        /**
        * Elimina la cookie
        */
        "delete": function() {
            $.cookie(cookieName, null,{path: '/'});
        },

        /**
         * Retorna la información en formato JSON.
         * @return  json.
         */
        "getJSON": function(){
            return JSON.parse(jsonVal);
        },

        /**
         * Retorna la información en formato string JSON.
         * @return  string.
         */
        "getString": function(){
            return jsonVal;
        },

        /**
         * Añade un nuevo elemento a la cookie
         *
         * @param      String  key     The key
         * @param      String  value   The value
         */
        "append":function(key,value){
            var js = JSON.parse(jsonVal);
            js[key] = value;
            jsonVal = JSON.stringify(js);
            if(time != null){
                $.cookie(cookieName, jsonVal,{expires: time});
            }
            else
                $.cookie(cookieName, jsonVal);
        },

        /**
         * Realiza un consile log de la información contenida en la cookie
         */
        "log":function(){
            var consola = 'background: #222; color: #bada55; font-weight:bold';
            var bold = 'font-weight:bold';
            console.log("%c COOKIE:  " + cookieName + "  ", consola);
            if(jsonVal != ''){
               $.each(JSON.parse(jsonVal), function(k, v) {
                     console.log('%c ' + k , bold ,' : ' + v);
                });
            }
            else
                console.log("Empty Cookie");
        }

      }//End return
}//End array 
 //

