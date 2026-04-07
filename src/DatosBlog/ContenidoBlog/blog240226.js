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
    clasificacion: "ESTADO: PARADOJA_SENSORIAL",
    contenido: [
      {
        tipo: "titulo",
        texto: "Diseño",
      },
      {
        tipo: "parrafo",
        texto: "Inicio del blockout y modelado de props (low poly) para el videojuego.",
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
        texto: "El equipo de diseño continúa trabajando en el blockout de las demás habitaciones.",
      },
      {
        tipo: "imagen",
        src: Blockout2,
        caption: "CAPTURA_SISTEMA: Manifestación del blockout de la casa.",
      },
      {
        tipo: "imagen",
        src: Blockout3,
        caption: "CAPTURA_SISTEMA: Manifestación del blockout de la habitación Revelado.",
      },
      {
        tipo: "titulo",
        texto: "Programadores",
      },
      {
        tipo: "parrafo",
        texto: "El equipo de programación se ha centrado en el desarrollo de mecánicas clave, como el sistema del enemigo, el keypad de seguridad y la integración de la ficha técnica.",
      },
      {
        tipo: "subtitulo",
        texto: "Javier Soriano",
      },
      {
        tipo: "parrafo",
        texto: "Implementó al enemigo configurando su collider, animaciones y la lógica de programación necesaria.",
      },
      {
        tipo: "imagen",
        src: Enemigo,
        caption: "CAPTURA_SISTEMA: Manifestación del enemigo.",
      },
      {
        tipo: "subtitulo",
        texto: "Víctor Hugo",
      },
      {
        tipo: "parrafo",
        texto: "Resolución de dudas técnicas y optimización del canal oficial de Discord.",
      },
      {
        tipo: "subtitulo",
        texto: "Francisco Puche",
      },
      {
        tipo: "parrafo",
        texto: "Documentación técnica de una mecánica integral para el desarrollo del juego.",
      },
      {
        tipo: "imagen",
        src: Mecanica,
        caption: "CAPTURA_SISTEMA: Manifestación de la mecánica documentada por Francisco.",
      },
      {
        tipo: "subtitulo",
        texto: "Adrián",
      },
      {
        tipo: "parrafo",
        texto: "Finalizada la primera iteración del keypad para la puerta del sótano; el sistema despliega un canvas interactivo que valida la contraseña para permitir el acceso.",
      },
      {
        tipo: "imagen",
        src: Key,
        caption: "CAPTURA_SISTEMA: Manifestación de la interfaz del keypad.",
      },
      {
        tipo: "subtitulo",
        texto: "Juanjo",
      },
      {
        tipo: "parrafo",
        texto: "Desarrolló el sistema de movimiento y el control de cámara del jugador.",
      },
      {
        tipo: "imagen",
        src: Player,
        caption: "CAPTURA_SISTEMA: Manifestación del jugador.",
      },
      {
        tipo: "titulo",
        texto: "Web",
      },
      {
        tipo: "parrafo",
        texto: "El responsable web verificó la integridad de los enlaces, optimizó el apartado del blog e integró el logo y favicon. Además, habilitó la página oficial del juego y las cuentas vinculadas.",
      },
    ],
  },
};