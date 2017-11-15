	$(document).ready(function(){
		//Extracción de información de la cookie y rellenado 
		//de la información en la pantalla
		//Almacenamos la cookie
		var infoDetalle =  new cookieJSONString('CDetalle');
		var jsonInfo = infoDetalle.getJSON();	
		
		$('#proveedor').html(jsonInfo.proveedor);
		$('#componente').html(jsonInfo.componente);
		$('#version').html(jsonInfo.version);
		$('#tipo').html(jsonInfo.tipo);
		$('#fecha').html(jsonInfo.fecha);		
		//addPantallaLoader();
		
	//Tabla ficheros
	var t = $('#tablaDetalle').dataTable( {
		    //Credenciales del servidor y métodos HTTP
		    "bProcessing": true, //Mostrar la barra de progreso (Processing ...)
		    "bServerSide": true, //Habilitamos el procesado desde el lado del servidor
		    "sAjaxSource": "/detalle/DataTables", //Path del servidor
		    "sServerMethod": "POST", //Método de transmisión
		    "orderMulti": false, //Multiples columnas a la vez
		    "sPaginationType": "full_numbers",
		    "fnDrawCallback": function (oSettings) {
        		console.log("Ajustando footer ...");
        		ajustafooter();	 
    		 },
		    //Cargadores. Feedback al usuario de cargando información.
		 	//"fnDrawCallback": function (oSettings) {removePantallaLoader();},
		    //"fnPreDrawCallback": function(oSettings) {showPantallaLoader();},
		 	
		 	//Idioma de las etiquetas.
		 	"oLanguage": {
			 	"sProcessing": "<img id=\"loading\" height=\"42\" width=\"42\" id=\"cargando\" src=\"/static/app/images/cargando.gif\">",
				"sLengthMenu": "_MENU_ filas por página",
	  			"sInfo": "Mostrando _START_ - _END_ de _TOTAL_ entradas",
				"sInfoEmpty": "Mostrando 0 de 0 entradas",
				"sInfoFiltered": "(filtradas de un total de _MAX_ entradas)",
				"sSearch": "Buscar:",
				"sZeroRecords": "No se han encontrado entradas",
				"sFirst": "Inicio",
				"sPrevious": "Anterior",
				"sNext": "Siguiente",
				"oPaginate": {
			            "sFirst": " Inicio ",
			            "sLast": " Final ",
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

        	//Funciones de la tabla
        	//-----------------------------------------------------------
		    //Transmisión de parámetros al servidor
		    "fnServerParams": function ( aoData ) {
		     	aoData.push( { "name": "lestado", "value": jsonInfo.lestado});
		    	aoData.push( { "name": "lentorno", "value": jsonInfo.lentorno});
		    	aoData.push( { "name": "lidResultado", "value": jsonInfo.lidResultado});
		    	aoData.push( { "name": "nrespuestas", "value": $('#nIncumplimientos').text()});
		    },
			 "aoColumns": [		                    	
				{ "mData": "tipoControl", "bSortable": false},
				{ "mData": "descripcion", "bSortable": false },
				{ "mData": "fr", "bSortable": false , "mRender": function( data, type, row ) {
						if( parseInt(data) <= 5)
				    		return '<span class="label">'+data+'</span>';
				    	else if( 6 <= parseInt(data) && parseInt(data) <= 7){
				    		return '<span class="label label-warning">'+data+'</span>';
				    	}else if( 8 <= parseInt(data) &&  parseInt(data)<= 9){
				    		return '<span class="label label-important">'+data+'</span>';
				    	}
				}},
				{ "mData": "sentenciaAfectada", "bSortable": false,"mRender": function( data, type, row ) {
						return '<span style="font-family:Courier">'+data+'</span>';
				}},
				{ "mData": "justificado", "bSortable": false,"mRender": function( data, type, row ) {
					if( parseInt(data) == 0)return '';
			    	else if(parseInt(data) == 1) return '<span style="color:#468847;"><b>✓</b></span>';
					 
				}},
				{ "mData": "justificacion", "bSortable": false }
			],
			//Procesado y renderizado de celdas
		
  });//Fin Paginacion
	function setColorFR ( data, type, row ) {
    	if( 0 < parseInt(data) <= 5)
    		return '<span class=\"label\">'+data+'</span>';
    	else if( 6 <= parseInt(data) <= 7){
    		return '<span class=\"label label-warning\">'+data+'</span>';
    	}else if( 8 <= parseInt(data) <= 9){
    		return '<span class=\"label label-important\">'+data+'</span>';
    	}
	}
	//[EVENTO EXPORTAR]Boton Exportar a Excel: Transmitimos la cookie al
	//servidor
	 $('#ExportarExcel').CBPSendCookie({
		 cookieName: 'CDetalle',
		 path: '/detalle/DetalleExportar',
		 canvas: '',
		 debug: true
	   });
	
	 
	 $('#ExportarExcel').CBPSubmitCookieForm({
	   	cookieName: 'CDetalle',
	   	path: '/detalle/DetalleExportar',
	   	debug: true
	 });
	
	//[EVENTO ATRAS] Boton de ir atrás, hemos de pasar los parámetros ede 
	//la consulta para que la vuelva a realizar
	$('.navebar li:nth-child(1) img').click(function(){
		history.go(-1); 
	});

	//[EVENTO EXPORTAR INFORME] -------------------------------------------
	//Control de si se ha de mostrar la información de informe por proveedor 
	//Esto es en caso de que la consulta se haya realizado por proveedor. Esto lo extraemos
	//de la consulta.
	var infoConsulta =  new cookieJSONString('consulta').getJSON();
	//Si se ha seleccionado algún proveedor mostramos el boton de exportar
	//Condiciones para mostrar el boton de exportación de informes:
	if(infoConsulta.prov != '--' && infoConsulta.tipoConsulta == 'actual' ){
		//Atención toma un componente de la jsp
		console.log("Acceso por Proveedor");
		$('#RealizaInforme').show();
		//Añadimos los campos de fecha que se han seleccionado en la pantalla 1
		//Leemos la cookie de los formularios iniciales 
		var consulCookie =  new cookieJSONString('consulta');
		var consulJSON = consulCookie.getJSON();	
		
//		alert("Periodo inicial : " + consulJSON.periodoInicial);
//		alert("Periodo final : " + consulJSON.periodoFinal);
		
		if(consulJSON.periodoInicial != "" || consulJSON.periodoFinal != "" ){
			console.log("Periodo inicial seted");
			infoDetalle.append('periodoInicial',consulJSON.periodoInicial);
			infoDetalle.append('periodoFinal',consulJSON.periodoFinal);
		}else{
			console.log("Periodo inicial no seted");
			infoDetalle.append('periodoInicial',"nada");
			infoDetalle.append('periodoFinal',"nada");
		}
			 
		 $('#RealizaInforme').CBPSubmitCookieForm({
			   	cookieName: 'CDetalle',
			   	path: '/detalle/InformeExportar',
			   	debug: true
		});

	}else {
		$('#infoSpan').css({"display":"none"});
		console.log("La búsqueda NO es por provedor");
	}
	
	//[EVENTO EXPORTAR INFORME POR APLICACIÓN] -------------------------------------------
	//Control de si se ha de mostrar la información de informe por APLICACIÓN 
	//Esto es en caso de que la consulta se haya realizado por aplicación. 
	//Esto lo extraemos de la consulta.
	var infoConsulta =  new cookieJSONString('consulta').getJSON();
	//Si se ha seleccionado algún proveedor mostramos el boton de exportar
	if(infoConsulta.aplicacion != ''  && infoConsulta.tipoConsulta == 'actual' ){
		//Atención toma un componente de la jsp
		console.log("Acceso por aplicación");
		$('#RealizaInforme').show();
		//Añadimos los campos de fecha que se han seleccionado en la pantalla 1
		//Leemos la cookie de los formularios iniciales 
		var consulCookie =  new cookieJSONString('consulta');
		var consulJSON = consulCookie.getJSON();	
		//<----> [ EVENTO DE CLICK ] <-----> 
		 $('#RealizaInformeAplicacion').CBPSubmitCookieForm({
			   	cookieName: 'consulta',
			   	path: '/informes/informeEspecifico',
			   	debug: true
		 });
	}else {
		console.log("No se entra por Aplicación ....");
		$('#infoSpanPorApp').css({"display":"none"});
	}

	//CSS especiales para elementos:
	alignCenter(3);alignCenter(5);
	//Alinea componentes de la tabla
	function alignCenter(posicion){
		console.log("Alineando ...");
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
	    
	
});//FinJQUERY
   