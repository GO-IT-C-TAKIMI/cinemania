import { myDetailsFunction } from './mydetailsfunction';
import { updateLibraryButton, checkLibrary, removeFromLibrary } from './addRemoveCheck';
import { displayMovieRating } from './displayMovieRating';

export function mylibraryUpdate() {
  const mylibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
  let fetchedMovies = [];
  const mylibraryContainer = document.querySelector('#catalog-movie-gallery');
  const loadMoreButton = document.querySelector('.load-more-button');
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  let currentIndex = 0;
  const moviesPerPage = 9;

  // Başlangıçta API'den tüm filmleri çek.
  const getMovies = async () => {
    try {
      const filmPromises = mylibrary.map(async filmID => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${filmID}?api_key=3e7bd78082a78694a13d5e52c5addee0&language=en-US`
        );
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      });

      fetchedMovies = await Promise.all(filmPromises);
      console.log(fetchedMovies);
      renderMovies();
    } catch (e) {
      console.error('Error fetching films:', e);
    }
  };

  function renderMovies() {
    const nextMovies = fetchedMovies.slice(
      currentIndex,
      currentIndex + moviesPerPage
    );

    nextMovies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      console.log(movie);
      mylibraryContainer.appendChild(movieCard);
    });

    currentIndex += moviesPerPage;

    if (currentIndex >= fetchedMovies.length) {
      loadMoreButton.classList.add('hidden');
    }
  }

  // Film kartını oluşturan fonksiyon.
  function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('catalog-movie-card');
    movieCard.dataset.movieId = movie.id;

    const moviePoster = document.createElement('img');
    moviePoster.src = imageBaseUrl + movie.poster_path;
    moviePoster.alt = movie.title;
    moviePoster.classList.add('catalog-movie-poster');

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('catalog-movie-info');

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.title;
    movieTitle.classList.add('catalog-movie-title');

    const movieDetailsRatingDiv = document.createElement('div');
    movieDetailsRatingDiv.classList.add('catalog-movie-details-rating');

    const movieDetails = document.createElement('p');
    const genreNames = movie.genres.map(genre => genre.name);
    movieDetails.textContent = `${genreNames[0]}, ${genreNames[1]} | ${
      movie.release_date.split('-')[0]
    }`;
    movieDetails.classList.add('catalog-movie-details');

    const movieRating = document.createElement('p');
    movieRating.innerHTML = displayMovieRating(movie.vote_average);
    movieRating.classList.add('catalog-movie-rating');

    movieInfo.appendChild(movieTitle);
    movieDetailsRatingDiv.appendChild(movieDetails);
    movieDetailsRatingDiv.appendChild(movieRating);
    movieInfo.appendChild(movieDetailsRatingDiv);
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieInfo);

    movieCard.addEventListener('click', () => {
      myDetailsFunction(movie.id);
      document
        .querySelector('.popup-section-container')
        .classList.remove('hidden');
      document.body.style.overflow = 'hidden';
  
      const isInLibrary = checkLibrary(movie.id);
      updateLibraryButton(isInLibrary, movie.id);
    });

    return movieCard;
  }
  loadMoreButton.addEventListener('click', renderMovies);
  if (mylibrary.length > 0) {
    getMovies();
  } else {
    console.log('Library is empty');
  }
}
