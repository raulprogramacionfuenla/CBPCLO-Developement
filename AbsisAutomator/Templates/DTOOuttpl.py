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
/**
 * DTO de transferencia del controlador a la pantalla del proceso
 * {{ProcessName}}.
 * @author {{Author}}
 **/
class {{ProcessName}}OutDTO implements Serializable{
	private static final long serialVersionUID = 1L;
    //Variables
    {{#OutDTO}}
        private {{type}} {{name}};
    {{/OutDTO}}

    //Getters/Setters
    {{#OutDTO}}
        public void {{type}} set{{name}}({{type}} {{name}}){
            this.{{name}} = {{name}};
        }
        public {{type}} get{{name}}(){
            return this.{{name}};
        }
    {{/OutDTO}}

    //Show: Mustra la información contenida en la estructura:
    public void show() {
        System.out.println(" -------------  {{ProcessName}} ");
    {{#OutDTO}}
        System.out.println("{{name}} =>" + this.{{name}});
    {{/OutDTO}}
	  }
}
'''
    return template
