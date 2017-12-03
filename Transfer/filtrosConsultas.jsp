<%@ page contentType="text/html; charset=UTF-8" %>
<%@ include file="/WEB-INF/views/common/includes.jsp" %>
	
<absiscloud:header i18n="Globalize" styles="v2">
	<absiscloud:static type="style" source="absiscloud" path="components/bootstrap/2.3.1/css/bootstrap.css"/>
	<absiscloud:static type="style" source="absiscloud" path="styles/ac.css"/>
    <!--  propios aplicacion --> 
   	<absiscloud:static type="style" source="application" path="/static/app/styles/filtrosConsultas.css"/>
</absiscloud:header>


<!-- Cabecera de la pantall -->
<%@ include file="/WEB-INF/views/common/webHeader.jsp" %>
<!-- Dependencias de js de la página -->
<!-- Plugins -->
<!-- Calendario -->
<absiscloud:static type="style" source="application" path="/static/app/styles/jquery.datepick.css"/> 
<absiscloud:static type="script" source="application" path="/static/app/js/jquery.plugin.min.js"/>
<absiscloud:static type="script" source="application" path="/static/app/js/jquery.datepick.js"/>
<absiscloud:static type="script" source="application" path="/static/app/js/jquery.datepick-es.js"/>

<script src="static/app/js/CBPControlBloqueo.js"></script>
<script src="static/app/js/CBPControlFechas.js"></script>
<!--<script src="static/app/js/CBPinfoTooltip.js"></script>-->

<script src="static/app/js/jquery.cookie.js"></script>
<script src="static/app/js/cookieJSONSting.js"></script>
<script src="static/app/js/uCBPalmacenaForm.js"></script>
<script src="static/app/js/formloader.js"></script>
<script src="static/app/js/filtroConsultasComun.js"></script>
<!-- script src="static/app/js/CBPBusquedaDinamica.js"></script> -->

<!-- Main -->
<!--  En este javascript se llaman los plugins que hay arriba -->

<!-- Seleccionamos entre el js de desarrollo o producción -->
<script src="static/app/js/filtrosConsultasCommon.js"></script>
<c:choose>
	<c:when test = "${entorno == 'host'}">
			<c:choose>         
		         <c:when test = "${estado == 'pre'}">
		           <script src="static/app/js/filtrosConsultasDesarrolloHost.js"></script>
		         </c:when>       
		         <c:when test = "${estado == 'pro'}">
		           <script src="static/app/js/filtrosConsultas.js"></script>
		         </c:when>
			 </c:choose>
	 </c:when>
	 <c:when test = "${entorno == 'ssmm'}">
			<c:choose>         
		         <c:when test = "${estado == 'pre'}">
		           <script src="static/app/js/filtrosConsultasDesarrolloSSMM.js"></script>
		         </c:when>       
		         <c:when test = "${estado == 'pro'}">
		           <script src="static/app/js/filtrosConsultasSSMM.js"></script>
		         </c:when>
			 </c:choose>
	</c:when>
</c:choose>
<!-- Main -->
<script>
$(document).ready(function(){
//------- Plugin:
$('input#aplicacion').CBPBusquedaDinamica({
		placeHolder: '', //Place holder 
		path: 'ResultadosBusqueda/dinamicsearch', //Nombre del path asociado al controlador *
		table: 'resultat_x_component', //Tabla de la base de datos *
		field: 'aplicacio', //Campo a buscar *
		limitResults: 10, //Resultados máximos que se muestran
		minInput: 0 //Número mínimo de letras
	});
//-------

//------- Plugin:
$('input#componente').CBPBusquedaDinamica({
		placeHolder: '', //Place holder 
		path: 'ResultadosBusqueda/dinamicsearch', //Nombre del path asociado al controlador *
		table: 'resultat_x_component', //Tabla de la base de datos *
		field: 'component', //Campo a buscar *
		limitResults: 10, //Resultados máximos que se muestran
		minInput: 0 //Número mínimo de letras
	});
//-------


//------- Plugin:
$('input#version').CBPBusquedaDinamica({
		placeHolder: '', //Place holder 
		path: 'ResultadosBusqueda/dinamicsearch', //Nombre del path asociado al controlador *
		table: 'resultat_x_component', //Tabla de la base de datos *
		field: 'versio', //Campo a buscar *
		limitResults: 10, //Resultados máximos que se muestran
		minInput: 0 //Número mínimo de letras
});
//-------

});//FinJQUERY
</script>

<!-- ============================================================== -->
<!-- 							Hilo Ariadna 						-->
<!-- ============================================================== -->
	<div class="row-fluid">
	<div class="span12">
			<ul class="breadcrumb">
				<li class="active">
						<a href="/"><spring:message code="label.field.inicio"/></a>
							<span class="divider"> &gt; </span>					
			<c:choose>     
			    <c:when test = "${estado == 'pre' && entorno == 'host' }">		
			      <spring:message code="label.HostDesarrollo"/>
			    </c:when>       
			    <c:when test = "${estado == 'pro' && entorno == 'host' }">
			       <a href="/InterHOST?estado=pro&entorno=ssmm"><spring:message code="label.AplicacionesHOST"/></a>
				   <span class="divider"> &gt; </span>
			       <spring:message code="label.consultaHostProduccio"/>
			    </c:when>
			    <c:when test = "${estado == 'pre' && entorno == 'ssmm' }">
			    	<spring:message code="label.SSMMDesarrollo"/>
			    </c:when>
			    <c:when test = "${estado == 'pro' && entorno == 'ssmm' }">
			       <a href="/InterSSMM?estado=pro&entorno=host"><spring:message code="label.AplicacionesSSMM"/></a>
				   <span class="divider"> &gt; </span>
			       <spring:message code="label.SSMMProduccion"/>
			    </c:when>
			</c:choose>
			</li>
		 </ul>
		</div>
	</div>
<!-- Fin de las bread crums -->
<!-- ============================================================== -->

<!-- Titulo de la cabecera -->
<div class="span12">
		<c:choose>     
			    <c:when test = "${estado == 'pre' && entorno == 'host' }">		
			    	<div style="font-size:14px; float:left;"><b><spring:message code="label.HostDesarrollo"/></b></div>
			    </c:when>       
			    <c:when test = "${estado == 'pro' && entorno == 'host' }">
			      <div style="font-size:14px; float:left;"><b><spring:message code="label.consultaHostProduccio"/></b></div>
			    </c:when>
			    <c:when test = "${estado == 'pre' && entorno == 'ssmm' }">
			    	<div style="font-size:14px; float:left;"><b><spring:message code="label.SSMMDesarrollo"/></b></div>
			    </c:when>
			    <c:when test = "${estado == 'pro' && entorno == 'ssmm' }">
			       <div style="font-size:14px; float:left;"><b><spring:message code="label.SSMMProduccion"/></b></div>
			    </c:when>
			</c:choose>
</div>
<br><br> 
<!-- ....................................... -->

  <form:form id="formularioPorAplicacionDTO" modelAttribute="FormularioConsultaHostDTO" action="TablasHost">

	<br>
	<h3 class="content-title emphasized blue">  <spring:message code="label.consulta"/><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span></h3>
	<!-- Seleccionamos entre el js de desarrollo o producción -->
	<c:choose>     
         <c:when test = "${estado == 'pre'}">
           <input type="hidden" name="estado" value="pre">
         </c:when>       
         <c:when test = "${estado == 'pro'}">
           <input type="hidden" name="estado" value="pro">
         </c:when>
 	</c:choose>
	<c:choose>     
         <c:when test = "${entorno == 'host'}">
           <input type="hidden" name="entorno" value="host">
         </c:when>       
         <c:when test = "${entorno == 'ssmm'}">
           <input type="hidden" name="entorno" value="ssmm">
         </c:when>
 	</c:choose>
	<!--Consultas-->
		<div class="row-fluid consultas">
		<!-- Fila 1-->
		<div class="row-fluid">
			<div class="span2"></div>
			<div class="span4 cons">
				<c:choose>     
			         <c:when test = "${entorno == 'host'}">
			           		<div class="span4"><span class="Toolinfo" id="toolApp">  </span><b><spring:message code="label.aplicacion"/></b></div>
				 			<div class="span4"><input type="text" id="aplicacion" class="input-medium" name="aplicacion">
			         </c:when>       
			         <c:when test = "${entorno == 'ssmm'}">
			            	<div class="span4"><span class="Toolinfo" id="toolApp">  </span><b><spring:message code="label.agrupacion"/></b></div>
				 			<div class="span4"><input type="text" id="aplicacion" class="input-medium" name="aplicacion">
			         </c:when>
 				</c:choose>
				 </div>
			</div>
			
			<div class="span4 cons">
				 <c:choose>     
			         <c:when test = "${entorno == 'host'}">
			         		<div class="span4"><span class="Toolinfo" id="toolVers">  </span><b><spring:message code="label.version"/></b></div>
			           		<div class="span4"><input type="text" id="version" class="input-medium" name="version"></div>
			         </c:when>
			          <c:when test = "${entorno == 'ssmm'}">
			            	<div class="span4"><span class="Toolinfo" id="toolProv"></span><b><spring:message code="label.proveedor"/></b></div>
							 <div class="span4"><select id="prov" name="proveedor">
							 	<option>--</option>
							 	<c:forEach var="proveedor" items="${proveedores}"> 
			      					<option>${proveedor}</option>
								</c:forEach>
							 </select></div>
			         </c:when>
 				</c:choose>
			</div>
			<div class="span2"></div>
		</div>

		<!--Fila2-->

			<div class="row-fluid">
			<div class="span2"></div>
			<div class="span4 cons">
				<div class="span4"><span class="Toolinfo" id="toolComp"></span><b><spring:message code="label.componente"/></b></div>
				 <div class="span4"><input type="text" id="componente" class="input-medium" name="componente"></div>
			</div>
			
			<div class="span4 cons">
				 <c:choose>     
			         <c:when test = "${entorno == 'host'}">
						     <div class="span4"><span class="Toolinfo" id="toolProv"></span><b><spring:message code="label.proveedor"/></b></div>
							 <div class="span4"><select id="prov" name="proveedor">
									 	<option>--</option>
									 	<c:forEach var="proveedor" items="${proveedores}"> 
					      					<option id="${proveedor}">${proveedor}</option>
										</c:forEach>
									 </select></div>
							
			         </c:when>
 				</c:choose>
			</div>
			<div class="span2"></div>
		</div>
	</div>
	
	<!--Elementos de busqueda-->

	<div class="toggle-box expandido" style="margin-top: 200px;">		
			<span class="toggle-box-boton">  <spring:message code="label.filtros"/></span>
			<div class="toggle-box-content ">
			

	<div class="row-fluid">
	<div class="span12">
		<div class="span6" id="tipoConsulta" cbp="radio">
			<h3 class="content-title emphasized">  <spring:message code="label.tipoConsultas"/><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span></h3>
			
			<ul>
				<li><input type="radio"  checked="checked" value="actual" id="actual" name="TipoConsulta">  <spring:message code="label.actual"/></li>
				<li><input  type="radio"  value="historico" id="historico" name="TipoConsulta">  <spring:message code="label.historico"/></li>
			</ul>

		</div>
		<!--  <div class="span6" id="resultado" cbp="radio"> -->
		<div class="span6" id="resultadoblock">
			<h3 class="content-title emphasized">  <spring:message code="label.resultado"/><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span></h3>	
			<ul>
				<li><input type="checkbox"   value="OK" id="OK" name="resultadoKO" checked >  OK ✔   </li>
				<li><input  type="checkbox"   value="KO" id="KO" name="resultadoOK" checked >  KO ✖   </li>
				<br>
				<!-- Formulario hidden -->	
				<input style="display:none;" type="text" id="resultado" value="todos" name="resultado">
			</ul>
		</div>

	</div>
	</div>
	


	<div class="row-fluid">
	<div class="span12">
		<div class="span6" id="periodo">
			<h3 class="content-title emphasized"><spring:message code="label.periodo"/><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span></h3>
			<div class="row-fluid"> 
					<div class="span6">  <spring:message code="label.desde"/>:    <input type="text" id="periodoInicial" name="PeriodoInicial"  size="13"></div>
					<div class="span6">  <spring:message code="label.hasta"/>:    <input type="text" id="periodoFinal" name="PeriodoFinal"  size="13" ></div>
				
			</div>

		</div>
		<div class="span6" id="mostrarSolo">
			<h3 class="content-title emphasized"><spring:message code="label.mostrarsolo"/><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span><span class="tl"></span><span class="bl"></span><span class="br"></span><span class="tr"></span></h3>
				<ul>
					<li><input type="checkbox"   value="1" id="bloqueados" name="bloqueados">  <spring:message code="label.bloqueados"/></li>
					<li><input  type="checkbox"   value="1" id="susceptibles" name="susceptibles">  <spring:message code="label.susceptibles"/></li>
				</ul>
		</div>

	</div>
	</div>

	</div>
	</div>
</form:form>
<!-- End container -->

<!-- Boton de submit -->
<button id = "realizaConsulta" style="float:right;"><spring:message code="label.realizarConsulta"/></button>
<!-- <button id = "limpiar" style="float:right;">Limpiar campos</button>  -->

<!-- Lista de errores -->
<c:if test="${formErrors != null}">
   <br><br><br>
   <ul>
	   	<c:forEach items="${formErrors}" var="error">
			<c:choose>
		         <c:when test = "${error == 1}">
		             <div class="control-group">
  						<div class="missatge-alerta"> 
    						<p>No hay ningún campo seleccionado</p>
  						</div>
					</div>
		         </c:when>
		         
		         <c:when test = "${error == 2}">
		                 <div class="control-group">
  						<div class="missatge-alerta"> 
    						<p>Las fecha final es inferior a la inicial</p>
  						</div>
					</div>
		         </c:when>
		         
		         <c:when test = "${error == 3}">
		        	    <div class="control-group">
  						<div class="missatge-alerta"> 
    						<p>Los campos son excluyentes, solo se puede entrar un campo.</p>
  						</div>
					</div> 
		         </c:when>
      		</c:choose>
		</c:forEach>

   </ul>
</c:if>




<!-- End container -->

		<div class="footer">
		<hr>
		@ "la Caixa", Barcelona 2017. Todos los derechos reservados. <br>
		<a>lacaixa.es</a> | <a>ABSIS Cloud</a>| <a>CBPCLO</a> | <a>La
			Caixa</a>
		</div>
		
</body>

<!-- </html> -->