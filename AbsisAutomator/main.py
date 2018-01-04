#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('Templates')
import properties as p
import  CONTROLLERdtpl
import POJOtpl,MYBATIStpl,DAOtpl,SERVICEtpl, SERVICEIMPLtpl,DTOIntpl, DTOOuttpl,JSPtpl,Utilities,POJOIn,Beantpl
import pystache
import os, errno
reload(sys)
sys.setdefaultencoding('utf8')

newFolder = p.properties['ProcessName']
fpath = 'outFiles/'+newFolder+'/'
os.makedirs('outFiles/'+newFolder)



#...-> Creación de POJOSs y DTOs <----
tp = POJOtpl.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'POJO.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del MyBatis <----
tp = MYBATIStpl.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'.xml','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del Dao <----
tp = DAOtpl.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'Dao.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del ServiceImpl <----
tp = SERVICEIMPLtpl.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'ServiceImpl.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del Service <----
tp = SERVICEtpl.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'Service.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del DTOIn <----
tp = DTOIntpl.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'InDTO.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del DTOOut <----
tp = DTOOuttpl.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'OutDTO.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del DTOOut <----
tp = POJOIn.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'InPOJO.java','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del DTOOut <----
tp = Utilities.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'Doc.md','w')
f.write(pystache.render(tp,p.properties))
f.close()

#...-> Creación del DTOOut <----
tp = Beantpl.tpl()
#print pystache.render(tp,p.properties)
f = open(fpath+p.properties['ProcessName']+'Bean.java','w')
f.write(pystache.render(tp,p.properties))
f.close()
