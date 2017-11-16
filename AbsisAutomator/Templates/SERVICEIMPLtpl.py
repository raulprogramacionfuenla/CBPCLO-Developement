#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
package es.lacaixa.absiscloud.{{ProjectName}}.business.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.lacaixa.absiscloud.{{ProjectName}}.business.dao.{{ProcessName}}Dao;
import es.lacaixa.absiscloud.{{ProjectName}}.common.domain.{{ProcessName}}Bean;
import es.lacaixa.absiscloud.{{ProjectName}}.common.domain.{{ProcessName}}InPOJO;
import es.lacaixa.absiscloud.{{ProjectName}}.common.service.{{ProcessName}}Service;

/**
 * Service Implement de {{ProcessName}}
 * @author {{Author}}
 */
@Service
public class {{ProcessName}}ServiceImpl implements {{ProcessName}}DinamicaService {

	private {{ProcessName}}Dao formDao;

	@Autowired
	public void setDao(final CBPBusquedaDinamicaDao formDAO){
		this.formDao = formDAO;
	}

	@Override
	public List<{{ProcessName}}OutPOJO> SELECTProcess({{ProcessName}}Bean BeanEntrada) throws Exception{
        List<String> formPojo = new ArrayList<String>();

		{{ProcessName}}InPOJO tmpPojo = BeanEntrada.getPojoIn();

		System.out.println("Esto Llega Bean de {{ProcessName}}: " + BeanEntrada.getPojoIn().toString());

		try{
			formPojo = formDao.SelectProcess(tmpPojo);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de {{ProcessName}}");
			throw ex;
		}
		return formPojo;
	}//End getEntradas

 '''
    return template
