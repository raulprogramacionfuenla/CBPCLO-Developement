#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
package es.lacaixa.absiscloud.{{ProjectName}}.web.controller;
import java.text.DateFormat;
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

import es.lacaixa.absiscloud.{{ProjectName}}.common.service.{{ProcessName}}Service;

import es.lacaixa.absiscloud.fwk.web.controller.annotation.AbsisCloudController;
import es.lacaixa.absiscloud.fwk.web.controller.annotation.AbsisCloudControllerMethod;

/**
 * Controlador principal del proceso {{ProcessName}}
 * @author {{Author}}
 *
*/
@Controller
@RequestMapping(value ="/{{ProcessName}}")
@AbsisCloudController(absisId ="{{ProcessName}}")
public class {{ProcessName}}Controller extends BaseController{

    /**
	* Función de principal de controlador de {{ProcessName}}
    * Usar para un HTTP GET
    *
    * @param request HttpServletRequest
	* @param model Model
	* @param locale Locale
	* @return string String
	* @throws Exception
	*/
	@RequestMapping(value = "/{{ProcessName}}")
	@AbsisCloudControllerMethod(absisId = "{{ProcessName}}Id")
	public String {{ProcessName}}MainScreen(HttpServletRequest request, Locale locale, Model model) throws Exception{
		return "{{ProcessName}}";
	}//End inter Host


}//End of class
'''
    return tpl
