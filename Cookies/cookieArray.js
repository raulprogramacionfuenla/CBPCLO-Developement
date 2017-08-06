//-----------------------------------------------------
//--------- APeris 2017 -------------------------------
//Clase para la gestión de cookies del tipo ARRAY.
//----------------------------------------------------

function cookieArray(cookieName) {
var cookie = $.cookie(cookieName);
//Comprobamos si existe o no existe la cookie
var items = cookie ? cookie.split(/,/) : new Array();
return {
    "add": function(val) {
        items.push(val);
        $.cookie(cookieName, items.join(','));
    },
    "remove": function (val) { 
        indx = items.indexOf(val); 
        if(indx!=-1) items.splice(indx, 1); 
        $.cookie(cookieName, items.join(','));        },
    "clear": function() {
        items = null;
        $.cookie(cookieName, null);
    },
    "items": function() {
        return items;
    }
  }
}//End array 