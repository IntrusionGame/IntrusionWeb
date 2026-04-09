// DatosBlog/index.js
import { incidentesData as blogDia2602 } from "./ContenidoBlog/blog230226.js";
import { incidentesData as blogDia2702 } from "./ContenidoBlog/blog240226.js";
import { incidentesData as blogDia0903 } from "./ContenidoBlog/blog090326.js";
import { incidentesData as blogDia1003 } from "./ContenidoBlog/blog100326.js";
import { incidentesData as blogDia0604 } from "./ContenidoBlog/blog060426.js";
import { incidentesData as blogDia0704 } from "./ContenidoBlog/blog070426.js";


export const ApartadosBlog = {
  ...blogDia2602,
  ...blogDia2702,
  ...blogDia0903,
  ...blogDia1003,
  ...blogDia0604,
  ...blogDia0704,
  // Aquí irás sumando los demás: ...marzo, ...abril
};