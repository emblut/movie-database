import {
  getPopularMediaUrl,
  buildSearchUrl,
  buildBaseUrls,
  buildUrls,
} from "./url.js";
import { getPopularMediaData } from "../formatting.js";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Something went wrong: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

async function getMorePopularCardInfo(id) {
  try {
    const data = await fetchPopularCardTMDB(id);
    const realData = getPopularMediaData(data);
    return realData;
  } catch (error) {
    console.error("Error fetching popular media info:", error.message);
    return null;
  }
}

async function fetchPopularCardTMDB(id) {
  try {
    return await fetchData(getPopularMediaUrl(id));
  } catch (error) {
    console.error("Error fetching popular TMDB card data:", error.message);
    return null;
  }
}

async function fetchSearchResults(searchRef, searchTypeRef) {
  try {
    const data = await fetchData(buildSearchUrl(searchRef, searchTypeRef));
    if (data === null) {
      return [];
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    return [];
  }
}

function fetchPopularMedias() {
  try {
    return fetchData("https://santosnr6.github.io/Data/favoritemovies.json");
  } catch (error) {
    console.error("Error fetching media:", error.message);
    return [];
  }
}

async function fetchRightMediaData(calls, type, id) {
  let data = {};
  data.details = await fetchData(buildBaseUrls(type, id));
  for (const call of calls) {
    if (call.for.includes(type)) {
      data[call.name] = await fetchData(buildUrls(type, id, call.extension));
    }
  }
  return data;
}

export {
  fetchData,
  getMorePopularCardInfo,
  fetchPopularCardTMDB,
  fetchSearchResults,
  fetchPopularMedias,
  fetchRightMediaData,
};
