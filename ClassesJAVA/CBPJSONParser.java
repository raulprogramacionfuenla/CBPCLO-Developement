import java.util.HashMap;
import java.util.Map;

/**
 * Clase de apoyo para parsear Strings JSON.
 * @author aperisza
 *
 */
public class CBPJSONParser {
	private HashMap<String,String> tmpHash = new HashMap<String,String>();
	private String tmpMsg = new String();
	/**
	 * Construnctor
	 */
	public CBPJSONParser(String msg){
		this.tmpMsg = msg;
		this.getHashMap();
	}	
	
	/**
	* Pasa un elemento string, con significado JSON a un HashMap en que las claves, son las claves
	* del JSON.
	* Los campos string con la palabra "null" y "0" son convertidos a null de JAVA. 
	* @param value String
	* @return HashMap <String,String>
	*/
	public HashMap<String,String> getHashMap(){
		this.tmpMsg = this.tmpMsg.substring(1, this.tmpMsg.length()-1); //Quitamos los braquets
		String[] keyValuePairs = this.tmpMsg.split(",");  //Hacemos un split con coma
		HashMap<String,String> informacion = new HashMap<String, String>();               
		for(String pair : keyValuePairs){
					String[] entry = pair.split(":"); //Hacemos un split por los dos puntos)
					entry[0] = entry[0].replaceAll("\"", ""); //Quitamos las comillas
					entry[1] = entry[1].replaceAll("\"", "");
					informacion.put(entry[0].trim(), lambdaNul(entry[1].trim())); //Quitamos los espacios blancos e insertamos en el hashmap
			}
		this.tmpHash = informacion;
		return informacion;
	}//End decoder
	
	
	public void plotInfo(){
		System.out.println("CBPJSONParser says: ");
		for(Map.Entry<String, String> entry : this.tmpHash.entrySet()) {
		    System.out.println("Clave: " + entry.getKey()+" -> "+entry.getValue());
		}
	}
	
	private String lambdaNul(String valor){
		valor = valor.equals("null") ? null:valor; 
		return valor;
	}
	
	
}

