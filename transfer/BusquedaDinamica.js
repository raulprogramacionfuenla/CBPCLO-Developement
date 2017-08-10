/**
*-----Búsqueda Dinámica----- 
*-----by: Álvaro Peris Zaragozá----
*-----CBPCLO v1.0 2017-------
**/
$(document).ready(function(){	
(function ($) {
	/*
	* Parsea la información procedente de la base de datos y añade los elementos a la lista de componentes
	* @param id: id del recuadro de la lista de elementos que se muestra
	* @param info: información en crudo que se adecuará para mostrarse en el html
	*/
	function parseaRecepcion(id,info){
		$('#'+id).append('<li>'+elemento+'</li>');
	}

	/**
	* Elimina la lista de elementos
	**/
	function borraLista(id,elemento){
		$('#'+id).html('');
	}

	/**
	* Conexión AJAX con el servidor. Realiza las consultas al servidor
	* @param path : path en el que se encuentra el servidor para realizar peticiones 
	* @param id id: del recuadro de la lista de elementos que se muestra
	**/
	function TxRx(id, path){

	}

	/*
	* Plugin principal
	* @param pJ objeto JSON con las preferencias del buscador dinámico
	*/
	$.fn.CBPBusquedaDinamica = function(pJ) {
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