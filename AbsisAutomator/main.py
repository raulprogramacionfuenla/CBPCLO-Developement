#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('Templates')
import properties as p
<<<<<<< HEAD
import POJOtpl,MYBATIStpl,DAOtpl,SERVICEtpl, SERVICEIMPLtpl
import pystache
import os, errno
reload(sys)
sys.setdefaultencoding('utf8')

newFolder = p.properties['ProcessName']
fpath = 'outFiles/'+newFolder+'/'
os.makedirs('outFiles/'+newFolder)

#-> Creación de POJOSs y DTOs
tp = POJOtpl.tpl()
print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'POJO.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#-> Creación del MyBatis
tp = MYBATIStpl.tpl()
print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'.xml','w')
f.write(pystache.render(tp,p.properties))
f.close()

#-> Creación del Dao
tp = DAOtpl.tpl()
print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'Dao.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#-> Creación del ServiceImpl
tp = SERVICEIMPLtpl.tpl()
print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'ServiceImpl.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#-> Creación del Service
tp = SERVICEtpl.tpl()
print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'Service.java','w')
f.write(pystache.render(tp,p.properties))
f.close()
=======
import POJOtpl
import pystache


tp = POJOtpl.tpl()
print pystache.render(tp,p.properties)
>>>>>>> 68c78678e338c77b2ca13686ce4ef807515e9b4c