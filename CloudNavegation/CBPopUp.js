  /**
  *Plugin PopUp o modal que se carga con información del servidor.
  *Álvaro Peris 2018
  *
  * Ejemplo:
  *
  **/
  (function ( $ ) {
    //PRIVATE Función de inicialización.
    function init(){
      //Añadimos el html
      var html = '<div class="CBPopWindow">'
        +'<div class="CBPPopContet">'
          +'<!--Aqui dentro el contenido del popUp-->'
        +'</div>'
      +'</div>';
      $('html').append(html);

      //Añadimos los estilos. Aqui se modifica el frontend
      $('.CBPopWindow').css({
        "width": "100%",
        "height": "100vh",
        "background": "rgba(0,0,0,0.5)",
        "position": "fixed",
        "z-index": "300",
        "top":"0px",
        "left": "0px",
        "display": "none"
      });

      $('.CBPPopContet').css({
        "width": "60%",
        "height": "65vh",
        "background": "white",
        "border-radius": "5px",
        "box-shadow": "0px 0px 30px rgba(0,0,0,0.5)",
        "padding": "20px",
        "margin": "0 auto",
        "text-align": "left",
        "margin-top": "30px",
        "overflow-y": "scroll"
      });
    }

    function attachLoad(){
      $(".CBPldMessage").css({
        "position": "relative",
        "left": "50%",
        "top": "50%",
        "-webkit-transform": "translate(-50%, -50%)",
        "-ms-transform": "translate(-50%, -50%)",
        "transform": "translate(-50%, -50%)",
        "text-align": "center"
      });
    }

    //PRIVATE Esconde el popUp
    function hidePop(){
      $('.CBPPopContet').slideUp(function(){
          $('.CBPopWindow').fadeOut('slow');
      });
    }

    //PRIVATE Muestra el popUp
    function showPop(loadMsg){
      $('.CBPopWindow').show();
      $('.CBPPopContet').hide().slideDown('400', function() {
        //Mostramos el cargando ...
        if(loadMsg != null && loadMsg != '' && loadMsg != false){
          $('.CBPPopContet').html('<div class="CBPldMessage">'+loadMsg+'</div>');
          attachLoad();
        }

      });
    }

    //PRIVATE Transmisión y recepción de información del servidor
    function TxRxPrint(controllerPath,TxData,loadMsg){
      showPop(loadMsg);
      $.post(controllerPath, {param1: 'value1'}, function(data, textStatus, xhr) {
        //Cargamos la información en el pop Up
        $('.CBPPopContet').html(data);
      });
    }
    $.fn.CBPopUp= function() {
        init();
        //**** EVENTOS *****
        //1.- Evento para cerrar el modal, cuando se clicke fuera.
        $(document).on('click', '.CBPopWindow', function(event) {
          event.preventDefault();
          if($(event.target).attr('class') == 'CBPopWindow'){
            hidePop();
          }
        });
        return {
          //Funciones publicas
          /*
          *Muestra el popUp
          */
          "show":function(){
            showPop(false);
          },
          /*
          *Esconde el popUp
          */
          "hide":function(){
            hidePop();
          },
          /**
          *Muestra el contenido del pop up con información procedente
          *del servidor.
          *@param jsPref JSON de preferencias del popUp
          *j@param controllerPath -> Path del controlador
          *j@param TxData -> JSON con los campos que se van a transmitir al servidor.
          **/
          "showContentFromServer":function(jsPref){
            TxRxPrint(jsPref.controllerPath,jsPref.TxData,jsPref.loadMsg);
          },
          /**
          *Carga información desde un div. Después se ha de mostrar
          *@param sourceDiv Id o clase del Div desde dode sa va a cargar la informacióm
          **/
          "loadContentFromDiv":function(sourceDiv){
             $(sourceDiv).hide();
             var html = $(sourceDiv).html();
             $('.CBPPopContet').html(html);
          }
        };
    };//End plugin
  }( jQuery ));
