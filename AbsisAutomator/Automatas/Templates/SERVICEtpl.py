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
/**
 * Clase que define la interfaz para el servicio de {{ProcessName}}
 * @author {{Author}}
 */
public interface {{ProcessName}}Service {
	/**
	 * Se recupera la lista del tipo SELECT
	 * @param beanEntrada {{ProcessName}}Bean
	 * @return String List
	 * @throws Exception
	 */
	 List<{{ProcessName}}OutPOJO> SELECTProcess({{ProcessName}}Bean beanEntrada) throws Exception;

}'''
    return template
