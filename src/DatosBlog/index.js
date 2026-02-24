// DatosBlog/index.js
import { incidentesData as blogDia26 } from "./ContenidoBlog/blog230226.js";
import { incidentesData as blogDia27 } from "./ContenidoBlog/blog240226.js";

export const ApartadosBlog = {
  ...blogDia26,
  ...blogDia27,
  // Aquí irás sumando los demás: ...marzo, ...abril
};