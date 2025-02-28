function getPopularMediaData(mediaData) {
  const mediaTypes = ["movie", "tv", "person"];
  for (const type of mediaTypes) {
    const results = `${type}_results`;
    if (mediaData[results].length !== 0) {
      return mediaData[results][0];
    }
  }
}

function getDetailsFormatValues(mediaType, data) {
  if (mediaType === "movie") {
    return {
      id: data.id,
      mediaType: mediaType,
      title: data.title,
      poster: data.poster_path,
      release: data.release_date,
    };
  } else if (mediaType === "tv") {
    return {
      id: data.id,
      mediaType: mediaType,
      title: data.name,
      poster: data.poster_path,
      release: data.first_air_date,
    };
  } else if (mediaType === "person") {
    return {
      id: data.id,
      mediaType: mediaType,
      title: data.name,
      poster: data.profile_path,
    };
  }
}

function getImagesFormat(mediaType) {
  if (mediaType === "movie") {
    return {
      imgs: "posters",
    };
  } else if (mediaType === "tv") {
    return {
      imgs: "posters",
    };
  } else if (mediaType === "person") {
    return {
      imgs: "profiles",
    };
  }
}

function getSortedVideo(videos) {
  const officialTrailer = videos.find((video) => {
    return video.type === "Trailer" && video.official === true;
  });
  if (officialTrailer) {
    return officialTrailer;
  } else {
    const trailer = videos.find((video) => {
      return video.type === "Trailer";
    });
    if (trailer) {
      return trailer;
    } else {
      return videos[0];
    }
  }
}

function getSortedPictures(credits) {
  const castPictures = credits.cast.filter((picture) => {
    return picture.backdrop_path;
  });
  if (castPictures) {
    return castPictures.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
  } else {
    const crewPictures = credits.crew.filter((picture) => {
      return picture.backdrop_path;
    });
    if (crewPictures) {
      return castPictures.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
    } else {
      return null;
    }
  }
}

function getPosterFormat() {
  const screenWith = window.innerWidth;
  if (screenWith <= 600) {
    return {
      activePoster: "#smallPoster",
      inactivePoster: "#mainPoster",
    };
  } else {
    return {
      activePoster: "#mainPoster",
      inactivePoster: "#smallPoster",
    };
  }
}

function getSearchForm() {
  const screenWith = window.innerWidth;
  if (screenWith <= 600) {
    return "#smallSearchForm";
  } else {
    return "#searchForm";
  }
}


export {
  getPopularMediaData,
  getDetailsFormatValues,
  getImagesFormat,
  getSortedVideo,
  getSortedPictures,
  getPosterFormat,
  getSearchForm
};
