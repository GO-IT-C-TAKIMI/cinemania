import { checkLibrary, updateLibraryButton } from './addRemoveCheck.js';
export function upcoming() { 
    console.log('upcoming sayfasinin js i calisti');

    const apiKey = '3e7bd78082a78694a13d5e52c5addee0';  // API anahtarı
    const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US`;
    const genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`; // Genre listesini almak için
    const moviePoster = document.getElementById('movie-poster');
    const movieTitle = document.getElementById('movie-title');
    const releaseDate = document.getElementById('release-date');
    const movieVote = document.getElementById('vote-average');
    const voteCount = document.getElementById('vote-count');
    const popularity = document.getElementById('popularity');
    const genres = document.getElementById('genres');
    const overview = document.getElementById('overview'); 

    let genreMap = {}; // Genre ID'lerini isimlerle eşleştirmek için

    // Genre listesini çek
    fetch(genreURL)
      .then(response => response.json())
      .then(data => {
        data.genres.forEach(genre => {
          genreMap[genre.id] = genre.name;  // Genre ID'lerini isimlere eşleştir
        });

        // Ardından upcoming filmleri çek
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
          .catch(error => console.error('Error fetching movies:', error));
      })
      .catch(error => console.error('Error fetching genres:', error));

    function displayFilm(film) {
      moviePoster.src = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
      moviePoster.alt = film.title;
      movieTitle.textContent = film.title;
      releaseDate.textContent = film.release_date;
      movieVote.textContent = film.vote_average;
      voteCount.textContent = film.vote_count;
      popularity.textContent = film.popularity;

      // Genre ID'lerini isimlerle değiştir
      genres.textContent = film.genre_ids.map(id => genreMap[id]).join(', ');

      // Eğer overview (açıklama) mevcutsa ekrana bas, yoksa boş bırak veya alternatif mesaj göster
      if (film.overview && film.overview.trim() !== "") {
        overview.textContent = film.overview;
      } else {
        overview.textContent = 'No overview available for this movie.';
      }

      // Kütüphanede mi kontrol et
      const isInLibrary = checkLibrary(film.id);
      updateLibraryButton(isInLibrary, film.id);
    }

}
