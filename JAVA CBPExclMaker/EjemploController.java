@SuppressWarnings("deprecation")
		@RequestMapping(value= "/HelloApi")
		public String CBPExlMaker(HttpServletResponse response) throws IOException {
			try{
				//1- Anadimos las cabeceras HTTP
				response.setContentType("application/vnd.ms-excel");
				response.setHeader("Content-Disposition","attachment; filename=Informe.xls");
				
				//2- Anadimos información al excel 
				ExcelPrimero docH = new ExcelPrimero(); //Clase que controla la maquetación del Excel
				HSSFWorkbook wb = new HSSFWorkbook();
				wb = docH.getWorkBook();
				
				//3- Transmitimos la informacion al cliente
				wb.write(response.getOutputStream());
				wb.close();
			}catch (Exception e){
				e.printStackTrace();
			}
			return null;
		}
