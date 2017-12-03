#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('Templates')
import properties as p
import  CONTROLLERdtpl
import POJOtpl,MYBATIStpl,DAOtpl,SERVICEtpl, SERVICEIMPLtpl,DTOIntpl, DTOOuttpl,JSPtpl
import pystache
import os, errno
reload(sys)
sys.setdefaultencoding('utf8')

newFolder = p.properties['ProcessName']
fpath = 'outFiles/'+newFolder+'/'
os.makedirs('outFiles/'+newFolder)

#...-> Creación de POJOSs y DTOs <----
tp = POJOtpl.tpl()
f = open(fpath+p.properties['ProcessName']+'POJO.java','w')
f.write(pystache.render(tp,p.properties))
f.close()
