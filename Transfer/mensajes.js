/**
 * Javascript para pintar los mensajes
 */

$(document).ready(function() {

	/**
	 * Muestra las notificaciones que vengan del server
	 */
	$('[name="notificacionDTO"]').each(function(){
		$(this).addClass("notificacio");

		$(this).slideDown();
		
		$(this).append("<i class='icono-fblite-cerrar notificacio-close-button ' ></i>");	
		
		$(".notificacio-close-button").on("click", function(){
			$(this).parent().slideUp();
		});
    });
});



/**
 * Funcion para mostrar notificaciones en la parte inferior del navegador
 * 
 * @param claseMensaje
 * 		  Posibles valores: missatge-feedback-positiu, missatge-alerta, missatge-error, missatge-informacio
 * 
 * @param textoMensaje
 */
function mostrarNotificacion(claseMensaje, textoMensaje) {  
	
	$("#notificacion").removeClass();	
	$("#notificacion").addClass(claseMensaje);
	$("#notificacion").addClass("notificacio");
	
	$('#notificacion').html(textoMensaje);
	$('#notificacion').slideDown();
	
	$("#notificacion").append("<i class='icono-fblite-cerrar notificacio-close-button ' ></i>");	
	$(".notificacio-close-button").on("click", function(){
		$(this).parent().slideUp();
	});
	
}
