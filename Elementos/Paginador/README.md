#Paginador


###Ejemplo de uso:

```js
//-------------------- INICIO -----------------------
	//Iniciamos el paginador
	Paginador.start({
		paso: 10, //Marca el número de elementos que se mostrarán
		numElementos: numElementos, //Marca el número de elementos totales que contiene la peticion
		directorio: '/TablaPorAplicacion/tablasAjax', //Determina la página a donde se realizarán las peticiones de información
		canvas: '.table-bordered tbody', //Determina el punto donde se mostrará la información (.clase #ide) que se ha obtenido den el DOM web
		msgBase: formularioSeleccionado.getJSON(), 
		debug: false //Muestra información de depuracion por la consola javaScript
	});

	$('.btt').click(function(event) {
		//Tomamos el valor del indentificador
		var id = $(this).attr('id');
		switch(id) {
    		case 'inicio':
        		Paginador.inicio();
        	break;
   			case 'anterior':
   				Paginador.retornaPag();
        	break;
        	case 'siguiente':
        		Paginador.avanzaPag();
        	break;
        	case 'final':
        		Paginador.final();
        	break;
    	}//End click
	});//End función de click
```

