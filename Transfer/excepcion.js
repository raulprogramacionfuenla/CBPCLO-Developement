$(document).ready(function(){

    //************************LISTADO EXCEPCIONES************************
    //Tabla
	$('#tablaExcepciones').dataTable({		
		"sDom": 'rt<"bottom"iflp<"clear">>',
		"fnDrawCallback": function (oSettings) {
			if("false" == $("#admin").val()){		
				$('#tablaExcepciones thead tr th').eq(8).hide();
				$("#tablaExcepciones tbody tr td:nth-child(9)").hide();
			}
			removePantallaLoader();
			addMostradorInfo();
		 },
		 "fnPreDrawCallback": function(oSettings) {
			 showPantallaLoader();
			 $('.footer').css({'position':'relative'});	 
		 },
		"bProcessing": false,
		"sScrollCollapse": true,
        "bServerSide": true,
        "bFilter": false,
        "sPaginationType": "full_numbers",
		"sAjaxSource": "/Administracion/excepcionesTabla",
		"order": [[ 0, "asc" ]],
		"oLanguage": {
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
        "sServerMethod": "POST",
        "fnServerParams": function ( aoData ) {
        	var result = $.grep(aoData, function(e){ 
        		return 	e.name == "aplicacionFilter", 
        				e.name == "componenteFilter",
        				e.name == "origenFilter",
           				e.name == "controlFilter",
           				e.name == "estadoFilter"
        	});
        	
        	if (result.length == 0) {
        		aoData.push({ "name": "aplicacionFilter", "value": $('form#listadoExcepcionesDTO').find('input[name="aplicacionFilter"]').val()} );
        		aoData.push({ "name": "componenteFilter", "value": $('form#listadoExcepcionesDTO').find('input[name="componenteFilter"]').val()} );
        		aoData.push({ "name": "origenFilter", "value": $('form#listadoExcepcionesDTO').find('select[name="origenFilter"]').val()} );
        		aoData.push({ "name": "controlFilter", "value": $('form#listadoExcepcionesDTO').find('input[name="controlFilter"]').val()} );
        		aoData.push({ "name": "estadoFilter", "value": $('form#listadoExcepcionesDTO').find('select[name="estadoFilter"]').val()} );        		
        	}
        },
        "aoColumns": [		                    	
						{ "mData": "aplicacion", "bSortable": false }, 
						{ "mData": "origenApl", "bSortable": false }, 						
						{ "mData": "componente", "bSortable": false }, 
						{ "mData": "nomControl", "bSortable": false }, 
						{ "mData": "tipoControl", "bSortable": false }, 
						{ "mData": "estado",
							"mRender": function ( data, type, fila ) {
									if(data==0){
										return Globalize.localize("label.filter.inactivo");
									}else if(data==1){
										return Globalize.localize("label.filter.activo");
									}else{
										return "";
									}
						    	},
						    	"bSortable": false }, 
						{ "mData": "fechaVigencia", "bSortable": false }, 
						{ "mData": "dataBaixa", "bSortable": false }, 
						{ "mData": null, "bSortable": false } 					
		],
		"fnCreatedRow": function(fila, data, indice) {
			$('td:eq(6)', fila).css({"text-align": "center"});
			$('td:eq(7)', fila).css({"text-align": "center"});
		    				 
			var combo = $("<select></select>").attr("id", "mySelect").attr("name", "mySelect").css({"text-align": "center"}).change(function(){			
			      if($("option:selected", this).val()==0){
			    	  	var form = $(document.createElement('form'));
						$(form).attr("action", "/Administracion/accesoModificarExcepcion");
						$(form).attr("method", "POST");
						var idExcepcio = $("<input/>").attr("type", "hidden").attr("name", "idExcepcio").val(data.idExcepcio);
						var aplicacionFilter = $("<input/>").attr("type", "hidden").attr("name", "aplicacionFilter").val($('form#listadoExcepcionesDTO').find('input[name="aplicacionFilter"]').val());
						var componenteFilter = $("<input/>").attr("type", "hidden").attr("name", "componenteFilter").val($('form#listadoExcepcionesDTO').find('input[name="componenteFilter"]').val());
						var origenFilter = $("<input/>").attr("type", "hidden").attr("name", "origenFilter").val($('form#listadoExcepcionesDTO').find('select[name="origenFilter"]').val());				
						var controlFilter = $("<input/>").attr("type", "hidden").attr("name", "controlFilter").val($('form#listadoExcepcionesDTO').find('input[name="controlFilter"]').val());				
						var estadoFilter = $("<input/>").attr("type", "hidden").attr("name", "estadoFilter").val($('form#listadoExcepcionesDTO').find('select[name="estadoFilter"]').val());										
						$(form).append($(idExcepcio)).append($(aplicacionFilter)).append($(componenteFilter)).append($(origenFilter)).append($(controlFilter)).append($(estadoFilter));
						$(form).appendTo('body').submit();  
			      }else if($("option:selected", this).val()==1){			    	  
			    	  	var form = $(document.createElement('form'));
						$(form).attr("action", "/Administracion/bajaExcepcion");
						$(form).attr("method", "POST");
						var idExcepcio = $("<input/>").attr("type", "hidden").attr("name", "idExcepcio").val(data.idExcepcio);
						var aplicacionFilter = $("<input/>").attr("type", "hidden").attr("name", "aplicacionFilter").val($('form#listadoExcepcionesDTO').find('input[name="aplicacionFilter"]').val());
						var componenteFilter = $("<input/>").attr("type", "hidden").attr("name", "componenteFilter").val($('form#listadoExcepcionesDTO').find('input[name="componenteFilter"]').val());
						var origenFilter = $("<input/>").attr("type", "hidden").attr("name", "origenFilter").val($('form#listadoExcepcionesDTO').find('select[name="origenFilter"]').val());				
						var controlFilter = $("<input/>").attr("type", "hidden").attr("name", "controlFilter").val($('form#listadoExcepcionesDTO').find('input[name="controlFilter"]').val());				
						var estadoFilter = $("<input/>").attr("type", "hidden").attr("name", "estadoFilter").val($('form#listadoExcepcionesDTO').find('select[name="estadoFilter"]').val());										
						$(form).append($(idExcepcio)).append($(aplicacionFilter)).append($(componenteFilter)).append($(origenFilter)).append($(controlFilter)).append($(estadoFilter));
						$(form).appendTo('body').submit();    
				};
			});	 
			//Options acciones
			combo.append($('<option>',{
		        value: '',
		        text: Globalize.localize("label.common.acciones")
		    }));
			combo.append($('<option>',{
		    	value: '0',
		        text: Globalize.localize("label.common.modificar")
			}));
			if(data.fechaVigencia!=null && data.dataBaixa==null){
				combo.append($('<option>',{
			    	value: '1',
			        text: Globalize.localize("label.common.baja")
			    })); 
			}
			if("true" == $("#admin").val()){		
				$('td:eq(8)', fila).html(combo);
			}
		}
	});		
	
	//Excel
	$('#excelExcepciones').on('click', function(event){		
		document.forms["listadoExcepcionesDTO"].action='/Administracion/exportExcelExcepciones';
        $("#listadoExcepcionesDTO").submit();
	});
	
	//Boton Alta
	$('#altaExcepcion').on('click', function(event){
		document.forms["listadoExcepcionesDTO"].action='/Administracion/altaExcepcion';
        $("#listadoExcepcionesDTO").submit();
        $("#altaExcepcion").prop("disabled","true"); 	
	});
	
    //************************ALTA EXCEPCIONES************************
	
	//Field volver listado excepciones
	$('#fieldAltaExcepcionar').on('click', function(event){
		document.forms["altaExcepcionesDTO"].action='/Administracion/listadoExcepciones';
        $("#altaExcepcionesDTO").submit();
        $("#aceptarExcepcion").prop("disabled","true"); 
        $("#cancelarExcepcion").prop("disabled","true"); 		
	});

	//Boton Cancelar
	$('#cancelarExcepcion').on('click', function(event){	
		document.forms["altaExcepcionesDTO"].action='/Administracion/listadoExcepciones';		
        $("#altaExcepcionesDTO").submit();
		
        $("#aceptarExcepcion").prop("disabled","true");
        $("#cancelarExcepcion").prop("disabled","true"); 			
	});
	
	//Boton Alta
	$('#aceptarExcepcion').on('click', function(event){								
        $("#altaExcepcionesDTO").submit();
		
        $("#aceptarExcepcion").prop("disabled","true"); 
        $("#cancelarExcepcion").prop("disabled","true"); 		
	});	
	
	//Field volver admin
	$('#volverAdminAlta').on('click', function(event){
        window.location.href ='/Administracion';        
        $("#aceptarExcepcion").prop("disabled","true");
        $("#cancelarExcepcion").prop("disabled","true"); 			
	});

	//Field volver volver Inicio
	$('#volverInicioAlta').on('click', function(event){
        window.location.href ='/';        
        $("#aceptarExcepcion").prop("disabled","true");
        $("#cancelarExcepcion").prop("disabled","true"); 			
	});
	
	//Acciones para formulario de Alta de Excepciones
    if($('form#altaExcepcionesDTO').find('select[name="origen"]').val()==1){
		$('form#altaExcepcionesDTO').find('input[name="aplicacion"]').attr("disabled", false);
		$('form#altaExcepcionesDTO').find('input[name="componente"]').attr("disabled", false);
		$('form#altaExcepcionesDTO').find('input[name="inicioVigencia"]').attr("disabled", false);
		$('form#altaExcepcionesDTO').find('input[name="finVigencia"]').attr("disabled", false);	
		$('#controlAltaExcepcion').show();
	    $("#aceptarExcepcion").prop("disabled", false);
	    $("#cancelarExcepcion").prop("disabled", false); 
    }else if($('form#altaExcepcionesDTO').find('select[name="origen"]').val()==2){
		$('form#altaExcepcionesDTO').find('input[name="aplicacion"]').attr("disabled", false);
		$('form#altaExcepcionesDTO').find('input[name="componente"]').attr("disabled", false);
		$('form#altaExcepcionesDTO').find('input[name="inicioVigencia"]').attr("disabled", false);
		$('form#altaExcepcionesDTO').find('input[name="finVigencia"]').attr("disabled", false);
		$('#controlAltaExcepcion').hide();   		
	    $("#aceptarExcepcion").prop("disabled", false);
	    $("#cancelarExcepcion").prop("disabled", false);    
    }else{
		$('form#altaExcepcionesDTO').find('input[name="aplicacion"]').attr("disabled", true);
		$('form#altaExcepcionesDTO').find('input[name="componente"]').attr("disabled", true);
		$('form#altaExcepcionesDTO').find('input[name="inicioVigencia"]').attr("disabled", true);
		$('form#altaExcepcionesDTO').find('input[name="finVigencia"]').attr("disabled", true);	
		$('#controlAltaExcepcion').hide();
	    $("#aceptarExcepcion").prop("disabled", true);
	    $("#cancelarExcepcion").prop("disabled", true);      	
    }
		
	$('form#altaExcepcionesDTO').find('select[name="origen"]').change(function() {
	    if($("option:selected", this).val()==1){
    		$('form#altaExcepcionesDTO').find('input[name="aplicacion"]').attr("disabled", false);
    		$('form#altaExcepcionesDTO').find('input[name="componente"]').attr("disabled", false);
    		$('form#altaExcepcionesDTO').find('input[name="inicioVigencia"]').attr("disabled", false);
    		$('form#altaExcepcionesDTO').find('input[name="finVigencia"]').attr("disabled", false);	
    		$('#controlAltaExcepcion').show();
    	    $("#aceptarExcepcion").prop("disabled", false);
    	    $("#cancelarExcepcion").prop("disabled", false); 
	    }else if($("option:selected", this).val()==2){
    		$('form#altaExcepcionesDTO').find('input[name="aplicacion"]').attr("disabled", false);
    		$('form#altaExcepcionesDTO').find('input[name="componente"]').attr("disabled", false);
    		$('form#altaExcepcionesDTO').find('input[name="inicioVigencia"]').attr("disabled", false);
    		$('form#altaExcepcionesDTO').find('input[name="finVigencia"]').attr("disabled", false);
    		$('#controlAltaExcepcion').hide();   		
    	    $("#aceptarExcepcion").prop("disabled", false);
    	    $("#cancelarExcepcion").prop("disabled", false); 	    
	    }else{
    		$('form#altaExcepcionesDTO').find('input[name="aplicacion"]').attr("disabled", true);
    		$('form#altaExcepcionesDTO').find('input[name="componente"]').attr("disabled", true);
    		$('form#altaExcepcionesDTO').find('input[name="inicioVigencia"]').attr("disabled", true);
    		$('form#altaExcepcionesDTO').find('input[name="finVigencia"]').attr("disabled", true);	
    		$('#controlAltaExcepcion').hide();
    	    $("#aceptarExcepcion").prop("disabled", true);
    	    $("#cancelarExcepcion").prop("disabled", true);    
    	}
	});
	//Fin acciones	
	
    //************************MODIFICAR EXCEPCIONES************************
	
	//Field volver listado excepciones
	$('#fieldModificarExcepcion').on('click', function(event){
		document.forms["modificarExcepcionesDTO"].action='/Administracion/listadoExcepciones';
        $("#modificarExcepcionesDTO").submit();
        
        $("#aceptarModificarExcepcion").prop("disabled","true"); 
        $("#cancelarModificarExcepcion").prop("disabled","true"); 		
	});
	
	//Boton Cancelar
	$('#cancelarModificarExcepcion').on('click', function(event){
		document.forms["modificarExcepcionesDTO"].action='/Administracion/listadoExcepciones';
        $("#modificarExcepcionesDTO").submit();
        $("#aceptarModificarExcepcion").prop("disabled","true"); 
        $("#cancelarModificarExcepcion").prop("disabled","true"); 		
	});
	
	//Boton Aceptar
	$('#aceptarModificarExcepcion').on('click', function(event){
		document.forms["modificarExcepcionesDTO"].action='/Administracion/updateExcepcion';
        $("#modificarExcepcionesDTO").submit();
        $("#aceptarModificarExcepcion").prop("disabled","true"); 
        $("#cancelarModificarExcepcion").prop("disabled","true"); 		
	});
	
	//Field volver admin
	$('#volverAdminModif').on('click', function(event){
        window.location.href ='/Administracion';        
        $("#aceptarModificarExcepcion").prop("disabled","true"); 
        $("#cancelarModificarExcepcion").prop("disabled","true"); 		
	});
	
	//Field volver Inicio
	$('#volverInicioModif').on('click', function(event){
        window.location.href ='/';        
        $("#aceptarModificarExcepcion").prop("disabled","true"); 
        $("#cancelarModificarExcepcion").prop("disabled","true"); 			
	});
	

		
	/*****************************************************************
	 * LETRERO ESTILO ECLIPSE
	 *  Ajuste del contenido de la tabla
	 *  Muestra la información en un letrerito rollo Eclipse 
	 *****************************************************************/
	function isEllipsisActive(e) {
	     return (e.offsetWidth < e.scrollWidth);
	}
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
                  clearTimeout(setTimeoutConst);
             });
          }//End mostrador Info
	/*****************************************************************/

	$('.footer').css({'position':'relative'});
	
});
   