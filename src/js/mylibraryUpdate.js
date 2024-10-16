import { myDetailsFunction } from './popup';
export function mylibraryUpdate() {
  const mylibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    console.log(mylibrary)
  const getId = async mylibrary => {
    try {
      const filmPromises = mylibrary.map(async filmID => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${filmID}?api_key=3e7bd78082a78694a13d5e52c5addee0&language=en-US`
        );
        if (!res.ok) throw new Error('API request failed'); // Hata kontrolü
        return res.json();
      });

      const films = await Promise.all(filmPromises);
      displayMovies(films); // Filmleri gösterme fonksiyonuna gönder
    } catch (e) {
      console.error('Error fetching films:', e);
    }
  };

  if (mylibrary.length > 0) {
    getId(mylibrary);
  } else {
    console.log('empty');
  }

  let currentIndex = 0; // Gösterilen film sayısını takip eder
  const moviesPerPage = 9; // Her seferde gösterilecek film sayısı

  function displayMovies(movies = []) {
    if (!Array.isArray(movies) || movies.length === 0) {
      console.log('No movies to display');
      return;
    }

    const mylibraryContainer = document.querySelector('#mylibrary-container');
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    mylibraryContainer.innerHTML = ''; // Eski içerikleri temizler

    // Eğer film sayısı 9'dan az ise butonu oluşturma
    if (movies.length <= moviesPerPage) {
      renderMovies(movies); // Tüm filmleri direkt göster
      return;
    }

    const loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.classList.add('load-more-button');

    function renderMovies() {
      const nextMovies = movies.slice(
        currentIndex,
        currentIndex + moviesPerPage
      );

      nextMovies.forEach(movie => {
        if (!movie) return; // Boş veri durumunda koruma
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
          movie.genre_ids
            ?.map(id => genreMap[id] || 'Unknown')
            .filter(Boolean) || [];
        movieDetails.textContent = `${genreNames.join(', ')} | ${
          movie.release_date.split('-')[0]
        }`;
        movieDetails.classList.add('catalog-movie-details');

        const movieRating = document.createElement('p');
        movieRating.classList.add('catalog-movie-rating');

        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieDetails);
        movieInfo.appendChild(movieRating);
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieInfo);
        mylibraryContainer.appendChild(movieCard);
      });

      currentIndex += moviesPerPage;

      if (currentIndex >= movies.length) {
        loadMoreButton.classList.add('hidden'); // Filmler bittiğinde butonu gizle
      }
      const catalogCards = document.querySelectorAll('.catalog-movie-card');
      const popupContainer = document.querySelector('.popup-section-container');
      const body = document.querySelector('body');

      catalogCards.forEach(catalogCard => {
        catalogCard.addEventListener('click', e => {
          const filmId = Number(e.currentTarget.dataset.movieId);
          myDetailsFunction(filmId);
          popupContainer.classList.remove('hidden');
          body.style.overflow = 'hidden';
        });
      });
    }

    renderMovies(); // İlk 9 filmi göster

    loadMoreButton.addEventListener('click', renderMovies); // Butona tıklandığında 9 film daha göster
    document.body.appendChild(loadMoreButton); // Butonu sayfaya ekle
  }
}
