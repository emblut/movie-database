import {
  getElement,
  appendElement,
  createElement,
  getElementsArr,
} from "../../utils/domUtils.js";
import { initStarListeners } from "../../components/star/starEventHandling.js";
import { buildStarImg } from "../../components/card/cardDomBuilding.js";
import {
  getDetailsFormatValues,
  getImagesFormat,
  getSortedVideo,
  getSortedPictures,
  getPosterFormat
} from "../../formatting.js";

import { buildImgUrl, buildVideoUrl } from "../../api/url.js";

function changePageTitle(title) {
  const titleRef = getElement("title");
  titleRef.textContent = title;
}

function buildInfoStar(allData, type) {
  const imgWrapperRef = buildInfoStarWrapper();
  const baseData = getDetailsFormatValues(type, allData.details);
  const imgRef = buildStarImg(baseData, "media__fav-star");
  appendElement(imgWrapperRef, imgRef);
  initStarListeners(imgWrapperRef, imgRef, baseData);
}

function buildInfoStarWrapper() {
  return getElement("#infoStarIconWrapper");
}

function getTextDomElements() {
  const elementsToGet = ["#heading", "#firstTextInfo", "#description"];
  return getElementsArr(elementsToGet);
}

function buildGeneralTextInfo(details, mediaType) {
  const domElements = getTextDomElements(details);
  const textValues = initTextValues(details, mediaType);
  buildDetailsTextContent(domElements, textValues);
}

function initTextValues(details, mediaType) {
  const textValues = {
    movie: [details.title, details.original_title, details.overview],
    tv: [details.name, details.orignal_name, details.overview],
    person: [details.name, details.known_for_department, details.biography],
  };
  return textValues[mediaType];
}

function buildDetailsTextContent(elements, values) {
  elements.forEach((element, i) => {
    element.textContent = values[i];
  });
}

function buildMovieDate(details) {
  const dateContainer = buildDetailsDateContainer();
  const releaseDateRef = buildMovieDateText(details);
  appendElement(dateContainer, releaseDateRef);
  appendElement(getElement(".media__top-text-container"), dateContainer);
}

function buildMovieDateText(details) {
  const releaseDateRef = createElement("p");
  releaseDateRef.classList.add("date");
  releaseDateRef.textContent = details.release_date;
  return releaseDateRef;
}

function buildTvDates(details) {
  buildFirstAirDate(details);
  if (details.last_air_date) {
    buildLastAirDate(details);
  }
}

function buildFirstAirDate(details) {
  const datesContainer = buildDetailsDateContainer();
  const firstAirDateRef = buildFirstAirDateText(details);
  appendElement(datesContainer, firstAirDateRef);
  appendElement(getElement(".media__top-text-container"), datesContainer);
}

function buildDetailsDateContainer() {
  const datesContainer = createElement("div");
  datesContainer.classList.add("media__dates-container");
  return datesContainer;
}

function buildFirstAirDateText(details) {
  const firstAirDateRef = createElement("p");
  firstAirDateRef.classList.add("date");
  firstAirDateRef.textContent = details.first_air_date;
  return firstAirDateRef;
}

function buildLastAirDate(details) {
  appendElement(
    getElement(".media__dates-container"),
    buildLastAirDateText(details)
  );
}

function buildLastAirDateText(details) {
  const lastAirDateRef = createElement("p");
  lastAirDateRef.classList.add("date");
  lastAirDateRef.textContent = ` - ${details.last_air_date}`;
  return lastAirDateRef;
}

function buildPersonDates(details) {
  buildBirthDate(details);
  if (details.deathday) {
    buildDeathDate(details);
  }
  buildBirthPlace(details);
}

function buildBirthDate(details) {
  const datesContainer = buildDetailsDatesContainer();
  const dateRef = buildBirthDateText(details);
  appendElement(datesContainer, dateRef);
  appendElement(getElement(".media__top-text-container"), datesContainer);
}

function buildDetailsDatesContainer() {
  const datesContainer = createElement("div");
  datesContainer.classList.add("media__dates-container");
  return datesContainer;
}

function buildBirthDateText(details) {
  const dateRef = createElement("p");
  dateRef.classList.add("date");
  dateRef.textContent = details.birthday;
  return dateRef;
}

function buildDeathDate(details) {
  appendElement(
    getElement(".media__dates-container"),
    buildDeathDateText(details)
  );
}

function buildDeathDateText(details) {
  const dateRef = createElement("p");
  dateRef.classList.add("date");
  dateRef.textContent = ` - ${details.deathday}`;
  return dateRef;
}

function buildBirthPlace(details) {
  appendElement(
    getElement(".media__top-text-container"),
    buildBirthPlaceText(details)
  );
}

function buildBirthPlaceText(details) {
  const birthPlaceRef = createElement("p");
  birthPlaceRef.classList.add("media__birth-place");
  birthPlaceRef.textContent = details.place_of_birth;
  return birthPlaceRef;
}

function buildDetailsPoster(allData, type) {
  const imgsFormat = getImagesFormat(type);
  const posters = getPosterFormat()
  const poster = getElement(posters.activePoster);
  const inactivePoster = getElement(posters.inactivePoster)
  inactivePoster.alt = 'Currently inactive poster'
  if (allData.images[imgsFormat.imgs].length !== 0) {
    poster.src = buildImgUrl(allData.images[imgsFormat.imgs][0].file_path);
    const formats = getDetailsFormatValues(type, allData.details);
    poster.alt = `Poster of ${formats.title}`;
    return poster;
  } else {
    poster.src = "./res/icons/missing-poster.png";
    poster.alt = "Missing poster";
  }
}

function buildDetailsVideo(allData) {
  const containerRef = getElement("#mainVideoOrImg");
  if (allData.videos.results.length !== 0) {
    const videoRef = createElement("iframe");
    videoRef.classList.add("main-visual__video");
    const video = getSortedVideo(allData.videos.results);
    videoRef.src = buildVideoUrl(video.key);
    videoRef.title = allData.videos.results[0].name;
    videoRef.frameBorder = "0";
    videoRef.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    videoRef.allowFullscreen = true;
    appendElement(containerRef, videoRef);
  } else {
    const pictureRef = createElement("img");
    pictureRef.classList.add("main-visual__picture");
    if (allData.details.backdrop_path) {
      pictureRef.src = buildImgUrl(allData.details.backdrop_path);
      appendElement(containerRef, pictureRef);
    } else {
      pictureRef.src = "./res/icons/missing-backdrop.png";
      pictureRef.alt = "Missing backdrop";
    }
    appendElement(containerRef, pictureRef);
  }
}

function buildDetailsPicture(data) {
  const containerRef = document.querySelector("#mainVideoOrImg");
  const pictureRef = createElement("img");
  pictureRef.classList.add("main-visual__picture");
  const sortedPictures = getSortedPictures(data.credits);
  if (sortedPictures) {
    pictureRef.src = buildImgUrl(sortedPictures[0].backdrop_path);
    pictureRef.alt = `Picture from ${sortedPictures[0].name}`;
    appendElement(containerRef, pictureRef);
  } else {
    pictureRef.src = "./res/icons/missing-backdrop.png";
    pictureRef.alt = "Missing backdrop";
  }
}

function generateGenreSection(details) {
  const sectionRef = getElement("#genreSection");
  details.genres.forEach((genre) => {
    const genreElemRef = createElement("div");
    genreElemRef.classList.add("genre-section__container");
    const genreTextRef = createElement("p");
    genreTextRef.classList.add("genre-section__genre");
    genreTextRef.textContent = genre.name;
    appendElement(genreElemRef, genreTextRef);
    appendElement(sectionRef, genreElemRef);
  });
}

function buildRating(details) {
  const containerRef = getElement("#rating");
  appendElement(containerRef, buildRatingTopContainer(details));
  appendElement(containerRef, buildRatingAmount(details));
}

function buildRatingTopContainer(details) {
  const containerRef = createElement("div");
  containerRef.classList.add("rating__top-container");
  appendElement(containerRef, buildRatingStarImg());
  appendElement(containerRef, buildRatingTextContainer(details));
  return containerRef;
}

function buildRatingStarImg() {
  const starRef = createElement("img");
  starRef.classList.add("rating__star");
  starRef.src = "./res/icons/star-filled.png";
  starRef.alt = "Favorite star";
  return starRef;
}

function buildRatingTextContainer(details) {
  const containerRef = createElement("div");
  containerRef.classList.add("rating__score-text");
  appendElement(containerRef, buildRatingScore(details));
  appendElement(containerRef, buildRatingOutOf());
  return containerRef;
}

function buildRatingScore(details) {
  const scoreRef = createElement("h2");
  scoreRef.classList.add("rating__score");
  const score = Math.round(details.vote_average * 10) / 10;
  scoreRef.textContent = score;
  return scoreRef;
}

function buildRatingOutOf() {
  const outOfRef = createElement("p");
  outOfRef.classList.add("rating__out-of");
  outOfRef.textContent = `/10`;
  return outOfRef;
}

function buildRatingAmount(details) {
  const votesRef = createElement("p");
  votesRef.classList.add("rating__amount");
  votesRef.setAttribute("votes-tooltip", "Amount of votes");
  votesRef.textContent = details.vote_count;
  return votesRef;
}

function buildBonusInfo(withTitle, label) {
  const wrapperRef = getBonusInfoWrapper();
  const containerRef = buildBonusInfoContainer();
  const labelRef = buildBonusInfoLabel(label);
  appendElement(containerRef, labelRef);
  appendElement(wrapperRef, containerRef);
  generateBonusInfoValues(withTitle, containerRef);
}

function getBonusInfoWrapper() {
  const wrapperRef = getElement("#bonusInfoWrapper");
  return wrapperRef;
}

function buildBonusInfoContainer() {
  const containerRef = createElement("div");
  containerRef.classList.add("bonus-info");
  return containerRef;
}

function buildBonusInfoLabel(label) {
  const labelRef = createElement("p");
  labelRef.classList.add("bonus-info__title");
  labelRef.textContent = label;
  return labelRef;
}

function generateBonusInfoValues(withTitle, containerRef) {
  withTitle.forEach((member, index) => {
    const nameRef = createElement("p");
    nameRef.classList.add("bonus-info__text");
    nameRef.textContent = `${member.name}`;
    appendElement(containerRef, nameRef);
    if (index !== withTitle.length - 1) {
      const dotRef = createElement("p");
      dotRef.classList.add("bonus-info__dot");
      dotRef.textContent = "•";
      appendElement(containerRef, dotRef);
    }
  });
}

export {
  buildInfoStar,
  buildGeneralTextInfo,
  getTextDomElements,
  initTextValues,
  buildDetailsTextContent,
  buildDetailsPoster,
  buildDetailsVideo,
  generateGenreSection,
  buildBonusInfo,
  getElementsArr,
  buildRating,
  buildDetailsPicture,
  buildMovieDate,
  buildTvDates,
  buildPersonDates,
  changePageTitle,
};
