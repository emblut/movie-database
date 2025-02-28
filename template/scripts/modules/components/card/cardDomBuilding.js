import { initCardClick } from "./cardEventHandling.js";
import {
  getElement,
  createElement,
  appendElement,
} from "../../utils/domUtils.js";
import { buildStarImg } from "../star/starDomBuilding.js";
import { initStarListeners } from "../star/starEventHandling.js";
import { buildCardImgUrl } from "../../api/url.js";

function setCardsTitle(title) {
  const titleRef = getElement("#cardsTitle");
  titleRef.textContent = title;
}

function createCard(baseData) {
  const cardsContainerRef = getCardsContainer();
  const cardRef = buildCard(baseData);
  appendElement(cardsContainerRef, cardRef);
}

function getCardsContainer() {
  const cardsContainerRef = getElement("#cardContainer");
  return cardsContainerRef;
}

function buildCard(baseData) {
  const cardRef = createElement("article");
  cardRef.classList.add("card");
  cardRef.dataset.id = baseData.id;
  appendElement(cardRef, buildCardImgWrapper(baseData));
  appendElement(cardRef, buildCardTitle(baseData));
  initCardClick(cardRef, baseData);
  return cardRef;
}

function buildCardImgWrapper(baseData) {
  const imgWrapperRef = createElement("div");
  imgWrapperRef.classList.add("card-img-wrapper");
  appendElement(imgWrapperRef, buildCardImg(baseData));
  appendElement(imgWrapperRef, buildCardStar(baseData));
  return imgWrapperRef;
}

function buildCardImg(baseData) {
  const imgRef = createElement("img");
  if (baseData.poster) {
    imgRef.src = buildCardImgUrl(baseData.poster)
    imgRef.alt = `${baseData.title} poster.`;
  } else {
    imgRef.src = "./res/icons/missing-poster.png";
    imgRef.alt = "Missing poster";
  }
  return imgRef;
}

function buildCardStar(baseData) {
  const containerRef = buildCardStarContainer();
  const imgRef = buildStarImg(baseData, "card__star");
  appendElement(containerRef, imgRef);
  initStarListeners(containerRef, imgRef, baseData);
  return containerRef;
}

function buildCardStarContainer() {
  const wrapperRef = createElement("div");
  wrapperRef.classList.add("star-icon");
  return wrapperRef;
}

function buildCardTitle(baseData) {
  const titleRef = createElement("h2");
  titleRef.classList.add("card-title");
  titleRef.textContent = baseData.title;
  return titleRef;
}

export { createCard, buildStarImg, setCardsTitle };
