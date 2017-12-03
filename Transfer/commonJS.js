/*!
 *Funciones comunes de java script para todas las 
 *pantallas
 *APeris.
 */

$(document).ready(function(){
	
	/**
	 * Script para tener un footer flexible en función del data table
	 * IMPORTANTE: el footer ha de tener la etiqueta de clase footer.
	 */
	//Obtenemos la altura de la pantalla
	//var alturaPantalla = $(window).height();
	
	//var correccion = 0; //Altura de separación de correccion
//	$('html').on('change', '.dataTables_wrapper select', function(event) {
//		ajustafooter();
//	});
//	
//	$('html').on('mousemove', 'body', function(event) {
//		ajustafooter();
//	});
	
	var alturaPantalla = $(window).height();
	var correccion = 0;
	function ajustafooter(){
		var desplace = 0;
		desplace = $('.dataTables_wrapper').height() + $('.dataTables_wrapper').offset().top + correccion; 
		if(desplace >= alturaPantalla){
			$('.footer').css('position','relative');
		}else{
			console.log('cambiando footer a fixi');
			$('.footer').css({
				'position':'absolute',
				'bottom':'10px'
			});
		}
	}//End bind

});
