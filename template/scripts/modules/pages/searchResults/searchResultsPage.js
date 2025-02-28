import { fetchSearchResults } from "../../api/apiRequest.js";
import { getUrlParams } from "../../utils/utils.js";
import { generateCardSectionTitle, generateSearchCards } from "./searchDomCalls.js";

async function setupSearchPage() {
  const params = getUrlParams(["search", "searchType"]);
  const generalDatas = await fetchSearchResults(params.search, params.searchType);
  generateSearchCards(generalDatas, params.searchType);
  generateCardSectionTitle(params.searchType);
}

export { setupSearchPage, generateSearchCards };
