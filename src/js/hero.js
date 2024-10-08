export function hero() {
  const api_key = '3e7bd78082a78694a13d5e52c5addee0';

  const imageContainer = document.getElementById('movies-image-container');
  const descriptionContainer = document.getElementById(
    'movies-description-container'
  );


  const fetchTrendingByDay = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&language=en-US`
      );

      const data = await res.json();
      const movies = data.results;
      const filteredMovies = movies.filter(movie => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear >= 2024;
      });
      const randomMovie =
        filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
      displayMovie(randomMovie);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  const displayMovie = async movie => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/images?&api_key=${api_key}`
      );
      const imageData = await res.json();
      const movieImage = imageData.backdrops[0];
      const movieOverview = movie.overview.split(' ').slice(0, 21).join(' ');
      imageContainer.innerHTML += `<img class="image" src="https://image.tmdb.org/t/p/original${movieImage.file_path}" />`;
      descriptionContainer.innerHTML += `<h1 class="movie-title">${movie.title}</h1>
    <ul class="stars">
    <li>x</li>
    <li>x</li>
    <li>x</li>
    <li>x</li>
    <li>x</li>
    </ul>
    <p class="movie-desc">${movieOverview} ...</p>
    <div class="hero-movie-buttons">
    <button id="trailer" class="orange-button btn-hero trailer">Watch trailer</button>
    <button id="details" class="white-button btn-hero details">More details</button>
</div>`;

      const trailerButton = document.getElementById('trailer');
      const detailsButton = document.getElementById('details');
      detailsButton.addEventListener('click', () => {
        console.log('detay butonuna tiklandi');
      })
      trailerButton.addEventListener('click', () => {
        console.log('trailer butonuna tiklandi');
      });

      

    } catch (error) {
      console.error('Error displaying movie:', error);
    }
  };

  fetchTrendingByDay();
}
