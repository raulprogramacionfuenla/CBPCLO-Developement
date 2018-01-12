
String dateInString = "12-01-2018";
String dateInnString = "01-10-2012";

LocalDate hoy = LocalDate.now();
System.out.println("> Hoy: " + hoy);
LocalDate Fbaja = LocalDate.parse(dateInString,DateTimeFormatter.ofPattern("dd-MM-yyyy"));
System.out.println("> Baja: " + Fbaja);
LocalDate FAlta = LocalDate.parse(dateInnString,DateTimeFormatter.ofPattern("dd-MM-yyyy"));
System.out.println("> Alta: " + FAlta);
if((hoy.compareTo(Fbaja) <= 0) && (hoy.compareTo(FAlta) > 0)){
System.out.println("Activo");
}
System.out.println(hoy.compareTo(Fbaja));
System.out.println(hoy.compareTo(FAlta));










// Prints "Hello, World" to the terminal window.
System.out.println("Hello, World");

SimpleDateFormat dateFormat = new SimpleDateFormat("dd-mm-yyyy");
Date todayDate = new Date();

System.out.println(todayDate);


String dateInString = "12-01-2018";
String dateInnString = "01-10-2012";

LocalDate hoy = LocalDate.now();
System.out.println("> Hoy: " + hoy);
LocalDate Fbaja = LocalDate.parse(dateInString,DateTimeFormatter.ofPattern("dd-MM-yyyy"));
System.out.println("> Baja: " + Fbaja);
LocalDate FAlta = LocalDate.parse(dateInnString,DateTimeFormatter.ofPattern("dd-MM-yyyy"));
System.out.println("> Alta: " + FAlta);
if((hoy.compareTo(Fbaja) <= 0) && (hoy.compareTo(FAlta) > 0)){
System.out.println("Activo");
}
System.out.println(hoy.compareTo(Fbaja));
System.out.println(hoy.compareTo(FAlta));
