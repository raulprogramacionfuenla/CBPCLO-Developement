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
import es.lacaixa.absiscloud.{{ProjectName}}.common.domain.{{ProcessName}}POJO;

/**
 * Service Implement de {{ProcessName}}
 * @author {{Author}}
 */
@Service
public class {{ProcessName}}ServiceImpl implements {{ProcessName}}Service {

	private {{ProcessName}}Dao formDao;

	@Autowired
	public void setDao(final {{ProcessName}}Dao formDAO){
		this.formDao = formDAO;
	}

	@Override
	public {{ProcessName}}Bean SELECTProcess() throws Exception{
        List<{{ProcessName}}POJO> formPojo = new ArrayList<{{ProcessName}}POJO>();
        {{ProcessName}}Bean bin = new {{ProcessName}}Bean();
		try{
			formPojo = formDao.SelectProcess();
            bin.setPojoOut(formPojo);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de {{ProcessName}} en el SELECT");
			throw ex;
		}
		return bin;
	}//End getEntradas

    @Override
	public Integer InsertProcess({{ProcessName}}Bean BeanEntrada)  throws Exception{
        {{ProcessName}}InPOJO tmpPojo = BeanEntrada.getPojoIn();
        try{
			formDao.InsertProcess(tmpPojo);

		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de {{ProcessName}} en el INSERT");
			throw ex;
		}
        return 0;
	}//End getEntradas

    @Override
	public Integer UpdateProcess({{ProcessName}}Bean BeanEntrada)  throws Exception{
        {{ProcessName}}InPOJO tmpPojo = BeanEntrada.getPojoIn();
        try{
			formDao.UpdateProcess(tmpPojo);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de {{ProcessName}} en el UPDATE");
			throw ex;
		}
        return 0;
	}//End getEntradas

    @Override
    public {{ProcessName}}Bean SelectById(int id) throws Exception{
        {{ProcessName}}POJO formPojo = new {{ProcessName}}POJO();
        {{ProcessName}}Bean bin = new {{ProcessName}}Bean();

        try{
			formPojo = formDao.SelectById(id);
            List<{{ProcessName}}POJO> lst = new ArrayList<{{ProcessName}}POJO>();
            bin.setPojoOut(lst);
		}catch(Exception ex){
			System.out.println("Error en el formación del Dao de {{ProcessName}} en el UPDATE");
			throw ex;
		}

        return bin;
	}//End getEntradas

}//End class
 '''
    return template
