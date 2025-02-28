import { getElement } from "../../utils/domUtils.js";
import { redirectToSearch, redirectToFavorite } from "../../navigation.js";

async function initSearchListener() {
  const formRef = getElement("#searchForm");
  formRef.addEventListener("submit", async (event) => {
    event.preventDefault();
    redirectToSearch();
  });
}

function initFavoriteListener() {
  const favButtonRef = getElement("#favBtn");
  favButtonRef.addEventListener("click", async (event) => {
    redirectToFavorite();
  });
}

export { initSearchListener, initFavoriteListener };
