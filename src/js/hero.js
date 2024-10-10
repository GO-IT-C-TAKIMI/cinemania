import { myDetailsFunction } from './popup.js';
import { stars } from './stars.js';

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
    const rating = (movie.vote_average / 2).toFixed(1);
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/images?&api_key=${api_key}&language=en&language=null`
      );
      const imageData = await res.json();
      const movieImage =
        imageData.backdrops[
          Math.floor(Math.random() * imageData.backdrops.length)
        ];
      const movieOverview = movie.overview.split(' ').slice(0, 21).join(' ');

      imageContainer.innerHTML += `<img class="image" src="https://image.tmdb.org/t/p/original${movieImage.file_path}" />`;
      descriptionContainer.innerHTML += `
        <h1 class="movie-title">${movie.title}</h1>
        <div class="stars-container" id="starsContainer"></div>
        <p class="movie-desc">${movieOverview}...</p>
      <div class="hero-movie-buttons">
        <button id="trailer" class="orange-button btn-hero trailer">Watch trailer</button>
        <button id="details" class="white-button btn-hero details">More details</button>
      </div>
      `;
      const trailerButton = document.getElementById('trailer');
      const detailsButton = document.getElementById('details');
      const starsContainer = document.getElementById('starsContainer');

      
        if(movie.vote_average === 0){
          starsContainer.innerHTML += `<h1>NOT REALESED YET</h1>`;
          return;
        }else if (stars.map(star => {
          if (star.name === 'fullStar') {
            starsContainer.innerHTML += star.svg.repeat(fullStars);
          }
          if (star.name === 'halfStar') {
            starsContainer.innerHTML += star.svg.repeat(halfStars);
          }
          if (star.name === 'emptyStar') {
            starsContainer.innerHTML += star.svg.repeat(emptyStars);
          }
        }));

      detailsButton.addEventListener('click', () => {
        const movieID = movie.id;
        myDetailsFunction(movieID);
      });

      trailerButton.addEventListener('click', async () => {
        modal.innerHTML = '';
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${api_key}&language=en-US`
          );
          const data = await res.json();
          const trailer = data.results.find(
            result => result.type === 'Trailer' || result.type === 'Teaser'
          );
          modal.innerHTML += `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`;
        } catch (error) {
          console.error('Error fetching trailer:', error);
        }
      });
    } catch (error) {
      console.error('Error displaying movie:', error);
    }
  };

  fetchTrendingByDay();
}
