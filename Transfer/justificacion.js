$(document).ready(function(){

	$('#tablaJustificaciones').dataTable({		
		"sDom": 'rt<"bottom"iflp<"clear">>',
		"fnDrawCallback": function (oSettings) {
			if("false" == $("#admin").val()){		
				$('#tablaJustificaciones thead tr th').eq(7).hide();
				$("#tablaJustificaciones tbody tr td:nth-child(8)").hide();
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
		"sAjaxSource": "/Administracion/justificacionesTabla",
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
        				e.name == "justificadoFilter"
        	});
        	
        	if (result.length == 0) {
        		aoData.push({ "name": "aplicacionFilter", "value": $('form#listadoJustificacionesDTO').find('input[name="aplicacionFilter"]').val()} );
        		aoData.push({ "name": "componenteFilter", "value": $('form#listadoJustificacionesDTO').find('input[name="componenteFilter"]').val()} );
        		aoData.push({ "name": "justificadoFilter", "value": $('form#listadoJustificacionesDTO').find('select[name="justificadoFilter"]').val()} );
        		
        	}
        },
        "aoColumns": [		                    	
						{ "mData": "aplicacion", "bSortable": false }, 
						{ "mData": "componente", "bSortable": false }, 
						{ "mData": "nomControl", "bSortable": false }, 
						{ "mData": "tipoControl", "bSortable": false }, 
						{ "mData": "fr", "bSortable": false }, 
						{ "mData": "justificado",
							"mRender": function ( data, type, fila ) {
								if(parseInt(data)==0||data==null)return '';
						    	else if(parseInt(data) == 1) return '<span style="color:#468847;"><b>✓</b></span>';
						    	}, 								
							"bSortable": false }, 
						{ "mData": "descJustificado", "bSortable": false }, 
						{ "mData": null, "bSortable": false } 					
		],
		"fnCreatedRow": function(fila, data, indice) {
			
			$('td:eq(4)', fila).css({"text-align": "center"});
			$('td:eq(5)', fila).css({"text-align": "center"});
			$('td:eq(7)', fila).css({"text-align": "center"});		
		    				 
			var combo = $("<select></select>").attr("id", "mySelect").attr("name", "mySelect").css({"text-align": "center"}).change(function(){			
			      if($("option:selected", this).val()==0){
			    		var form = $(document.createElement('form'));
						$(form).attr("action", "/Administracion/accesoAltaJustificacion");
						$(form).attr("method", "POST");
						var idResultat = $("<input/>").attr("type", "hidden").attr("name", "idResultat").val(data.idResultat);
						var idControl = $("<input/>").attr("type", "hidden").attr("name", "idControl").val(data.idControl);						
						var aplicacionFilter = $("<input/>").attr("type", "hidden").attr("name", "aplicacionFilter").val($('form#listadoJustificacionesDTO').find('input[name="aplicacionFilter"]').val());
						var componenteFilter = $("<input/>").attr("type", "hidden").attr("name", "componenteFilter").val($('form#listadoJustificacionesDTO').find('input[name="componenteFilter"]').val());
						var justificadoFilter = $("<input/>").attr("type", "hidden").attr("name", "justificadoFilter").val($('form#listadoJustificacionesDTO').find('select[name="justificadoFilter"]').val());				
						$(form).append($(idResultat)).append($(aplicacionFilter)).append($(componenteFilter)).append($(justificadoFilter)).append($(idControl));
						$(form).appendTo('body').submit();
						
			      }else if($("option:selected", this).val()==1){			    	  
			    	  	var form = $(document.createElement('form'));
						$(form).attr("action", "/Administracion/bajaJustificacion");
						$(form).attr("method", "POST");
						var idResultat = $("<input/>").attr("type", "hidden").attr("name", "idResultat").val(data.idResultat);
						var idControl = $("<input/>").attr("type", "hidden").attr("name", "idControl").val(data.idControl);						
						var aplicacionFilter = $("<input/>").attr("type", "hidden").attr("name", "aplicacionFilter").val($('form#listadoJustificacionesDTO').find('input[name="aplicacionFilter"]').val());
						var componenteFilter = $("<input/>").attr("type", "hidden").attr("name", "componenteFilter").val($('form#listadoJustificacionesDTO').find('input[name="componenteFilter"]').val());
						var justificadoFilter = $("<input/>").attr("type", "hidden").attr("name", "justificadoFilter").val($('form#listadoJustificacionesDTO').find('select[name="justificadoFilter"]').val());				
						$(form).append($(idResultat)).append($(aplicacionFilter)).append($(componenteFilter)).append($(justificadoFilter)).append($(idControl));
						$(form).appendTo('body').submit();		      
				};
			});	 
				
			//Options acciones
			combo.append($('<option>',{
		        value: '',
		        text: Globalize.localize("label.common.acciones")
		    }));
			
			if(data.justificado==0||data.justificado==null){
				combo.append($('<option>',{
			    	value: '0',
			        text: Globalize.localize("label.common.alta")
			 }));
			}else if(data.justificado==1){
				combo.append($('<option>',{
			    	value: '1',
			        text: Globalize.localize("label.common.baja")
			    })); 
			};
			
			if("true" == $("#admin").val()){		
		    	$('td:eq(7)', fila).html(combo);
			}
		}
	});		
	
	//Enlace retorno listado justificaciones
	$('#fieldAltaJustificar').on('click', function(event){		
		var form = $(document.createElement('form'));
		$(form).attr("action", "/Administracion/listadoJustificaciones");
		$(form).attr("method", "POST");
							
		var aplicacionFilter = $("<input/>").attr("type", "hidden").attr("name", "aplicacionFilter").val($("#aplicacionFilter").val());
		var componenteFilter = $("<input/>").attr("type", "hidden").attr("name", "componenteFilter").val($("#componenteFilter").val());
		var justificadoFilter = $("<input/>").attr("type", "hidden").attr("name", "justificadoFilter").val($("#justificadoFilter").val());

		$(form).append($(aplicacionFilter)).append($(componenteFilter)).append($(justificadoFilter));
		$(form).appendTo('body').submit();	
		
        $("#altaJustificacion").prop("disabled","true"); 
        $("#cancelarJustificacion").prop("disabled","true"); 
	});
	
	//botón cancelar alta justificación
	$('button#cancelarJustificacion').on('click', function(event){							
		var form = $(document.createElement('form'));
		$(form).attr("action", "/Administracion/listadoJustificaciones");
		$(form).attr("method", "POST");
		var aplicacionFilter = $("<input/>").attr("type", "hidden").attr("name", "aplicacionFilter").val($("#aplicacionFilter").val());
		var componenteFilter = $("<input/>").attr("type", "hidden").attr("name", "componenteFilter").val($("#componenteFilter").val());
		var justificadoFilter = $("<input/>").attr("type", "hidden").attr("name", "justificadoFilter").val($("#justificadoFilter").val());     
  
		$(form).append($(aplicacionFilter)).append($(componenteFilter)).append($(justificadoFilter));
		$(form).appendTo('body').submit();	
		
        $("#altaJustificacion").prop("disabled","true"); 
        $("#cancelarJustificacion").prop("disabled","true"); 		
	});
	
	$('button#altaJustificacion').on('click', function(event){								
        $("#altaJustificacionesDTO").submit();
		
        $("#altaJustificacion").prop("disabled","true"); 
        $("#cancelarJustificacion").prop("disabled","true"); 		
	});
	
	$('#excelJustificaciones').on('click', function(event){		
		document.forms["listadoJustificacionesDTO"].action='/Administracion/exportExcelJustificaciones';
        $("#listadoJustificacionesDTO").submit();
	});
	
	//field modificar excepcion
	$('#volverAdminAltaJustif').on('click', function(event){
        window.location.href ='/Administracion';        
        $("#altaJustificacion").prop("disabled","true"); 
        $("#cancelarJustificacion").prop("disabled","true"); 		
	});
	
	//field volver adminsitracion alta excepcion
	$('#volverInicioAltaJustif').on('click', function(event){
        window.location.href ='/';        
        $("#altaJustificacion").prop("disabled","true"); 
        $("#cancelarJustificacion").prop("disabled","true"); 			
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
   