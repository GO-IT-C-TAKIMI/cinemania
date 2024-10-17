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
