
package es.lacaixa.absiscloud.cbpclo.web.dto;
import java.io.Serializable;
/**
 * DTO de transferencia de pantalla a controlador del proceso
 * ModeloControlLiteral.
 * @author aperisza
 **/
class ModeloControlLiteralInDTO implements Serializable{
	private static final long serialVersionUID = 1L;
    //Variables
        private String expresioRegular;
        private String ordre;
        private String id_control_literal;
        private String descripcio;
        private String id_control;
        private String tipo_accion;

    //Getters/Setters
        public void setexpresioRegular(String expresioRegular){
            this.expresioRegular = expresioRegular;
        }
        public String getexpresioRegular(){
            return this.expresioRegular;
        }
        public void setordre(String ordre){
            this.ordre = ordre;
        }
        public String getordre(){
            return this.ordre;
        }
        public void setid_control_literal(String id_control_literal){
            this.id_control_literal = id_control_literal;
        }
        public String getid_control_literal(){
            return this.id_control_literal;
        }
        public void setdescripcio(String descripcio){
            this.descripcio = descripcio;
        }
        public String getdescripcio(){
            return this.descripcio;
        }
        public void setid_control(String id_control){
            this.id_control = id_control;
        }
        public String getid_control(){
            return this.id_control;
        }
        public void settipo_accion(String tipo_accion){
            this.tipo_accion = tipo_accion;
        }
        public String gettipo_accion(){
            return this.tipo_accion;
        }

    //Show: Mustra la información contenida en la estructura:
    public void show() {
        System.out.println(" -------------  ModeloControlLiteral ");
        System.out.println("expresioRegular =>" + this.expresioRegular);
        System.out.println("ordre =>" + this.ordre);
        System.out.println("id_control_literal =>" + this.id_control_literal);
        System.out.println("descripcio =>" + this.descripcio);
        System.out.println("id_control =>" + this.id_control);
        System.out.println("tipo_accion =>" + this.tipo_accion);
	 }
}
