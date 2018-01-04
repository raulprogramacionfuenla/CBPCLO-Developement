
# cbpclo API de ModeloControlLiteral

### Declaración

Declaración del modelo para acceso a la base de datos.

```JAVA

@Autowired
protected cbpcloService Implcbpclo;

```

### Conversores

#### POJO to DTO
Dependiendo del mapeo se pueden emplear los siguientes conversores de clases:

```
/**
*Se emplea para pasar de un ModeloControlLiteralPOJO a un ModeloControlLiteralOutDTO
*@param  poj ModeloControlLiteralPOJO
*@return ModeloControlLiteralOutDTO
**/
private ModeloControlLiteralOutDTO POJOtoDTO(ModeloControlLiteralPOJO poj){
		ModeloControlLiteralOutDTO outDto = new ModeloControlLiteralOutDTO();
            outDto.setexpresioRegular(poj.getexpresioRegular());
            outDto.setordre(poj.getordre());
            outDto.setid_control_literal(poj.getid_control_literal());
            outDto.setdescripcio(poj.getdescripcio());
            outDto.setid_control(poj.getid_control());
            outDto.settipo_accion(poj.gettipo_accion());
        return outDto;
}
```

### Solicitudes

#### Solicitud de SELECT process

Obtención de todos los registros de la tabla.

```JAVA
ModeloControlLiteralBean bOut = ImplModeloControlLiteral.SELECTProcess();
List<ModeloControlLiteralPOJO> elem =  ImplModeloControlLiteral.getPojoOut();
for(ModeloControlLiteralPOJO el : elem){
	//TODO
	el.show();
}
```

#### Solicitud de UPDATE process

Se emplea para realizar el UPDATE de un registro de la base de datos.

```JAVA
ModeloControlLiteralBean bOut = ImplModeloControlLiteral.SELECTProcess();
List<ModeloControlLiteralPOJO> elem =  ImplModeloControlLiteral.getPojoOut();
for(ModeloControlLiteralPOJO el : elem){
	//TODO
	el.show();
}
```

#### Solicitud de INSERT process

Se emplea para realizar el INSERT de un registro de la base de datos.

```JAVA
ModeloControlLiteralBean bOut = ImplModeloControlLiteral.SELECTProcess();
List<ModeloControlLiteralPOJO> elem =  ImplModeloControlLiteral.getPojoOut();
for(ModeloControlLiteralPOJO el : elem){
	//TODO
	el.show();
}
```


