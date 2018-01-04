
package es.lacaixa.absiscloud.cbpclo.web.controller;
import java.text.DateFormat;S
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import es.lacaixa.absiscloud.cbpclo.common.service.ModeloControlLiteralService;

import es.lacaixa.absiscloud.fwk.web.controller.annotation.AbsisCloudController;
import es.lacaixa.absiscloud.fwk.web.controller.annotation.AbsisCloudControllerMethod;

/**
 * Controlador principal del proceso cbpclo
 * @author aperisza
 *
*/
@Controller
@RequestMapping(value ="/ModeloControlLiteral")
@AbsisCloudController(absisId ="ModeloControlLiteral")
public class ModeloControlLiteralController extends BaseController{
    /**
	* Función de principal de controlador de ModeloControlLiteral
    * Usar para un HTTP GET
    * @param request HttpServletRequest
	* @param model Model
	* @param locale Locale
	* @return string String
	* @throws Exception
	*/
	@RequestMapping(value = "/ModeloControlLiteral")
	@AbsisCloudControllerMethod(absisId = "ModeloControlLiteralId")
	public String ModeloControlLiteralMainScreen(HttpServletRequest request, Locale locale, Model model) throws Exception{
		return "ModeloControlLiteral";
	}//End inter Host

}//End of class
