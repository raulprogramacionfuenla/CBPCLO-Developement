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
	function TxRx(id, info,path,minInput){
		//Obtiene información de la base de datos.
		//DirectoryPath representa la página donde se gestiona la petición
		if(info.valor.length > minInput){
			$.post(path,{msg:JSON.stringify(info)}, function(data) {
				
//				tmpStr = '<b>';
//				len = info.valor.length;
//				val = info.valor.toUpperCase();
//				var res = data.split('<li>');
//				
//				for(var i = 0; i < res.length; i++){
//				   res[i] = res[i].split('</li>')[0];    
//				   //En caso de que coincida ponemos en negrita
//				   tmps = res[i].toString();
//				   var pos = tmps.indexOf(val);
//				   console.log('Res: '+ res[i] +' valor: '+ val + ' Posicion: ' + pos);
//				   if(pos != -1){
//					   res[i] = tmpStr + res[i];
//					   res[i] = res[i].toString();
//					   res[i] = res.slice(0, len)+'</b>'+res.slice(len); 
//				   }
//				}//End for
//				var strli = '';
//				for(var i = 0; i < res.length; i++){
//				    strli += '<li>'+res[i]+'</li>';
//				}
				
				$(id).html(data);
			});
		}
	}

	/*
	* Plugin principal
	* @param pJ objeto JSON con las preferencias del buscador dinámico
	*/
	var holdName; 
	$.fn.CBPBusquedaDinamica = function(pJ) {
		this.preferencias = pJ;
	   	//Ponemos un place holder
		if (pJ.placeHolder != '') $(this).attr('placeholder',pJ.placeHolder);
		else $(this).attr('placeholder','❙');
		
		//Creamos un id de holder:
		var inId =  $(this).attr('id');
		$(this).attr('autocomplete','off');
		holdName = 'busc' + $(this).attr('id');
		var hn2 = '#busc' + $(this).attr('id');
		var buscHtml = '<div class="buscador" id="'+holdName+'"><ul></ul></div>';
		
		$('body').append(buscHtml);
		$('#' + holdName).css('width',$(this).width()+3+'px' );
		$('#' + holdName).css({
			left: $(this).position().left,
			top: $(this).position().top + $(this).height() + 2 +'px',
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
			var msg = {
					limit : pJ.limitResults,
					field : pJ.field,
					table : pJ.table,
					valor : valor
				};
			TxRx(hn2,msg, pJ.path, pJ.minInput);
			
			if(valor !=''){
				$(hn2).slideDown('fast');
				console.log("Holdname: " + hn2 + " Sliding");
			}else{
				$(hn2).slideUp('fast');	
			}

		});

		
		 $('html').on('click','body',function(event) {
			 $('.buscador').slideUp('fast');
		});
			
		//[SET y EVENTO]: Click sobre palabra del desplegable 
		 $('body').on('click','#'+holdName+' li',function(event) {
			$('#' + inId).val($(this).text());
		});


	};//End plugin
}(jQuery));//End function definitions
});//FinJQUERY
   
   //