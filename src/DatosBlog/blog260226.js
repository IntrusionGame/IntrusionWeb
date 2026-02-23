import Logo from "../Imagenes/Blog/Logo.jpg";
import Casa from "../Imagenes/Blog/Casa.jpg";
import Menu from "../Imagenes/Blog/Menu.jpg";
import Github1 from "../Imagenes/Blog/ProyectoGithub.png";
import Github2 from "../Imagenes/Blog/RamasGithub.png";

export const incidentesData = {
  26022026: {
    // Este ID debe coincidir con el que pases por el Link de la lista
    titulo: "PROTOCOLO_26022026.log",
    fecha: "2026-02-26 // 03:34 AM",
    clasificacion: "NIVEL_OMEGA-ROJO",
    contenido: [
      {
        tipo: "titulo",
        texto: "Diseño.",
      },
      {
        tipo: "parrafo",
        texto: "La jefa de diseño se encargó de hacer el logo como el favicon.",
      },
      {
        tipo: "imagen",
        src: Logo,
        caption: "CAPTURA_SISTEMA: Manifestación del logo del videojuego.",
      },
      {
        tipo: "parrafo",
        texto: "El resto de diseñadores también se encargaron de hacer el diseño de la casa de manera cenital.",
      },
      {
        tipo: "imagen",
        src: Casa,
        caption: "CAPTURA_SISTEMA: Manifestación de la casa en el Sector Delta-7.",
      },
      {
        tipo: "titulo",
        texto: "UI.",
      },
      {
        tipo: "parrafo",
        texto: "El jefe de UI se encargó de hacer el diseño de cómo será el menú principal apoyándose en lo que le comentaban desde diseño.",
      },
      {
        tipo: "imagen",
        src: Menu,
        caption: "CAPTURA_SISTEMA: Manifestación del menú principal.",
      },
      {
        tipo: "titulo",
        texto: "Programadores",
      },
      {
        tipo: "parrafo",
        texto: "Los programadores se encargaron de hacer el repositorio para el videojuego, a continuación se indicará qué ha realizado cada programador.",
      },
      {
        tipo: "subtitulo",
        texto: "Javier Soriano",
      },
      {
        tipo: "parrafo",
        texto: "Crear ramas: feature-enemigo / feature-perro y subir tabla de mecánicas LA CUAL HAY QUE RELLENAR al drive.",
      },
      {
        tipo: "subtitulo",
        texto: "Victor Hugo",
      },
      {
        tipo: "parrafo",
        texto: "Revisión general del resto de compañeros y medir baldosas y paredes para el tamaño de las diferentes habitaciones.",
      },
      {
        tipo: "subtitulo",
        texto: "Michel Mendoza",
      },
      {
        tipo: "parrafo",
        texto: "Continuar con el repositorio.",
      },
      {
        tipo: "subtitulo",
        texto: "Francisco Puche",
      },
      {
        tipo: "parrafo",
        texto: "Crear rama feature-interaccion y programación de la interacción con objetos.",
      },
      {
        tipo: "subtitulo",
        texto: "Adrian",
      },
      {
        tipo: "parrafo",
        texto: "Crear su rama y programación del código de la puerta.",
      },
      {
        tipo: "subtitulo",
        texto: "Juanjo",
      },
      {
        tipo: "parrafo",
        texto: "Crear su rama y programación del movimiento del personaje.",
      },
      {
        tipo: "imagen",
        src: Github1,
        caption: "CAPTURA_SISTEMA: Manifestación del repositorio del proyecto.",
      },
      {
        tipo: "imagen",
        src: Github2,
        caption: "CAPTURA_SISTEMA: Manifestación de las ramas del proyecto.",
      },
    ],
  },
};