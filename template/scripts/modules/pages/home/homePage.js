import { fetchPopularMedias } from "../../api/apiRequest.js";
import {
  generateRandomTrailers,
  generatePopularCards,
} from "./homeDomCalls.js";
import { setCardsTitle } from "../../components/card/cardDomBuilding.js";
import {
  initSearchListener,
  initFavoriteListener,
} from "./homeEventHandling.js";

async function setupHomePage() {
  const medias = await fetchPopularMedias();
  generateRandomTrailers(medias);
  setCardsTitle("Our Recommendations");
  generatePopularCards(medias);
  initSearchListener();
  initFavoriteListener();
}

export { setupHomePage };
