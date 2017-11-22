CREATE TABLE IF NOT EXISTS `fr_global_informe` (
  `id_frGlobal`  INT NOT NULL AUTO_INCREMENT,
  `origen` VARCHAR(10) NULL,
  `dataProces` DATE NULL,
  `apl_agrup` VARCHAR(45) NULL,
  `linies` INT NULL,
  `numComponents` INT NULL,
  `fr9` INT NULL,
  `fr8` INT NULL,
  `fr7` INT NULL,
  `fr6` INT NULL,
  `fr5` INT NULL,
  `fr4` INT NULL,
  `fr3` INT NULL,
  `fr2` INT NULL,
  `fr1` INT NULL,
  `frTotal` INT NULL,
  `frGlobal` DECIMAL(10,3) NULL,
  `qualitat` DECIMAL(10,3) NULL,
  `descripcioQualitat` VARCHAR(45) NULL,
  `tipoInforme` VARCHAR(1) NULL,
  PRIMARY KEY (`id_frGlobal`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `seguim_incomp_detall` (
  `id_seg_inc_det` INT NOT NULL AUTO_INCREMENT,
  `id_seg_inc_res` INT NULL,
  `component` VARCHAR(45) NULL,
  `incompliments` INT NULL,
  `id_control` INT NULL,
  `sentenciaAfectada` VARCHAR(500) NULL,
  `modificat` INT NULL,
  PRIMARY KEY (`id_seg_inc_det`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `seguim_incomp_resum` (
`id_seg_inc_res` INT NOT NULL AUTO_INCREMENT,
  `origen` VARCHAR(45) NULL,
  `aplicacio` VARCHAR(45) NULL,
  `num_components` INT NULL,
  `dataProces` DATE NULL,
  `linies` INT NULL,
  `tipusPeriode` INT NULL,
  PRIMARY KEY (`id_seg_inc_res`))
ENGINE = InnoDB;
