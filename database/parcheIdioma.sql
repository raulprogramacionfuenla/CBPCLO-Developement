/*------------------------------------------------------------*/
/*PARCHE ACTUALIZACIÓN DE TABLAS A MULTI-IDIOMA (CA , ES)*/
/*-------------------------------------------------------*/

/*[PRE-PRO] Tipus Control*/
ALTER TABLE tipus_control CHANGE descripcio
descripcio_CA VARCHAR(50);
ALTER TABLE tipus_control
ADD  descripcio_ES VARCHAR(50);

/*[PRE] Control*/
ALTER TABLE control CHANGE descripcioIncompliment
descripcioIncompliment_CA VARCHAR(500);
ALTER TABLE control
ADD  descripcioIncompliment_ES VARCHAR(500);

/*[*] Tabla incumplimientos*/
ALTER TABLE incompliments CHANGE descripcioJustificacio
descripcioJustificacio_CA VARCHAR(500);
ALTER TABLE incompliments
ADD  descripcioJustificacio_ES VARCHAR(500);

#Nover de sitio
ALTER TABLE tipus_component
ADD `usadb2` VARCHAR(1) NULL;
ALTER TABLE control
DROP COLUMN `usadb2`;

#-- Alters para pre
ALTER TABLE control CHANGE `bloqueantPre`
vidas int(1);
ALTER TABLE control_literal
DROP dataAlta ,DROP dataBaixa ,DROP dataModif
ADD COLUMN tipo_accion
