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
import es.lacaixa.absiscloud.{{ProjectName}}.common.domain.{{ProcessName}}OutPOJO;

/**
 * [--- DAO ---]
 * DAO  del proceso {{ProcessName}}
 * @author {{Author}}
 *
 */
public interface {{ProcessName}}Dao{
	/**
	* Realiza el SELECT a base de datos
	* @param POJOin CBPBusquedaDinamicaInPOJO
	* @return List<{{ProcessName}}OutPOJO>
	*/
	List<{{ProcessName}}OutPOJO> SelectProcess({{ProcessName}}InPOJO POJOin);

    /**
	* Realiza el INSERT a base de datos
	* @param POJOin CBPBusquedaDinamicaInPOJO
	*/
	void InsertProcess({{ProcessName}}InPOJO POJOin);

    /**
    * Realiza el UPDATE a base de datos
	* @param POJOin CBPBusquedaDinamicaInPOJO
	*/
	void UpdateProcess({{ProcessName}}InPOJO POJOin);


}'''
    return template
