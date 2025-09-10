export const apiKey = "";

import { setupHomePage } from "./modules/pages/home/homePage.js";
import { setupSearchPage } from "./modules/pages/searchResults/searchResultsPage.js";
import { setupInfoPage } from "./modules/pages/mediaDetails/detailsPage.js";
import { setupFavorites } from "./modules/pages/favorites/favoritesPage.js";

handlePageRouting();

function handlePageRouting() {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/template/index.html"
  ) {
    setupHomePage();
  } else if (window.location.pathname === "/template/favorites.html") {
    setupFavorites();
  } else if (window.location.pathname === "/template/details.html") {
    setupInfoPage();
  } else if (window.location.pathname === "/template/search.html") {
    setupSearchPage();
  }
}
