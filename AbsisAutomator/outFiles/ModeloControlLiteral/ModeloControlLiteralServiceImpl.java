
package es.lacaixa.absiscloud.cbpclo.business.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.lacaixa.absiscloud.cbpclo.business.dao.ModeloControlLiteralDao;
import es.lacaixa.absiscloud.cbpclo.common.domain.ModeloControlLiteralBean;
import es.lacaixa.absiscloud.cbpclo.common.domain.ModeloControlLiteralInPOJO;
import es.lacaixa.absiscloud.cbpclo.common.service.ModeloControlLiteralService;
import es.lacaixa.absiscloud.cbpclo.common.domain.ModeloControlLiteralPOJO;

/**
 * Service Implement de ModeloControlLiteral
 * @author aperisza
 */
@Service
public class ModeloControlLiteralServiceImpl implements ModeloControlLiteralService {

	private ModeloControlLiteralDao formDao;

	@Autowired
	public void setDao(final ModeloControlLiteralDao formDAO){
		this.formDao = formDAO;
	}

	@Override
	public ModeloControlLiteralBean SELECTProcess() throws Exception{
        List<ModeloControlLiteralPOJO> formPojo = new ArrayList<ModeloControlLiteralPOJO>();
        ModeloControlLiteralBean bin = new ModeloControlLiteralBean();
		try{
			formPojo = formDao.SelectProcess();
            bin.setPojoOut(formPojo);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de ModeloControlLiteral en el SELECT");
			throw ex;
		}
		return bin;
	}//End getEntradas

    @Override
	public Integer InsertProcess(ModeloControlLiteralBean BeanEntrada)  throws Exception{
        ModeloControlLiteralInPOJO tmpPojo = BeanEntrada.getPojoIn();
        try{
			formDao.InsertProcess(tmpPojo);

		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de ModeloControlLiteral en el INSERT");
			throw ex;
		}
        return 0;
	}//End getEntradas

    @Override
	public Integer UpdateProcess(ModeloControlLiteralBean BeanEntrada)  throws Exception{
        ModeloControlLiteralInPOJO tmpPojo = BeanEntrada.getPojoIn();
        try{
			formDao.UpdateProcess(tmpPojo);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de ModeloControlLiteral en el UPDATE");
			throw ex;
		}
        return 0;
	}//End getEntradas

    @Override
    public ModeloControlLiteralBean SelectById(int id) throws Exception{
        ModeloControlLiteralPOJO formPojo = new ModeloControlLiteralPOJO();
        ModeloControlLiteralBean bin = new ModeloControlLiteralBean();

        try{
			formPojo = formDao.SelectById(id);
            List<ModeloControlLiteralPOJO> lst = new ArrayList<ModeloControlLiteralPOJO>();
            bin.setPojoOut(lst);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de ModeloControlLiteral en el UPDATE");
			throw ex;
		}

        return bin;
	}//End getEntradas

}//End class
 