package es.lacaixa.absiscloud.cbpclo.common.domain;

import java.io.Serializable;
/**
 * Pojo que sustenta la búsqueda dinámica en 
 * la base de datos.
 * @author aperisza
 *
 */
public class CBPBusquedaDinamicaInPOJO implements Serializable{	
	private static final long serialVersionUID = 1L;
	private String tabla;
	private String campo;
	private String maxSearch;
	
	private String entrada;
	
	
	public String getEntrada() {
		return entrada;
	}
	public void setEntrada(String entrada) {
		this.entrada = entrada;
	}
	public String getMaxSearch() {
		return maxSearch;
	}
	public void setMaxSearch(String string) {
		this.maxSearch = string;
	}
	public String getTabla() {
		return tabla;
	}
	public void setTabla(String tabla) {
		this.tabla = tabla;
	}
	public String getCampo() {
		return campo;
	}
	public void setCampo(String campo) {
		this.campo = campo;
	}
	@Override
	public String toString() {
		return "CBPBusquedaDinamicaInPOJO [tabla=" + tabla + ", campo=" + campo
				+ ", maxSearch=" + maxSearch + ", entrada=" + entrada + "]";
	}
	
}
