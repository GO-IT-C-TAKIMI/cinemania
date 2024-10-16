import { checkLibrary, addToLibrary, removeFromLibrary, updateLibraryButton } from './addRemoveCheck';
export function myDetailsFunction(popupId) {
  console.log(popupId);
  const api_key = '3e7bd78082a78694a13d5e52c5addee0';

  const popupContent = document.querySelector('.popup-content-container');
  const popupSectionContainer = document.querySelector('.popup-section-container');
  const popupSection = document.querySelector('.popup-section');
  const closeBtn = document.querySelector('.close-btn');
  const body = document.querySelector('body');

  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${popupId}?api_key=${api_key}&language=en-US`
      );
      const data = await res.json();
      console.log(data);

      const genres = data.genres.map((genre) => genre.name).join(', ');
      console.log(genres);

      popupContent.innerHTML = `
      <div class="popup-img-container">
        <img class="afis-img" src="https://image.tmdb.org/t/p/original${data.poster_path}" />
      </div>
      <div class="popup-film-info">
        <div class="popup-film-content">
          <h2 class="film-title">${data.title}</h2>
          <ul class="film-details">
            <li>
              <p>Vote / Votes</p>
              <p>Popularity</p>
              <p>Genre</p>
            </li>
            <li>
              <p class="description-container"></p>
              <span class="vote-description">${data.vote_average.toFixed(1)}</span> /
              <span class="vote-description">${data.vote_count.toFixed(1)}</span>
              <p class="description">${data.popularity.toFixed(1)}</p>
              <p class="description genre">${genres}</p>
            </li>
          </ul>
        </div>
        <div class="popup-film-about-title">
          <h3 class="film-about">ABOUT</h3>
          <p class="film-about-title">${data.overview}</p>
        </div>
        <div class="popup-buttons">
          <button type="button" class="upcoming-content__btn orange-button" id="add-btn">Add to my library</button>
          <button type="button" class="upcoming-content__btn-remove hidden white-button" id="remove-btn">Remove from my library</button>
        </div>
      </div>`;


     const isInLibrary = checkLibrary(popupId);
     console.log(isInLibrary)

      
      


      let isModalOpen = false;

      function closeModal() {
        popupSectionContainer.classList.add('hidden');
        body.style.overflow = 'auto';
        popupContent.innerHTML = '';
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
    } catch (error) {
      console.log(error);
    }
  };

 fetchDetails();
}
