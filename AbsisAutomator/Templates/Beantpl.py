#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
package es.lacaixa.absiscloud.{{ProjectName}}.common.domain;

import java.io.Serializable;
import java.util.List;

/**
 * Bean del proceso {{ProcessName}}.
 * @author {{Author}}
 **/
public class {{ProcessName}}Bean implements Serializable{
	private static final long serialVersionUID = 1L;

	private {{ProcessName}}InPOJO pojoIn;
	private List<{{ProcessName}}POJO> pojoOut;

    public {{ProcessName}}InPOJO getPojoIn() {
		return pojoIn;
	}
	public void setPojoIn({{ProcessName}}InPOJO pojoIn) {
		this.pojoIn = pojoIn;
	}
	public List<{{ProcessName}}POJO> getPojoOut() {
		return pojoOut;
	}
	public void setPojoOut(List<{{ProcessName}}POJO> pojoOut) {
		this.pojoOut = pojoOut;
	}
}
'''
    return template
