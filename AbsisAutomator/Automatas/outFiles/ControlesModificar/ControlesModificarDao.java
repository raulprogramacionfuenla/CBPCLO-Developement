
package es.lacaixa.absiscloud.cbpclo.business.dao;

import java.util.List;

import es.lacaixa.absiscloud.cbpclo.common.domain.ControlesModificarInPOJO;
import es.lacaixa.absiscloud.cbpclo.common.domain.ControlesModificarOutPOJO;

/**
 * [--- DAO ---]
 * DAO  del proceso ControlesModificar
 * @author aperisza
 *
 */
public interface ControlesModificarDao{
	/**
	* Realiza el SELECT a base de datos
	* @param POJOin CBPBusquedaDinamicaInPOJO
	* @return List<ControlesModificarOutPOJO>
	*/
	List<ControlesModificarOutPOJO> SelectProcess(ControlesModificarInPOJO POJOin);

    /**
	* Realiza el INSERT a base de datos
	* @param POJOin CBPBusquedaDinamicaInPOJO
	*/
	void InsertProcess(ControlesModificarInPOJO POJOin);

    /**
    * Realiza el UPDATE a base de datos
	* @param POJOin CBPBusquedaDinamicaInPOJO
	*/
	void UpdateProcess(ControlesModificarInPOJO POJOin);


}