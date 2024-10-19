export function myDetailsFunction(popupId) {
  const api_key = '3e7bd78082a78694a13d5e52c5addee0';

  const popupSectionContainer = document.querySelector(
    '.popup-section-container'
  );
  const popupSection = document.querySelector('.popup-section');
  const closeBtn = document.querySelector('.close-btn');
  const body = document.querySelector('body');
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
    filmPoster.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
    filmTitle.textContent = data.title;
    averageRating.textContent = data.vote_average.toFixed(1);
    voteCount.textContent = data.vote_count;
    popularity.textContent = data.popularity.toFixed(1);
    genre.textContent = data.genres.map(genre => genre.name).join(', ');
    overview.textContent = data.overview;

    let isModalOpen = false;

    function closeModal() {
      popupSectionContainer.classList.add('hidden');
      body.style.overflow = 'auto';
      isModalOpen = false;
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapePress);
      closeBtn.removeEventListener('click', handleCloseClick);
    }

    function handleOutsideClick(e) {
      if (isModalOpen && !popupSection.contains(e.target)) {
        closeModal();
      }
    }

    function handleCloseClick(e) {
      if (isModalOpen) {
        closeModal();
      }
    }

    function handleEscapePress(e) {
      if (isModalOpen && e.key === 'Escape') {
        closeModal();
      }
    }

    if (!popupSectionContainer.classList.contains('hidden')) {
      isModalOpen = true;
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscapePress);
      closeBtn.addEventListener('click', handleCloseClick);
      
    }
  }
  function displayLoadingState() {
    filmPoster.src = 'loading-placeholder.png'; // Bir yüklenme resmi olabilir
    filmTitle.textContent = 'Loading...';
    averageRating.textContent = '';
    voteCount.textContent = '';
    popularity.textContent = '';
    genre.textContent = '';
    overview.textContent = 'Fetching details, please wait...';
  }
}
