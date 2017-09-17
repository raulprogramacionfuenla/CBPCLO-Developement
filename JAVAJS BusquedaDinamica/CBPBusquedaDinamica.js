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
	* @param id id: del recuadro de la lista de elementos que se muestra
	* @param info :información a transmitir al servidor
	**/
	function TxRx(id, info){
		//Obtiene información de la base de datos.
		//DirectoryPath representa la página donde se gestiona la petición
		if(info.valor.length > preferencias.minInput){
			$.post(preferencias.path,{msg:JSON.stringify(info)}, function(data) {
				$('#' + holdName).html(data);
			});
		}
	}

	/**
	 * Retorna un mensaje JSON con los parámetros seleccionados por el usuario
	 * @param: valor String, valor que se va consultar en la base de datos.
	 */
	function componMensaje(valor){
		pref = preferencias;
		msg = {
			limit : pref.limitResults,
			field : pref.field,
			table :pref.table,
			valor : valor
		};
		return msg;
	}

	/*
	* Plugin principal
	* @param pJ objeto JSON con las preferencias del buscador dinámico
	*/
	var preferencias;
	var holdName; 
	$.fn.CBPBusquedaDinamica = function(pJ) {
		preferencias = pJ;
		var path = '';
	   	//Ponemos un place holder
		if (pJ.placeHolder != '') $(this).attr('placeholder',pJ.placeHolder);
		
		//Creamos un id de holder:
		var inId =  $(this).attr('id');
		$(this).attr('autocomplete','off');
		holdName = 'busc' + $(this).attr('id');
		var buscHtml = '<div class="buscador" id="'+holdName+'"><ul></ul></div>';
		$('body').append(buscHtml);
		$('#' + holdName).css('width',$(this).width()+3+'px' );
		$('#' + holdName).css({
			left: $(this).position().left,
			top: $(this).position().top + $(this).height() + 10 +'px',
			width: $(this).width()+3+'px'
		});

		/**
		*[EVENTO]: Controlamos que se introduzca texto, en caso de que se haya introducido mostramos la lista de
		* elementos.
		*@param event
		*/
		$(this).on('input',function(event) {
			//Mostramos el menu desplegable
			var valor=$(this).val().replace(/ /g,'');

			//Transmitimos la información al servidor
			
			TxRx(inId,componMensaje(valor));
			if(valor !=''){
				$('#' + holdName).slideDown('fast');
			}else{
				$('#' + holdName).slideUp('fast');	
			}

		});

		//[EVENTO]: Escondemos el holder
		$('body').click(function(event) {
			$('#' + holdName).slideUp('fast');
		});
			
		//[SET y EVENTO]: Click sobre palabra del desplegable 
		 $('body').on('click','#'+holdName+' li',function(event) {
			$('#' + inId).val($(this).text());
		});


	};//End plugin
}(jQuery));//End function definitions
});//FinJQUERY
   
   //