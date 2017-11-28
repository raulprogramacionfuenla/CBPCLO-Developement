/*Fran 27-Nov*/
drop trigger calculo_id_des_hist; 
drop trigger calculo_id_dest; 
drop trigger calculo_id_pro_hist; 
drop trigger calculo_id_pro;

/*Falta la descripción en catalan*/
ALTER TABLE `tipus_component` CHANGE `descripcio` `descripcio_CA` VARCHAR(45);
ALTER TABLE `tipus_component` ADD `descripcio_ES` VARCHAR(45) AFTER `descripcio_CA`;

/*Alters de hermanamiento*/
ALTER TABLE `germanar` ADD `dataAlta`  DATETIME
ALTER TABLE `germanar` ADD `dataBaixa` DATETIME AFTER `dataAlta`
ALTER TABLE `germanar` ADD `motiu` VARCHAR(200) AFTER `dataBaixa`
