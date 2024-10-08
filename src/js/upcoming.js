export function upcoming() {
    console.log('upcoming sayfasinin js i calisti');

    const apiKey = '3e7bd78082a78694a13d5e52c5addee0';  // API anahtarı eklendi
    const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
    const moviePoster = document.getElementById('movie-poster');
    const movieTitle = document.getElementById('movie-title');
    const releaseDate = document.getElementById('release-date');
    const movieVote = document.getElementById('movie-vote');
    const voteCount = document.getElementById('vote-count');
    const popularity = document.getElementById('popularity');
    const genres = document.getElementById('genres');
    const overview = document.getElementById('overview');
    const addBtn = document.getElementById('add-btn');
    const removeBtn = document.getElementById('remove-btn');

    // API'den upcoming filmleri çek
    fetch(upcomingURL)
      .then(response => response.json())
      .then(data => {
        const films = data.results;
        if (films.length > 0) {
          const randomFilm = films[Math.floor(Math.random() * films.length)];
          displayFilm(randomFilm);
        } else {
          document.querySelector('.upcoming__title').textContent = 'No upcoming movies this month';
        }
      })
      .catch(error => console.error('Error fetching data:', error));

    function displayFilm(film) {
      moviePoster.src = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
      moviePoster.alt = film.title;
      movieTitle.textContent = film.title;
      releaseDate.textContent = film.release_date;
      movieVote.textContent = film.vote_average;
      voteCount.textContent = film.vote_count;
      popularity.textContent = film.popularity;
      genres.textContent = film.genre_ids.join(', ');
      overview.textContent = film.overview;

      // Kütüphanede mi kontrol et
      const isInLibrary = checkLibrary(film.id);
      updateLibraryButton(isInLibrary, film.id);
    }

    function checkLibrary(filmId) {
      const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
      return library.includes(filmId);
    }

    function updateLibraryButton(isInLibrary, filmId) {
      if (isInLibrary) {
        addBtn.classList.add('hidden');
        removeBtn.classList.remove('hidden');
      } else {
        addBtn.classList.remove('hidden');
        removeBtn.classList.add('hidden');
      }

      // Kütüphaneye ekle
      addBtn.addEventListener('click', () => {
        addToLibrary(filmId);
      });

      // Kütüphaneden çıkar
      removeBtn.addEventListener('click', () => {
        removeFromLibrary(filmId);
      });
    }

    function addToLibrary(filmId) {
      let library = JSON.parse(localStorage.getItem('myLibrary')) || [];
      if (!library.includes(filmId)) {
        library.push(filmId);
        localStorage.setItem('myLibrary', JSON.stringify(library));
        updateLibraryButton(true, filmId);
      }
    }

    function removeFromLibrary(filmId) {
      let library = JSON.parse(localStorage.getItem('myLibrary')) || [];
      library = library.filter(id => id !== filmId);
      localStorage.setItem('myLibrary', JSON.stringify(library));
      updateLibraryButton(false, filmId);
    }
}
