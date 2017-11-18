var tfmobile_theme_hashTable = new Array();

function renderTFMobileThemes(){
    
    if ($("[data-theme]").length>0){
       // alert("Se han detectado elementos con el metatag data-theme. Revisa la documentacion dado que esta es una practica de desarrollo incorrecta.");
	$("[data-theme]").each(function(){
	    $(this).attr("data-theme","");
	});
    }

    if ($("[data-split-theme]").length>0){
    	// alert("Se han detectado elementos con el metatag data-split-theme. Revisa la documentacion dado que esta es una practica de desarrollo incorrecta.");
    	$("[data-split-theme]").each(function(){
    		$(this).attr("data-split-theme","");
    	});
    }

    for (var p in tfmobile_theme_hashTable) {
	if (tfmobile_theme_hashTable.hasOwnProperty(p)) {
            $(p).attr("data-theme",tfmobile_theme_hashTable[p]);
        }
    }
}


function addMapping(selector, theme){
    tfmobile_theme_hashTable[selector] = theme;
}



/*
Este método nos inicializa el mapeo entre temas del TFMobile.
*/

function inicializeTFMobileThemes(){
	addMapping("button", "a");
	addMapping("select", "d");
	addMapping("input", "e");
	addMapping("input[type=radio]", "d");
	addMapping("input[type=checkbox]", "d");
	addMapping("textarea", "e");
	addMapping("[data-role=controlgroup]", "d");	
	addMapping("[data-role=button]", "a");
	addMapping("[data-tfmobile=boton-destacado]", "b");
	addMapping("[data-role=listview]", "d");	
	addMapping("[data-role=list-divider]", "c");
	addMapping("[data-split-theme]", "d");
	addMapping(".list-expanded", "e");
	addMapping("[data-role=collapsible-set]", "j");
	addMapping("[data-icon=menu]", "b");
	addMapping("[data-role=panel] *", "k");
	addMapping("[data-role=navbar] *", "l");
	addMapping("fieldset.ui-sel-cat", "j");
	addMapping("fieldset.ui-sel-cat button", "j");
}


