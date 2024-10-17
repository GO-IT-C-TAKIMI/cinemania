// library.js

// Kütüphaneye ekleme
export function addToLibrary(filmId) {
  let library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  if (!library.includes(filmId)) {
    library.push(filmId);
    localStorage.setItem('myLibrary', JSON.stringify(library));
    updateLibraryButton(true, filmId);
  }
  
}
// Kütüphaneden çıkarma
export function removeFromLibrary(filmId) {
  const pathname = window.location.pathname;
  let library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  library = library.filter(id => id !== filmId);
  localStorage.setItem('myLibrary', JSON.stringify(library));
  updateLibraryButton(false, filmId);

  if(pathname === '/mylibrary.html'){
    removeMovieFromUI(filmId);
    closeModal();
  }
}

function removeMovieFromUI(filmId) {
  const movieCard = document.querySelector(`[data-movie-id="${filmId}"]`);
  if (movieCard) {
    movieCard.remove(); 
  }
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const mylibraryContainer = document.querySelector('#catalog-movie-gallery');
  
  if (library.length === 0) {
    mylibraryContainer.innerHTML = '<p>Your library is empty.</p>';
  }
}


function closeModal() {
  const modal = document.querySelector('.popup-section-container');
  if(modal){
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

export function checkLibrary(filmId) {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  return library.includes(filmId);
}
export function updateLibraryButton(isInLibrary, filmId) {
  const addBtn = document.querySelectorAll('.add-btn');
  const removeBtn = document.querySelectorAll('.remove-btn');

  if (isInLibrary) {
    addBtn.forEach(btn => btn.classList.add('hidden'))
    removeBtn.forEach(btn => btn.classList.remove('hidden'));
  } else {
    addBtn.forEach(btn => btn.classList.remove('hidden'));
    removeBtn.forEach(btn => btn.classList.add('hidden'));
  }
  addBtn.forEach(btn => btn.onclick = () => addToLibrary(filmId));
  removeBtn.forEach(btn => btn.onclick = () => removeFromLibrary(filmId));
}

export function updateLibraryUpcomingButton(isInLibrary, filmId) {
  const addBtnUpcoming = document.getElementById('upcoming-add-btn');
  const removeBtnUpcoming = document.getElementById('upcoming-remove-btn');

  console.log(isInLibrary);
  console.log(filmId);
  console.log(addBtnUpcoming);
  console.log(removeBtnUpcoming);


  addBtnUpcoming.onclick = () => {
    addToLibrary(filmId);
    if(isInLibrary){
      removeBtnUpcoming.classList.remove('hidden');
      addBtnUpcoming.classList.add('hidden');
    }
  };

  removeBtnUpcoming.onclick = () => {
    removeFromLibrary(filmId);
    if(isInLibrary){
      removeBtnUpcoming.classList.add('hidden');
      addBtnUpcoming.classList.remove('hidden');
    }
  }

}
