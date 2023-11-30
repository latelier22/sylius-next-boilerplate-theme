import { resourceLimits } from "worker_threads";
import { IResource } from "../../../types/resources/common";
import { getLocale } from "../../config/locales";

export const getResourceTranslation = (resource: IResource | null) => {
  // A MODIFIER //
  if (resource) {
    if (resource?.translations) {
      if (getLocale() in resource.translations) {
        return resource.translations[getLocale()];
      }
      console.log(
        // "PAS DE LOCALE",
        resource.translations[Object.keys(resource.translations)[0]]
      );
      return resource.translations[Object.keys(resource.translations)[0]];
    } else {
    //   console.log("PAS DE TRANSLATIONS",resource);
      return resource;
    }
  }
//   console.log("PAS DE RESOURCE");
  return null;
};
