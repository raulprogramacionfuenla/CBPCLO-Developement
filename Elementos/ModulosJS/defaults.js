$(document).ready(function() {

    //Obtenemos la información de la cookie
    var info = new cookieJSONString("JSONGalleta");
    var jsonRet = galletaJSON.getJSON();
    //Cargamos los valores de la cookie en un JSON.
    var map = {
         "#aplicacion":info.aplicacion,
         "#version":info.version,
         "#componente":info.componente,
         "#prov":info.prov
      };






});
