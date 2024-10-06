const API_KEY = import.meta.env.TMDB_API_KEY;
const BASE_URL = import.meta.env.TMDB_API_URL;

export async function getMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  return data.results;
}
