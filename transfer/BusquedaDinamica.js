/**
*-----Búsqueda Dinámica Cliente----- 
*-----by: Álvaro Peris Zaragozá----
*-----AbsisCloud
*-----CBPCLO v1.0 2017-------
**/
$(document).ready(function(){	
(function ($) {
	
	/**
	* Conexión AJAX con el servidor. Realiza las consultas al servidor
	* @param path : path en el que se encuentra el servidor para realizar peticiones 
	* @param id id: del recuadro de la lista de elementos que se muestra
	* @param info :información a transmitir al servidor
	**/
	function TxRx(id, path, info){
		$.ajax({
		             type: "POST",
		             contentType: "application/json",
		             url: path,
		             data: JSON.stringify(info),
		             dataType: 'json',
		             timeout: 600000,
		             success: function (data) {
		             	 //Borramos el placeholder
		             	 $("#" + id).html(data);
		             }
			}); //End AJAX
	}


	function plotError(num){
		switch (num) {
			case 1:
				console.log('Introduzca un path valido path:"/path/to/info"');
				break;
			default:
				// statements_def
				break;
		}
	}
	/*
	* Plugin principal
	* @param pJ objeto JSON con las preferencias del buscador dinámico
	*/
	$.fn.CBPBusquedaDinamica = function(pJ) {
		var path = '';
		if(pJ.path != '') path = pJ.path; else  plotError(1);
	   	//Ponemos un place holder
		if (pJ.placeHolder != '') $(this).attr('placeholder',pJ.placeHolder);
		//Creamos un id de holder:
		var inId =  $(this).attr('id');
		var holdName = 'busc' + $(this).attr('id');
		var buscHtml = '<div class="buscador" id="'+holdName+'"></div>';
		$(this).closest('div').append(buscHtml);
		$('#' + holdName).css('width',$(this).width()+3+'px' );
		

		/**
		*EVENTO: Controlamos que se introduzca texto, en caso de que se haya introducido mostramos la lista de
		* elementos.
		*@param event
		*/
		$(this).on('input',function(event) {
			//Mostramos el menu desplegable
			var valor=$(this).val().replace(/ /g,'');

			//Transmitimos la información al servidor
			TxRx(inId,path,valor);

			if(valor !=''){
				$('#' + holdName).slideDown('fast');
			}else{
				$('#' + holdName).slideUp('fast');	
			}
		});

		//EVENTO: Escondemos el holder
		$('body').click(function(event) {
			$('#' + holdName).slideUp('fast');
		});
			
		//SET y EVENTO: Click sobre palabra del desplegable 
		 $('body').on('click','#'+holdName+' li',function(event) {
			$('#' + inId).val($(this).text());
		});


	};//End plugin
}(jQuery));//End function definitions
});//FinJQUERY