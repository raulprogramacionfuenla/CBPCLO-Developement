#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
package es.lacaixa.absiscloud.{{ProjectName}}.web.dto;
import java.io.Serializable;
/**
 * DTO de transferencia de pantalla a controlador del proceso
 * {{ProcessName}}.
 * @author {{Author}}
 **/
class {{ProcessName}}InDTO implements Serializable{
	private static final long serialVersionUID = 1L;
    //Variables
    {{#InDTO}}
        private {{type}} {{name}};
    {{/InDTO}}

    //Getters/Setters
    {{#InDTO}}
        public void set{{name}}({{type}} {{name}}){
            this.{{name}} = {{name}};
        }
        public {{type}} get{{name}}(){
            return this.{{name}};
        }
    {{/InDTO}}

    //Show: Mustra la información contenida en la estructura:
    public void show() {
        System.out.println(" -------------  {{ProcessName}} ");
    {{#InDTO}}
        System.out.println("{{name}} =>" + this.{{name}});
    {{/InDTO}}
	 }
}
'''
    return template
