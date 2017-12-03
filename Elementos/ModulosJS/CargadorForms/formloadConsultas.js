var patronInicial = [
{type:"input",      target:"#aplicacion",     value: ""},
{type:"input",      target:"#componente",     value: ""},
{type:"input",      target:"#version",        value: ""},
{type:"select",     target:"#prov",           value: "" },
{type: "radio",     target:"TipoConsulta",    value: ""},
{type: "checkbox",  target:"#OK",             value: true},
{type: "checkbox",  target:"#KO",             value: true},
{type: "checkbox",  target:"#bloqueados",     value: false},
{type: "checkbox",  target:"#susceptibles",   value: false},
{type: "input",     target:"#periodoInicial", value: ""},
{type: "input",     target:"#periodoFinal",   value: ""}];

$('#limpiar').click(function(event) {
  console.log("Cleaning...");
});
