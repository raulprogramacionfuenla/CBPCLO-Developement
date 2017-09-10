package com.comp;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.TreeMap;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 * Clase libreria para la gestión de archivos excel
 * para AbsisCloud con Apache Poi
 * @author alvaroperis
 */
public class CBPExlMaker {
	
	private int DINA4 = 10;
	
	//Elementos principales del fichero
	public HSSFWorkbook wb = new HSSFWorkbook(); //Libro Excel
	public HSSFSheet sheet = null; //Hoja de excel
	public HSSFRow row = null; //Fila de excel
	public HSSFCell cell = null; //Celda de excel
	public int rowC = 0; //Puntero de celdas 
	
	/**
	 * Constructor de la clase
	 */
	public CBPExlMaker(){}
	
	/**
	* Crea una hoja de excel
	* @param name String Nombre de la hoja
	*/
	public void makeSheet(String name){
		this.sheet = this.wb.createSheet(name);
	}
	
	/**
	 * Genera una cabecera de informes
	 * @param appName Nombre de la aplicación siglas
	 * @param subtitle Nombre de la aplicación completo
	 * @param title Título del reporte
	 */
	public void makeHeader(String appName, String subtitle, String titulo){
		row = this.sheet.createRow(this.rowC);
		cell = row.createCell(0);
		HSSFCell celdaSub = row.createCell(1);
		
		
		cell.setCellValue((String)appName);
		celdaSub.setCellValue((String)subtitle);
		
		CellStyle estiloAppName = this.wb.createCellStyle();
		estiloAppName.setFillForegroundColor(HSSFColor.WHITE.index);
		estiloAppName.setFillPattern(CellStyle.SOLID_FOREGROUND);
		
		HSSFFont fuenteCabecera = this.wb.createFont();
		fuenteCabecera.setBold(true);
		fuenteCabecera.setFontHeight((short) (7.5*35));
		fuenteCabecera.setFontName("Calibri");
        estiloAppName.setFont(fuenteCabecera);
        
		//Anadimos los estilos de celda
		cell.setCellStyle(estiloAppName);

		this.rowC++;
		//Títular de la hoja
		CellStyle estiloCeldaTitle = this.wb.createCellStyle();
		estiloCeldaTitle.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		estiloCeldaTitle.setFillPattern(CellStyle.SOLID_FOREGROUND);
	    HSSFFont fuenteCeldaTitle = this.wb.createFont();
	    fuenteCeldaTitle.setBold(true);
	    fuenteCeldaTitle.setColor(HSSFColor.WHITE.index);
	    fuenteCeldaTitle.setFontHeight((short) (7.5*40));
	    fuenteCeldaTitle.setFontName("Calibri");
	    estiloCeldaTitle.setFont(fuenteCeldaTitle);
	    
	    row = this.sheet.createRow(this.rowC);
		for (int i = 0; i < DINA4; i++ ){
			cell = row.createCell(i);
			if(i == 0) cell.setCellValue((String)titulo);
			
		    cell.setCellStyle(estiloCeldaTitle);
		}
		this.rowC++; //Incrementamos el contador de fila
	}//End make header
	
	/**
	 * Realiza un titulo de nivel 2
	 * @param titulo
	 * @param subtitle
	 */
	public void makeHeader2(String titulo, String subtitle){
		this.makeLine(DINA4);
		
		CellStyle estiloCeldaTitle = this.wb.createCellStyle();
		estiloCeldaTitle.setFillForegroundColor(HSSFColor.GREY_50_PERCENT.index);
		estiloCeldaTitle.setFillPattern(CellStyle.SOLID_FOREGROUND);
	    HSSFFont fuenteCeldaTitle = this.wb.createFont();
	    fuenteCeldaTitle.setBold(true);
	    fuenteCeldaTitle.setColor(HSSFColor.WHITE.index);
	    fuenteCeldaTitle.setFontHeight((short) (7.5*31));
	    fuenteCeldaTitle.setFontName("Calibri");
	    estiloCeldaTitle.setFont(fuenteCeldaTitle);
	    
	    CellStyle estiloCeldaCont = this.wb.createCellStyle();
		estiloCeldaCont.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
		estiloCeldaCont.setFillPattern(CellStyle.SOLID_FOREGROUND);
	    HSSFFont fuenteCeldaCont = this.wb.createFont();
	    fuenteCeldaCont.setBold(true);
	    fuenteCeldaCont.setColor(HSSFColor.BLACK.index);
	    fuenteCeldaCont.setFontHeight((short) (7.5*31));
	    fuenteCeldaCont.setFontName("Calibri");
	    estiloCeldaCont.setFont(fuenteCeldaCont);
	    
	    this.rowC++;
		row = this.sheet.createRow(this.rowC++);
		cell = row.createCell(0);
		
		titulo = "☰ " + titulo; 
		cell.setCellValue((String)titulo);
		cell.setCellStyle(estiloCeldaTitle);
		
		cell = row.createCell(1);
		cell.setCellStyle(estiloCeldaTitle);
		cell = row.createCell(2);
		cell.setCellStyle(estiloCeldaTitle);
		
		for(int i=3 ; i< DINA4; i++){
			HSSFCell celdaSub = row.createCell(i);
			if (i==3) celdaSub.setCellValue((String)subtitle);
			celdaSub.setCellStyle(estiloCeldaCont);
		}
		
		
	}//End make header
	
	
	/**
	 * Crea una tabla informativa compuesta por dos columnas.
	 * La key del TreeMap marca el título y el value la variables
	 * de texto a mostrar.
	 * @param info TreeMap<String,String>
	 */
	public void makeTableBox(TreeMap<String,String> info){
		//Estilos
		CellStyle estiloCeldaTitulo = this.wb.createCellStyle();
		estiloCeldaTitulo.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
		estiloCeldaTitulo.setFillPattern(CellStyle.SOLID_FOREGROUND);
	    HSSFFont fuenteCeldaTitle = this.wb.createFont();
	    fuenteCeldaTitle.setBold(true);
	    fuenteCeldaTitle.setFontHeight((short) (7.5*30));
	    fuenteCeldaTitle.setFontName("Calibri");
	    estiloCeldaTitulo.setFont(fuenteCeldaTitle);
	    
		this.rowC++;
		row = this.sheet.createRow(this.rowC);
		for (Map.Entry<String,String> entry : info.entrySet()) {
			row = this.sheet.createRow(this.rowC++);
			HSSFCell CeldaTitulo = row.createCell(0);
			String key = entry.getKey();
			CeldaTitulo.setCellValue((String)key);
			CeldaTitulo.setCellStyle(estiloCeldaTitulo);
			CeldaTitulo = row.createCell(1);
			CeldaTitulo.setCellStyle(estiloCeldaTitulo);
			
			HSSFCell CeldaValor = row.createCell(2);
	        String value = entry.getValue();
			CeldaValor.setCellValue((String)value);
	   }//End for
	}//End makeTableBox
	
	/**
	 * Realiza un footer para el documento
	 * @param AppName String
	 */
	public void makeFooter(String AppName){
	    CellStyle estiloCeldaCont = this.wb.createCellStyle();
		estiloCeldaCont.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		estiloCeldaCont.setFillPattern(CellStyle.SOLID_FOREGROUND);
	    HSSFFont fuenteCeldaCont = this.wb.createFont();
	    fuenteCeldaCont.setBold(true);
	    fuenteCeldaCont.setColor(HSSFColor.BLACK.index);
	    fuenteCeldaCont.setFontHeight((short) (7.5*27));
	    fuenteCeldaCont.setFontName("Calibri");
	    estiloCeldaCont.setFont(fuenteCeldaCont);
	   
	    //Obtención de la fecha
	    DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
	    Date date = new Date();
	    
		row = this.sheet.createRow(this.rowC++);
		for(int i=0 ; i< DINA4; i++){
			HSSFCell celdaSub = row.createCell(i);
			if (i==0) celdaSub.setCellValue((String)AppName);
			if(i == DINA4-2)  celdaSub.setCellValue((String)dateFormat.format(date).toString());
			celdaSub.setCellStyle(estiloCeldaCont);
		}	
	}
	
	
	/**
	 Crea una fila de información a partir de los datos presentes en
	 * un toString() "generado automáticamente con Eclipse" de un DTO.
	 * Eclipse > Source > Generate toString()
	 * data -> El toString() de un DTO
	 * width -> Array de enteros con el número de celdas que ha de ocupar cada campo
	 * color -> Pone color a la fila
	 * @param data string
	 * @param width int[]
	 * @param color boolean 
	 */
	public void makeDTOTableRow(String data, int[] width, boolean color){
		//Estilos
		 CellStyle estiloCeldaCont = this.wb.createCellStyle();
		 estiloCeldaCont.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
		 estiloCeldaCont.setFillPattern(CellStyle.SOLID_FOREGROUND);
		 HSSFFont fuenteCeldaCont = this.wb.createFont();
		 fuenteCeldaCont.setBold(false);
		 fuenteCeldaCont.setColor(HSSFColor.BLACK.index);
		 fuenteCeldaCont.setFontName("Calibri");
		 estiloCeldaCont.setFont(fuenteCeldaCont);
		 
		 CellStyle estiloNada = this.wb.createCellStyle();
		 estiloNada.setFillForegroundColor(HSSFColor.WHITE.index);
		 estiloNada.setFillPattern(CellStyle.SOLID_FOREGROUND);
		 estiloNada.setFont(fuenteCeldaCont);
		 
		 CellStyle estiloNadaBarra = this.wb.createCellStyle();
		 estiloNadaBarra.setFillForegroundColor(HSSFColor.WHITE.index);
		 estiloNadaBarra.setFillPattern(CellStyle.SOLID_FOREGROUND);
		 estiloNadaBarra.setFont(fuenteCeldaCont);
		 estiloNadaBarra.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		 
		 CellStyle estiloCeldaContBarra = this.wb.createCellStyle();
		 estiloCeldaContBarra.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
		 estiloCeldaContBarra.setFillPattern(CellStyle.SOLID_FOREGROUND);
		 estiloCeldaContBarra.setFont(fuenteCeldaCont);
		 estiloCeldaContBarra.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		 
		 
		 
		//Obtenemos los valores del string de entrada.
		ArrayList<String> valores = new ArrayList<String>();
		String[] ret = data.split(",");
		for(String str: ret){
			String[] valor = str.split("=");
			valores.add(valor[1].replaceAll("]",""));
		}
		
		//Añadimos estos valores al excel:
		this.row = this.sheet.createRow(this.rowC);
		int inco = 0, c = 0;
		for (int i = 0; i < valores.size(); i++){
			//Printamos la anchura de columnas
			boolean first = true;
			for( c = inco ; c < inco + width[i] ; c++){
				HSSFCell celdaSub = row.createCell(c);
				if(first) celdaSub.setCellValue((String) valores.get(i));
				
				celdaSub.setCellStyle(estiloCeldaCont);
				if(color) celdaSub.setCellStyle(estiloNada); 
				
				if(first && !color) celdaSub.setCellStyle(estiloCeldaContBarra);
				if(first && color) celdaSub.setCellStyle(estiloNadaBarra);
				
				first = false;
			}
			//this.sheet.addMergedRegion(new CellRangeAddress(this.rowC,this.rowC,inco, inco + width[i]));
			
			inco = c;
			first = true;
			
		}
		//Incrementamos el contador de fila
		this.rowC++;	
		
	}//End makeDTOTableRow
	
	/**
	 * Genera la cabecera de una tabla
	 * @param valores String[]
	 * @param width int[]
	 */
	public void makeDTOTableHeader(String[] valores, int[] width){
		//Estilos
		 CellStyle estiloCeldaCont = this.wb.createCellStyle();
		 estiloCeldaCont.setFillForegroundColor(HSSFColor.AQUA.index);
		 estiloCeldaCont.setFillPattern(CellStyle.SOLID_FOREGROUND);
		 HSSFFont fuenteCeldaCont = this.wb.createFont();
		 fuenteCeldaCont.setBold(false);
		 fuenteCeldaCont.setColor(HSSFColor.WHITE.index);
		 fuenteCeldaCont.setFontName("Calibri");
		 estiloCeldaCont.setFont(fuenteCeldaCont);
		 
		 CellStyle estiloCeldaContBarra = this.wb.createCellStyle();
		 estiloCeldaContBarra.setFillForegroundColor(HSSFColor.AQUA.index);
		 estiloCeldaContBarra.setFillPattern(CellStyle.SOLID_FOREGROUND);
		 estiloCeldaContBarra.setFont(fuenteCeldaCont);
		 estiloCeldaContBarra.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		 
		//Añadimos estos valores al excel:
		this.row = this.sheet.createRow(this.rowC);
		int inco = 0, c = 0;
		for (int i = 0; i < valores.length; i++){
			//Printamos la anchura de columnas
			boolean first = true;
			for( c = inco ; c < inco + width[i] ; c++){
				HSSFCell celdaSub = row.createCell(c);
				if(first) celdaSub.setCellValue((String) valores[i]);
				
				celdaSub.setCellStyle(estiloCeldaCont);
				if(first) celdaSub.setCellStyle(estiloCeldaContBarra);
				
				first = false;
			}
			inco = c;
			first = true;
		}
		//Incrementamos el contador de fila
		this.rowC++;	
	}//End makeDTOTableRow
	
	
	
	
	//Utiles =====================================
	/**
	 * Printa una línea de width columnas
	 * @param width int
	 */
	public void makeLine(int width){
		//Estilos
		CellStyle estiloCelda = this.wb.createCellStyle();
		estiloCelda.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		row = this.sheet.createRow(this.rowC);
		for(int i=0 ; i < width ; i++){
			HSSFCell Celda = row.createCell(i);
			Celda.setCellStyle(estiloCelda);
		}//End for
	}//End makeline
	
	/**
	 * Realiza val saltos de fila
	 * @param val int
	 */
	public void makeBranch(int val){
		this.rowC += val;
	}
	
	/**
	 * Retorna el libro de Excel editado.
	 * @return wb HSSFWorkbook
	 */
	public HSSFWorkbook getWorkBook(){
		return this.wb;
	}//End HSSFWorkbook
	
	/**
	 * Función de debug
	 * @param c
	 * @param i
	 * @param width
	 */
	private void printC(int c, int i, int width){
		System.out.println("...........................");
		System.out.println("c: " + c);
		System.out.println("i: " + i);
		System.out.println("width: " + width);
		System.out.println("...........................\n\n");
	}
	
	
}//End class

