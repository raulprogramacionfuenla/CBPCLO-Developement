/*DAVID*/
ALTER TABLE `fr_global_informe` CHANGE `id_frGlobal` `id_frGlobal`  INT NOT NULL AUTO_INCREMENT;
ALTER TABLE `seguim_incomp_detall` CHANGE `id_seg_inc_det` `id_seg_inc_det` INT NOT NULL AUTO_INCREMENT;
ALTER TABLE `seguim_incomp_resum` CHANGE `id_seg_inc_res` `id_seg_inc_res` INT NOT NULL AUTO_INCREMENT;

/*ALVARO - Adaptación de campo a multiidioma*/
ALTER TABLE `control` CHANGE `clase_control` `clase_control_CA` INT NOT NULL AUTO_INCREMENT;
ALTER TABLE `control` ADD COLUMN `clase_control_ES` VARCHAR(30) NOT NULL AFTER `clase_control_CA`;

/*SONIA*/
ALTER TABLE `excepcio` CHANGE `id_excepcio`  `id_excepcio` INT NOT NULL AUTO_INCREMENT;

/*FRAN*/
ALTER TABLE aplicacions_obsoletes ADD COLUMN  modulo VARCHAR(16) after aplicacio;

/*MODS*/
ALTER TABLE `germanar` CHANGE `id_germanar` `id_germanar` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `regles_bloqueig` CHANGE `id_regla` `id_regla` INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `control` CHANGE `id_control` `id_control` INT(11) NOT NULL;

ALTER TABLE `resultat_x_component_des` CHANGE `id_resultat` `id_resultat` INT(11) NOT NULL;
ALTER TABLE `resultat_x_component_des_historic` CHANGE `id_resultat` `id_resultat` INT(11) NOT NULL;
ALTER TABLE `resultat_x_component_pro` CHANGE `id_resultat` `id_resultat` INT(11) NOT NULL;
ALTER TABLE `resultat_x_component_pro_historic` CHANGE `id_resultat` `id_resultat` INT(11) NOT NULL;
