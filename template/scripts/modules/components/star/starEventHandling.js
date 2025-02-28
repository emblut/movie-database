import { getFavoritesFromLS } from "./starLocalStorage.js";
import { checkIfFavorite, toggleFavorite } from "./starSrcHandling.js";

function initStarListeners(imgWrapperRef, imgRef, baseData) {
  initStarMouseOver(imgWrapperRef, imgRef, baseData);
  initStarMouseOut(imgWrapperRef, imgRef, baseData);
  initStarClick(imgWrapperRef, baseData);
  return imgWrapperRef;
}

function initStarMouseOver(imgWrapperRef, imgRef, baseData) {
  imgWrapperRef.addEventListener("mouseover", () => {
    const favorites = getFavoritesFromLS();
    const isFavorite = checkIfFavorite(favorites, baseData);
    if (!isFavorite) {
      imgRef.src = "./res/icons/star-filled.png";
    }
  });
}

function initStarMouseOut(imgWrapperRef, imgRef, baseData) {
  imgWrapperRef.addEventListener("mouseout", () => {
    const favorites = getFavoritesFromLS();
    const isFavorite = checkIfFavorite(favorites, baseData);
    if (!isFavorite) {
      imgRef.src = "./res/icons/star-outlined.png";
    }
  });
}

function initStarClick(imgWrapperRef, baseData) {
  imgWrapperRef.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(event, baseData);
  });
}

export { initStarListeners };
