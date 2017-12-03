jQuery(document).ready(function($) {

    function loadValue2Form(pJ){
        var ele = $(pJ.valueId).html();
         //Combo boxes
  	    if(pJ.type == "select"){
  	          $(pJ.target +" > option").each(function() {
  	        	  if(ele == $(this).html()){
  	        		     $(this).attr('selected','selected');}
  	             });//End eac
         }else if(pJ.type == "input"){
              $(pJ.target).val(pJ.value);
         }else if(pJ.type == "check"){
              
         }else if(pJ.type == "radio"){

         }
      }//End load values


  	  //Cargamos los valores de cada elemento en los formularios
  	  loadValue({
  		  target:"#friscSelector",
  		  valueId:".SFRisc",
  		  type:"select"
  	  });

      loadValue({
  		  target:"#sclaseControl",
  		  valueId:".SClase",
  		  type:"input",
        value: "pepe"
  	  });


  	  loadValue({
  		  target:"#stipoControl",
  		  valueId:".STipo",
  		  type:"select"
  	  });


});
