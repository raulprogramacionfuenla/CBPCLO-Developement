#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
<h1>Hello {{ProjectName}}</h1>
'''
    return tpl
