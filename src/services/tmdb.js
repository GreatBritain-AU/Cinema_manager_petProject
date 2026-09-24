const API_KEY = "8a476b51e88694ba317450f8093d10c0";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Получение деталей фильма + постера + описания + состава
export const fetchMovieDetails = async (title, year) => {
  try {
    const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      title,
    )}${year ? `&year=${year}` : ""}&language=en-US`;

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (!searchData.results || searchData.results.length === 0) {
      return null;
    }

    const movieId = searchData.results[0].id;

    const detailsUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits&language=en-US&include_image_language=en,null`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const poster = detailsData.poster_path
      ? `${IMAGE_BASE_URL}${detailsData.poster_path}`
      : null;

    const directors = detailsData.credits?.crew
      ?.filter((person) => person.job === "Director")
      .map((person) => person.name)
      .join(", ");

    const cast = detailsData.credits?.cast?.slice(0, 5).map((actor) => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profilePath: actor.profile_path
        ? `${IMAGE_BASE_URL}${actor.profile_path}`
        : null,
    }));

    // studios теперь внутри try, где доступна detailsData
    const studios = detailsData.production_companies
      ?.map((company) => company.name)
      .join(", ");

    return {
      overview: detailsData.overview || "No overview available.",
      poster,
      rating: detailsData.vote_average?.toFixed(1),
      runtime: detailsData.runtime ? `${detailsData.runtime} min.` : "—",
      directors: directors || "—",
      studios: studios || "—",
      cast: cast || [],
      genres: detailsData.genres?.map((g) => g.name).join(", "),
    };
  } catch (error) {
    console.error("Error fetching movie details from TMDB:", error);
    return null;
  }
};

// Поиск фотографии актера / режиссера по имени
export const fetchPersonImage = async (name) => {
  try {
    const searchUrl = `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
      name,
    )}&language=en-US`;

    const res = await fetch(searchUrl);
    const data = await res.json();

    if (
      data.results &&
      data.results.length > 0 &&
      data.results[0].profile_path
    ) {
      return `${IMAGE_BASE_URL}${data.results[0].profile_path}`;
    }
    return null;
  } catch (error) {
    console.error("Error fetching person image from TMDB:", error);
    return null;
  }
};
