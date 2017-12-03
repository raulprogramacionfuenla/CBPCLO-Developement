	$(document).ready(function(){
		
		//Extracción de información de la cookie y rellenado 
		//de la información en la pantalla
		//Almacenamos la cookie
		var infoConsulta =  new cookieJSONString('consulta');
		var jsonInfo = infoConsulta.getJSON();	
		
	//Tabla ficheros
	$('#tablaResultados').dataTable( {
		    //Credenciales del servidor y métodos HTTP
		    "bProcessing": true, //Mostrar la barra de progreso (Processing ...)
		    "bServerSide": true, //Habilitamos el procesado desde el lado del servidor
		    "sAjaxSource": "TablasHost/ResultadosDataTable", //Path del servidor
		    "sServerMethod": "POST", //Método de transmisión
		    "orderMulti": false, //Multiples columnas a la vez
		    //"sPaginationType": "bootstrap",
		    "sPaginationType": "full_numbers",
		 	//Idioma de las etiquetas.
		 	"oLanguage": {
			 	"sProcessing": "<img id=\"loading\" height=\"42\" width=\"42\" id=\"cargando\" src=\"/static/app/images/cargando.gif\">",
			    "sLengthMenu": Globalize.localize("label.home.table.sLengthMenu"),
	            "sInfo": Globalize.localize("label.home.table.sInfo"),
	            "sInfoEmpty": Globalize.localize("label.home.table.sInfoEmpty"),
	            //"sSearch": Globalize.localize('label.home.table.sSearch'),
	            "sInfoFiltered": Globalize.localize("label.home.table.sInfoFiltered"),
	            "sZeroRecords": Globalize.localize("label.home.table.sZeroRecords"),
	            "oPaginate": {
		            "sFirst": Globalize.localize("label.common.inicio"),
		            "sLast": Globalize.localize("label.common.final"),
		            "sNext": " ",
		            "sPrevious": ""
	            } 
			},
		    
		    //Estilos
		    //"sDom": 'rt<"bottom"iflp<"clear">>',
		    "iDisplayStart": 0,
		    
		    //Opciones de mostrado de información de la tabla
		    "bFilter": false,
		    "filter":false,
		    "paging":   true,
        	"ordering": false,
        	"info":     true,
        	"searching": false,
        	"fnDrawCallback": function (oSettings) {
        		console.log("Ajustando footer ...");
        		ajustafooter();	 
    		 },
        	//Funciones de la tabla
        	//-----------------------------------------------------------
		    //Transmisión de parámetros al servidor
		    "fnServerParams": function ( aoData ) {
		    	aoData.push( { "name": "estado", "value": jsonInfo.estado});
		    	aoData.push( { "name": "entorno", "value": jsonInfo.entorno});
		    	aoData.push( { "name": "aplicacion", "value": jsonInfo.aplicacion});
		    	aoData.push( { "name": "bloqueados", "value": jsonInfo.bloqueados});
		    	aoData.push( { "name": "componente", "value": jsonInfo.componente});
		    	aoData.push( { "name": "periodoFinal", "value": jsonInfo.periodoFinal});
		    	aoData.push( { "name": "periodoInicial", "value": jsonInfo.periodoInicial});
		    	aoData.push( { "name": "prov", "value": jsonInfo.prov});
		    	aoData.push( { "name": "resultado", "value": jsonInfo.resultado});
		    	aoData.push( { "name": "susceptibles", "value": jsonInfo.susceptibles});
		    	aoData.push( { "name": "tipoConsulta", "value": jsonInfo.tipoConsulta});
		    	aoData.push( { "name": "version", "value": jsonInfo.version});
		    	aoData.push( { "name": "nrespuestas", "value": $("#nRespuestas").text()});
		    },
			 "aoColumns": [		                    	
				{ "mData": "ia_proveidor", "bSortable": false},
				{ "mData": "versio", "bSortable": false },
				{ "mData": "entorno_origen", "bSortable": false },
				{ "mData": "component", "bSortable": false},
				{ "mData": "tipus", "bSortable": false},
				{ "mData": "dataProces", "bSortable": false},
				{ "mData": "resultat", "bSortable": false, "mRender": function( data, type, row ) {
			    	if( data == 'KO') return '<span class="label label-important">✖   KO</span>';
			    	else if( data == 'OK')return '<span class="label label-success">✔   OK</span>';
				}},
				{ "mData": "numIncompliments", "bSortable": false },
				{ "mData": "fr_max", "bSortable": false, "mRender": function(data, type, row){
					return asignaNoPromocionan(data, row, 'vides');
				}},
				{ "mData": "id_resultat", "bSortable": false, "mRender": function( data, type, row ) {
					if(asignaNoPromocionan(data, row, 'bloqueado') == data){
						if(row.resultat == 'KO')return '<span id="id_resultat" valor="'+data+'" class="label"> + '+Globalize.localize("label.verDetalle")+'</span>';
				    	 else return null;
					}else{
						return asignaNoPromocionan(data, row, 'bloqueado');
					}
					
				}}//End tds de tabla
				
			],
			//Procesado y renderizado de celdas
			
  });//Fin Paginacion
	
	//Función de cpmtrol de si es de los que no promocionan
	// o no
	function asignaNoPromocionan(data, jsonRow, categoria){
		//console.log(jsonRow);
		if(jsonRow.cnpBloquejat != null){
			
			//Si es bloqueo es nulo y las vidas no son 0, quiere decir que No promociona
			if(categoria == 'vides') return jsonRow.cnpVides;
			else if(categoria == 'bloqueado'){
				if(jsonRow.cnpBloquejat == "SI") return '<b style = "color: red"> ✔  </b>';
				else if(jsonRow.cnpBloquejat == "NO") return '';
			}
		}else{
			//En este caso no es de los que no promocionan, por tanto 
			//retornamos el mismo valor.
			return data;
		}

	}
	
	//Boton Exportar a Excel: Transmitimos la cookie al
	//servidor
	 $('#ExportarExcel').CBPSendCookie({
		 cookieName: 'CDetalle',
		 path: '/detalle/DetalleExportar',
		 canvas: '',
		 debug: true
	    });
	
		alignCenter(7);
		function alignCenter(posicion){
			str = "<style>table tr td:nth-child("+posicion+"){text-align:center;}</style>";
			$('body').append(str);
		}	

		//Ajuste de footer----------------------------
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
		
		/*****************************************************************
		 * LETRERO ESTILO ECLIPSE
		 *  Ajuste del contenido de la tabla
		 *  Muestra la información en un letrerito rollo Eclipse 
		 *****************************************************************/
		var mostInfoInit = true;
		function addMostradorInfo(){
	        if(mostInfoInit){
	        	$('body').append('<style>.colapsar{max-width:40px; text-overflow:ellipsis; overflow:hidden; white-space: nowrap; transition: all }</style>');
	        	mostInfoInit = false;
	        }  
			$('td').each(function(index, el) {
	        	    $(this).addClass('colapsar');
	        	    if(isEllipsisActive(this)){
	        	    	$(this).addClass('letrero');
	        	    }
	          });//End each
	          $('.tableInfobox').remove(); //Borramos para evitar solapamientos
	          $('body').append('<div class="tableInfobox"></div>');
	          $('body').append('<style>.tableInfobox{font-size: 12px; max-width: 350px;background:#FFFBD0;padding: 3px 10px 3px 10px; display:none; position:fixed; z-index: 300; border: solid 1px grey; box-shadow: 5px 5px 4px rgba(0,0,0,0.3)}</style>');
	          //Plugin para mostrar info
	          var delay=1000, setTimeoutConst; //-> Delay de espera tras hacer hover
	             $('td.letrero').hover(function(event) {
	                  //Obtenemos la información de la tabla
	                   var texto = $(this).html();
	                   var px = event.pageX;
	                   var py = event.pageY - $(document).scrollTop();
	                  setTimeoutConst = setTimeout(function(){
	                        //Información contenida en la table
	                        $('.tableInfobox').html(texto);
	                        $('.tableInfobox').css({'top':py, 'left':px});
	                        $('.tableInfobox').slideDown('fast', function() {});
	                  }, delay);
	             }, function(){
	                 $('.tableInfobox').slideUp('fast', function() {});
	                  clearTimeout(setTimeoutConst );
	             });
	          }//End mostrador Info
		/*****************************************************************/
		
});//FinJQUERY
   