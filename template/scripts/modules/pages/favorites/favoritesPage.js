import { setCardsTitle } from "../../components/card/cardDomBuilding.js";
import { getFavoritesFromLS } from "../../components/star/starLocalStorage.js";
import { generateFavoriteCards } from "./favoritesDomCalls.js";

function setupFavorites() {
  setCardsTitle("Your Favorites");
  const favorites = getFavoritesFromLS();
  generateFavoriteCards(favorites);
}

export { setupFavorites };
