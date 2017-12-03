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
		var id_control = 0;
		var id_resultat = 0;
		
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
        		 addMostradorInfo();
    		 },
		    //Cargadores. Feedback al usuario de cargando información.
		 	//"fnDrawCallback": function (oSettings) {removePantallaLoader();},
		    //"fnPreDrawCallback": function(oSettings) {showPantallaLoader();},
		 	
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
				{ "mData": "justificacion", "bSortable": false },
				{ "mData": "null", "bSortable": false, "mRender": function( data, type, row ) {
					//Cargamos la info en html
					var id_resultat = row.id_resultat;
					$('body').append('<div style="display:none" class="trasnfer" id="idenResultado">'+id_resultat+'</div>');
					var idControl = row.id_control;
					var aplicacion = row.aplicacion;
					$('body').append('<div style="display:none" class="trasnfer" id="idAplicacion">'+aplicacion+'</div>');
					var componente =  row.componente;
					$('body').append('<div style="display:none" class="trasnfer" id="idComponente">'+componente+'</div>');
					
					return '<select dest = "'+row.id_incompliments+'" id="'+row.id_incompliments+'"  idControl ='+idControl+' class="barraAcciones"><option id="Acciones">Acciones</option><option id="justificar">Justificar</option><option id="excepcionar">Excepcionar</option></select>';
				}}
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
	 
	 //v Global
	 var c = cookieJSONString('consulta');
	 function attachChanger(){
		  $(document).on("change", ".barraAcciones", function(event) {
			  	console.log("chaging ...");
			  	//1.- Obtenemos la id del elemento:
				var id = $(this).attr("id");
				var idControl = $(this).attr('idControl');
				//2.- Obtenemos el tipo seleccionado:
				var tipo = $('#'+id+' option:selected').attr('id'); 
				
				console.log("id Control: " + idControl);
				console.log("Tipo: " + tipo);
				
				//3.- Miramos que clase de tipo encontramos:
				if(tipo == "justificar"){
					//-> Lanzamos la petición POST.
					console.log("id Control: " + $('#idenControl').html());
					console.log("id Resultat: " + $('#idenResultado').html());
					console.log("Attaching submit form");
					CBPSubmitFormById({
				 		"path":"Administracion/accesoAltaJustificacion",
				 		"fields":[
				 		    //id_resultat i id_control
							{"idResultat":$('#idenResultado').html()},
				 			{"idControl":idControl},
				 			{"entorno":c.getJSON().entorno},
				 			{"estado":c.getJSON().estado}]
					});
				}else if(tipo == "excepcionar"){
					//-> Lanzamos la petición POST.
					$('body').CBPSubmitFormById({
				 		"path":"Administracion/altaExcepcion",
				 		"fields":[
				 		    {"aplicacion":$('#idAplicacion').html()},
				 		    {"componente":$('#idComponente').html()},
							{"entorno":c.getJSON().entorno},
				 			{"estado":c.getJSON().estado}]
					});
				}			
		  });//End event on change
		}//Emd attach changer
	 	attachChanger();
	 	
	 	
	 	function CBPSubmitFormById(pJ) {
			console.log("Genereting transfer form ...");
			preferencias = pJ;
			var id = $(this).attr('dest');
			console.log("Creating form selected by Id ...");
			$('#CBPSubForm'+id).remove();
			createForm(pJ,id);
			$('#CBPSubForm'+id).submit();
		};//Fin del Pluguin
		
	 	function createForm(pJ,id){
			console.log("Genereting transfer form ...");
			$("body").append('<form style="display:none;" method="post" id="CBPSubForm'+id+'" action="'+pJ.path+'"></form>');
				for(var cc = 0;cc < pJ.fields.length; cc++){
					for(ele in pJ.fields[cc]){
						$('#CBPSubForm'+id).append('<input type="text" value="'+pJ.fields[cc][ele]+'" name="'+ele+'">');
					}//End for
			}//end for
		}//End func
	 	
	 	
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
	if(infoConsulta.aplicacion != ''  && infoConsulta.tipoConsulta == 'actual' && infoConsulta.entorno == 'pro'){
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
	alignCenter(3);alignCenter(5);alignCenter(7);
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
   