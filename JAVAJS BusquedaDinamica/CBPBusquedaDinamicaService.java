package es.lacaixa.absiscloud.cbpclo.common.service;


import java.util.List;

import javax.servlet.http.HttpServletResponse;

import es.lacaixa.absiscloud.cbpclo.common.domain.CBPBusquedaDinamicaBean;

/**
 * Clase que define la interfaz para el servicio 
 * de CBPBusquedaDinamica
 * @author aperisza
 *
 */
public interface CBPBusquedaDinamicaService {
	/**
	 * Se recupera la lista de campos
	 * @return String
	 * @throws Exception
	 */
	 List<String> getEntradas(CBPBusquedaDinamicaBean beanEntrada) throws Exception;
	 
	 /**
	  * Se encarga de realizar la busqueda de
	  * las preferencias de entrada 
	  * @param msg String
	  * @return String
	  * @throws Exception
	  */
	 String startCBPModule(String msg) throws Exception;
}