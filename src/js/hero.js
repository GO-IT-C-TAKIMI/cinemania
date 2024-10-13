import { myDetailsFunction } from './popup.js';
import { stars } from './stars.js';

export function hero() {
  const api_key = '3e7bd78082a78694a13d5e52c5addee0';
  const pathname = window.location.pathname;
  const imageContainer = document.getElementById('movies-image-container');
  const descriptionContainer = document.getElementById(
    'movies-description-container'
  );

  const initialContent = () => {
    if (pathname === '/' || pathname === '/catalog.html') {
      imageContainer.innerHTML = '<img class="image" src="./img/stranger_things.jpeg"/>';
      descriptionContainer.innerHTML = `
        <h1 class="hero-movie-title">Let's Make Your Own Cinema</h1>
        <div class="desc-button-container">
          <p class="hero-movie-desc">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
          <div class="hero-movie-buttons">
            <button class="orange-button btn-hero trailer">Get Started</button>
          </div>
        </div>
      `;
    } else {
      imageContainer.innerHTML = '<img class="image" src="./img/seats.png"/>';
      descriptionContainer.innerHTML = `
        <h1 class="hero-movie-title">Create Your Dream Cinema</h1>
        <div class="desc-button-container">
          <p class="hero-movie-desc"> Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.</p>
        </div>
      `;
    }
  };

  const fetchTrendingByDay = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&language=en-US`
      );

      if (!res.ok) {
        initialContent();
        throw new Error('Failed to fetch trending movies');
      }

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
      const movieOverview = movie.overview.split(' ').slice(0, 40).join(' ');
  
      imageContainer.innerHTML += `<img class="image" src="https://image.tmdb.org/t/p/original${movieImage.file_path}" />`;
      descriptionContainer.innerHTML += `
        <h1 class="hero-movie-title">${movie.title}</h1>
        <div class="stars-container" id="starsContainer"></div>
        <div class="desc-button-container">
          <p class="hero-movie-desc">${movieOverview}...</p>
          <div class="hero-movie-buttons">
            <button id="trailer" class="orange-button btn-hero trailer">Watch trailer</button>
            <button id="details" class="white-button btn-hero details">More details</button>
          </div>
        </div>
      `;
      const trailerButton = document.getElementById('trailer');
      const detailsButton = document.getElementById('details');
      const starsContainer = document.getElementById('starsContainer');
  
      // Yıldızları ekleme
      if (movie.vote_average === 0) {
        starsContainer.innerHTML += `<h1>NOT RELEASED YET</h1>`;
        return;
      } else {
        stars.forEach((star) => {
          if (star.name === 'fullStar') {
            starsContainer.innerHTML += star.svg.repeat(fullStars);
          }
          if (star.name === 'halfStar') {
            starsContainer.innerHTML += star.svg.repeat(halfStars);
          }
          if (star.name === 'emptyStar') {
            starsContainer.innerHTML += star.svg.repeat(emptyStars);
          }
        });
      }
  
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
            (result) => result.type === 'Trailer' || result.type === 'Teaser'
          );
  
          if (trailer) {
            modal.innerHTML += `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`;
          } else {
            modal.innerHTML += `<p>No trailer available</p>`; // Fragman yoksa
          }
        } catch (error) {
          console.error('Error fetching trailer:', error);
          modal.innerHTML += `<p>Error loading trailer</p>`;
        }
      });
    } catch (error) {
      console.error('Error displaying movie:', error);
      imageContainer.innerHTML = `<p>Failed to load movie data</p>`;
    }
  };

  fetchTrendingByDay();
}
