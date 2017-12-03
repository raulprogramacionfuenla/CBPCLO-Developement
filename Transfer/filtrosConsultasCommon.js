//Funciones comunes del filtro de consultas. Estas funciones son 
// comunes para SSMM - pre/pro y HOST pre/pro
$(document).ready(function(){
	
//Bridege de 4 posibilidades de checkbox resultat a 1
//===============================================================
	//Seleccionamos entre OK/KO
	function setOKKO(){
		var ok = $("#OK").is(":checked");
		var ko = $("#KO").is(":checked");
		//Por defecto el estado será todos.
		var resultado = "todos";
		if(ok && !ko) resultado = "OK";
		else if(!ok && ko) resultado = "KO";
		else if(!ok && !ko){
			return false;
		} 
		//Actualizamos el formulario oculto
		$('#resultado').attr("value",resultado);
		return true;
	}
	//El lector de formularios leerá este input text para completar la información necesaria para realizar la consulta
	//var str = '<input type="text" id="result" value="todos" name="resultado">';
	//$('body').append(str);
	
	$('body').on('change', '#OK', function(event) {
		//Control de la 4 posibilidad
		if(!setOKKO()){
			$('#OK').attr("checked", "checked");
			$('#resultado').attr("value","OK");
		}
	});
	//Versión para crhome
	$('body').on('change', '#KO', function(event) {
		//Control de la 4 posibilidad
		if(!setOKKO()){
			$('#KO').attr("checked", "checked");
			$('#resultado').attr("value","KO");
		}
	});
//===============================================================	
//Cargamos la información desde la cookie de los formularios

var cc = cookieJSONString('consulta').getJSON();
//Cargamos la información de la cookie, en caso 
//de que exista información almacenada
console.log("Recargando formulario ...");
if(cc != null){
	/*$('body').formloader(
			[{
			    type:"input",
			    target:"#aplicacion", 
			    value: cc.aplicacion
			},
			{
			    type:"input",
			    target:"#componente", 
			    value: cc.componente
			},
			{
				type:"input",
				target:"#version", 
				value: cc.version
			},
			{
				 type:"select",
				 target:"#prov", 
				 value: cc.prov 
			},
			{
				 type: "radio",
				 target:"TipoConsulta", //name
				 value: cc.tipoConsulta
			},
			{
				 type: "checkbox",
				 target:"#OK", //id /class
				 value: true // true -> checked false ´-> no checked
			},
			{
				type: "checkbox",
				target:"#KO", //id /class
				value: false // true -> checked false ´-> no checked
			},
			{
				type: "checkbox",
				target:"#bloqueados", //id /class
				value: true // true -> checked false ´-> no checked
			},
			{
				type: "checkbox",
				target:"#susceptibles", //id /class
				value: true // true -> checked false ´-> no checked
			},
			{
				type: "input",
				target:"#periodoInicial", //id /class
				value: cc.periodoInicial // true -> checked false ´-> no checked
			},
			{
				type: "input",
				target:"#periodoFinal", //id /class
				value: cc.periodoFinal // true -> checked false ´-> no checked
			}		
			]);*/
}else{
	console.log("No existen búsquedas previas ...");
}		
		//Matriz inicial de valores en los formularios
		var patronInicial = [
		{type:"input",      target:"#aplicacion",     value: ""},
		{type:"input",      target:"#componente",     value: ""},
		{type:"input",      target:"#version",        value: ""},
		{type:"select",     target:"#prov",           value: "--" },
		{type: "radio",     target:"TipoConsulta",    value: ""},
		{type: "checkbox",  target:"#OK",             value: true},
		{type: "checkbox",  target:"#KO",             value: true},
		{type: "checkbox",  target:"#bloqueados",     value: false},
		{type: "checkbox",  target:"#susceptibles",   value: false},
		{type: "input",     target:"#periodoInicial", value: ""},
		{type: "input",     target:"#periodoFinal",   value: ""}];
		//Establecimiento de los valores por defecto
		$('#limpiar').click(function(event) {
			  console.log("Cleaning...");
			  $('body').formloader(patronInicial);
		});
		
		
});//Fin del jQuery