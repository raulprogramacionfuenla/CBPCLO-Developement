//No cachear ajax para que IE no haga cosas extrañas
$.ajaxSetup({ cache: false });

$(document).ready(function() {
	
	$(document).on('click', ".useOverlay", function() {
		showPantallaLoader();
	});

	$(document).on('show.bs.modal', "#customModal", function() {
		removePantallaLoader();
	});
	
	//Evento para capturar y evitar el click del submit en los filtros	
	$(".filtro :input[type=submit]").click(function(e) { e.preventDefault(); });
	
	//Funcion para capturar y pasar por parametros (POST) los valores del filtro al controlador. Aplicable a todos los form de clase "filtro"
	$(document).on("click", ".filtro .filtroBtn", function() {
		var url = $(this).data("url");
		var filter = "#" + $(this).data("filter");
		var table = "#" + $(this).data("table");
		var datatable = $(table).dataTable();
		datatable.fnSettings().sAjaxSource = url + "?botonFiltroActivado=true&" + $(filter).serialize();
		datatable.sSortDir_0 = 0;
		datatable.iSortCol_0 = "asc";	
		datatable.fnDraw();
	});
	
	$(".excel-tabla > a").click(function(e) {
		e.preventDefault();
		var ticketid = $(this).attr('data-ticketid');
		if($("#" + $(this).attr("data-table")).dataTable().fnSettings()._iRecordsTotal >= $(this).attr('data-excel-limit')) {
			
			var message = Globalize.localize("export.excel.message.limite.descarga.js");		
			message = message.replace("#0#", $(this).attr('data-excel-limit'));
			mostrarNotificacion('missatge-alerta', message);
		} else {
			 var url = $(this).attr('href');
			 var form = $(document.createElement('form'));
		     $(form).attr("action", url);
		     $(form).attr("method", "POST");
		     var ticketidRec = $("<input/>").attr("type", "hidden").attr("name", "ticketid").val(ticketid);
		     $(form).append($(ticketidRec));
		     $(form).appendTo('body');
		     $(form).submit();
		}
     });
	
});

//INICIO*************************************************/
//Funciones que se refierne a las pantallas loader//
function showPantallaLoader(){
	if(!($("#overlay").length)) {
		var span = $('<span/>').attr({id:"textOverlay"});
		var imagen = $('<img/>', {src: '/static/app/images/loading.gif'}).addClass("loader");
		var divOverlay = $('<div/>', {id: 'overlay'}).append(span).append(imagen);
		$("body").append(divOverlay);
	}
}

function removePantallaLoader(){
	$("#overlay").remove();
}
//FIN **************************************************/

//INICIO*************************************************/
///Funciones que se refieren a las pantallas MODALS/
function createDivModal(){
	var newModalHere = $('<div/>', {id: 'newModalHere'});
	var customModal = $('<div/>', {id: 'customModal', tabindex: "-1", role: "dialog"}).addClass("modal fade").appendTo(newModalHere);
	var modalDialog = $('<div/>', {role: "document"}).addClass("modal-dialog modal-lg").appendTo(customModal);
	var modalContent = $('<div/>').addClass("modal-content").appendTo(modalDialog);
	$('<div/>').addClass("modal-body").appendTo(modalContent);
	$("body").append(newModalHere);
}
function createDivModal1(){
	var newModalHere = $('<div/>', {id: 'newModalHere'});
	var customModal = $('<div/>', {id: 'customModal1', tabindex: "-1", role: "dialog"}).addClass("modal fade").appendTo(newModalHere);
	var modalDialog = $('<div/>', {role: "document"}).addClass("modal-dialog1 modal-lg").appendTo(customModal);
	var modalContent = $('<div/>').addClass("modal-content1").appendTo(modalDialog);
	$('<div/>').addClass("modal-body").appendTo(modalContent);
	$("body").append(newModalHere);
}

function removeDivModal(){
	$("#newModalHere").remove();
}

function openNewModal(direccion,parametersInvocation){
	removeDivModal();
	$.ajax({
		beforeSend: function() {
			showPantallaLoader();
		},
		url: direccion,
		type: "POST",
		data:  parametersInvocation,
		success: function(data) {
			removePantallaLoader();
			createDivModal();
			$("#newModalHere .modal-body").html(data);
			$("#newModalHere .modal").modal('show');
			$("#customModal").on('hidden.bs.modal', function() {
				$("#customModal .modal-body > .content").remove();
				removeDivModal();
			});
		},
		fail: function() {
			removePantallaLoader();
		}
	});
}
//FIN **************************************************/

//Añadir un tr nuevo
function add_new_row_in_table(rowcontent,tabla){
    if ($("#"+tabla).length>0){
        if ($("#" + tabla + " > tbody").length==0) $("#"+tabla).append('<tbody />');
        (($("#"+tabla + " > tr").length>0))?$("#"+tabla).children('tbody:last').children('tr:last').append(rowcontent):$("#"+tabla).children('tbody:last').append(rowcontent);
    }
}

