#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
package es.lacaixa.absiscloud.{{ProjectName}}.business.dao;

import java.util.List;

import es.lacaixa.absiscloud.{{ProjectName}}.common.domain.{{ProcessName}}InPOJO;
import es.lacaixa.absiscloud.{{ProjectName}}.common.domain.{{ProcessName}}POJO;

/**
 * [--- DAO ---]
 * DAO  del proceso {{ProcessName}}. Gestiona las conexiones a la base de datos.
 * @author {{Author}}
 */
public interface {{ProcessName}}Dao{
	/**
	* Realiza el SELECT a base de datos
	* @param POJOin{{ProcessName}}InPOJO
	* @return List<{{ProcessName}}POJO>
	*/
	List<{{ProcessName}}POJO> SelectProcess();

    /**
    * Realiza el SELECT de un elemento por id de la base de datos del proceso {{ProcessName}}
    * @param id int
    * @return {{ProcessName}}POJO
    */
    {{ProcessName}}POJO SelectById(int id);

    /**
	* Realiza el INSERT a base de datos del proceso {{ProcessName}}
	* @param POJOin {{ProcessName}}InPOJO
    * @return Integer
	*/
	Integer InsertProcess({{ProcessName}}InPOJO POJOin);

    /**
    * Realiza el UPDATE de un registro de la tabla en la base de datos
    * del proceso {{ProcessName}}
	* @param POJOin ({{ProcessName}}InPOJO
    * @return Integer
    */
	Integer void UpdateProcess({{ProcessName}}InPOJO POJOin);

    /**
    * Realiza el DELETE de un registro de la tabla en la base de datos
    * seleccionado por su id. del proceso {{ProcessName}}
    * @param id int
    * @return Integer
    */
    Integer DeleteProcess(int id);

}'''
    return template
