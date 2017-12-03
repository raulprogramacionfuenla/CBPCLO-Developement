//----------------------------------
//LaCaixa / Everis 2017 ÁlvaroPeris
//----------------------------------
// Se encarga de transmitir los valores de entrada en formato de
// formulario. Ideal para realizar solicitudes de exportación
/**
* El parámetro de entrada es una estructura JSON con la información 
* pertinente:
* 	{
* 		<div dest="[id]" ></div>
* 		"path":"/ord/to/the/",
* 		"fields":[{"campo1":"valor del campo"},
* 				  {"campo2":"valor del campo2"}]
* 	}
*/
$(document).ready(function(){
	(function ($){
		$.fn.CBPSubmitFormById = function(pJ) {
			console.log("Genereting transfer form ...");
			preferencias = pJ;
			var id = $(this).attr('dest');
			console.log("Creating form selected by Id ...");
			$('#CBPSubForm'+id).remove();
			createForm(pJ,id);
			$('#CBPSubForm'+id).submit();
		};//Fin del Pluguin
		
		function createForm(pJ,id){
			console.log("Genereting transfer form ...");
			$("body").append('<form style="display:none;" method="post" id="CBPSubForm'+id+'" action="'+pJ.path+'"></form>');
				for(var cc = 0;cc < pJ.fields.length; cc++){
					for(ele in pJ.fields[cc]){
						$('#CBPSubForm'+id).append('<input type="text" value="'+pJ.fields[cc][ele]+'" name="'+ele+'">');
					}//End for
			}//end for
		}//End func
	}(jQuery));//End function container
});