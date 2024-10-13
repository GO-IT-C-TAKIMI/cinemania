import SimpleLightbox from 'simplelightbox';
let film;
export function mylibrary() {
console.log("mylibrary sayfasinin js i calisti")
  const getId = async (filmIds)  => {
    const filmData = [];
    for(const id of filmIds){
      try{
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3e7bd78082a78694a13d5e52c5addee0&language=en-US`);
        film = await response.json();
        filmData.push(film); 
        console.log("filmler",filmData);
        addToLibrary(film);
      }catch(error){
        console.log(error);
      }
      
    }
   selectGenre(filmData)
  }
 

let libraryIds;// kutuphanedeki filmlerin bulundugu obje veya array

function getAndSetStorage(){
    if (localStorage.getItem('myLibrary') !== null) {
        libraryIds= JSON.parse(localStorage.getItem("myLibrary"));
        getId(libraryIds);
        console.log("library--",libraryIds)
      } else {
        console.log('Library does not exist');
      }

  // localStorage.setItem('myLibrary', JSON.stringify(libraryIds));

}
getAndSetStorage();
let filmGenres;
function addToLibrary(film) {
  const divLibrary = document.getElementById("myLibrary");
  const libraryUl = document.getElementById("library-list");

  const imgFilm = document.createElement("img");
  imgFilm.classList.add("img-film");
  imgFilm.src = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
  imgFilm.alt = film.title;

  const imgLink = document.createElement("a");
  imgLink.classList.add("link-img");
  imgLink.href = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
  imgLink.setAttribute("data-film-id", film.id);

  const imgList = document.createElement("li");
  imgList.classList.add("list-img");
  const filmGenres = film.genres.map(genre => genre.name).join(', ');

  const yearFilm = film.release_date.slice(0, 4);
  const description = document.createElement("div");
  description.classList.add("description-film");
  description.innerHTML = `
      <p id="film-title">${film.title}</p>
      <p id="film-genre">${filmGenres}</p>
      <p>|</p>
      <p>${yearFilm}</p>
      <p>${film.vote_average}</p>
  `;

  imgLink.appendChild(imgFilm);
  imgList.appendChild(imgLink);
  imgList.appendChild(description);
  libraryUl.appendChild(imgList);

  const linkImages = document.querySelectorAll(".link-img");
  linkImages.forEach(link=>{
    link.addEventListener("click",(event)=>{
      event.preventDefault();
      const divForFilm = document.createElement("div");
      divForFilm.classList.add("div-for-film");
    
      const contentForFilm = document.createElement("div");
      contentForFilm.classList.add("content-div");

      const imgForFilm= document.createElement("img");
      imgForFilm.classList.add("img-for-film");
      imgForFilm.src=link.href;
      imgForFilm.alt=link.querySelector("img").alt; 

      const filmTitle = document.createElement("p");
      filmTitle.innerText = link.querySelector("img").alt;

      const filmAbout = document.createElement("p");
      filmAbout.classList.add("about");
      filmAbout.innerText = "About";
  
      
      const closeButton = document.createElement("button");
      closeButton.classList.add("close-button");
      closeButton.textContent = "Remove from my library";  // Kapatma işareti



      closeButton.addEventListener("click", () => {
        document.body.removeChild(modalDiv);
      });
  
      contentForFilm.appendChild(filmTitle);
      contentForFilm.appendChild(filmAbout);
      contentForFilm.appendChild(closeButton);

      divForFilm.appendChild(contentForFilm);
      
      divForFilm.appendChild(imgForFilm);
  
      // Modalı sayfaya ekle
      document.body.appendChild(divForFilm);
  

      divForFilm.addEventListener("click", (event) => {
        if (event.target !== divForFilm) {
          document.body.removeChild(divForFilm);
        }
      });
    })
  });

}

function addRemoveButton(filmId, lightbox) {

  // Butonu oluştur
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove from my library";
  removeButton.classList.add("remove-button");
  console.log("remobe butonu var")
  // Butonun tıklama olayını tanımla
  removeButton.addEventListener("click", () => {
    removeFromLibrary(filmId);
    window.lightboxInstance.close(); // Lightbox'ı kapat
});

  // Lightbox içeriğine butonu ekle
  const lightboxContent = document.querySelector('.slbOuter');
  lightboxContent.appendChild(removeButton);
}

function removeFromLibrary(filmId) {
  // Kütüphaneden silme işlemleri
  const libraryUl = document.getElementById("library-list");
  const filmElement = libraryUl.querySelector(`a[data-film-id='${filmId}']`).closest('.list-img');

  if (filmElement) {
    filmElement.remove(); // DOM'dan kaldır
}

  // Yerel depolamadan silme işlemleri (varsa)
  let libraryIds = JSON.parse(localStorage.getItem('myLibrary')) || [];
  libraryIds = libraryIds.filter(id => id !== filmId); // ID'yi kaldır
  localStorage.setItem('myLibrary', JSON.stringify(libraryIds)); // Güncellenmiş kütüphaneyi kaydet
}


function seeFilmContent(){
    let modal ;
}

function selectGenre(films){
  const selectionGenre=document.getElementById("film-category");

      // Assuming 'films' is an array of movie objects, each containing genres
      const allGenres = new Set();
    
      // Extract unique genres from the films
      films.forEach(film => {
          film.genres.forEach(genre => {
              allGenres.add(genre.name);  // Collect genre names
          });
      });
  
      // Create options for each genre
      allGenres.forEach(genre => {
          const optionSelect = document.createElement("option");
          optionSelect.value = genre;
          optionSelect.innerText = genre;
          selectionGenre.appendChild(optionSelect);
      });
  selectionGenre.addEventListener("change",(event)=>{
    const selectedGenre = event.target.value;

        const filteredFilms = films.filter(film => 
          film.genres.some(genre => genre.name === selectedGenre)
      );

      // Clear the current library display
      const libraryUl = document.getElementById("library-list");
      libraryUl.innerHTML = '';  // Clear previous results

      // Add the filtered films to the library
      filteredFilms.forEach(film => addToLibrary(film));

  });


}

}
