
package es.lacaixa.absiscloud.cbpclo.common.service;
import java.util.List;
import es.lacaixa.absiscloud.cbpclo.common.domain.ControlesModificarBean;
/**
 * Clase que define la interfaz para el servicio de ControlesModificar
 * @author aperisza
 */
public interface ControlesModificarService {
	/**
	 * Se recupera la lista del tipo SELECT
	 * @param beanEntrada ControlesModificarBean
	 * @return String List
	 * @throws Exception
	 */
	 List<ControlesModificarOutPOJO> SELECTProcess(ControlesModificarBean beanEntrada) throws Exception;

}