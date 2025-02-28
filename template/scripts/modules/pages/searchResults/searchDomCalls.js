import {
  setCardsTitle,
  createCard,
} from "../../components/card/cardDomBuilding.js";
import { getDetailsFormatValues } from "../../formatting.js";

function generateCardSectionTitle(searchTypeRef) {
  if (searchTypeRef === "multi") {
    setCardsTitle("All Results");
  } else if (searchTypeRef === "movie") {
    setCardsTitle("Movie Results");
  } else if (searchTypeRef === "tv") {
    setCardsTitle("TV-series Results");
  } else if (searchTypeRef === "person") {
    setCardsTitle("People Results");
  }
}

function generateSearchCards(generalDatas, searchType) {
  generalDatas.forEach(async (generalData) => {
    let mediaType = searchType;
    if (searchType === "multi") {
      mediaType = generalData.media_type;
    }
    const baseData = getDetailsFormatValues(mediaType, generalData);
    createCard(baseData);
  });
}

export { generateCardSectionTitle, generateSearchCards };
