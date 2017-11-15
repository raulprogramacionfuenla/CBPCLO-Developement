<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/WEB-INF/views/common/header.jsp" %>
<%@ include file="/WEB-INF/views/common/webHeader.jsp" %>
		
		<div class="span12">
		<div style="font-size:14px">
			<b><spring:message code="label.EntidadControles"/></b>
		</div>
		</div>
		<br><br> 
      <h3 class="content-title emphasized"><spring:message code="label.ContFiltros"/><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span></h3>
      <!-- Barra superior -->
      <div class="row-fluid">
        <div class="span2"><spring:message code="label.ContClaseControl"/> :</div><div class="span2"><select name="" id="ClaseControl">
        	<option selected="selected" value="" cbpName = "todos"><spring:message code="label.ContTodos"/></option>
        	<c:forEach items="${claseControl}" var="entry">
    				<option>${entry}</option>
			</c:forEach>
        	</select></div>
        <div class="span2"></div>
        <div class="span2"><spring:message code="label.ContTipodeControl"/> :</div><div class="span2"><select  name="" id="TipoControl"><option selected="selected" value="" cbpName = "todos"><spring:message code="label.ContTodos"/></option>
        <c:forEach items="${tipoControl}" var="entry">
    				<option>${entry}</option>
			</c:forEach>
        
        </select></div>
      </div>
  
      <div class="row-fluid">
        <div class="span2"><spring:message code="label.ContEstado"/> :</div><div class="span2"><select name="" id="Estado"><option value="" selected="selected" cbpName = "todos"><spring:message code="label.ContTodos"/></option><option value="" cbpName = "Activo"><spring:message code="label.ContActivo"/></option><option value="" cbpName = "Inactivo"><spring:message code="label.ContInactiu"/></option></select></div>
        <div class="span2"></div>
        <div class="span2"><spring:message code="label.ContFactorderiesgo"/> :</div><div class="span2"><select name="" id="FactorRiesgo">
          <option value="" selected="selected"><spring:message code="label.ContTodos"/></option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
          <option value="">5</option>
          <option value="">6</option>
          <option value="">7</option>
          <option value="">8</option>
          <option value="">9</option>
      
        </select></div>
        <div class="span2"><input id="ejec" type="submit" value = "<spring:message code="label.buscar"/>"></div>
      </div>
      <!-- Tabla -->
      <h3 class="content-title emphasized"><spring:message code="label.ContResultados"/><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span></h3>
      <div class="row-fluid">
        
        <!-- <div class="span11"></div>
        <div style="float:right; cursor:pointer;" class="span1" id="ExportarExcel" style="cursor:pointer;"><a id="btn-exportar" ><i class="icono-documento-excel"></i>  Tabla</a></div>
        </div> -->
       
        <div id="borded-table-title" class="form-group-inner">
      <div class='excel-tabla' align="right">
        <div style="float:right; cursor:pointer;"  id="excelControles" style="cursor:pointer;"><a id="btn-exportar" ><i class="icono-documento-excel"></i> Exportar</a></div>
        <span class="document-metadata"></span>
      </div>
    </div>
      
      <div class="row-fluid"> 

   <script type="text/javascript">
   $(document).ready(function(){
    $('.dataTables_processing').css({'margin-top':'-100vh' });
   });
   </script>
  <table id="tablaEntidadControles" class="table table-bordered server-side dataTable" align="center">  
    <thead>
      <tr role="row"> 
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" style="width:25%;" aria-label="Mercado"><spring:message code="label.ContControl"/></th>
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1"  aria-label="Mercado"><spring:message code="label.ContDescripcionIncumplimient"/></th>
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1"  aria-label="Mercado"><spring:message code="label.ContClasedeControl"/></th>
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" style="width:9%;" aria-label="Mercado"><spring:message code="label.ContTipodeControl"/></th>
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1"  aria-label="Mercado">FR</th>
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" aria-label="Mercado"><spring:message code="label.ContEstado"/></th>
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1" style="width:10%;"  aria-label="Mercado"><spring:message code="label.ContInicioVigencia"/></th>
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1"  aria-label="Mercado"><spring:message code="label.ContFechaBaja"/></th>
        <th class="sorting_disabled" tabindex="0" rowspan="1" colspan="1"  aria-label="Mercado"><spring:message code="label.ContAcciones"/></th>
      </tr>
    </thead>
    <tbody>
    </tbody>  
  </table>
  </div>
  
 <!-- Formularios de hidden -->
<form id="modificar" action="AdminModificar/" method="post" style="display:none;">
  <input name="tipoPeticion" type="text" id="formAccion" value="">
  <input name="id" type="text"  id="id_control" value="">
</form>
	  

<!-- Fin del contenido -->
<%@ include file="/WEB-INF/views/common/footer.jsp" %>

<!-- DEPENDENCIAS -->
<absiscloud:static type="script" source="application" path="/static/app/js/jquery.cookie.js"/>
<absiscloud:static type="script" source="application" path="/static/app/js/cookieJSONSting.js"/>
<absiscloud:static type="script" source="application" path="/static/app/js/CBPSubmitCookieForm.js"/>
<absiscloud:static type="script" source="application" path="/static/app/js/CBPSendCookie.js"/>
<absiscloud:static type="script" source="application" path="/static/app/js/AdminEntidadControles.js"/>

