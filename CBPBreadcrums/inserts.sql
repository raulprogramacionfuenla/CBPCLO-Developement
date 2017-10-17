/* -----------  TEST ---------------*/

AÑADIR

ALTER TABLE info_aplicacio
ADD ia_origen VARCHAR(20);

ALTER TABLE id_tipus_control
ADD id_clase_control VARCHAR(30)


INSERT INTO `GQFcYhPt`.`info_aplicacio` (`id_info_apl`, `ia_apl_agrup`, `ia_centre`, `ia_area_dep`, `ia_proveidor`, `ia_mailResp`, `ia_mailRespCaixa`, `ia_numComponentsHOST`, `ia_origen`) VALUES (NULL, 'cbpcbp', '', '', 'EVERIS', 'responsableCbpCbp@everis.com;subresponsableCbpCbp@everis.com;subsubresponsableCbpCbp@everis.com;', 'responsableCaixa@caixa.com', '0', 'ssmm');

ALTER TABLE control
DROP COLUMN estat;

/*control*/
INSERT INTO `GQFcYhPt`.`control` (`id_control`, `id_tipus_control`, `nom`, `factorRisc`, `descripcioIncompliment`, `dataAlta`, `dataBaixa`, `dataModif`, `dataIniciVigencia`, `bloqueantPre`, `classeJava`) VALUES (NULL, '4', 'Utilització de SELECT * en les consultes SQL', '8', 'No está  permes utilitzar SELECT * en les consultes de SQL', '2011-03-29', NULL, NULL, NULL, '0', NULL);
INSERT INTO `GQFcYhPt`.`control` (`id_control`, `id_tipus_control`, `nom`, `factorRisc`, `descripcioIncompliment`, `dataAlta`, `dataBaixa`, `dataModif`, `dataIniciVigencia`, `bloqueantPre`, `classeJava`) VALUES (NULL, '4', 'Verificar que s\'utilitza alguna funcionalitat de STDI015 quan aquest s\'ha carregat préviament', '9', 'Detectar que s\'ha carregat STDI015 pero no s\'utilitza cap funcionalitat', '2011-03-29', NULL, NULL, NULL, '0', NULL);

<%@ page contentType="text/html; charset=UTF-8" %>
