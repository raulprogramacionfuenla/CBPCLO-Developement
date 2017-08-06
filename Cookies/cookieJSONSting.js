//-----------------------------------------------------
//--------- APeris 2017 -------------------------------
//Clase para la gestión de cookies del tipo JSON.
//----------------------------------------------------
function cookieJSONString(cookieName) {
    var cookie = $.cookie(cookieName);
    //Comprobamos si existe o no existe la cookie
    var jsonVal = cookie ? cookie : '';

    return {
        "set": function(val) {
            jsonVal = JSON.stringify(val);
            $.cookie(cookieName, jsonVal);
        },
        "clear": function() {
            $.cookie(cookieName, null);
        },

        "getJSON": function(){
            return JSON.parse(jsonVal);
        },

        "getString": function(){
            return jsonVal;
        }

      }//End return
}//End array 