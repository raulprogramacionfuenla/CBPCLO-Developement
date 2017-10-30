/*PARCHE ACTUALIZACIÓN DE TABLAS A MULTI-IDIOMA (CA , ES)*/

/*[PRE-PRO] Tipus Control*/
ALTER TABLE tipus_control CHANGE descripcio
descripcio_CAT VARCHAR(50);
ALTER TABLE tipus_control
ADD  descripcio_CAS VARCHAR(50);

/*[PRE] Control*/
ALTER TABLE control CHANGE descripcioIncompliment
descripcioIncompliment_CAT VARCHAR(500);
ALTER TABLE control
ADD  descripcioIncompliment_CAS VARCHAR(500);

/*[*] Tabla incumplimientos*/
ALTER TABLE incompliments CHANGE descripcioJustificacio 
descripcioJustificacio_CAT VARCHAR(500);
ALTER TABLE incompliments
ADD  descripcioJustificacio_CAS VARCHAR(500);





.first paginate_button paginate_button_disabled

.previous paginate_button paginate_button_disabled

.paginate_active

.paginate_button

.last paginate_button

.paginate_button{
		padding: 2px 	
}


$('.paginate_button').css({
		'padding':'50px'
});

$('.next').css({"display":"none"});

$('.paginate_button').css({'padding':'2px 5px 2px 5px', 'cursor':'pointer'});

$('.paginate_active').css({'background':'#DDE8ED', 'border-radius':'20px','padding':'2px 5px 2px 5px', 'cursor':'pointer'});