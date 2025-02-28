import { createElement } from "../../utils/domUtils.js";
import { setStarSrc } from "./starSrcHandling.js";

function buildStarImg(baseData, className) {
  const imgRef = createElement("img");
  imgRef.classList.add(className);
  setStarSrc(baseData, imgRef);
  return imgRef;
}

export { buildStarImg };
