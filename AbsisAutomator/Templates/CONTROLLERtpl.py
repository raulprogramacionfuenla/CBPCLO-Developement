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

import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import es.lacaixa.absiscloud.{{ProjectName}}.common.service.{{ProcessName}}Service;

import es.lacaixa.absiscloud.fwk.web.controller.annotation.AbsisCloudController;
import es.lacaixa.absiscloud.fwk.web.controller.annotation.AbsisCloudControllerMethod;

/**
 * Controlador de {{ProcessName}}
 * @author {{Author}}
 *
 */
@Controller
@RequestMapping(value ="/{{ProcessName}}")
@AbsisCloudController(absisId ="home")
public class InformesAPeticionController extends BaseController{
	//http://localhost:8080/informes/informeEspecifico
	private final Logger logger = LoggerFactory.getLogger(InformesAPeticionController.class);



	/*============================
	 * Pantalla formularios
	 ============================*/
	@Autowired
	private CBPFastQueryService fastQuery;
	/**
	 * Se emplea para agilizar consultas
	 * @param sql
	 * @return
	 * @throws Exception
	 */
	private String queryHandler(String sql, String field) throws Exception{
		/*-- Lo vamos cargando en un hashmap --*/
		List<HashMap<String,String>> lista = new ArrayList<HashMap<String,String>>();
		lista = fastQuery.makeQuery(sql);

		try{
			System.out.println("\n\n Resultado de la query: " + lista.get(0).get(field));
		}catch(Exception e){
			System.out.println("Error de casting");
		}


		return lista.get(0).get(field);
	}
'''
    return tpl
