alter table constantes add column usuariHost varchar(7);
alter table constantes add column passwordHost varchar(8);

CREATE TABLE IF NOT EXISTS `mydb`.`InformesExcel` (
  `idInformesExcel` INT NOT NULL,
  `NomInforme` VARCHAR(30) NULL,
  `Excel` MEDIUMBLOB NULL,
  PRIMARY KEY (`idInformesExcel`))
ENGINE = InnoDB
