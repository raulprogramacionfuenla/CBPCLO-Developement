CREATE TABLE IF NOT EXISTS `excepcio_codi_harcode`(
  `id_codi` INT NOT NULL AUTO_INCREMENT,
  `tipus` VARCHAR(20) NOT NULL,
  `excepcio` VARCHAR(100) NOT NULL,
  `component` VARCHAR(8) NOT NULL,
  `descripcio` VARCHAR(200),
   PRIMARY KEY (`id_codi`),
   UNIQUE INDEX `id_codi` (`id_codi` ASC))
  ENGINE = InnoDB;|
CREATE TRIGGER calculo_id_des_hist BEFORE INSERT ON resultat_x_component_des_historic
   FOR EACH ROW begin
If new.id_resultat='' then
	SET new.id_resultat =  (select greatest(MAX(des.id_resultat) ,MAX(desh.id_resultat),MAX(pro.id_resultat),MAX(proh.id_resultat)) +1
	from resultat_x_component_des as des
	left join resultat_x_component_des_historic as desh
	on des.id_resultat <> desh.id_resultat
	left join resultat_x_component_pro as pro
	on des.id_resultat <> pro.id_resultat
	left join resultat_x_component_pro_historic as proh
	on des.id_resultat <> proh.id_resultat);
end if;
end;|
CREATE TRIGGER calculo_id_dest BEFORE INSERT ON resultat_x_component_des
   FOR EACH ROW begin
If new.id_resultat='' then
	SET new.id_resultat =  (select greatest(MAX(des.id_resultat) ,MAX(desh.id_resultat),MAX(pro.id_resultat),MAX(proh.id_resultat)) +1
	from resultat_x_component_des as des
	left join resultat_x_component_des_historic as desh
	on des.id_resultat <> desh.id_resultat
	left join resultat_x_component_pro as pro
	on des.id_resultat <> pro.id_resultat
	left join resultat_x_component_pro_historic as proh
	on des.id_resultat <> proh.id_resultat);
end if;
end;|
CREATE TRIGGER calculo_id_pro_hist BEFORE INSERT ON resultat_x_component_pro_historic
   FOR EACH ROW begin
If new.id_resultat='' then
	SET new.id_resultat =  (select greatest(MAX(des.id_resultat) ,MAX(desh.id_resultat),MAX(pro.id_resultat),MAX(proh.id_resultat)) +1
	from resultat_x_component_des as des
	left join resultat_x_component_des_historic as desh
	on des.id_resultat <> desh.id_resultat
	left join resultat_x_component_pro as pro
	on des.id_resultat <> pro.id_resultat
	left join resultat_x_component_pro_historic as proh
	on des.id_resultat <> proh.id_resultat);
end if;
end;|
ALTER TABLE `fr_global_informe` CHANGE `id_frGlobal` `id_frGlobal`  INT NOT NULL AUTO_INCREMENT;|
ALTER TABLE `seguim_incomp_detall` CHANGE `id_seg_inc_det` `id_seg_inc_det` INT NOT NULL AUTO_INCREMENT;|
ALTER TABLE `seguim_incomp_resum` CHANGE `id_seg_inc_res` `id_seg_inc_res` INT NOT NULL AUTO_INCREMENT;|
ALTER TABLE `control` CHANGE `clase_control` `clase_control_CA` VARCHAR(30) NOT NULL;|
ALTER TABLE `control` ADD COLUMN `clase_control_ES` VARCHAR(30) NOT NULL AFTER `clase_control_CA`;|
ALTER TABLE `excepcio` CHANGE `id_excepcio`  `id_excepcio` INT NOT NULL AUTO_INCREMENT;|
ALTER TABLE aplicacions_obsoletes ADD COLUMN `modulo` VARCHAR(16) after `aplicacio`;|
ALTER TABLE `germanar` CHANGE `id_germanar` `id_germanar` INT(11) NOT NULL AUTO_INCREMENT;|
ALTER TABLE `regles_bloqueig` CHANGE `id_regla` `id_regla` INT(11) NOT NULL AUTO_INCREMENT;|
ALTER TABLE `control` CHANGE `id_control` `id_control` INT(11) NOT NULL;|
ALTER TABLE `control_literal` CHANGE `id_control_literal` `id_control_literal` INT(11) NOT NULL AUTO_INCREMENT;|
