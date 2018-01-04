
package es.lacaixa.absiscloud.cbpclo.common.service;
import java.util.List;
import es.lacaixa.absiscloud.cbpclo.common.domain.ModeloControlLiteralBean;
import es.lacaixa.absiscloud.cbpclo.common.domain.ModeloControlLiteralPOJO;
/**
 * Clase que define la interfaz para el servicio de ModeloControlLiteral
 * @author aperisza
 */
public interface ModeloControlLiteralService {
	/**
	 * Se recupera la lista de todos los elementos insertados en la base de datos
     *<code>
     * SELECT * FROM control_literal
     *</code>
	 * @return List<ModeloControlLiteralPOJO>
	 * @throws Exception
	 */
	 ModeloControlLiteralBean SELECTProcess() throws Exception;

    /**
    * Se recupera un registro de la base de datos por id de este
    * @param id int
    * @return ModeloControlLiteralPOJO
    * @throws Exception
    */
    ModeloControlLiteralBean SelectById(int id) throws Exception;

    /**
    * Realiza el UPDATE de un registro de la tabla en la base de datos
	* @param beanEntrada ModeloControlLiteralBean
    * @return Integer
    * @throws Exception
	*/
	Integer UpdateProcess(ModeloControlLiteralBean beanEntrada)  throws Exception;

    /**
	* Realiza el INSERT a base de datos
	* @param beanEntrada ModeloControlLiteralBean
    * @return Integer
    * @throws Exception
    */
	Integer InsertProcess(ModeloControlLiteralBean beanEntrada)  throws Exception;

}