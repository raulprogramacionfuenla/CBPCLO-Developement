	$(document).ready(function(){
		//_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_:_
		//Lectura de formularios
		debug = true;
		$(document).on('click', '#ejec', function(event) {
			loadForm(); //Cargamos la información del formulario
			if(debug) console.log(form);
			t.fnDraw();
		});
		var form = {}; 
		loadForm();
		if(debug) console.log("Info del formulario: ");
		if(debug) console.log(form);
		function loadForm(){
			form["ClaseControl"] = $( "#ClaseControl  option:selected" ).text();
			form["Estado"]= $( "#Estado  option:selected" ).attr('CBPName');
			form["TipoControl"] = $( "#TipoControl  option:selected" ).text();
			form["FactorRiesgo"] = $( "#FactorRiesgo  option:selected" ).text();
		}

	//Tabla ficheros
	var t = $('#tablaEntidadControles').dataTable( {
		    //Credenciales del servidor y métodos HTTP
		    "bProcessing": true, //Mostrar la barra de progreso (Processing ...)
		    "bServerSide": true, //Habilitamos el procesado desde el lado del servidor
		    "sAjaxSource": "AdministracionControles/DataTables/", //Path del servidor
		    "sServerMethod": "POST", //Método de transmisión
		    "orderMulti": false, //Multiples columnas a la vez
		    "sPaginationType": "full_numbers",
		    "fnDrawCallback": function (oSettings) {
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
			"autoWidth": false,
		    "sDom": 'rt<"bottom"iflp<"clear">>',
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
		     	aoData.push( { "name": "ClaseControl", "value": form.ClaseControl});
		    	aoData.push( { "name": "Estado", "value": form.Estado});
		    	aoData.push( { "name": "TipoControl", "value": form.TipoControl});
		    	aoData.push( { "name": "FactorRiesgo", "value": form.FactorRiesgo});
		    },
		    "aoColumns": [		                    	
		  				{ "mData": "control", "bSortable": false},
		  				{ "mData": "descripcioIncompliment", "bSortable": false },
		  				{ "mData": "claseControl", "bSortable": false , "mRender": function( data, type, row ) {
		  					return data;
		  				}},
		  				{ "mData": "tipoControl", "bSortable": false,"mRender": function( data, type, row ) {
		  					return data;
		  				}},
		  				{ "mData": "fr", "bSortable": false,"mRender": function( data, type, row ) {
		  					if( parseInt(data) <= 5)
		  			    		return '<span class="label">'+data+'</span>';
		  			    	else if( 6 <= parseInt(data) && parseInt(data) <= 7){
		  			    		return '<span class="label label-warning">'+data+'</span>';
		  			    	}else if( 8 <= parseInt(data) &&  parseInt(data)<= 9){
		  			    		return '<span class="label label-important">'+data+'</span>';
		  			    	}
		  				}},
		  				{ "mData": "estado", "bSortable": false, "mRender": function(data, type, row){
		  					if(data == 'Actiu' || data == 'Activo' )return '<i class="icono-semaforico-verde"></i><span style="color:green; font-weight:bold">'+data +'</span>';
		  					else return '<i class="icono-semaforico-rojo"></i><span style="color:#b94a48; font-weight:bold">'+data +'</span>';
		  				}},
		  				{ "mData": "fechaInicioVigencia", "bSortable": false },
		  				{ "mData": "fechaBaja", "bSortable": false },
		  				{ "mData": null, "bSortable": false, "mRender": function( data, type, row ) {
		  					var idControl = row.id_control;
		  					return '<select id="changer" idControl ='+idControl+' ><option>Acciones</option><option enlace="modificar">Modificar</option><option enlace="baja">Baja</option></select>';
		  				}}
		  			]
			//Procesado y renderizado de celdas
		
  });//Fin Paginacion

	
	//[EVENTO ATRAS] Boton de ir atrás, hemos de pasar los parámetros ede 
	//la consulta para que la vuelva a realizar
	$('.navebar li:nth-child(1) img').click(function(){
		history.go(-1); 
	});

	//CSS especiales para elementos:
	alignCenter(3);alignCenter(5);alignCenter(6);
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
	 
	function isEllipsisActive(e) {
	     return (e.offsetWidth < e.scrollWidth);
	}
	
	
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
	/*****************************************************************
	
	 */
	function alinearLoading(){
		$('.dataTables_processing').attr('align','center');
	}
	function attachChanger(){
		  $(document).on("change", "#changer", function(event) {
		      //Tomamos el atributo de cambio
		      var accion = $(this).find(':selected').attr('enlace');
		      var idControl = $(this).attr('idControl');
		      console.log('cambiando ...   accion: ' + accion + $(this).attr('idControl'));
		      //Hacemos un switch de las acciones
		      if(accion == 'modificar'){
		            console.log("IdControl: " + idControl + "  -->  modificar");
		            $('input#formAccion').val('update');
		            $('input#id_control').val(idControl);
		            $("#modificar").submit();
		            console.log("Submitendo modificar ...");
		      }else if(accion == 'baja'){
			    	$('input#formAccion').val('delete');
			        $('input#id_control').val(idControl);
			        $("#modificar").submit();
			    	console.log("IdControl: " + idControl + "  -->  dar de Baja");
		      }
		  });//End event on change
		}
	attachChanger();
	
	//Exportar informes:
	$('#excelControles').CBPSubmitForm({
		"path":"/AdministracionControles/export",
		"fields":[{"ClaseControl":$( "#ClaseControl  option:selected" ).text()},
		          {"Estado":$( "#Estado  option:selected" ).attr('CBPName')},
		          {"TipoControl":$( "#TipoControl  option:selected" ).text()},
		          {"FactorRiesgo":$( "#FactorRiesgo  option:selected" ).text()}
		          ]
	});
	$('#tablaEntidadControles_processing').attr('align','center');
});//FinJQUERY
   