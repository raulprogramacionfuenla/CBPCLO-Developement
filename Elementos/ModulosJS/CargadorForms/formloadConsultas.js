SELECT
inc.justificat as justificado,
inc.id_incompliments as id_incompliments,
inc.id_resultat as id_resultat,
cont.id_control as id_control,

<choose>
    <when test='"es".equals(idioma)'>
      inc.descripcioJustificacio_ES as justificacion,
    </when>
    <when test='"ca".equals(idioma)'>
        inc.descripcioJustificacio_CA as justificacion,
    </when>
  </choose>

inc.sentenciaAfectada as sentenciaAfectada,

<choose>
    <when test='"es".equals(idioma)'>
      cont.descripcioIncompliment_ES as descripcion,
    </when>
    <when test='"ca".equals(idioma)'>
        cont.descripcioIncompliment_CA as descripcion,
    </when>
</choose>

<choose>
    <when test='"es".equals(idioma)'>
      tcon.descripcio_ES as tipoControl,
    </when>
    <when test='"ca".equals(idioma)'>
        tcon.descripcio_CA as tipoControl,
    </when>
</choose>
cont.factorRisc as fr
FROM incompliments inc
LEFT JOIN `control` cont ON cont.id_control = inc.id_control
LEFT JOIN `tipus_control` tcon ON tcon.id_tipus_control = cont.id_tipus_control
WHERE inc.id_resultat =  ${id_componente}
ORDER BY cont.factorRisc DESC;
<if test="start != null">
     LIMIT ${start},${length};
  </if>
