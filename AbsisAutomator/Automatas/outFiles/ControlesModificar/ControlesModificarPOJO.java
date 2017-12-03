
package es.lacaixa.absiscloud.cbpclo.common.domain;
import java.io.Serializable;
/**
 * POJO de transferencia del proceso ControlesModificar
 * @author aperisza
 *
 */
class ControlesModificarPOJO implements Serializable{
	private static final long serialVersionUID = 1L;

    //Variables
        private int id_control;
        private int id_tipus_control;
        private String clase_control_ES;
        private String desc_control_CA;
        private String desc_control_ES;
        private String factorRisc;
        private String descripcioIncompliment_CA;
        private String descripcioIncompliment_ES;
        private String dataAlta;
        private String dataBaixa;
        private String dataModif;
        private String dataIniciVigencia;
        private String vidas;
        private String classeJava;
        private String clase_control_CA;

    //Getters/Setters
        public void  setid_control(int id_control){
            this.id_control = id_control;
        }

        public int getid_control(){
            return this.id_control;
        }
        public void  setid_tipus_control(int id_tipus_control){
            this.id_tipus_control = id_tipus_control;
        }

        public int getid_tipus_control(){
            return this.id_tipus_control;
        }
        public void  setclase_control_ES(String clase_control_ES){
            this.clase_control_ES = clase_control_ES;
        }

        public String getclase_control_ES(){
            return this.clase_control_ES;
        }
        public void  setdesc_control_CA(String desc_control_CA){
            this.desc_control_CA = desc_control_CA;
        }

        public String getdesc_control_CA(){
            return this.desc_control_CA;
        }
        public void  setdesc_control_ES(String desc_control_ES){
            this.desc_control_ES = desc_control_ES;
        }

        public String getdesc_control_ES(){
            return this.desc_control_ES;
        }
        public void  setfactorRisc(String factorRisc){
            this.factorRisc = factorRisc;
        }

        public String getfactorRisc(){
            return this.factorRisc;
        }
        public void  setdescripcioIncompliment_CA(String descripcioIncompliment_CA){
            this.descripcioIncompliment_CA = descripcioIncompliment_CA;
        }

        public String getdescripcioIncompliment_CA(){
            return this.descripcioIncompliment_CA;
        }
        public void  setdescripcioIncompliment_ES(String descripcioIncompliment_ES){
            this.descripcioIncompliment_ES = descripcioIncompliment_ES;
        }

        public String getdescripcioIncompliment_ES(){
            return this.descripcioIncompliment_ES;
        }
        public void  setdataAlta(String dataAlta){
            this.dataAlta = dataAlta;
        }

        public String getdataAlta(){
            return this.dataAlta;
        }
        public void  setdataBaixa(String dataBaixa){
            this.dataBaixa = dataBaixa;
        }

        public String getdataBaixa(){
            return this.dataBaixa;
        }
        public void  setdataModif(String dataModif){
            this.dataModif = dataModif;
        }

        public String getdataModif(){
            return this.dataModif;
        }
        public void  setdataIniciVigencia(String dataIniciVigencia){
            this.dataIniciVigencia = dataIniciVigencia;
        }

        public String getdataIniciVigencia(){
            return this.dataIniciVigencia;
        }
        public void  setvidas(String vidas){
            this.vidas = vidas;
        }

        public String getvidas(){
            return this.vidas;
        }
        public void  setclasseJava(String classeJava){
            this.classeJava = classeJava;
        }

        public String getclasseJava(){
            return this.classeJava;
        }
        public void  setclase_control_CA(String clase_control_CA){
            this.clase_control_CA = clase_control_CA;
        }

        public String getclase_control_CA(){
            return this.clase_control_CA;
        }

    //Show: Mustra la información contenida en la estructura:
    public void show() {

        System.out.println(" -------------  ControlesModificar ");
        System.out.println("id_control =>" + this.id_control);
        System.out.println("id_tipus_control =>" + this.id_tipus_control);
        System.out.println("clase_control_ES =>" + this.clase_control_ES);
        System.out.println("desc_control_CA =>" + this.desc_control_CA);
        System.out.println("desc_control_ES =>" + this.desc_control_ES);
        System.out.println("factorRisc =>" + this.factorRisc);
        System.out.println("descripcioIncompliment_CA =>" + this.descripcioIncompliment_CA);
        System.out.println("descripcioIncompliment_ES =>" + this.descripcioIncompliment_ES);
        System.out.println("dataAlta =>" + this.dataAlta);
        System.out.println("dataBaixa =>" + this.dataBaixa);
        System.out.println("dataModif =>" + this.dataModif);
        System.out.println("dataIniciVigencia =>" + this.dataIniciVigencia);
        System.out.println("vidas =>" + this.vidas);
        System.out.println("classeJava =>" + this.classeJava);
        System.out.println("clase_control_CA =>" + this.clase_control_CA);
	  }
}
