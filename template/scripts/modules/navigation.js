import { getElement } from "./utils/domUtils.js";

function navigateTo(href) {
  window.location.href = href;
}

function redirectToSearch() {
  const inputRef = getElement("#searchInput").value;
  const dropdownRef = getElement("#typeDropDown").value;
  navigateTo(`http://127.0.0.1:5502/template/search.html?search=${inputRef}&searchType=${dropdownRef}
`);
}

function redirectToFavorite() {
  navigateTo(`http://127.0.0.1:5502/template/favorites.html`);
}

function redirectTodetails(baseData) {
  console.log(baseData);
  navigateTo(
    `http://127.0.0.1:5502/template/details.html?type=${baseData.mediaType}&id=${baseData.id}`
  );
}

export { navigateTo, redirectToSearch, redirectToFavorite, redirectTodetails };
