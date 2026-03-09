// DatosBlog/index.js
import { incidentesData as blogDia26 } from "./ContenidoBlog/blog230226.js";
import { incidentesData as blogDia27 } from "./ContenidoBlog/blog240226.js";
import { incidentesData as blogDia09 } from "./ContenidoBlog/blog090326.js";


export const ApartadosBlog = {
  ...blogDia26,
  ...blogDia27,
  ...blogDia09,
  // Aquí irás sumando los demás: ...marzo, ...abril
};