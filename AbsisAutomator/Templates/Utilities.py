#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
# {{ProjectName}} API de {{ProcessName}}

### Declaración

Declaración del modelo para acceso a la base de datos.

```JAVA

@Autowired
protected {{ProjectName}}Service Impl{{ProjectName}};

```

### Conversores

#### POJO to DTO
Dependiendo del mapeo se pueden emplear los siguientes conversores de clases:

```
/**
*Se emplea para pasar de un {{ProcessName}}POJO a un {{ProcessName}}OutDTO
*@param  poj {{ProcessName}}POJO
*@return {{ProcessName}}OutDTO
**/
private {{ProcessName}}OutDTO POJOtoDTO({{ProcessName}}POJO poj){
		{{ProcessName}}OutDTO outDto = new {{ProcessName}}OutDTO();
        {{#Model}}
            outDto.set{{name}}(poj.get{{name}}());
        {{/Model}}
        return outDto;
}
```

### Solicitudes

#### Solicitud de SELECT process

Obtención de todos los registros de la tabla.

```JAVA
{{ProcessName}}Bean bOut = Impl{{ProcessName}}.SELECTProcess();
List<{{ProcessName}}POJO> elem =  Impl{{ProcessName}}.getPojoOut();
for({{ProcessName}}POJO el : elem){
	//TODO
	el.show();
}
```

#### Solicitud de UPDATE process

Se emplea para realizar el UPDATE de un registro de la base de datos.

```JAVA
{{ProcessName}}Bean bOut = Impl{{ProcessName}}.SELECTProcess();
List<{{ProcessName}}POJO> elem =  Impl{{ProcessName}}.getPojoOut();
for({{ProcessName}}POJO el : elem){
	//TODO
	el.show();
}
```

#### Solicitud de INSERT process

Se emplea para realizar el INSERT de un registro de la base de datos.

```JAVA

	//Insert proces
	{{ProcessName}}Bean insertBean = new {{ProcessName}}Bean();
	{{ProcessName}}InPOJO insertPojo = new {{ProcessName}}InPOJO();

    {{#InPOJO}}
        insertPojo.set{{name}}("Test");
    {{/InPOJO}}
    insertBean.setPojoIn(insertPojo);

	//Insertamos el POJO en la base de datos
	ImplCLiteral.InsertProcess(insertBean);

```


'''
    return template
