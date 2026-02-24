import Blockout2 from "../../Imagenes/Blog/Dia_24_de_Febrero/BlockoutCasa.jpg";
import Blockout3 from "../../Imagenes/Blog/Dia_24_de_Febrero/BlockoutCasa2.jpg";
import Mecanica from "../../Imagenes/Blog/Dia_24_de_Febrero/MecanicaFrancisco.png";
import Enemigo from "../../Imagenes/Blog/Dia_24_de_Febrero/Enemigo.png";
import Casa1 from "../../Imagenes/Blog/Dia_24_de_Febrero/ImagenCasa1.png";
import Casa2 from "../../Imagenes/Blog/Dia_24_de_Febrero/ImagenCasa2.png";
import Player from "../../Imagenes/Blog/Dia_24_de_Febrero/Player.png";
import Key from "../../Imagenes/Blog/Dia_24_de_Febrero/Key.png";


export const incidentesData = {
  240226: {
    titulo: "PROTOCOLO_24022026.log",
    fecha: "2026-02-24 // 00:30 PM",
    clasificacion: "NIVEL_OMEGA-ROJO",
    contenido: [
      {
        tipo: "titulo",
        texto: "Diseño.",
      },
      {
        tipo: "parrafo",
        texto: "Inicio de blockout y modelado de props (lowpoly) para el juego.",
      },
      {
        tipo: "imagen",
        src: Casa1,
        caption: "CAPTURA_SISTEMA: Manifestación del diseño de la casa en color.",
      },
      {
        tipo: "imagen",
        src: Casa2,
        caption: "CAPTURA_SISTEMA: Manifestación del diseño de la casa.",
      },
      {
        tipo: "parrafo",
        texto: "El resto de diseñadores estan trabajando en el blockout del resto de las habitaciones.",
      },
      {
        tipo: "imagen",
        src: Blockout2,
        caption: "CAPTURA_SISTEMA: Manifestación del blockout de la casa.",
      },
      {
        tipo: "imagen",
        src: Blockout3,
        caption: "CAPTURA_SISTEMA: Manifestación del blockout de la habiacion Revelado.",
      },
      {
        tipo: "titulo",
        texto: "Programadores",
      },
      {
        tipo: "parrafo",
        texto: "Los programadores hoy se han dedicado a hacer sus diferentes partes del videjuego como enemigo, contraseña y añadir la ficha tenica.",
      },
      {
        tipo: "subtitulo",
        texto: "Javier Soriano",
      },
      {
        tipo: "parrafo",
        texto: "Añadio el enemigo con su collider, sus animacions y el codigo para que funcione",
      },
      {
        tipo: "imagen",
        src: Enemigo,
        caption: "CAPTURA_SISTEMA: Manifestación del enemigo.",
      },
      {
        tipo: "subtitulo",
        texto: "Victor Hugo",
      },
      {
        tipo: "parrafo",
        texto: "Esperar a que le resuelvan dudas y mejora el canal del Discord.",
      },
      {
        tipo: "subtitulo",
        texto: "Francisco Puche",
      },
      {
        tipo: "parrafo",
        texto: "Ha documentado una mecanica importante para el videojuego",
      },
      {
        tipo: "imagen",
        src: Mecanica,
        caption: "CAPTURA_SISTEMA: Manifestación de la mecanica documentada por Francisco.",
      },
      {
        tipo: "subtitulo",
        texto: "Adrian",
      },
      {
        tipo: "parrafo",
        texto: "Hoy he terminado la primera versión de la mecánica del keyPad de la puerta del sótano, que cuando le das te abre un canvas que si aciertas te abre la puerta y si no te da otra oportunidad.",
      },
      {
        tipo: "imagen",
        src: Key,
        caption: "CAPTURA_SISTEMA: Manifestación de la llave.",
      },
      {
        tipo: "subtitulo",
        texto: "Juanjo",
      },
      {
        tipo: "parrafo",
        texto: "Ha creado el movimiento y camara del jugador.",
      },
      {
        tipo: "imagen",
        src: Player,
        caption: "CAPTURA_SISTEMA: Manifestación del jugador.",
      },
      {
        tipo: "titulo",
        texto: "Web.",
      },
      {
        tipo: "parrafo",
        texto: "El Jefe se encargo de que el enlace funcione correctamente, mejoro el apartadop del blog, añadio el logo y favicon que le pasaron ayer desde diseño, por ultimo creo la pagina de juego, tambien creo la cuenta oficial del videojuego.",
      }
    ],
  },
};