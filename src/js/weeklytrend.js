const apiKey = '3e7bd78082a78694a13d5e52c5addee0';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + apiKey;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const movieGallery = document.getElementById('movie-gallery-trend');

let totalPages = 1;
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
        console.log(genreMap);
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

// API'den filmleri getirmek için fonksiyon
async function fetchMovies(page = 1, query = '') {
    const apiPage = Math.ceil(page * 3 / 20); // Sayfa başına 3 film için düzenlendi.

    let url = `${apiUrl}&page=${apiPage}`;
    if (query) {
        url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&page=${apiPage}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 3 film göstermek için
        const startIndex = ((page - 1) % 2) * 3;
        const paginatedResults = data.results.slice(startIndex, startIndex + 3);

        displayMovies(paginatedResults);
        totalPages = Math.ceil(data.total_results / 3); // Sayfa sayısını 3 filme göre güncelledik
        updatePagination();
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// İlk sayfayı ve film türlerini yükle
async function init() {
    await fetchGenres(); // Önce türleri çek
    fetchMovies();
}

init(); // Sayfa yüklendiğinde çalışacak

//-----------------------------------------yıldızlama fonksiyonu--------------------------------------------------------

function displayMovieRating(vote_average) {
    const maxStars = 5;
    const fullStars = Math.floor(vote_average / 2);
    const hasHalfStar = (vote_average % 2) >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    const fullStarSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.852 16.8746C13.7336 16.875 13.6181 16.8381 13.5219 16.7691L9.00048 13.4911L4.47903 16.7691C4.38243 16.8392 4.26606 16.8767 4.14673 16.8762C4.0274 16.8758 3.91129 16.8374 3.81521 16.7667C3.71912 16.6959 3.64803 16.5964 3.61221 16.4826C3.57639 16.3688 3.5777 16.2465 3.61594 16.1335L5.37938 10.9103L0.809069 7.77612C0.710073 7.70831 0.635356 7.61062 0.595836 7.49732C0.556316 7.38402 0.554063 7.26105 0.589407 7.14638C0.624751 7.0317 0.695839 6.93134 0.792285 6.85995C0.888732 6.78856 1.00548 6.74988 1.12548 6.74956H6.76384L8.4654 1.51304C8.50205 1.39998 8.57358 1.30144 8.6697 1.23156C8.76583 1.16167 8.88163 1.12402 9.00048 1.12402C9.11932 1.12402 9.23512 1.16167 9.33125 1.23156C9.42738 1.30144 9.4989 1.39998 9.53555 1.51304L11.2371 6.75132H16.8755C16.9956 6.75126 17.1126 6.78967 17.2094 6.86093C17.3061 6.93218 17.3775 7.03254 17.413 7.1473C17.4486 7.26206 17.4465 7.38519 17.407 7.49866C17.3675 7.61213 17.2928 7.70998 17.1936 7.77788L12.6216 10.9103L14.384 16.1321C14.4125 16.2166 14.4205 16.3067 14.4074 16.395C14.3942 16.4832 14.3603 16.5671 14.3083 16.6396C14.2563 16.7122 14.1879 16.7713 14.1085 16.8122C14.0292 16.853 13.9413 16.8744 13.852 16.8746Z" fill="url(#paint0_linear_148_6989)"/>
<defs>
<linearGradient id="paint0_linear_148_6989" x1="2.62549" y1="2.24957" x2="13.8755" y2="17.2496" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

    const halfStarSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>
<path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>
<defs>
<linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#ccc"/>
<stop offset="1" stop-color="#ccc" stop-opacity="0.68"/>
</linearGradient>
<linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">
<stop stop-color="#F84119"/>
<stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
</linearGradient>
</defs>
</svg>`;

    const emptyStarSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6994)" stroke-linejoin="round"/>
<defs>
<linearGradient id="paint0_linear_148_6994" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
<stop stop-color="#ccc"/>
<stop offset="1" stop-color="#ccc" stop-opacity="2"/>
</linearGradient>
</defs>
</svg>`;

    let starHTML = fullStarSvg.repeat(fullStars); // Tam dolu yıldızlar
    if (hasHalfStar) starHTML += halfStarSvg; // yarım dolu yıldızlar
    starHTML += emptyStarSvg.repeat(emptyStars); // boş yıldızlar

    return starHTML;
}

//--------------------------Filmleri ekrana yerleştirmek için kullanılan fonksiyon---------------------------------------
function displayMovies(movies) {

    movieGallery.innerHTML = '';

    // movie-gallery-trend içinde grid sistemini uygulayalım
    movieGallery.style.display = 'grid';
    movieGallery.style.gridTemplateColumns = 'repeat(3, 1fr)'; // 3 film yan yana
    movieGallery.style.gap = '20px'; // aralarına boşluk

    movies.forEach(movie => {

        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const moviePoster = document.createElement('img');
        moviePoster.src = imageBaseUrl + movie.poster_path;
        moviePoster.alt = movie.title;
        moviePoster.classList.add('movie-poster');

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;
        movieTitle.classList.add('movie-title');

        const movieDetails = document.createElement('p');
        const genreNames = movie.genre_ids.map(id => genreMap[id] || 'Unknown').filter(Boolean);
        movieDetails.textContent = `${genreNames.join(', ')} | ${movie.release_date.split('-')[0]}`;
        movieDetails.classList.add('movie-details');

        const movieRating = document.createElement('p');
        movieRating.innerHTML = displayMovieRating(movie.vote_average); // Güncel yıldız sistemi
        movieRating.classList.add('movie-rating');

        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(movieDetails);
        movieInfo.appendChild(movieRating);
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieInfo);
        movieGallery.appendChild(movieCard);
    });
}

// İlk sayfayı yükle
fetchMovies();

//---------------------------------------------------------------------------------------------------


