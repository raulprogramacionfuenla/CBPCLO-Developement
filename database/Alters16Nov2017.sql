ALTER TABLE `fr_global_informe` CHANGE `id_frGlobal` `id_frGlobal`  INT NOT NULL AUTO_INCREMENT;
ALTER TABLE `seguim_incomp_detall` CHANGE `id_seg_inc_det` `id_seg_inc_det` INT NOT NULL AUTO_INCREMENT;
ALTER TABLE `seguim_incomp_resum` CHANGE `id_seg_inc_det` `id_seg_inc_res` INT NOT NULL AUTO_INCREMENT;

ALTER TABLE `control` CHANGE `clase_control` `clase_control_CA` INT NOT NULL AUTO_INCREMENT;
ALTER TABLE `control` ADD COLUMN `clase_control_ES` VARCHAR(30) NOT NULL AFTER `clase_control_CA`;

