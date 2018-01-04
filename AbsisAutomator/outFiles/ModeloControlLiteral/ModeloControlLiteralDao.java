
package es.lacaixa.absiscloud.cbpclo.business.dao;

import java.util.List;

import es.lacaixa.absiscloud.cbpclo.common.domain.ModeloControlLiteralInPOJO;
import es.lacaixa.absiscloud.cbpclo.common.domain.ModeloControlLiteralPOJO;

/**
 * [--- DAO ---]
 * DAO  del proceso ModeloControlLiteral
 * @author aperisza
 */
public interface ModeloControlLiteralDao{
	/**
	* Realiza el SELECT a base de datos
	* @param POJOinModeloControlLiteralInPOJO
	* @return List<ModeloControlLiteralPOJO>
	*/
	List<ModeloControlLiteralPOJO> SelectProcess();

    /**
    * Realiza el SELECT de un elemento por id de la base de datos
    * @param id int
    * @return ModeloControlLiteralPOJO
    */
    ModeloControlLiteralPOJO SelectById(int id);

    /**
	* Realiza el INSERT a base de datos
	* @param POJOin ModeloControlLiteralInPOJO
    * @return Integer
	*/
	Integer InsertProcess(ModeloControlLiteralInPOJO POJOin);

    /**
    * Realiza el UPDATE de un registro de la tabla en la base de datos
	* @param POJOin (ModeloControlLiteralInPOJO
    * @return Integer
    */
	Integer void UpdateProcess(ModeloControlLiteralInPOJO POJOin);

}