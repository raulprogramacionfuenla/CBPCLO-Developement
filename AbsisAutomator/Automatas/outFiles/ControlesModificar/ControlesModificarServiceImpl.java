
package es.lacaixa.absiscloud.cbpclo.business.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.lacaixa.absiscloud.cbpclo.business.dao.ControlesModificarDao;
import es.lacaixa.absiscloud.cbpclo.common.domain.ControlesModificarBean;
import es.lacaixa.absiscloud.cbpclo.common.domain.ControlesModificarInPOJO;
import es.lacaixa.absiscloud.cbpclo.common.service.ControlesModificarService;

/**
 * Service Implement de ControlesModificar
 * @author aperisza
 */
@Service
public class ControlesModificarServiceImpl implements ControlesModificarDinamicaService {

	private ControlesModificarDao formDao;

	@Autowired
	public void setDao(final CBPBusquedaDinamicaDao formDAO){
		this.formDao = formDAO;
	}

	@Override
	public List<ControlesModificarOutPOJO> SELECTProcess(ControlesModificarBean BeanEntrada) throws Exception{
        List<String> formPojo = new ArrayList<String>();

		ControlesModificarInPOJO tmpPojo = BeanEntrada.getPojoIn();

		System.out.println("Esto Llega Bean de ControlesModificar: " + BeanEntrada.getPojoIn().toString());

		try{
			formPojo = formDao.SelectProcess(tmpPojo);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de ControlesModificar");
			throw ex;
		}
		return formPojo;
	}//End getEntradas

 