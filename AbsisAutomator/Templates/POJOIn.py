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
 * POJO de entrada del proceso {{ProcessName}}
 * @author {{Author}}
 */
public class {{ProcessName}}InPOJO implements Serializable{
	private static final long serialVersionUID = 1L;

    //Variables
    {{#InPOJO}}
        private {{type}} {{name}};
    {{/InPOJO}}

    //Getters/Setters
    {{#InPOJO}}
        public void  set{{name}}({{type}} {{name}}){
            this.{{name}} = {{name}};
        }

        public {{type}} get{{name}}(){
            return this.{{name}};
        }
    {{/InPOJO}}

    //Show: Mustra la información contenida en la estructura:
    public void show() {
        System.out.println(" -__-__-__-__-__>  {{ProcessName}} ");
    {{#InPOJO}}
        System.out.println("{{name}} =>" + this.{{name}});
    {{/InPOJO}}
	  }
}
'''
    return template
