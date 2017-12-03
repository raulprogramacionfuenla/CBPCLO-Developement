/**
*-----> infoTooltip <----- 
* Se emplea para generar información de ayuda al hacer hover
*-----by: Álvaro Peris Zaragozá----
*-----AbsisCloud
*-----CBPCLO v1.0 2017-------
**/
$(document).ready(function(){	
	//Añadimos el símbolo de información a todos los tooltips:
	$('.Toolinfo').html('ℹ');

	
		$(".Toolinfo").hover(function(e) {
			//Tomamos el id
			var id = $(this).attr("id");
			//Mostramos el banner de información en la 
			//posición adecuada.

			//Tomamos la posición del indicador de ayuda
			var pos = $('#' + id).offset();
			var posY = pos.top;
			var posX = pos.left;

			$("#" + id).css({
				'left': e.pageX +'px',
				'top': e.pageY+ 10 +'px'
			});
			setTimeout(function() {
					//Mostramos la información en medio segundo
					$("#"+id).slideDown('fast');
				}, 900);
		}, function() {
			$('.CBPtooltip').slideUp('fast');
		});


	$('body').on('click', '.CBPtooltip', function(event) {
		$('.CBPtooltip').hide();
	});
		
});//FinJQUERY