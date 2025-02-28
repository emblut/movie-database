import {
  buildGeneralTextInfo,
  buildMovieDate,
  buildTvDates,
  buildPersonDates,
  buildInfoStar,
  buildDetailsPoster,
  buildDetailsVideo,
  generateGenreSection,
  buildRating,
  buildBonusInfo,
  buildDetailsPicture
} from "./detailsDomBuilding.js";

function chooseMediaDetailsCode(params, allData) {
  if (params.type === "movie") {
    setupMovieDetails(params, allData);
  } else if (params.type === "tv") {
    setupTvDetails(params, allData);
  } else if (params.type === "person") {
    setupPersonDetails(params, allData);
  }
}

function setupMovieDetails(params, allData) {
  buildGeneralTextInfo(allData.details, params.type);
  buildMovieDate(allData.details);
  buildMediaSection(allData, params.type);
  generateGenreSection(allData.details);
  buildRating(allData.details);
  buildCreditSection(allData.credits.crew, params.type);
}

function setupTvDetails(params, allData) {
  buildGeneralTextInfo(allData.details, params.type);
  buildTvDates(allData.details);
  buildMediaSection(allData, params.type);
  generateGenreSection(allData.details);
  buildRating(allData.details);
  buildCreditSection(allData.credits.crew, params.type);
}

function setupPersonDetails(params, allData) {
  buildGeneralTextInfo(allData.details, params.type);
  buildPersonDates(allData.details);
  buildMediaSectionPerson(allData, params.type);
  buildCreditSection(allData.credits.crew, params.type);
}

function buildMediaSection(data, type) {
  buildInfoStar(data, type);
  buildDetailsPoster(data, type);
  buildDetailsVideo(data);
}

function buildMediaSectionPerson(data, type) {
  buildInfoStar(data, type);
  buildDetailsPoster(data, type);
  buildDetailsPicture(data);
}

function buildCreditSection(crew, mediaType) {
  const allJobs = defineJobRoles();
  const jobs = findJobsForMediaType(allJobs, mediaType);
  jobs.forEach((job) => {
    const withTitle = getMediaTypeJobCrew(crew, job.reference, mediaType);
    const rightFormat = checkSingularOrPlural(
      withTitle,
      job.singularName,
      job.pluralName
    );
    buildBonusInfo(withTitle, rightFormat);
  });
}

function defineJobRoles() {
  return [
    {
      reference: "Director",
      singularName: "Director",
      pluralName: "Directors",
      for: ["movie", "tv"],
    },
    {
      reference: "Screenplay",
      singularName: "Writer",
      pluralName: "Writers",
      for: ["movie"],
    },
    {
      reference: "Writer",
      singularName: "Writer",
      pluralName: "Writers",
      for: ["tv"],
    },
  ];
}

function findJobsForMediaType(allJobs, mediaType) {
  return allJobs.filter((job) => {
    return job.for.includes(mediaType);
  });
}

function getMediaTypeJobCrew(crew, workTitle, mediaType) {
  if (mediaType === "movie") {
    return getCrewWithJobMovie(crew, workTitle);
  } else if (mediaType === "tv") {
    return getCrewWithJobTv(crew, workTitle);
  }
}

function getCrewWithJobMovie(crew, workTitle) {
  return crew.filter((member) => {
    return member.job === workTitle;
  });
}

function getCrewWithJobTv(crew, workTitle) {
  return crew.filter((member) => {
    return member.jobs.some((job) => {
      return job.job === workTitle;
    });
  });
}

function checkSingularOrPlural(withTitle, singular, plural) {
  if (withTitle.length === 1) {
    return singular;
  } else if (withTitle.length > 1) {
    return plural;
  } else return null;
}

export { chooseMediaDetailsCode };
