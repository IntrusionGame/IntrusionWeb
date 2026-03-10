import Reunion from "../../Imagenes/Blog/Dia_10_Marzo/Reunion1.jpg"
import Lowpoli101 from "../../Imagenes/Blog/Dia_10_Marzo/Lowpoli101.jpg"
import Lowpoli102 from "../../Imagenes/Blog/Dia_10_Marzo/Lowpoli102.png"
import Lowpoli103 from "../../Imagenes/Blog/Dia_10_Marzo/Lowpoli103.png" // Corregido el nombre de la variable aquí
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
        texto: "Diseño.",
      },
      {
        tipo: "parrafo",
        texto: "La jefa de diseño empezó con los modelados de los props e hizo la entrevista para el Instagram.",
      },
      {
        tipo: "imagen",
        src: prop,
        caption: "CAPTURA_SISTEMA: Manifestación del diseño de los props.",
      },
      {
        tipo: "parrafo",
        texto: "El resto de diseñadores siguen trabajando en el blockout del resto de las habitaciones.",
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
        caption: "CAPTURA_SISTEMA: Manifestación del blockout del Baño.",
      },
      {
        tipo: "titulo",
        texto: "Programadores",
      },
      {
        tipo: "parrafo",
        texto: "Los programadores se reunieron con la profesora para hablar de las nuevas ramas y funciones que van a desarrollar actualmente.",
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
        texto: "Siguió buscando la solución para el enemigo, para que funcione correctamente.",
      },
      {
        tipo: "subtitulo",
        texto: "Víctor Hugo",
      },
      {
        tipo: "parrafo",
        texto: "Revisó lo que había en GitHub, arregló lo que quedaba pendiente de commitear, también arregló lo del repositorio y empezó a hacer el mapa de la planta baja.",
      },
      {
        tipo: "subtitulo",
        texto: "Francisco Puche",
      },
      {
        tipo: "parrafo",
        texto: "Creó el código para el perro, para que este sea funcional.",
      },
      {
        tipo: "subtitulo",
        texto: "Adrián",
      },
      {
        tipo: "parrafo",
        texto: "Hoy se han distribuido las nuevas tareas a los de programación y se ha planteado cómo llevar a cabo cada tarea de manera individual mientras se resolvían los problemas con el repositorio.",
      },
      {
        tipo: "subtitulo",
        texto: "Juanjo",
      },
      {
        tipo: "parrafo",
        texto: "Repartió a los integrantes del grupo de programación y asignó las nuevas tareas que hay que desarrollar.",
      },
      {
        tipo: "subtitulo",
        texto: "Michel",
      },
      {
        tipo: "parrafo",
        texto: "Arregló fallos del repositorio.",
      },
      {
        tipo: "imagen",
        src: repositorio,
        caption: "CAPTURA_SISTEMA: Manifestación del arreglo de fallos.",
      },
      {
        tipo: "titulo",
        texto: "UI.",
      },
      {
        tipo: "parrafo",
        texto: "Se dedicó a pasar sus bocetos creados en Figma a Unity.",
      },
      {
        tipo: "titulo",
        texto: "Web / Marketing.",
      },
      {
        tipo: "parrafo",
        texto: "El programador web siguió con el diseño del responsive, también añadió la sinopsis del videojuego a la web y se reunió con la jefa de diseño para hacer una entrevista para Instagram.",
      },
    ],
  },
};