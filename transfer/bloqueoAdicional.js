/*Controla los estados en los que no se ha escito ningún 
formulario*/
$(document).ready(function(){	
function sobreaTodo(){
	elementos.forEach( function(element, index) {
		$(element).prop("disabled",true);
		$(element).find("*").prop("disabled",true); //Bloqueo para contenedores
		$(element).css({background: '#eee', bordercolor:'rgb(161, 161, 146);', color: 'grey', cursor:'not-allowed', opacity:'0.4'});
	});
}//End sombrea todo


function desSombreaTodo(){
	elementos.forEach( function(element, index) {
		$(element).removeAttr('disabled');
		$(element).find("*").removeAttr('disabled');//Para bloques
		$(element).css({background: 'white', color: 'black', cursor:"auto",opacity:'1'});
		$(element).removeAttr('value');
	});
}

function checkShadow(){
	var count = 0;
	console.log("Aqui");
	principales.forEach( function(element, index) {
		if($(element).val()==''){
			count +=1;
		}
	});

	if(count == 3){
	  sombreaTodo();
	}
}

var elementos = ['#tipoConsulta', '#resultado', '#periodo', '#mostrarSolo'];
var principales = ['#aplicacion', '#version', '#componente'];

$('#aplicacion').on('input',function(event) {
	checkShadow();
	
});


$('#version').on('input',function(event) {
	checkShadow();
});

$('#componente').on('input',function(event) {
	checkShadow();
});

});//FinJQUERY