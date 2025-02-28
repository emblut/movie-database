import { apiKey } from "../../script.js";

function initCalls() {
  return [
    { name: "details", extension: "", for: ["moive", "tv", "person"] },
    { name: "images", extension: "/images", for: ["movie", "tv", "person"] },
    { name: "videos", extension: "/videos", for: ["movie", "tv"] },
    { name: "similar", extension: "/similar", for: ["movie", "tv"] },
    { name: "reviews", extension: "/reviews", for: ["movie", "tv"] },
    { name: "credits", extension: "/credits", for: ["movie"] },
    { name: "credits", extension: "/aggregate_credits", for: ["tv"] },
    { name: "credits", extension: "/combined_credits", for: ["person"] },
  ];
}

function getPopularMediaUrl(id) {
  return `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id&api_key=${apiKey}`;
}

function buildBaseUrls(media, id) {
  return `https://api.themoviedb.org/3/${media}/${id}?api_key=${apiKey}`;
}

function buildUrls(media, id, urlExtension) {
  return `https://api.themoviedb.org/3/${media}/${id}${urlExtension}?api_key=${apiKey}`;
}

function buildSearchUrl(searchRef, searchTypeRef) {
  return `https://api.themoviedb.org/3/search/${searchTypeRef}?query=${searchRef}&api_key=${apiKey}`;
}

function buildVideoUrl(videoKey) {
  return `https://www.youtube.com/embed/${videoKey}`;
}

function buildCardImgUrl(picturePath) {
  return `https://image.tmdb.org/t/p/${"w300"}${picturePath}`;
}

function buildImgUrl(picturePath) {
  return `https://image.tmdb.org/t/p/${"original"}${picturePath}`;
}


export { initCalls, getPopularMediaUrl, buildBaseUrls, buildUrls, buildSearchUrl, buildVideoUrl, buildCardImgUrl, buildImgUrl };
