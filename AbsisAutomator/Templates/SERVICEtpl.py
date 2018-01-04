#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
package es.lacaixa.absiscloud.{{ProjectName}}.common.service;
import java.util.List;
import es.lacaixa.absiscloud.{{ProjectName}}.common.domain.{{ProcessName}}Bean;
import es.lacaixa.absiscloud.{{ProjectName}}.common.domain.{{ProcessName}}POJO;
/**
 * Clase que define la interfaz para el servicio de {{ProcessName}}
 * @author {{Author}}
 */
public interface {{ProcessName}}Service {
	/**
	 * Se recupera la lista de todos los elementos insertados en la base de datos
     *<code>
     * SELECT * FROM {{tableName}}
     *</code>
	 * @return List<{{ProcessName}}POJO>
	 * @throws Exception
	 */
	 {{ProcessName}}Bean SELECTProcess() throws Exception;

    /**
    * Se recupera un registro de la base de datos por id de este
    * @param id int
    * @return {{ProcessName}}POJO
    * @throws Exception
    */
    {{ProcessName}}Bean SelectById(int id) throws Exception;

    /**
    * Realiza el UPDATE de un registro de la tabla en la base de datos
	* @param beanEntrada {{ProcessName}}Bean
    * @return Integer
    * @throws Exception
	*/
	Integer UpdateProcess({{ProcessName}}Bean beanEntrada)  throws Exception;

    /**
	* Realiza el INSERT a base de datos
	* @param beanEntrada {{ProcessName}}Bean
    * @return Integer
    * @throws Exception
    */
	Integer InsertProcess({{ProcessName}}Bean beanEntrada)  throws Exception;

}'''
    return template
