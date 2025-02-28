import { changePageTitle } from "./detailsDomBuilding.js";
import { getUrlParams } from "../../utils/utils.js";
import { initCalls } from "../../api/url.js";
import { fetchRightMediaData } from "../../api/apiRequest.js";
import { getDetailsFormatValues } from "../../formatting.js";
import { chooseMediaDetailsCode } from "./detailsDomCalls.js";

async function setupInfoPage() {
  const params = getUrlParams(["id", "type"]);
  const calls = initCalls();
  const allData = await fetchRightMediaData(calls, params.type, params.id);
  const formats = getDetailsFormatValues(params.type, allData.details);
  changePageTitle(`${formats.title} - My Movie Databse`);
  chooseMediaDetailsCode(params, allData);
}

export { setupInfoPage };
