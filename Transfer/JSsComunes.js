$(document).ready(function(){
	/*==================================*/
	/*,.,.,.,., ENRUTAMIENTOS :;:;:;:;:;*/
	/*==================================*/
	
	/*________ PANTALLA DE HOME ________*/
	$('#adminBar').CBPSubmitForm({
		path:"/Administracion",
		fields:[{"campo":"valor"}]
	});
	
	$('div[dest="hostpre"]').CBPSubmitForm({
		path:"/FormularioBusqueda",
		fields:[{"estado":"pre"},{"entorno":"host"}]
	});
	
	$('div[dest="hostpro"]').CBPSubmitForm({
		path:"/InterHOST",
		fields:[{"estado":"pro"},{"entorno":"ssmm"}]
	});
	
	$('div[dest="ssmmpre"]').CBPSubmitForm({
		path:"/FormularioBusqueda",
		fields:[{"estado":"pre"},{"entorno":"ssmm"}]
	});
	
	$('div[dest="ssmmpro"]').CBPSubmitForm({
		path:"/InterSSMM",
		fields:[{"estado":"pro"},{"entorno":"host"}]
	});
	
	/*::::::::::::: PANTALLA INTERMEDIA :::::::::::::*/
	/*________ PANTALLA INTERMEDIA HOST ________*/
	$('div[dest="inter2TableHOST"]').CBPSubmitForm({
		path:"/FormularioBusqueda",
		fields:[{"estado":"pro"},{"entorno":"host"}]
	});
	$('div[dest="informes"]').CBPSubmitForm({
		path:"/Inter",
		fields:[{"estado":"pro"},{"entorno":"ssmm"}]
	});

	
	/*________ PANTALLA INTERMEDIA SSMM ________*/
	$('div[dest="inter2TableSSMM"]').CBPSubmitForm({
		path:"/FormularioBusqueda",
		fields:[{"estado":"pro"},{"entorno":"ssmm"}]
	});
	$('div[dest="informes"]').CBPSubmitForm({
		path:"/Inter",
		fields:[{"estado":"pro"},{"entorno":"ssmm"}]
	});
	
	//Pantallas de excepciones y justificaciones
	//Son comunes tanto para Host como para SSMM
	$('div[dest="AdminExcepciones"]').CBPSubmitForm({
		path:"/Administracion/listadoExcepciones",
		fields:[{"":""}]
	});
	
	$('div[dest="AdminControles"]').CBPSubmitForm({
		path:"/AdministracionControles",
		fields:[{"":""}]
	});
	
	/*________ PANTALLA ADMINISTRACIÓN ________*/
	$('div[dest="AdminInformes"]').CBPSubmitForm({
		path:"/Administracion",
		fields:[{"":""}]
	});
	$('div[dest="AdminJustificar"]').CBPSubmitForm({
		path:"/Administracion/listadoJustificaciones",
		fields:[{"":""}]
	});
	$('div[dest="AdminExcepcionar"]').CBPSubmitForm({
		path:"/Administracion/listadoExcepciones",
		fields:[{"":""}]
	});
	$('div[dest="AdminAgermanar"]').CBPSubmitForm({
		path:"/Administracion",
		fields:[{"":""}]
	});
	$('div[dest="AdminEntitatControl"]').CBPSubmitForm({
		path:"/AdministracionControles",
		fields:[{"":""}]
	});
	$('div[dest="AdminEntitatComponent"]').CBPSubmitForm({
		path:"/Administracion",
		fields:[{"":""}]
	});
	$('div[dest="AdminTipusComponent"]').CBPSubmitForm({
		path:"/Administracion",
		fields:[{"":""}]
	});
	$('div[dest="AdminReglesBloqueig"]').CBPSubmitForm({
		path:"/Administracion",
		fields:[{"":""}]
	});
	
	
	/*=====================================*/
	/**
	* -> Mini Plugin para tirar atrás al hacer click 
	**/
	(function ($){
	  	$.fn.CBPNavegation = function(pJ) {
	  			var el = $(this).attr('id');
		       $(document).on('click','#'+el, function(event) {
		           event.preventDefault();
		           history.back(pJ.pass);
		       });
	  		};//Fin del Pluguin
		}(jQuery));//End function container

	

	//CSS especiales para elementos:
	alignCenter(3);alignCenter(5);alignCenter(7);
	//Alinea componentes de la tabla
	function alignCenter(posicion){
		console.log("Alineando ...");
		str = "<style>table tr td:nth-child("+posicion+"){text-align:center;}</style>";
		$('body').append(str);
	}
	
	
	
	
});//FinJQUERY
   