//----------------------------------
//Everis 2017 ÁlvaroPeris
//----------------------------------
// Se encarga de solucionar algunos problemas de navegación de pantalla
//a pantalla. El plug se adiere al elemento de trigger y se especifica la
//función que se quiere que se desarrolle
$(document).ready(function(){
	(function ($){
  		$.fn.CBPNavegation = function(pJ) {
        $(document).on('click', this, function(event) {
            event.preventDefault();
            history.back(pJ.pass);
        });
  		};//Fin del Pluguin
	}(jQuery));//End function container
});
