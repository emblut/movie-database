import { renderTrailers } from "../../components/caroussel.js";
import { getMorePopularCardInfo } from "../../api/apiRequest.js";
import { getDetailsFormatValues } from "../../formatting.js";
import { createCard } from "../../components/card/cardDomBuilding.js";

async function generateRandomTrailers(medias) {
  const set = new Set();
  while (set.size < 5) {
    const randomNumber = Math.floor(Math.random() * medias.length);
    set.add(randomNumber);
  }
  const arr = [...set].forEach((number, i) => {
    renderTrailers(medias[number], i + 1);
  });
}

function generatePopularCards(medias) {
  medias.forEach(async (media) => {
    const result = await getMorePopularCardInfo(media.imdbID);
    const cardInfo = getDetailsFormatValues(result.media_type, result);
    createCard(cardInfo);
  });
}

export { generateRandomTrailers, generatePopularCards };
