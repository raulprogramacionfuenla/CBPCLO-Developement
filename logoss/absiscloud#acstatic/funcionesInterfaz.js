//Everis 2017 APeris
$(document).ready(function(){
	//============= CONTROL DE ILUMINACION DE FORMULARIO ===========
	//Controla que un formulario esté seleccionado
	//Obtenemos el formulario con la propiedad de cheked
	$("body input[name='optionsRadios']").click(function(event) {
		var seleccionado = $(this).val();
		//Ponemos los componentes de los formularios no seleccionados en 
		//sombreado:
		$("body :input").attr("disabled", false);
		$('body .span6').fadeTo('fast', 1);
		ponSombra(seleccionado);
	});

	//Impide seleccionar campos de formularios no seleccionados
	function ponSombra(seleccionado){
		$("body input[name='optionsRadios']").each(function(){
			//Si no es el elemento seleccionado lo sombreamos
			if($(this).val() != seleccionado){
				var spanid = $(this).closest('.span6').attr('id');
				$("#"+spanid + " :input").attr("disabled", true);
				$("#"+spanid).fadeTo('slow', 0.5);
				$("#"+spanid + " input[ type='radio']").attr("disabled", false);
			}//End if
		});//End each
	}//End pon sombra

	//============= CONTROL DEL CALENDARIO ===========
	//Calendario:
	/*$('body .date-dmy').datepick({showOnFocus: false, 
    showTrigger: '<button type="button" class="trigger">' + 
    '<img src="cal2/img/calendarioICO.gif" alt="Popup"></button>'});*/

	//============= CONTROL DE BOTONES ===========
	$('#btnBorrarCampos').click(function(event) {
		    $('body :input')
 				.not(':button, :submit, :reset, :hidden, input[type="radio"]')
 				.val('')
 				.removeAttr('checked')
 				.removeAttr('selected');
 			$('body input[type="text"]').css("background", "white");
	});//End click

	//============= CONTROL DE FECHAS ===========
	//Este fragmento controla que las fechas esten correctamente colocadas.
	//Cuando se clica al calendario se entiende que se va a modificar la fecha
	$('body .datepick-trigger').on('click',function(event) {

		//Seleccionamos el identificador
		var FormId = $(this).closest('.span6').attr('id');
		
		//Seleccionamos los campos de fecha
		var fechaInicio = $("#" + FormId + " #inicio").val();
		var fechaFinal  = $("#" + FormId + " #final").val();
		if(!comparafechas(fechaInicio, fechaFinal)){
			$("#" + FormId + " #inicio").css('background','#FF9900');
			console.log("Mala entrada");
		}
		else
			$("#" + FormId + " #inicio").css('background','white');
	});//End function
	
	//Esta función retorna un booleano que dice si la distribución de fechas ha
	//sido correcta	
	function comparafechas(fechaInicio, fechaFinal){
		if(procesaFechas(fechaInicio) >= procesaFechas(fechaFinal)){
			return false;
		}
		else{
			return true;
		}
	}//End compara fechas

	//Cambia la fecha a formato ISO
	function procesaFechas(fecha){
		var parts = fecha.split("/");
   		return new Date(parts[2], parts[1] - 1, parts[0]);
	}

	//Main:
	//De inicio sombrearemos la opción 1
	ponSombra("option1");
});//End jQuery