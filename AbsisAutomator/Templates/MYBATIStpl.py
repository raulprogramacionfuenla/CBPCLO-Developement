#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')
import properties
import pystache
def tpl():
    template = u'''
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="es.lacaixa.absiscloud.{{ProjectName}}.business.dao.{{ProcessName}}Dao">

    <select id="SelectProcess" resultType="String" >
        SELECT
        {{#Model}}
            {{name}},
        {{/Model}}
        FROM
            {{tableName}}
    </select>

    <insert id="InsertProcess" parameterType="{{ProcessName}}POJO">
		INSERT INTO {{control}}
		(
        {{#Model}}
            {{name}},
        {{/Model}}
        )
        VALUES(
        {{#Model}}
            ${ {{name}} },
        {{/Model}}
        )
	</insert>

        <update id="UpdateProcess">
            UPDATE {{tableName}} SET
                 {{#Model}}
                     {{name}} = #{{{name}}},
                 {{/Model}}
             WHERE id = id
        </update>

</mapper>
'''

    return template
