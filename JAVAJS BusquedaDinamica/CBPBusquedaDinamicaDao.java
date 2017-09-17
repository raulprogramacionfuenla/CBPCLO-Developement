package es.lacaixa.absiscloud.cbpclo.business.dao;

import java.util.List;

import es.lacaixa.absiscloud.cbpclo.common.domain.CBPBusquedaDinamicaInPOJO;
import es.lacaixa.absiscloud.cbpclo.common.domain.FormLecturaProveedoresPOJO;
/**
 * DAO de CBPBusquedaDinamica
 * @author aperisza
 *
 */
public interface CBPBusquedaDinamicaDao{
	/**
	 * Retorna una lista de string con las entradas del campo X para la tabla Y
	 * @param tablacampo CBPBusquedaDinamicaInPOJO
	 * @return List<String>
	 */
	List<String> RecuperaCampos(CBPBusquedaDinamicaInPOJO tablacampo);
}
