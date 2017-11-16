#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('Templates')
import properties as p
import POJOtpl
import pystache


tp = POJOtpl.tpl()
print pystache.render(tp,p.properties)
