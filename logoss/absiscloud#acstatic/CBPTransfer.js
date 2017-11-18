/*
----------------------------------------
Alvaro Peris
----------------------------------------
Se emplea para accionar formularios  de 
tipo POST  AJAX entre pantallas.
*/

$(document).ready(function(){
	(function ($){		
		function sendMessage(cJS){
				//Creamos un formulario
				$('body').append('<form id="myform"><input type="hidden" name="msg"/></form>');
				//Añadimos la información al formulario
				$('#myform').attr('action', preferencias.path);
				$('<input type="hidden" name="msg"/>').val(JSON.stringify(cookJSON)).appendTo('#myform');
				$("#myform").submit();
		}


		$('#btnSubmit').click(function(event) {
			//Leemos el radio button seleccionado.
			var IdComponente = $('input[name=component]:checked').val();

			//Añadimos esta información a la cookie


		});
		
		$('body').on('click', 'input', function(event) {
			event.preventDefault();
			

			
			$(this).prop("checked", true);
		});

		$('form ')

		$.fn.CBPTransfer = function(pJ) {
				
		};//Fin del Pluguin

}(jQuery));//End function container



