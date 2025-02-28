import { getFavoritesFromLS } from "./starLocalStorage.js";

function setStarSrc(data, imgRef) {
  const favorites = getFavoritesFromLS();
  const isFavorite = checkIfFavorite(favorites, data);
  chooseStarSrc(isFavorite, imgRef);
}

function checkIfFavorite(favorites, data) {
  return favorites.find((favorite) => {
    return favorite.id === data.id;
  });
}

function chooseStarSrc(isFavorite, imgRef) {
  if (isFavorite) {
    imgRef.src = "./res/icons/star-filled.png";
    imgRef.alt = "Marked as favorite";
  } else {
    imgRef.src = "./res/icons/star-outlined.png";
    imgRef.alt = "Not marked as favorite";
  }
}

function toggleFavorite(event, baseData) {
  const favoriteObj = setupFavoriteObj(baseData);
  let favorites = getFavoritesFromLS();
  const isFavorite = checkIfFavorite(favorites, baseData);
  toggleFavoriteInfo(isFavorite, event, favorites, baseData, favoriteObj);
}

function setupFavoriteObj(baseData) {
  return {
    title: baseData.title,
    poster: baseData.poster,
    mediaType: baseData.mediaType,
    id: baseData.id,
  };
}

function toggleFavoriteInfo(
  isFavorite,
  event,
  favorites,
  baseData,
  favoriteObj
) {
  if (isFavorite) {
    favorites = favorites.filter((favorite) => {
      return favorite.id !== baseData.id;
    });
    event.target.src = "./res/icons/star-outlined.png";
    event.target.alt = "Not marked as favorite";
  } else {
    favorites.push(favoriteObj);
    event.target.src = "./res/icons/star-filled.png";
    event.target.alt = "Marked as favorite";
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export { setStarSrc, checkIfFavorite, chooseStarSrc, toggleFavorite };
