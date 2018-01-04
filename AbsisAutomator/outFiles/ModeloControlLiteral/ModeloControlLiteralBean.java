
package es.lacaixa.absiscloud.cbpclo.common.domain;

import java.io.Serializable;
import java.util.List;

/**
 * Bean del proceso ModeloControlLiteral.
 * @author aperisza
 **/
public class ModeloControlLiteralBean implements Serializable{
	private static final long serialVersionUID = 1L;

	private ModeloControlLiteralInPOJO pojoIn;
	private List<ModeloControlLiteralPOJO> pojoOut;

    public ModeloControlLiteralInPOJO getPojoIn() {
		return pojoIn;
	}
	public void setPojoIn(ModeloControlLiteralInPOJO pojoIn) {
		this.pojoIn = pojoIn;
	}
	public List<ModeloControlLiteralPOJO> getPojoOut() {
		return pojoOut;
	}
	public void setPojoOut(List<ModeloControlLiteralPOJO> pojoOut) {
		this.pojoOut = pojoOut;
	}
}

