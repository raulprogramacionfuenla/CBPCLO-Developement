/**
*-----> Control de fechas coherentes<----- 
*-----by: Álvaro Peris Zaragozá----
*-----AbsisCloud
*-----CBPCLO v1.0 2017-------
*Este plugin se encarga de notificar que la fecha de inicio
* es posterior a la de final o viceversa.
**/
$(document).ready(function(){	
(function ($) {


function coloreaError(id){
	$(id).css({
		background:'#FF9999'
	});

}//End colorea error

function descoloreaError(id){
	$(id).css({
		background:'white'
	});
}

$.fn.CBPControlFechas = function(pJ) {
	var idFechaInicio = pJ.inInicio;
	var idFechaFinal = pJ.inFinal;
	var carac = 3; //Numero de caracteres que tendrá la fecha
	
	//ESTADO 1 Controlamos que primero se haya rellenado la fecha de inicio
	$('body').on('input', idFechaFinal, function(event) {

			if($(idFechaFinal).val() == '') descoloreaError(idFechaFinal);
			if($(idFechaInicio).val() == '') descoloreaError(idFechaInicio);

			//Controlamos que la suposición sea certera
			if($(idFechaInicio).val() != ''){
				//Controlamos los caracteres introducidos
				var info = $(idFechaFinal).val();
				if(info.length == carac){			
					if($(idFechaFinal).val() < $(idFechaInicio).val()){
						coloreaError(idFechaFinal);
					}else{
						descoloreaError(idFechaFinal);
					}
				}//End control longitud
			}//Endif fecha inicio
	});//End if control fecha-----


	//ESTADO 2 Controlamos que primero se haya rellenado la fecha de inicio
	$('body').on('input', idFechaInicio, function(event) {

			if($(idFechaFinal).val() == '') descoloreaError(idFechaFinal);
			if($(idFechaInicio).val() == '') descoloreaError(idFechaInicio);

			//Controlamos que la suposición sea certera
			if($(idFechaFinal).val() != ''){
				//Controlamos los caracteres introducidos
				var info = $(idFechaInicio).val();
				if(info.length == carac){			
					if($(idFechaFinal).val() < $(idFechaInicio).val()){
						coloreaError(idFechaInicio);
					}else{
						descoloreaError(idFechaInicio);
					}
				}//End control longitud
			}//Endif fecha inicio
	});//End if control fecha-----


		
}//Fin del Pluguin
}(jQuery));//End function container
});//FinJQUERY