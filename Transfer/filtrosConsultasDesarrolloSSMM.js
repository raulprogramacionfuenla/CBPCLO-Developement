
$(document).ready(function(){

/*-------- Control de bloqueo de formularios ----------*/
/*=====================================================*/
//Seleccionamos los ids que se bloquearán cuando se entre información.
//Requiere del plugin CBPControlBloqueo 
//Calendario el calendario requiere de jquerty.datapick
//Alvaro Peris Zaragoza

/*-------- Control de fechas ----------*/
/*======================================*/
//Coherencia entre la fecha de inicio y fin en los formularios
//Requiere del plugin CBPControlFechas
//Calendario el calendario requiere de jquerty.datapick	
$('#periodoInicial').datepick({dateFormat: 'dd-mm-yyyy'});
$('#periodoFinal').datepick({dateFormat: 'dd-mm-yyyy'});

$('#periodo').CBPControlFechas({
	inInicio: '#periodoInicial',
	inFinal: '#periodoFinal'
});

var espacio = ['#aplicacion','#version', '#componente', '#prov', '#tipoConsulta','#mostrarSolo','#resultadoblock', '#periodo'];
var desbloqueantes = ["#aplicacion", "#version","#componente","#prov"];

$('#aplicacion').CBPControlBloqueo({
	espacio: espacio, //Elementos que mantendremos bloqueados por defecto
	foco:['#tipoConsulta','#periodo','#resultadoblock','#mostrarSolo'], //Elementos que se desbloquearán cuando se empiece a escribir
	desbloqueantes: desbloqueantes, //Elementos que estarán disponibles a pesar de que el formulario esta vacio
	alfanum: true, //Controla que solo se puedan entrar carácteres alfanuméricos
	maxLetras: 16, //Número máximo de carácteres que se pueden insertar en el formulario
	vacio:''
});

$('#version').CBPControlBloqueo({
	espacio: espacio,
	foco:['#tipoConsulta','#periodo','#resultadoblock'],
	desbloqueantes: desbloqueantes,
	alfanum: true,
	maxLetras: 6,
	vacio:''
});

$('#componente').CBPControlBloqueo({
	espacio: espacio,
	foco:['#tipoConsulta','#periodo','#resultadoblock','#mostrarSolo'],
	desbloqueantes: desbloqueantes,
	alfanum: true,
	maxLetras: 100,
	vacio:''
});

$('#prov').CBPControlBloqueo({
	espacio: espacio,
	foco:['#tipoConsulta','#periodo','#resultadoblock'],
	desbloqueantes: desbloqueantes,
	alfanum: false,
	maxLetras: 100,
	vacio:'--'
});

/*Control de bloqueo de los susceptibles de bloqueo*/
/*-------------------------------------------------*/
$('body').on('click', '#bloqueados', function(event) {
	console.log("attr id: " + $(this).attr('id'));
	checkBlock($(this).attr('id'),'susceptibles');
});

$('body').on('click', '#susceptibles', function(event) {
	console.log("attr id: " + $(this).attr('id'));
	checkBlock($(this).attr('id'),'bloqueados');
});

function checkBlock(id, comp){
	var espacioc = ['#tipoConsulta','#resultadoblock', '#periodo'];
	if($('#' + id).is(":checked")){
		console.log("Checked!");
		blockdesblok(espacioc,true);
	}else if(!isCheck(comp)){
		console.log("un Checked!");
		blockdesblok(espacioc,false);
	}
}
function isCheck(id){return $('#' + id).is(":checked");}
function blockdesblok(espacioc, bloq){
	espacioc.forEach( function(element, index) {
		console.log("Bloqueando ...");
		$(element).prop("disabled",bloq);
		$(element).find("*").prop("disabled",bloq); //Bloqueo para contenedores
		if(bloq)
			$(element).css({bordercolor:'rgb(161, 161, 146);', color: 'grey', cursor:'not-allowed', opacity:'0.4'});
		else
			$(element).css({bordercolor:'rgb(161, 161, 146);', color: 'black', cursor:'default', opacity:'1'});
	});//End foreach
}


/*>=== PAGINACIÓN =====<*/
/*-------- Almacenamiento del formulario en Cookie y submit del formulario----------*/
/*==================================================================================*/
//--> Creamos una cookie con la información procedente de los formularios
//a la que llamaremos  formulario. Una vez almacenado realiza un SUBMIT del formulario.
// Se empleará para almacenar el tipo de consulta que se está realizando -->
var campos = ['#aplicacion','#version', '#componente', '#prov', '#tipoConsulta','#bloqueados','#susceptibles','#resultado', '#periodoInicial','#periodoFinal'];
$('#realizaConsulta').uCBPalmacenaForm({
	listaIds: campos, //>Campos que se buscarán en la página
	nombreCookie: 'consulta', //>Cookie que se generará o actualizará en la buscqueda
	form: '#formularioPorAplicacionDTO', //>Formulario al que se hará submit y activará el sistema.
	infoExtra: {
		estado:'pre',
		entorno:'ssmm'
	},
	debug: false
});

});//Fin del jQuery