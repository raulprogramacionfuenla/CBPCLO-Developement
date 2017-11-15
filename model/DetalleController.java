package es.lacaixa.absiscloud.cbpclo.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;


import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import es.lacaixa.absiscloud.cbpclo.common.domain.DetalleBean;
import es.lacaixa.absiscloud.cbpclo.common.domain.DetalleInPOJO;
import es.lacaixa.absiscloud.cbpclo.common.domain.DetalleInformePOJO;
import es.lacaixa.absiscloud.cbpclo.common.domain.DetalleOutPOJO;
import es.lacaixa.absiscloud.cbpclo.common.service.CBPFastQueryService;
import es.lacaixa.absiscloud.cbpclo.common.service.DetalleService;
import es.lacaixa.absiscloud.cbpclo.common.util.CBPJSONParser;
import es.lacaixa.absiscloud.cbpclo.common.util.DataTablePOJO;
import es.lacaixa.absiscloud.cbpclo.common.util.constantes;
import es.lacaixa.absiscloud.cbpclo.web.dto.DetalleDTO;
import es.lacaixa.absiscloud.cbpclo.web.dto.JqDataTableSearchResultDTO;
import es.lacaixa.absiscloud.cbpclo.web.dto.PlantillaExcelExportarDetalleDTO;
import es.lacaixa.absiscloud.cbpclo.web.dto.PlantillaExcelInformeDiarioDTO;
import es.lacaixa.absiscloud.fwk.web.controller.annotation.AbsisCloudController;
import es.lacaixa.absiscloud.fwk.web.controller.annotation.AbsisCloudControllerMethod;

/**
 * Controlador de la página del main
 * @author aperisza
 *
*/
@Controller
@RequestMapping(value ="/detalle")
@AbsisCloudController(absisId ="home")
public class DetalleController extends BaseController{
	//Permite la gestión desde el controlador del archivo de propiedades
	@Autowired
	private MessageSource mS;
	
	@Autowired
	protected DetalleService ImplDetalle;
	/**
	 * Conversor de DTO a POJO
	 * @param entradaDTO
	 * @return
	 */
	private DetalleInPOJO DTOin2POJOin(DetalleDTO entradaDTO){
		DetalleInPOJO pollo = new DetalleInPOJO();
		pollo.setEntorno(entradaDTO.getEntorno());
		pollo.setEstado(entradaDTO.getEstado());
		pollo.setId_componente(entradaDTO.getId_componente());
		return pollo;
	}
	/**
	 * Realiza una primera consulta a la base de datos y obtiene el número
	 * resultados para un id de componente determinado. Devuelve 
	 * este número de resultados en la jsp. 
	 * @param DataParams HashMap<String, String>
	 * @param request HttpServletRequest
	 * @param locale Locale
	 * @param model Model
	 * @param transferDTO CBPTransfersPantallaControladorDTO
	 * @return string String 
	 * @throws Exception
	 */
	@RequestMapping(value ="")
	@AbsisCloudControllerMethod(absisId = "FormulariosBusquedaProduccion")
	public String Formularios(@RequestParam HashMap<String, String> DataParams,HttpServletRequest request, Locale locale, Model model,@Valid @ModelAttribute("transferDTO") DetalleDTO transferDTO) throws Exception{	
		//Cargamos la información que nos llega de los data tables en un DTO
		DataTablePOJO dataTableParams = new DataTablePOJO(DataParams);
		//-> Pasamos el DTO de llegada a un POJO:
		DetalleInPOJO pojoIn =  DTOin2POJOin(transferDTO);
		//Obtenemos el nombre de la tabla de base de datos que se va a emplear
		pojoIn.calcTabla();
		
		//->Obtenemos el número de respuestas
		DetalleBean bin = new DetalleBean();
		bin.setPojoInDetalle(pojoIn);
		int numRespuestas= ImplDetalle.getNumResultados(bin);
		
		//-> Ponemos la barra de navegación:
		//request.setAttribute("navbar",new String[]{"null","Detalle"}); 
		
		//-> Retornamos este número de resultados junto a la jsp de la pantalla
		//como un campo oculto.
		request.setAttribute("nRespuestas", numRespuestas);
		
		return "paginas/detalle";
	}//FormPage
	
	//Exportación a Excel:
	/**
	 * 1Esta función lee la cookie con la información del formulario que se ha solicitado
	 * 2Realiza la consulta a la base de datos con esta información 
	 * 3Maqueta un excel y lo transmite. 
	 * @param msg String 
	 * @param request HttpServletRequest
	 * @param response HttpServletResponse 
	 * @param locale Locale
	 * @return string String
	 * @throws Exception
	 */
	@RequestMapping(value="/DetalleExportar", method={ RequestMethod.GET, RequestMethod.POST })
	@AbsisCloudControllerMethod(absisId = "ExcelExportDetalle")
	public  String  exportExcelDetalle(@RequestParam String msg,HttpServletRequest request,HttpServletResponse response, Locale locale) throws Exception{
			//1.- Instanciamos un parser de JSON para leer la información del formulario
			CBPJSONParser  parsHandler = new CBPJSONParser(msg);
			HashMap<String,String> info = parsHandler.getHashMap();
			
			//2.- Realizamos la consulta a la base de datos
			//2.1-Rellenamos el pojo de entrada a la base de datos
			DetalleInPOJO pojin = new DetalleInPOJO();
			pojin.setEntorno(info.get("lentorno"));
			pojin.setEstado(info.get("lestado"));
			pojin.setId_componente(info.get("lidResultado"));
			pojin.calcTabla();
			pojin.setLength(null);
			pojin.setStart(null);
			//2.1- Realizamos la consulta:
			List<DetalleOutPOJO> listaPOJOS = execConsulta(pojin);
			System.out.println("\n\n\n\n >> Elementos que se van a exportar");
			for(DetalleOutPOJO ele : listaPOJOS){
				System.out.println(">>" + ele);
			}
		    //3.- Maquetamos el excel con la información del DTO y la transmitimos al cliente.
		    PlantillaExcelExportarDetalleDTO pHandler = new PlantillaExcelExportarDetalleDTO(listaPOJOS,info, locale);
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition","attachment; filename="+"Detalle"+info.get("componente")+".xls");
			try{
				HSSFWorkbook wib = new HSSFWorkbook();
				wib = pHandler.getWorkBook();
				response.getOutputStream();
				response.flushBuffer();
				//3.3- Transmitimos la informacion al cliente
				wib.write(response.getOutputStream());
				//wib.close();
				//------------------------------------
				System.out.println("-------------> SE EXPORTA");
			}catch (Exception e){
				System.out.println("ERROR EXCEL: " + e);
			}
			
			return null;
			
	}//End export excel
	
	@Autowired
	private CBPFastQueryService fastQuery;
	/**
	 * [MÓDULO INFORME] Se encarga obtener los incumplimientos de cada elemento.
	 * <ul>
	 * <li>La función presupone que el campo proveedor es no nulo en el proveedor</li>
	 * </ul>
	 * @param proveedor String
	 * @return list List<DetalleOutPOJO>
	 * @throws Exception 
	 */
	private List<DetalleInformePOJO>  SQLExportarInforme(String msg) throws Exception{
		//0.- Extraemos la información que llega del JSON
		CBPJSONParser  parsHandler = new CBPJSONParser(msg);
		HashMap<String,String> info = parsHandler.getHashMap();
		
		System.out.println("\n\n----------------------------------");
		System.out.println("Información solicitada en el detalle: ");
		System.out.println("----------------------------------\n\n");
		parsHandler.plotInfo();
		
		
		//0.1 Hachemos un check de que sea no nulo el proveedor
		if(info.get("proveedor") != null){
			//1.- Realizamos la query para obtener el nombre  de los componentes que tiene un proveedor.
			String tabla = new String();
			//1.1 - Seleccionamos la tabla que nos manda en opciones:
			String estado = info.get("lestado");
			if(estado.equals(constantes.PRE_ID))
				tabla = constantes.TABLA_PRE;
			else if(estado.equals(constantes.PRO_ID))
				tabla = constantes.TABLA_PRO;

			//InformeExportar
			//1.2 componemos la query forzando que la salida sean strings de texto
			String query = " SELECT CAST(id_resultat AS CHAR) as id_resultat, CAST(component AS CHAR) as component from "+ constantes.TABLA_INFO_APLICACIO;
			query+=	" LEFT join "+ tabla +" ON ia_apl_agrup = apl_agrup";
			query += " WHERE ia_proveidor = '"+info.get("proveedor")+"'";
			
			
				if(!info.get("periodoInicial").equals("nada") && !info.get("periodoFinal").equals("nada") ){
					System.out.println(">>\n\n Selección por fecha");
					String perIni = info.get("periodoInicial");
					String perFin = info.get("periodoFinal");
					perIni = this.dateConversion(perIni);
					perFin = this.dateConversion(perFin);
					query += " AND dataProces BETWEEN '"+perIni+"' AND '"+perFin+"'";
				}else
			query += " AND resultat = 'KO' ORDER BY dataProces DESC;";
			
			List<HashMap<String,String>> elementos = this.fastQuery.makeQuery(query);
			
			//1.3 Cargamos los componentes obtenidos en una lista
			List <String> listaComponentes = new ArrayList<String>();
	
			//System.out.println("> Query a realizar: " + query);
			//Esta lista almacenara los múltiples objetos con
			/**
			 * *>Componente: TCRP77G
			 *> Fecha del proceso: 2013-01-21 00:00:00
			 *> TipoComponente: PGM
			 *> Incumplimientos: PojoOutIncumplimientos[factor de riesco, sentencia afectada],--,--,--,--,--,--,--,--,
			 */
			List<DetalleInformePOJO> listaPojo = new ArrayList<DetalleInformePOJO>();
			for(HashMap<String,String> hash: elementos){
				DetalleInformePOJO comp = new DetalleInformePOJO(); //Almacena en una estructura la información necesaria para rellenar el pojo
				DetalleInPOJO pojin = new DetalleInPOJO();
				try{
					//System.out.println("Nombre componente: " + hash.get("component"));
					comp.setNombre_componente(hash.get("component"));
					//2.1 Rellenamos un módulo de POJO de consulta
					pojin.setEntorno(info.get("lentorno"));
					pojin.setEstado(info.get("lestado"));
					pojin.setId_componente(hash.get("id_resultat"));
					pojin.calcTabla();
					pojin.setLength(null);
					pojin.setStart(null);
					
					//2.2- Realizamos la consulta a la base de datos y completamos la información de nuestro
					//pojo auxiliar.
					comp.setListaIncumplimientos(execConsulta(pojin));
					
					//3.- Extracción de los campos
					//Hacemos la query donde extraemos la información de la fecha, el tipo de component
					String qInfoQ = " select CAST(dataProces AS CHAR) as dataProces, tipus";
					qInfoQ += " from resultat_x_component_des  ";
					qInfoQ += " left join tipus_component  on id_tipus_comp = id_tipus_component";
					qInfoQ += " where component = '"+hash.get("component")+"';";
					
					System.out.println("Query: " + qInfoQ);
					
					HashMap<String,String> fechatipo = this.fastQuery.simpleQuery(qInfoQ);
					//Cargamos la fecha de proceso y el tipo de componente:
					comp.setFechaProceso(fechatipo.get("dataProces"));
					comp.setTipo(fechatipo.get("tipus"));
					//4- Añadimos el resultado a la lista de binomios <componente, lista incumplimientos>
					listaPojo.add(comp);
					
				}catch(Exception e){
					comp.setNombre_componente(null);
					pojin.setId_componente(null);
				}
				
			}//End for
			
			//Printamos la lista de incumplimientos encontrada:
			for(DetalleInformePOJO elemento: listaPojo){
				elemento.muestraIncumplimientos();
			}
			//System.out.println("Query de salida : " + query);
			return listaPojo;
		}else{
			System.out.println("[DetalleController.java] El campo de proveedor está vacío !!");
			return null;
		}
		
	}
	
	/**
	 * Convierte a formato de fecha del tipo my sql en formato string
	 * @param fecha String
	 * @return string String
	 */
	public  String dateConversion(String fecha){
		System.out.println(">> Esto se va convertir en el string; " + fecha);
		String[] digitos;
		digitos = fecha.split("-");
		if(digitos.length >= 3)
			return digitos[2] + "-" + digitos[1] + "-" + digitos[0];
		else{
			System.out.println("Error en la conversión de digitos");
			return "";
		}
	}
	/**
	 * Exportar informe 
	 * <li><b>msg:<b> Contiene la información en strting JSON de la cookie <i>CDetalle</i></li>
	 * @param msg String
	 * @param request HttpServletRequest 
	 * @param response HttpServletRequest
	 * @param locale Locale
	 * @return string String
	 * @throws Exception
	 */
	@RequestMapping(value="/InformeExportar",method={ RequestMethod.GET, RequestMethod.POST})
	@AbsisCloudControllerMethod(absisId = "InformeDetalle")
	public  String  InformeDetalle(@RequestParam String msg,HttpServletRequest request,HttpServletResponse response, Locale locale) throws Exception{
		//Obtenemos una lista <componente, lista incumplimientos>
		System.out.println("\n\n----------------------------------");
		System.out.println("Exportar Informe detalle");
		System.out.println("Info que llega: " + msg);
		System.out.println("----------------------------------\n\n");
		
		//->> Lista que obtiene información del error y todos los incumplimientos
		/** n elementos del tipo:
		 *______________________________________________
		 *> Componente: TCRM24A
		 *> Fecha del proceso: 2009-04-01 00:00:00
		 *> TipoComponente: MOD
		 *> Incumplimientos: 
		------------------------------------------------
			No existe constancia de incumplimientos
		 */
		List<DetalleInformePOJO> listaErrores = SQLExportarInforme(msg); 
		
		if(listaErrores != null){
			//1.- Pasamos a maquetar la información en un Excel.
			// Llamamos a la plantilla encargada de realizar la maquetación y le pasamos la lista de errores e información
			// complementaria en el msg.
			PlantillaExcelInformeDiarioDTO pHandler = new PlantillaExcelInformeDiarioDTO(listaErrores,msg,locale);
			
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition","attachment; filename="+"Detalle"+"InformeDeIncumplimientos"+".xls");
			try{
				HSSFWorkbook wib = new HSSFWorkbook();
				wib = pHandler.getWorkBook();
				response.getOutputStream();
				response.flushBuffer();
				//3.3- Transmitimos la informacion al cliente
				wib.write(response.getOutputStream());
				//wib.close();
				//------------------------------------
				System.out.println("-------------> SE EXPORTA EL INFORME");
			}catch (Exception e){
				System.out.println("ERROR EXCEL: " + e);
			}
			
			return null;
			
		}
		return null;
	}
	
	/**
	 * Receptor de información de la tabla  datatable. Del detalle
	 * @param DataParams HashMap<String, String>
	 * @param request HttpServletRequest
	 * @param locale Locale
	 * @param model Model
	 * @return JqDataTableSearchResultDTO
	 * @throws Exception
	 */
	@RequestMapping(value ="/DataTables")
	@AbsisCloudControllerMethod(absisId = "ReceptorDetalleDataTables")
	@ResponseBody
	public JqDataTableSearchResultDTO DataTables(@RequestParam HashMap<String, String> DataParams,HttpServletRequest request, Locale locale, Model model) throws Exception{	
		//0.- Obtenemos el idioma de la aplicación
		String idioma = locale.getLanguage(); //ca es
		//1.- Cargamos la información de los parámetros que llegan de paginación
		DataTablePOJO datatable = new DataTablePOJO(DataParams);
		//2.- Transferimos la información al POJO correspondiente
		DetalleInPOJO detPojo = new DetalleInPOJO();
		//2.1 Información para la consulta
		//Establecemos la tabla
		detPojo.setTabla(datatable.getOthers().get("lentorno"),datatable.getOthers().get("lestado"));
		detPojo.setId_componente(datatable.getOthers().get("lidResultado")); //Id del componente
		//2.2 Información para la paginación
		detPojo.setStart(datatable.getiDisplayStart());
		detPojo.setLength(datatable.getiDisplayLength());
		detPojo.show();
		detPojo.setIdioma(idioma);
		
		//3.- Obtenemos la información de salida de la base de datos:
		List<DetalleOutPOJO> listaPOJOS = execConsulta(detPojo);
		//4.-Realizamos la adaptación y la transferencia de esta información en formato JSON
		if(listaPOJOS!=null && listaPOJOS.size()>0){
			//Obtención del numero de resultados de la consulta procedente del DOM
			int nresultados =  Integer.parseInt(datatable.getOthers().get("nrespuestas")); 
			return new JqDataTableSearchResultDTO(nresultados, listaPOJOS, Integer.toString(datatable.getsEcho()));
		}else{
			return new JqDataTableSearchResultDTO(new Integer(0), new ArrayList<DetalleOutPOJO>(),Integer.toString(datatable.getsEcho()));
		}
	}
	/**
	 * Realiza la conexión con la base de datos.
	 * @param pojoIn DetalleInPOJO
	 * @return listaPojos List<DetalleOutPOJO>
	 * @throws Exception
	 */
	private List<DetalleOutPOJO> execConsulta(DetalleInPOJO pojoIn) throws Exception{
		//1->Insertamos el POJO dentro de un BEAN
		DetalleBean bin = new DetalleBean();
		bin.setPojoInDetalle(pojoIn);
		//2->Recuperamos la información de la base de datos
		//Bean de salida:
		DetalleBean binSalida = new DetalleBean();
		try{
			//3->Accedemos a la base de datos y obtenemos la información
			binSalida = ImplDetalle.getVistaDetalle(bin);
			//Extraemos los POJOS de salida
			List<DetalleOutPOJO> listaPojos =  binSalida.getPojoOutDetalle();
			return listaPojos;
		}catch(Exception e){
			throw e;
		}
	}
	
	
	
}//End class