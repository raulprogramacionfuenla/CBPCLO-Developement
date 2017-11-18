//----------------------------------
//LaCaixa / Everis 2017 ÁlvaroPeris
//----------------------------------

$(document).ready(function(){
	/*============== PLUGIN PAGINADOR ===================*/
	//Creamos un objeto que realizará la persistencia de información en el cliente.
	// e irá realizando las consultas a la página que contiene la base de datos.
	//
	//Pag inicio -> muestra la página que se carga al principio
	//NumElementos -> marca el número total de elementos que se han encontrado
	//Paso marca -> cuantas paginas vamos mostrando en cada llamada
	/*
	*  El cliente pedirá X elementos a partir del elemento n al servidor 
	*			ajax
	*	cliente ----> servidor/page
	*	cliente <---- servidor/page
	*	   |
	*  -Mostramos la informacion-
	*/
	var Paginador = {
		//Inicialización del cobnstructor
		pagActual: 1,
		paso: 0, 
		directorio: '',
		numElementos: 0,
		numPags: 0,
		stackC: 0, //Cuenta el numero de elementos que tenemos por encima de la pila
		canvas: '', //Donde se cargan los elementos
		debug: false,
		state: 'init', //Controla el estado del pasador de paginas 
		//-----> Public functions
		//Función constructora o de inicio
		start: function(entrada){
			 this.paso = entrada.paso;
			 this.numElementos = this.RoundNumElement(entrada.numElementos);
			 this.stackC = this.paso; 
			 this.numPags = this.numElementos/this.paso;
			 this.canvas = entrada.canvas;
			 this.directorio = entrada.directorio;

			 this.debug = entrada.debug;

			 //Printamos el indice de páginas Ej: 1/10
			 this.printIndex();
		},

		avanzaPag: function(){
			if(this.pagActual < this.numPags){
				this.pagActual++;
				this.printIndex();
				this.state = 'pass';
				//->Actualizamos el stack
				this.stackC += this.paso;
				
				//Cambiamos de estado
				if(this.stackC == this.numElementos - this.paso){
					this.final();
				}//End 

				//Transmitimos la información al servidor
				this.ajaxCom();

				if(this.debug) this.DebugInfo();
			}//End if
		},

		retornaPag: function (){
			if(this.pagActual > 1){
				this.pagActual--;
				this.printIndex();
				this.state = 'pass';
				//->Actualizamos el stack de filas
				this.stackC -= this.paso;
				
				//Cambiamos de estado
				if(this.pagActual == 1){
					this.state = 'init';
					this.inicio();
				}
				//Transmitimos la información al servidor
				this.ajaxCom();

				if(this.debug) this.DebugInfo();
			}//End if		
		},

		inicio: function (){
			this.pagActual = 1;
			this.stackC = 0;
			this.printIndex();
			this.state = 'init';

			//Transmitimos la información al servidor
			this.ajaxCom();
			if(this.debug) this.DebugInfo();
		},
		
		final: function (){
			this.pagActual = this.numPags;
			this.stackC = this.numElementos - this.paso;
			this.printIndex();
			this.state = 'final';

			//Transmitimos la información al servidor
			this.ajaxCom();
			if(this.debug) this.DebugInfo();
		},


		//Controla las peticiones al servidor
		componMensaje: function(status){
			switch (status){
				case 'init':
					return {stack: 0, num: this.paso};
				break;

				case 'final':
					var st = this.numElementos - this.paso;
					return {stack: st, num: this.paso};
				break;

				case 'pass':
					if(this.stackC <= (this.numElementos - this.paso)){
						return {stack: this.stackC + 1, num: this.paso}
					}
				break;
			}//End switch


		},

		//-----> "Private" functions
		printIndex: function(){
			$('.rightElement b:nth-child(1)').html(this.pagActual);
			$('.rightElement b:nth-child(2)').html(this.numPags);			
		},

		RoundNumElement: function(num){
			 return Math.ceil(num / this.paso)*this.paso;
		},

		DebugInfo: function (){
			console.log(":::::::::::::::::::::::::::::::::::::");
			console.log("-> Página pagActual: " + this.pagActual);
			console.log("-> Numero de pags: " + this.numPags);
			console.log("---------------------------------");
			console.log("-> Status: " + this.state);
			console.log("-> Stack Counter: " + this.stackC);
			console.log("-> Msg JSON Transmisión a backend: ");
			console.log(this.objToString(this.componMensaje(this.state)));
			console.log(":::::::::::::::::::::::::::::::::::::\n\n");
		},

		objToString: function (obj) {
    		var str = '';
		    for (var p in obj) {
		        if (obj.hasOwnProperty(p)) {
		            str += '\t' + p + ':' + obj[p] + '\n' ;
		        }
		    }

		    if(str != '') return str;
		    else return 'No se transmite nada';
		},

		//Obtiene información de la base de datos.
		//DirectoryPath representa la página donde se gestiona la petición
		ajaxCom: function(elemento){
			$.ajax({
            type: "GET",
        	url: this.directorio+'/'+this.objToString(this.componMensaje(this.state))),
        	dataType: 'text',
            success : function (contenido) {
            	//Borramos la información actual del DOM
                $('tbody').html('');
                //Cargamos la nueva información información en el DOM
                $('tbody').html(data);
            	}
			});//End AJAX
		}//End refrescador

	}//End paginador

	/*============= CONTROL DE EVENTOS ==================*/
	//Iniciamos el paginador
	//Tomamos el número de elementos que tiene la página
	var numElementos = $('.leftElement b').text();
	
	//-------------------- INICIO -----------------------
	//Iniciamos el paginador
	Paginador.start({
		paso: 10, //Marca el número de elementos que se mostrarán
		numElementos: numElementos, //Marca el número de elementos totales que contiene la peticion
		directorio: 'tablasAjax', //Determina la página a donde se realizarán las peticiones de información
		canvas: 'tbody', //Determina el punto donde se mostrará la información (.clase #ide) que se ha obtenido den el DOM web
		debug: true //Muestra información de depuracion por la consola javaScript
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

});//End jQuery