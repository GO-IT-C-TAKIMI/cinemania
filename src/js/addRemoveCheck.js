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
  let library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  library = library.filter(id => id !== filmId);
  localStorage.setItem('myLibrary', JSON.stringify(library));
  updateLibraryButton(false, filmId);
}

export function checkLibrary(filmId) {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  return library.includes(filmId);
}
export function updateLibraryButton(isInLibrary, filmId) {
  const addBtn = document.getElementById('add-btn');
  const removeBtn = document.getElementById('remove-btn');

  if (isInLibrary) {
    addBtn.classList.add('hidden');
    removeBtn.classList.remove('hidden');
  } else {
    addBtn.classList.remove('hidden');
    removeBtn.classList.add('hidden');
  }
  addBtn.onclick = () => addToLibrary(filmId);
  removeBtn.onclick = () => removeFromLibrary(filmId);
}
