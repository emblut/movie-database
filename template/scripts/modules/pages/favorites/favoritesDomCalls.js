import { createCard } from "../../components/card/cardDomBuilding.js";

function generateFavoriteCards(favorites) {
  favorites.forEach((baseInfo) => {
    createCard(baseInfo);
  });
}

export { generateFavoriteCards };
