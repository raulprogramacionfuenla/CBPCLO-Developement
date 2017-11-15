package es.lacaixa.absiscloud.cbpclo.business.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.lacaixa.absiscloud.cbpclo.business.dao.CBPBusquedaDinamicaDao;
import es.lacaixa.absiscloud.cbpclo.common.domain.CBPBusquedaDinamicaBean;
import es.lacaixa.absiscloud.cbpclo.common.domain.CBPBusquedaDinamicaInPOJO;
import es.lacaixa.absiscloud.cbpclo.common.service.CBPBusquedaDinamicaService;
import es.lacaixa.absiscloud.cbpclo.common.util.CBPJSONParser;


/**
 * Service De la CBPBusquedaDinamica
 * @author aperisza
 *
 */
@Service
public class CBPBusquedaDinamicaServiceImpl implements CBPBusquedaDinamicaService {
	
	private CBPBusquedaDinamicaDao formDao;
	
	@Autowired
	public void setDao(final CBPBusquedaDinamicaDao formDAO){
		this.formDao = formDAO;
	}
	
	@Override
	public List<String> getEntradas(CBPBusquedaDinamicaBean BeanEntrada) throws Exception{
		List<String> formPojo = new ArrayList<String>();
		
		CBPBusquedaDinamicaInPOJO tmpPojo = BeanEntrada.getPojoIn();
		
		System.out.println("Esto Llega Bean : " + BeanEntrada.getPojoIn().toString());
		
		try{
			formPojo = formDao.RecuperaCampos(tmpPojo);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao Busqueda Dinamica");
			throw ex;
		}
		return formPojo;
	}//End getEntradas
	
	
	private String msg;
	List<String> fields = new ArrayList<String>();
	
	/**
	 * <b>Constructor</b> El parámetro es el string JSON de CBPBusqueda dinamica
	 * 
	 * @param msg String
	 * @return String
	 * @throws Exception 
	 */
	public String startCBPModule(String msg) throws Exception {
		this.msg = msg;
		return this.Search();
	}

	/**
	 * Soluciona la consulta a la base de datos de CBPBusquedaDinamica
	 * 
	 * @param inHash
	 *            HashMap<String,String>
	 * @return
	 * @throws Exception
	 */
	private List<String> SolveBusquedaDinamica(HashMap<String, String> inHash)
			throws Exception {
		// 1-Cargamos la información del hashmap en un POJO
		CBPBusquedaDinamicaInPOJO cbpPojo = new CBPBusquedaDinamicaInPOJO();
		cbpPojo.setCampo(inHash.get("field"));
		cbpPojo.setTabla(inHash.get("table"));
		cbpPojo.setEntrada(inHash.get("valor"));
		cbpPojo.setMaxSearch(inHash.get("limit"));

		// 2-Transferimos esta información a un Bean
		CBPBusquedaDinamicaBean cbpBean = new CBPBusquedaDinamicaBean();
		cbpBean.setPojoIn(cbpPojo);

		// 3-Tranferimos el Bean al serviceImpl obteniendo la lista de elementos
		try {
			List<String> camposEncontrados = this.getEntradas(cbpBean);
			this.fields = camposEncontrados;
			return camposEncontrados;
		} catch (Exception e) {
			System.out.println("Error de nulo");
			throw e;
		}

	}

	/**
	 * Printa por el terminal de Eclipse las entradas encontradas.
	 */
	public void PlotSearch() {
		System.out.println("CBPBusquedaDinamica === Campos encontrados: ");
		if (this.fields != null) {
			for (String campo : this.fields)
				System.out.println("-> " + campo);
		} else
			System.out
					.println("CBPBusquedaDinamica Error en transferencia :( ");
	}

	/**
	 * Se encarga de realizar el parseo del String JSON
	 * 
	 * @param msg
	 *            String
	 * @return HashMap<String,String>
	 */
	private HashMap<String, String> parseJSON() {
		CBPJSONParser parsHandler = new CBPJSONParser(this.msg);
		HashMap<String, String> info = parsHandler.getHashMap();
		return info;
	}

	/**
	 * <b>Busqueda dunamica SEARCH</b> Se encarga de gestionar la búsqueda en la
	 * base de datos. El parámetro de entrada es el hashmap con la información
	 * que ha de buscar. La salida es un string html li.../li con los campos
	 * encontrados en la base de datos.
	 * 
	 * @param inHash
	 * @return lista String
	 * @throws Exception
	 */
	public String Search() throws Exception {
		HashMap<String, String> inHash = this.parseJSON();

		// Obtenemos los campos
		List<String> tmpInfo = this.SolveBusquedaDinamica(inHash);

		// Parsemaos la información en una lista HTML
		String lista = new String();
		for (String campo : tmpInfo) {
			lista += "<li>" + campo + "</li>";
		}
		return lista;
	}
	
}//End class