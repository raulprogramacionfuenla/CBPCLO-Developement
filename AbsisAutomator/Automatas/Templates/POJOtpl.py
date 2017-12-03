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
 * POJO de transferencia del proceso {{ProcessName}}
 * @author aperisza
 *
 */
public class {{ProcessName}}POJO implements Serializable{
	private static final long serialVersionUID = 1L;

    //Variables
    {{#Model}}
        private {{type}} {{name}};
    {{/Model}}

    //Getters/Setters
    {{#Model}}
        public void  set{{name}}({{type}} {{name}}){
            this.{{name}} = {{name}};
        }

        public {{type}} get{{name}}(){
            return this.{{name}};
        }
    {{/Model}}

    //Show: Mustra la información contenida en la estructura:
    public void show() {

        System.out.println(" -------------  {{ProcessName}} ");
    {{#Model}}
        System.out.println("{{name}} =>" + this.{{name}});
    {{/Model}}
	  }
}
'''
    return template
