//----------------------------------
//LaCaixa / Everis 2017 ÁlvaroPeris
//----------------------------------
// Se encarga de transmitir los valores de entrada en formato de
// formulario. Ideal para realizar solicitudes de exportación
/**
 * El parámetro de entrada es una estructura JSON con la información 
 * pertinente:
 * 	{
 * 		"path":"/ord/to/the/",
 * 		"fields":[{"campo1":"valor del campo"},
 * 				  {"campo2":"valor del campo2"}]
 * 	}
 */
$(document).ready(function(){
	(function ($){
		$.fn.CBPSubmitForm = function(pJ) {
			preferencias = pJ;
			//+_+> Obtenemos la id del boton
			var id = $(this).attr('id');
			//compose(cookJSON, id);
			//+> EVENTOS -------------------------
			$(this).click(function(event) {
				console.log("Creating form ...");
				$('#CBPSubForm'+id).remove();
				createForm(pJ,id);
				$('#CBPSubForm'+id).submit();
			});	
		};//Fin del Pluguin
		
		function createForm(pJ,id){
			$("body").append('<form id="CBPSubForm'+id+'" action="'+pJ.path+'"></form>');
			for(el in pJ.fields){
				$('#CBPSubForm'+id).append('<input type="text" value="'+pJ.fields[el]+'" name="'+el+'">');
			}//End for
		}//End func
	}(jQuery));//End function container
});