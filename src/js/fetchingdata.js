export async function getMovies() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_API_URL;
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return JSON.stringify(data);
}

export async function fetchMovies() {
  try {
    const movies = await getMovies();
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

fetchMovies();
