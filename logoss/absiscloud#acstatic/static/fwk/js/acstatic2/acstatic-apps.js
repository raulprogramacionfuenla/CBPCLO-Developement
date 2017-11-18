/* document ready */
$(document).ready(function() {
	initButton();
	initSlider();
	/*$("#interes").change(function(){
		alert("asd");
	});*/
	
});

function initSlider(){
	
	$("input[type=slider]").each(function(){

		var mySlider = $(this);
		var initialValue = $(this).val();
		var value_from = mySlider.attr("data-min");
		var value_to = mySlider.attr("data-max");
		var value_step = mySlider.attr("data-increment");
		var value_post_label = mySlider.attr("data-post-label");
		var value_of_id_input = mySlider.attr("data-input-id");
		var value_format = mySlider.attr("data-format");
		var precision = precision_from_float(value_step);
		
		mySlider.slider({
			  from: parseFloat(value_from),
			  to: parseFloat(value_to) ,
			  step: parseFloat(value_step) ,
			  scale: [mySlider.attr("data-min-label"), '|','|', '|' , '|', '|','|', '|', mySlider.attr("data-max-label")],                
			  dimension: '&nbsp;'+value_post_label,
			  round: precision,
			  format: { format: value_format, locale: 'es' },
			  onstatechange  : function(){
				  
				  if (value_of_id_input!=null && value_of_id_input!=""){
					  
					  var formattedNum = $.formatNumber(mySlider.val(),{format:value_format, locale:"es"});
					  
					  $("#"+value_of_id_input).val(formattedNum);	
					  $("#"+value_of_id_input).parent().parent().removeClass("error");
					  $("#"+value_of_id_input).parent().parent().find(".remove-me").remove();
					  $("#"+value_of_id_input).trigger('change');
				  }
			  }
		});

		var theNumber = initialValue;
		var floatNum = parseFloat(theNumber);
		if (floatNum < parseFloat(value_from) || floatNum > parseFloat(value_to)) {
			mySlider.slider( "value", theNumber );
			var formattedNum = $.formatNumber(floatNum,{format:value_format, locale:"es"});
			$("#"+value_of_id_input).val(formattedNum);
			$("#"+value_of_id_input).parent().parent().find(".jslider-value span").html(formattedNum);
			process_error($("#"+value_of_id_input), mySlider, floatNum < parseFloat(value_from));
		} else {
			mySlider.slider( "value", floatNum );
			mySlider.val(floatNum);	
		}
		
		
		$("#"+value_of_id_input).on("blur", function(){
			var theNumber = from_spanish_to_english($(this).val());
	
			if (!isNaN(theNumber)) {
				
				var floatNum = parseFloat(theNumber);
				if (floatNum < parseFloat(value_from) || floatNum > parseFloat(value_to)) {
					mySlider.slider( "value", theNumber );
					var formattedNum = $.formatNumber(theNumber,{format:value_format, locale:"es"});
					$(this).val(formattedNum);
					$(this).parent().parent().find(".jslider-value span").html(formattedNum);
					process_error($(this), mySlider, floatNum < parseFloat(value_from));
				} else {
					mySlider.slider( "value", theNumber );
					mySlider.val(theNumber);	
				}
			} else {
				// TODO: the number is NaN. What do we do?
				process_error($(this), mySlider, false, true);
			}
		});
		
		
		
	});
	
}

function initButton() {
	

	$('input[type="text"]').each(function() {
		$(this).removeClass("contextual-help-text");
		if ($(this).val() == "" && $(this).attr("default") != null){
			$(this).val( $(this).attr("default") ); 
			$(this).addClass("contextual-help-text");
		}	
		if ($(this).attr("default") != null && $(this).attr("default") == $(this).val()){
			$(this).addClass("contextual-help-text");
		}	
	});

	
	$('input[type="text"]').focus(function() {
		if ($(this).attr("default") != null && $(this).attr("default") == $(this).val()){
			$(this).val( "" ); 
			$(this).removeClass("contextual-help-text");
		}		 
	});
	
	$('input[type="text"]').blur(function() {
		if ($(this).attr("default") != null && $(this).val() == ""){
			$(this).val( $(this).attr("default") ); 
			$(this).removeClass("contextual-help-text").addClass("contextual-help-text");
		}		 
	});
	
}

function precision_from_float (source) {
	var groups = source.split(".");
	if (groups.length < 2) return 0;
	else return groups[1].length;
}

function process_error (input ,slider, isUnder, isNaN) {
	$(input).parent().parent().addClass("error");
	var errorLabel = $('<div class="help-block" style="position:absolute;top:18px"></div>');
	if (isUnder)
		errorLabel.html($(slider).attr("data-under-error"));
	else 
		errorLabel.html($(slider).attr("data-over-error"));
	var container = $('<div class="remove-me" style="position:relative;height:12px;"></div>')
	container.append(errorLabel);
	if (!isNaN)
		$(input).parent().parent().append(container);
}

function from_spanish_to_english (number) {
	return number.split(".").join("").split(",").join(".");
}
