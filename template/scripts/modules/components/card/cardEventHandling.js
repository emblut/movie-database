import { redirectTodetails } from "../../navigation.js";

function initCardClick(cardRef, baseData) {
  cardRef.addEventListener("click", () => {
    redirectTodetails(baseData);
  });
}

export { initCardClick };
