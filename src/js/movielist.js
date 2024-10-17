import { myDetailsFunction } from './mydetailsfunction';
import { displayMovieRating } from './displayMovieRating';
import { updateLibraryButton, checkLibrary } from './addRemoveCheck';

export async function movielist() {
  const apiKey = '3e7bd78082a78694a13d5e52c5addee0';
  const apiUrl =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' +
    apiKey;
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  let query = '';
  let year = '';
  const movieGallery = document.getElementById('catalog-movie-gallery');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const pageNumbersContainer = document.querySelector('.page-numbers');
  //search bar
  const showButton = document.getElementById('searchButton');
  const mySelect = document.getElementById('movieYear');
  const searchButton = document.getElementById('searchButton');
  const resultsDiv = document.getElementById('results');

  let totalPages = 100;
  let currentPage = 1;
  let genreMap = {};

  // API'den türleri çekmek için fonksiyon
  async function fetchGenres() {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

    try {
      const response = await fetch(genreUrl);
      const data = await response.json();
      // genreMap'i oluştur
      genreMap = data.genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {});
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  }

  // API'den filmleri getirmek için fonksiyon
  async function fetchMovies(page = 1, query = '', year = '') {
    const apiPage = Math.ceil((page * 9) / 20);

    let url = `${apiUrl}&page=${apiPage}`;
    if (query && !year) {
      url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&page=${apiPage}`;
    } else if (query && year) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&primary_release_year=${year}&page=${apiPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();

      // 9 film göstermek için
      const startIndex = ((page - 1) % 2) * 9;
      const paginatedResults = data.results.slice(startIndex, startIndex + 9);

      displayMovies(paginatedResults);
      totalPages = data.total_pages;
      updatePagination();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  // İlk sayfayı ve film türlerini yükle
  async function init() {
    await fetchGenres(); // Önce türleri çek
    await fetchMovies();
  }

  init(); // Sayfa yüklendiğinde çalışacak
  //--------------------------Filmleri ekrana yerleştirmek için kullanılan fonksiyon---------------------------------------
  function displayMovies(movies) {
    movieGallery.innerHTML = '';

    movies.forEach(movie => {
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
      const genreNames = movie.genre_ids
        .map(id => genreMap[id] || 'Unknown')
        .filter(Boolean);

      movieDetails.textContent = `${genreNames[0]}, ${genreNames[1]} | ${
        movie.release_date.split('-')[0]
      }`;
      movieDetails.classList.add('catalog-movie-details');

      const movieRating = document.createElement('p');
      movieRating.innerHTML = displayMovieRating(movie.vote_average); // Güncel yıldız sistemi
      movieRating.classList.add('catalog-movie-rating');

      movieInfo.appendChild(movieTitle);
      movieDetailsRatingDiv.appendChild(movieDetails);
      movieDetailsRatingDiv.appendChild(movieRating);
      movieInfo.appendChild(movieDetailsRatingDiv);
      movieCard.appendChild(moviePoster);
      movieCard.appendChild(movieInfo);
      movieGallery.appendChild(movieCard);
    });
    const catalogCards = document.querySelectorAll('.catalog-movie-card');
    const popupContainer = document.querySelector('.popup-section-container');
    const body = document.querySelector('body');

    catalogCards.forEach(catalogCard => {
      catalogCard.addEventListener('click', e => {
        const filmId = Number(e.currentTarget.dataset.movieId);
        myDetailsFunction(filmId);
        popupContainer.classList.remove('hidden');
        body.style.overflow = 'hidden';
        const isInLibrary = checkLibrary(filmId);
        updateLibraryButton(isInLibrary, filmId);
      });
    });
  }
  //-----------------------------------------SAYFA NUMARALNADIRMA-----------------------------------------------------

  function updatePagination() {
    pageNumbersContainer.innerHTML = ''; // Önceki sayfa numaralarını temizle

    const totalPageLinks = 3; // Orta kısımda kaç sayfa numarası göstereceğiz
    const sidePageLinks = 1; // Başta ve sonda kaç sayfa göstereceğiz

    // İlk sayfa her zaman gösterilir
    addPageButton(1);

    // Şu anki sayfa sidePageLinks'lerden büyükse araya "..." ekliyoruz
    if (currentPage > sidePageLinks + 2) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      pageNumbersContainer.appendChild(dots);
    }

    // Dinamik olarak sayfa aralığını hesapla ve butonları ekle
    const startPage = Math.max(2, currentPage - Math.floor(totalPageLinks / 2));
    const endPage = Math.min(
      totalPages - 1,
      currentPage + Math.floor(totalPageLinks / 2)
    );

    for (let i = startPage; i <= endPage; i++) {
      addPageButton(i);
    }

    // Eğer sondaki sayfalar gizliyse araya "..." ekliyoruz
    if (currentPage < totalPages - sidePageLinks - 1) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      pageNumbersContainer.appendChild(dots);
    }

    // Son sayfa her zaman gösterilir
    if (totalPages > 1) {
      addPageButton(totalPages);
    }

    // Önceki ve Sonraki sayfa butonlarının durumunu ayarla
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }
  async function addPageButton(pageNum) {
    const pageButton = document.createElement('button');
    pageButton.textContent = pageNum;
    pageButton.classList.add('page-number');

    if (pageNum === currentPage) {
      pageButton.classList.add('active'); // Aktif sayfa vurgulanır
    }

    // Sayfa numarasına tıklanıldığında
    pageButton.addEventListener('click', async () => {
      // Seçilen sayfayı güncelle
      currentPage = pageNum;
      await fetchMovies(currentPage);
      updatePagination(); // Sayfa numaralarını güncelle
    });

    pageNumbersContainer.appendChild(pageButton);
  } //-------------------------------PREV VE NEXT FONSİYONLARI SON------------------------------------------------

  prevPageBtn.addEventListener('click', async () => {
    if (currentPage > 1) {
      currentPage--;
      await fetchMovies(currentPage);
      updatePagination();
    }
  });
  nextPageBtn.addEventListener('click', async () => {
    if (currentPage < totalPages) {
      currentPage++;
      await fetchMovies(currentPage);
      updatePagination();
    }
  });

  ///   SEARCH BAR JS

  // showButton ile select görünürlüğünü değiştiriyoruz

  // Arama işlemi
  let selectedYear = ''; // Seçilen yılı tutmak için değişken
  document.getElementById('movieName').addEventListener('input', () => {
    // Select içeriğini sıfırla ve görünmez yap
    const movieYearSelect = document.getElementById('movieYear');
    movieYearSelect.innerHTML = ''; // Select içeriğini temizle
    mySelect.style.display = 'none'; // Select'i görünmez yap

    // Seçilen yılı temizle
    selectedYear = '';
  });
  // showButton ile select görünürlüğünü değiştiriyoruz
  // Arama işlemi
  searchButton.addEventListener('click', async () => {
    try {
      const movieName = document.getElementById('movieName').value; // Input'tan arama kelimesini al
      selectedYear = document.getElementById('movieYear').value || ''; // Select'ten seçilen yılı al (boş ise '')
      // İlk arama: Eğer select'ten bir yıl seçilmediyse sadece movieName'e göre arama yap
      const searchvideos = async (movieName, selectedYear = '') => {
        return await fetchMovies(1, movieName, selectedYear); // API'yi input ve year ile sorgulama
      };

      // Sorguyu yap ve sonuçları al
      const movies = await searchvideos(movieName, selectedYear);
      if (movies.results.length === 0) {
        mySelect.style.display = 'none';
      } else {
        mySelect.style.display = 'block'; // Görünür yap
      }

      if (Array.isArray(movies.results)) {
        // İlk arama: Select'teki yılı doldur
        if (!selectedYear) {
          // Eğer yıl seçilmemişse yeni yılları al ve select'e ekle
          const years = movies.results
            .map(movie =>
              movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : null
            )
            .filter(year => year !== null); // null değerleri temizle

          const uniqueYears = [...new Set(years)].sort((a, b) => a - b);
          const movieYearSelect = document.getElementById('movieYear');

          if (movieYearSelect.innerHTML === '') {
            // Yılları sadece ilk kez ekle
            uniqueYears.forEach(year => {
              const option = document.createElement('option');
              option.value = year;
              option.text = year;
              movieYearSelect.appendChild(option); // Select elementine yeni option ekleme
            });
          }
        }

        // Sonuçları işleyebilir veya kullanıcıya gösterebilirsin.
      } else {
        console.error('Beklenmeyen sonuç: movies bir dizi değil');
      }
    } catch (error) {
      console.error('Film verilerini işlerken hata:', error);
    }
  });
}
