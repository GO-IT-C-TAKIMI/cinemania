const api_key = '3e7bd78082a78694a13d5e52c5addee0';
const popupSection = document.querySelector('.popup-section');
const popupSectionContainer = document.querySelector(
  '.popup-section-container'
);
const popupContentContainer = document.querySelector(
  '.popup-content-container'
);
const popupTrailer = document.querySelector('.popup-trailer');
import { closeModal } from './modal';
import { openModal } from './modal';
export function myDetailsFunction(popupId) {
  const filmPoster = document.querySelector('.afis-img');
  const filmTitle = document.querySelector('.film-title');
  const averageRating = document.querySelector('.average-rating');
  const voteCount = document.querySelector('.vote-count');
  const genre = document.querySelector('.genre');
  const popularity = document.querySelector('.popularity');
  const overview = document.querySelector('.film-about-desc');
  const fetchDetails = async () => {
    displayLoadingState();

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${popupId}?api_key=${api_key}&language=en-US`
      );
      const data = await res.json();
      displayDetails(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  fetchDetails();

  function displayDetails(data) {
    displayLoadingState();
    filmPoster.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
    filmTitle.textContent = data.title;
    averageRating.textContent = data.vote_average.toFixed(1);
    voteCount.textContent = data.vote_count;
    popularity.textContent = data.popularity.toFixed(1);
    genre.textContent = data.genres.map(genre => genre.name).join(', ');
    overview.textContent = data.overview;

    let isModalOpen = false;
    if (isModalOpen && !popupSection.contains(e.target)) {
      closeModal();
    }
    if (isModalOpen) {
      closeModal();
    }
    if (isModalOpen && e.key === 'Escape') {
      closeModal();
    }
    if (!popupSectionContainer.classList.contains('hidden')) {
      openModal();
    }
  }
  function displayLoadingState() {
    popupTrailer.style.display = 'none';
    popupContentContainer.style.display = 'flex';
    filmPoster.src = 'loading-placeholder.png'; // Bir yüklenme resmi olabilir
    filmTitle.textContent = 'Loading...';
    averageRating.textContent = '';
    voteCount.textContent = '';
    popularity.textContent = '';
    genre.textContent = '';
    overview.textContent = 'Fetching details, please wait...';
  }
}

export async function myTrailerFunction(popupId) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${popupId}/videos?api_key=${api_key}&language=en-US`
    );
    const data = await res.json();
    const trailer = data.results.find(
      result => result.type === 'Trailer' || result.type === 'Teaser'
    );

    function displayVideoloader(){
      popupContentContainer.style.display = 'none';
      popupTrailer.style.display = 'flex';
    }

    let isModalOpen = false;
    if (isModalOpen && !popupSection.contains(e.target)) {
      closeModal();
    }
    if (isModalOpen) {
      closeModal();
    }
    if (isModalOpen && e.key === 'Escape') {
      closeModal();
    }
    if (!popupSectionContainer.classList.contains('hidden')) {
      openModal();
    }

    if (trailer) {
      displayVideoloader();
      popupTrailer.innerHTML += `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`;
    } else {
      popupTrailer.innerHTML += `<p>No trailer available</p>`; // Fragman yoksa
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
    popupTrailer.innerHTML += `<p>Error loading trailer</p>`;
  }
}
