package es.lacaixa.absiscloud.cbpclo.common.domain;

import java.io.Serializable;

public class CBPBusquedaDinamicaBean implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private CBPBusquedaDinamicaInPOJO pojoIn;

	public CBPBusquedaDinamicaInPOJO getPojoIn() {
		return pojoIn;
	}

	public void setPojoIn(CBPBusquedaDinamicaInPOJO pojoIn) {
		this.pojoIn = pojoIn;
	} 
		
}
