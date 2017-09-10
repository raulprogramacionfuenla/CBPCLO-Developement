package com.comp;

import java.awt.List;
import java.util.ArrayList;
import java.util.TreeMap;

public class ExcelPrimero extends CBPExlMaker{
	public ExcelPrimero(){
		//Datos =========================
		TreeMap<String,String> info = new TreeMap<String,String>();
		info.put("Fecha de alta:", "12-12-2012");
		info.put("Tipo Componente:","PRG");
		info.put("Componente:", "ABCDEFGH");
		
		ejemploDTO persona = new ejemploDTO();
		persona.nombre = "Pedro";
		persona.apellido = "Perez";
		persona.edad = 80;
		persona.email = "PedroPerez@domain.com";
		
		ArrayList<ejemploDTO> lista = new ArrayList<ejemploDTO>();
		lista.add(persona);
		lista.add(persona);
		lista.add(persona);
		lista.add(persona);
		lista.add(persona);
		lista.add(persona);
		lista.add(persona);
		lista.add(persona);
		lista.add(persona);
		
		
		//Maquetación =====================
		this.makeSheet("Primera Hoja");
		this.makeHeader("CBPCLO", "Control Best Practices", "Informa de ejemplo");
		this.makeTableBox(info);
		
		this.makeHeader2("Tipo de control", "Descripción del incumplimiento");
		//Tabla
		this.makeDTOTableHeader(new String[] {"Nombre", "Apellido", "Edad", "Email"}, new int[]{1,4,2,3});
		int c = 0;
		for(ejemploDTO pers : lista ){
			boolean col = (c%2==0)? true:false;
			this.makeDTOTableRow(persona.toString(), new int[]{1,4,2,3}, col);
			c++;
		}
		
		this.makeHeader2("Segunda parte","Ley de transitoriedad");
		this.makeBranch(1);
		
		this.makeTableBox(info);
		
		this.makeBranch(1);
		
		this.makeHeader2("Tercera Parte", "Apartado tres");
		
		
		this.makeBranch(12);
		this.makeFooter("CBPCLO");
		
	}
}

