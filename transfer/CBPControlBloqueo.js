/**
*-----> Control bloqueante para filtros <----- 
*-----by: Álvaro Peris Zaragozá----
*-----AbsisCloud
*-----CBPCLO v1.0 2017-------
*Este plugin se encarga de bloquear determinados formularios 
* de entrada en función de que entrada de tipo texto se esté 
* empleando.
**/
$(document).ready(function(){	
(function ($){
	function generaAlerta(msg){
		var alerta =  '<div class="control-group"><div class="missatge-informacio bann"> <p>';
		alerta += msg;
		alerta += '</p></div></div>';
		if($('.bann').length < 1){
			$('body').append(alerta);
			$('.bann').hide().slideDown('fast');
			setTimeout(function() {
				$('.bann').slideUp('fast');
	    		$('.bann').remove();
			}, 3000);
		}//End if
	}
	//Carga banners de errores
	function errorLogger(cod){
		switch (cod) {
			case 1:
				generaAlerta(Globalize.localize("label.alfaNumericos"));
				break;
			case 2:
				generaAlerta(Globalize.localize("label.masCaracteres"));
				break;
			default:
				// statements_def
				break;
		}
	}
	//Trata de que los carácteres de entrada sean alfa numéricos
	function chequeaAlfaNumerico(cadena){
		var tmpStr = cadena.replace(/[^a-z0-9]/gi,'');
		if(cadena != tmpStr){
			errorLogger(1);
			return tmpStr;
		}else return cadena;
	}

	function bloqueaEspacio(este,espacio){
		espacio.forEach( function(element, index) {
			if(element != este){
				$(element).prop("disabled",true);
				$(element).find("*").prop("disabled",true); //Bloqueo para contenedores
				//background: '#eee',
				$(element).css({bordercolor:'rgb(161, 161, 146);', color: 'grey', cursor:'not-allowed', opacity:'0.4'});
			}//End if
		});//End foreach
	}//End bloque espacio


	function desbloqueaFoco(este,foco){
		foco.forEach( function(element, index) {
			if(element != este){
				$(element).removeAttr('disabled');
				$(element).find("*").removeAttr('disabled');//Para bloques
				$(element).css({background: 'white', color: 'black', cursor:"auto",opacity:'1'});
			}//End if
		});//End loop
	}//End desbloqueaFoco

$.fn.CBPControlBloqueo = function(pJ) {
	var form = $(this);
	//Propiedades del plugin
	var maxLetras = pJ.maxLetras;
	var bloqueantes = pJ.bloquear;
	var inhabilidado = pJ.inmsg;
	var alfanum = pJ.alfanum;
	var vacio = pJ.vacio;
	
	//Control del tipo de elemento checkbox, radiobutton, text
	var tipo = null;
	if(pJ.hasOwnProperty('tipo')) tipo = pJ.tipo;
	
	var espacio = pJ.espacio;
	var foco = pJ.foco;
	var desbloqueantes = pJ.desbloqueantes;

	//Set inicial de bloqueos:
	if(!jQuery.isEmptyObject(desbloqueantes)){
		bloqueaEspacio('#'+$(this).attr('id'),espacio);
		desbloqueaFoco('#'+$(this).attr('id'),desbloqueantes);
	}
	
	var tmpMsg = '';
	//Consulta
	$('#' + form.attr('id')).on('input',function(event) {
		event.preventDefault();
		//Chequeo de caracteres:
		if(alfanum) $(this).val(chequeaAlfaNumerico($(this).val()));
		
		//Controlamos que se introduzcan 6 letras
		if($(this).val().length > maxLetras){
			errorLogger(2);
			$(this).val($(this).val().substr(0, maxLetras));
		}
	//================= Control por bloqueo ====================
	if(!jQuery.isEmptyObject(bloqueantes)){
		//En caso de que esté vacio el campo habilitamos
		if($(this).val().length <= 0 || $(this).val() == vacio){
		
			bloqueantes.forEach( function(element, index) {
				$(element).removeAttr('disabled');
				$(element).find("*").removeAttr('disabled');//Para bloques
				$(element).css({background: 'white', color: 'black', cursor:"auto",opacity:'1'});
				$(element).removeAttr('value');
			});		
		}//End control
		//En caso de que existan caracteres
		if($(this).val().length > 0 && $(this).val() != vacio){
			bloqueantes.forEach( function(element, index) {
				$(element).prop("disabled",true);
				$(element).find("*").prop("disabled",true); //Bloqueo para contenedores
				$(element).css({background: '#eee', bordercolor:'rgb(161, 161, 146);', color: 'grey', cursor:'not-allowed', opacity:'0.4'});
				$(element).attr('value', inhabilidado);
			});
		}//End if
		}//Bloqueo por bloque
	//End por bloqueo --------------------------
	
	//================= Control por espacio y foco =================
	if(!jQuery.isEmptyObject(espacio) && !jQuery.isEmptyObject(foco)){
		if($(this).val().length <= 0 || $(this).val() == vacio){
			console.log("Esta vacio ....");
			bloqueaEspacio('#'+$(this).attr('id'),espacio);
			if(!jQuery.isEmptyObject(desbloqueantes))
				desbloqueaFoco('#'+$(this).attr('id'),desbloqueantes);
		}//End control
		if($(this).val().length > 0 && $(this).val() != vacio){
			console.log("Esta lleno");
			bloqueaEspacio('#'+$(this).attr('id'),espacio);
			desbloqueaFoco('#'+$(this).attr('id'),foco);
		}
	}//Bloqueo por espacio y foco

	});//------------------INPUT
	//---------------------------------------- SOPORTE EXPLORER
	//Soporte para Explorer
	//Consulta
	$('#' + form.attr('id')).change(function(event) {
		changerCore();
	});//-------FIN DEL CHAGE
	if($('#' + form.attr('id')).html() != ""){
		changerCore();
	}
	
	
	//**********************************
	//Funciones de change
	//__________________________________
	function changerCore(){
		event.preventDefault();
		//Chequeo de caracteres:
		if(alfanum) $(this).val(chequeaAlfaNumerico($(this).val()));

		//Controlamos que se introduzcan 6 letras
		if($(this).val().length > maxLetras){
			errorLogger(2);
			$(this).val($(this).val().substr(0, maxLetras));
		}
	//================= Control por bloqueo ====================
	if(!jQuery.isEmptyObject(bloqueantes)){
		//En caso de que esté vacio el campo habilitamos
		if($(this).val().length <= 0 || $(this).val() == vacio){
			bloqueantes.forEach( function(element, index) {
				$(element).removeAttr('disabled');
				$(element).find("*").removeAttr('disabled');//Para bloques
				$(element).css({background: 'white', color: 'black', cursor:"auto",opacity:'1'});
				$(element).removeAttr('value');
			});
			
		}//End control
		//En caso de que existan caracteres
		if($(this).val().length > 0 && $(this).val() != vacio){
			bloqueantes.forEach( function(element, index) {
				$(element).prop("disabled",true);
				$(element).find("*").prop("disabled",true); //Bloqueo para contenedores
				$(element).css({background: '#eee', bordercolor:'rgb(161, 161, 146);', color: 'grey', cursor:'not-allowed', opacity:'0.4'});
				$(element).attr('value', inhabilidado);
			});
		}//End if
		}//Bloqueo por bloque
	//End por bloqueo --------------------------

	//================= Control por espacio y foco =================
	if(!jQuery.isEmptyObject(espacio) && !jQuery.isEmptyObject(foco)){
		if($(this).val().length <= 0 || $(this).val() == vacio){
			bloqueaEspacio('#'+$(this).attr('id'),espacio);
			if(!jQuery.isEmptyObject(desbloqueantes))
				desbloqueaFoco('#'+$(this).attr('id'),desbloqueantes);
		}//End control

		if($(this).val().length > 0 && $(this).val() != vacio){
			bloqueaEspacio('#'+$(this).attr('id'),espacio);
			desbloqueaFoco('#'+$(this).attr('id'),foco);
		}
	}//Bloqueo por espacio y foco
	}//------------------------------------- Fin funciones de change
}//Fin del Pluguin
}(jQuery));//End function container





});//FinJQUERY