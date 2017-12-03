/**
*APeris 2017
*Everis
*/
//Private
$(document).ready(function() {
  (function ( $ ) {
        function loadValue2Form(pJ){
           // Combo boxes
          if(pJ.type == "select"){
                $(pJ.target +" > option").each(function() {
                  var valor = pJ.value;
                  var ide = $(this).attr('id');
                  if(valor == ide ){
                    if(pJ.type == "select") $(this).attr('selected','selected');
                  }
                });//End eac
           }else if(pJ.type == "input"){
                $(pJ.target).val(pJ.value);
           }else if(pJ.type == "checkbox"){
                $(pJ.target).prop("checked", pJ.value);
           }else if(pJ.type == "radio"){
             $("[name = " + pJ.target + "]").each(function() {
               var valor = pJ.value;
               var ide = $(this).attr('id');
               if(valor == ide ){
                 $(this).prop("checked", true);
               }
             });//End eac
           }//End if radio
        }//End load values
       /**
       *public
       *Carga valores en campos de formularios
       *@param JSON Array Array con JSONs a updatear
       */
       function cargaForms(arr){
            for (var i = 0; i < arr.length; i++) {
              console.log("Loading forms ...");
              loadValue2Form(arr[i]);
            }
       }

       $.fn.formloader = function(arr) {
         cargaForms(arr);
      };
}( jQuery ));
 });
