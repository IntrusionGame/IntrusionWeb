import Reunion from "../../Imagenes/Blog/Dia_10_Marzo/Reunion1.jpg"
import Lowpoli101 from "../../Imagenes/Blog/Dia_10_Marzo/Lowpoli101.jpg"
import Lowpoli102 from "../../Imagenes/Blog/Dia_10_Marzo/Lowpoli102.png"
import Lowpoli103 from "../../Imagenes/Blog/Dia_10_Marzo/Lowpoli103.png"
import prop from "../../Imagenes/Blog/Dia_10_Marzo/prop1.jpg"
import repositorio from "../../Imagenes/Blog/Dia_10_Marzo/arregloRepositorio.png"

export const incidentesData = {
  100326: {
    titulo: "PROTOCOLO_10032026.log",
    fecha: "2026-03-10 // 00:30 PM",
    clasificacion: "ZONA: UMBRAL_DE_NO_RETORNO",
    contenido: [
      {
        tipo: "titulo",
        texto: "Diseño",
      },
      {
        tipo: "parrafo",
        texto: "La jefa de diseño comenzó con el modelado de props y realizó la entrevista para Instagram.",
      },
      {
        tipo: "imagen",
        src: prop,
        caption: "CAPTURA_SISTEMA: Manifestación del diseño de los props.",
      },
      {
        tipo: "parrafo",
        texto: "El resto de diseñadores continúan trabajando en el blockout de las demás habitaciones.",
      },
      {
        tipo: "imagen",
        src: Lowpoli101,
        caption: "CAPTURA_SISTEMA: Manifestación del blockout de la casa.",
      },
      {
        tipo: "imagen",
        src: Lowpoli102,
        caption: "CAPTURA_SISTEMA: Manifestación del blockout de la habitación Revelado.",
      },
      {
        tipo: "imagen",
        src: Lowpoli103, 
        caption: "CAPTURA_SISTEMA: Manifestación del blockout del baño.",
      },
      {
        tipo: "titulo",
        texto: "Programadores",
      },
      {
        tipo: "parrafo",
        texto: "Los programadores se reunieron con la profesora para definir las nuevas ramas y funciones que se desarrollarán actualmente.",
      },
      {
        tipo: "imagen",
        src: Reunion,
        caption: "CAPTURA_SISTEMA: Manifestación de la reunión.",
      },
      {
        tipo: "subtitulo",
        texto: "Javier Soriano",
      },
      {
        tipo: "parrafo",
        texto: "Siguió buscando la solución para que el sistema del enemigo funcione correctamente.",
      },
      {
        tipo: "subtitulo",
        texto: "Víctor Hugo",
      },
      {
        tipo: "parrafo",
        texto: "Revisó el estado en GitHub, solucionó los cambios pendientes de commitear, corrigió errores en el repositorio y comenzó el mapa de la planta baja.",
      },
      {
        tipo: "subtitulo",
        texto: "Francisco Puche",
      },
      {
        tipo: "parrafo",
        texto: "Desarrolló el código para que el sistema del perro sea plenamente funcional.",
      },
      {
        tipo: "subtitulo",
        texto: "Adrián",
      },
      {
        tipo: "parrafo",
        texto: "Se distribuyeron las nuevas tareas de programación y se planteó la ejecución individual mientras se resolvían conflictos con el repositorio.",
      },
      {
        tipo: "subtitulo",
        texto: "Juanjo",
      },
      {
        tipo: "parrafo",
        texto: "Organizó a los integrantes del equipo de programación y asignó las nuevas tareas de desarrollo.",
      },
      {
        tipo: "subtitulo",
        texto: "Michel",
      },
      {
        tipo: "parrafo",
        texto: "Corrigió diversos fallos críticos dentro del repositorio.",
      },
      {
        tipo: "imagen",
        src: repositorio,
        caption: "CAPTURA_SISTEMA: Manifestación de la resolución de conflictos.",
      },
      {
        tipo: "titulo",
        texto: "UI",
      },
      {
        tipo: "parrafo",
        texto: "Se dedicó a implementar en Unity los bocetos previamente creados en Figma.",
      },
      {
        tipo: "titulo",
        texto: "Web / Marketing",
      },
      {
        tipo: "parrafo",
        texto: "El programador web continuó con el diseño responsive, añadió la sinopsis oficial a la web y colaboró con la jefa de diseño en la entrevista para Instagram.",
      },
    ],
  },
};