$(document).ready(function(){
	//----------------------------------
	//LaCaixa / Everis 2017 ÁlvaroPeris
	//----------------------------------
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
		msgBase:{base:'msg'}, //Se trata de información base que se transmite al servidor. A este se le añade información.
		stringMsg:'',
		numPags: 0,
		stackC: 0, //Cuenta el numero de elementos que tenemos por encima de la pila
		canvas: '', //Donde se cargan los elementos
		debug: true,
		state: 'init', //Controla el estado del pasador de paginas 
		inputMSG:{},
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
			 
			 this.inputMSG = entrada.msgBase;
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
					this.finall();
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
		
		finall: function (){
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
					return this.appendSP("0",this.paso);
				break;
			
				case 'final':
					var st = this.numElementos - this.paso;
				break;

				case 'pass':
					if(this.stackC <= (this.numElementos - this.paso)){
						var sc = this.stackC+ 1;
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
			console.log(this.componMensaje(this.state));
			console.log(":::::::::::::::::::::::::::::::::::::\n\n");
		},
		//Obtiene información de la base de datos.
		//DirectoryPath representa la página donde se gestiona la petición
		ajaxCom: function(elemento){			
			//Versión POST de alta tipificación orientado a JAVA
			var formulario = {
					estado:String(this.inputMSG.estado) == "" ? "null":String(this.inputMSG.estado),
					aplicacion:String(this.inputMSG.aplicacion) == "" ? "null": String(this.inputMSG.aplicacion),
					version:String(this.inputMSG.version)== "" ? "null":String(this.inputMSG.version),
					componente:String(this.inputMSG.componente)== "" ? "null":String(this.inputMSG.componente),
					proveedor:String(this.inputMSG.prov)== "--" ? "null":String(this.inputMSG.prov),
					TipoConsulta:String(this.inputMSG.componente)== "" ? "null":String(this.inputMSG.tipoConsulta),				
					Resultado:String(this.inputMSG.resultado)== "" ? "null":String(this.inputMSG.resultado),
					PeriodoInicial:String(this.inputMSG.periodoInicial)== "" ? "null":String(this.inputMSG.periodoInicial),
					PeriodoFinal:String(this.inputMSG.periodoFinal)== "" ? "null":String(this.inputMSG.periodoFinal),
					bloqueados:String(this.inputMSG.bloqueados)== 0 ? "null":String(this.inputMSG.bloqueados),
					susceptibles:String(this.inputMSG.susceptibles)== 0 ? "null":String(this.inputMSG.susceptibles),
					stack:this.stackC,
					offset:this.paso
				};
			console.log("JSON: " + JSON.stringify(formulario));
			$.post(this.directorio,formulario,function(contenido){
				$('tbody').html(contenido);
			});

		},//End refrescador
	};//End paginador

	/*============= CONTROL DE EVENTOS ==================*/
	//---------------------------------------------------
	//-------------------- INICIO -----------------------
	//---------------------------------------------------
	//Iniciamos el paginador
	//Tomamos el número de elementos que tiene la página
	var numElementos = $('.leftElement b').text();
	
	 /*EJEMPLO DE USO DEL PAGINADOR*/ 
	//Recuperamos la cookie que contiene la información del formulario
	var formularioSeleccionado = new cookieJSONString("consultaHostPre");
	Paginador.start({
		paso: 10, //Marca el número de elementos que se mostrarán
		numElementos: numElementos, //Marca el número de elementos totales que contiene la peticion
		directorio: '/TablasHost/hello', //Determina la página a donde se realizarán las peticiones de información
		canvas: 'tbody', //Determina el punto donde se mostrará la información (.clase #ide) que se ha obtenido den el DOM web
		msgBase: formularioSeleccionado.getJSON(),//Cookie de la que leemos las preferencias de busqueda.  
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
        		Paginador.finall();
        	break;
    	}//End click
	});//End función de click
	
	

});//End jQuery