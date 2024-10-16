import { myDetailsFunction } from './mydetailsfunction';

export function mylibraryUpdate() {
  const mylibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
  let fetchedMovies = []; // Çekilen filmleri saklayacağımız array.
  const mylibraryContainer = document.querySelector('#mylibrary-container');
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
      renderMovies(); // İlk render.
    } catch (e) {
      console.error('Error fetching films:', e);
    }
  };

  // Filmleri ekrana basan fonksiyon.
  function renderMovies() {
    mylibraryContainer.innerHTML = ''; // Eski içerikleri temizle.

    const nextMovies = fetchedMovies.slice(
      currentIndex,
      currentIndex + moviesPerPage
    );

    nextMovies.forEach(movie => {
      const movieCard = createMovieCard(movie);
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

    const movieDetails = document.createElement('p');
    const genreNames =
      movie.genre_ids?.map(id => genreMap[id] || 'Unknown').filter(Boolean) || [];
    movieDetails.textContent = `${genreNames.join(', ')} | ${
      movie.release_date.split('-')[0]
    }`;
    movieDetails.classList.add('catalog-movie-details');

    const movieRating = document.createElement('p');
    movieRating.classList.add('catalog-movie-rating');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => removeMovie(movie.id));

    movieInfo.appendChild(movieTitle);
    movieInfo.appendChild(movieDetails);
    movieInfo.appendChild(movieRating);
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieInfo);
    movieCard.appendChild(deleteButton);

    movieCard.addEventListener('click', e => {
      if (e.target !== deleteButton) {
        const filmId = Number(e.currentTarget.dataset.movieId);
        myDetailsFunction(filmId);
        document.querySelector('.popup-section-container').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });

    return movieCard;
  }

  // Film silme fonksiyonu.
  function removeMovie(movieId) {
    // FetchedMovies array'inden sil.
    fetchedMovies = fetchedMovies.filter(movie => movie.id !== movieId);
    // localStorage'dan ilgili ID'yi sil.
    const updatedLibrary = mylibrary.filter(id => id !== movieId);
    localStorage.setItem('myLibrary', JSON.stringify(updatedLibrary));

    // Sayfayı yeniden render et.
    currentIndex = 0;
    renderMovies();
  }

  loadMoreButton.addEventListener('click', renderMovies);

  if (mylibrary.length > 0) {
    getMovies();
  } else {
    console.log('Library is empty');
  }
}
