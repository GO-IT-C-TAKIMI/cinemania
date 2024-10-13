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
  const filmGenres = film.genres.map(genre => genre.name).slice(0, 2).join(', ');

  const filmTitle = document.createElement("p");
  filmTitle.innerHTML=`<p id="film-title">${film.title}</p>`;
  
  const yearFilm = film.release_date.slice(0, 4);
  const description = document.createElement("div");
  description.classList.add("description-film");
  description.innerHTML = `
      <p id="film-genre">${filmGenres}</p>
      <p>|</p>
      <p>${yearFilm}</p>
      <p>${film.vote_average}</p>
  `;

  imgLink.appendChild(imgFilm);
  imgList.appendChild(imgLink);
  imgList.appendChild(filmTitle);
  imgList.appendChild(description);
  libraryUl.appendChild(imgList);

  const linkImages = document.querySelectorAll(".link-img");
  linkImages.forEach(link=>{
    link.addEventListener("click",(event)=>{
      event.preventDefault();

      const existingDivForFilm = document.querySelector(".div-for-film");
      if (existingDivForFilm) {
        existingDivForFilm.remove();
      }
      
      if (document.querySelector(".div-for-film")) {
        return;  // If it exists, don't create another one
      }

      const divForFilm = document.createElement("div");
      divForFilm.classList.add("div-for-film");
 
      const contentForFilm = document.createElement("div");
      contentForFilm.classList.add("content-div");

      const imgForFilm= document.createElement("img");
      imgForFilm.classList.add("img-for-film");
      imgForFilm.src=link.href;
      imgForFilm.alt=link.querySelector("img").alt; 

      const filmTitle = document.createElement("p");
      filmTitle.classList.add("film-title");
      filmTitle.innerText = link.querySelector("img").alt;

      const filmAbout = document.createElement("p");
      filmAbout.classList.add("about");
      filmAbout.innerText = "About";

      const ulAbout = document.createElement("ul"); 
      ulAbout.classList.add("about-ul");

      const liAbout = document.createElement("li"); 
      liAbout.classList.add("about-li");

      const voteAbout = document.createElement("p");
      voteAbout.classList.add("headers-content");
      voteAbout.innerText = `Vote / Votes`;

      const voteDiv = document.createElement("div");
      voteDiv.classList.add("div-vote");
      voteDiv.innerHTML = `<span class="vote-num">${film.vote_average}</span>
      <span class="slash">/</span>
      <span class="vote-num">${film.vote_average}</span>`;
      liAbout.appendChild(voteAbout);
      liAbout.appendChild(voteDiv);
      ulAbout.appendChild(liAbout);

      const liAboutTwo = document.createElement("li"); 
      liAboutTwo.classList.add("about-li");

      const textpop = document.createElement("p");
      textpop.classList.add("headers-content");
      textpop.textContent="Popularity";

      const popularity = document.createElement("p");
      popularity.classList.add("stats-content");
      popularity.innerText = `${film.popularity}`

      liAboutTwo.appendChild(textpop);
      liAboutTwo.appendChild(popularity);
      ulAbout.appendChild(liAboutTwo);

      const liAboutThree = document.createElement("li"); 
      liAboutThree.classList.add("about-li");

      const genreheader = document.createElement("p");
      genreheader.classList.add("headers-content");
      genreheader.textContent="Genre";

      
      const textgenre = document.createElement("p");
      textgenre.classList.add("stats-content");
      textgenre.textContent=`${filmGenres}`;

      const genre = document.createElement("p");
      genre.innerText=`${film.vote_average}`;


      liAboutThree.appendChild(genreheader);
      liAboutThree.appendChild(textgenre);
      ulAbout.appendChild(liAboutThree);

      const about = document.createElement("p");
      about.id="about-header";
      about.textContent="ABOUT";

      const textAbout = document.createElement("p");
      textAbout.classList.add("about-text");
      textAbout.innerText = `${film.overview}`;

      const screenClose = document.createElement("button");
      screenClose.classList.add("close-screen");
      screenClose.textContent = "X"; 


      screenClose.addEventListener("click", () => {
        document.body.removeChild(divForFilm);
      });

      
      const closeButton = document.createElement("button");
      closeButton.classList.add("close-button");
      closeButton.textContent = "Remove from my library";  // Kapatma işareti



      closeButton.addEventListener("click", () => {
        document.body.removeChild(divForFilm); 
        removeFromLibrary(film.id); 
      });
      divForFilm.appendChild(screenClose);
      divForFilm.appendChild(imgForFilm);


      contentForFilm.appendChild(filmTitle);
  
      contentForFilm.appendChild(ulAbout);

      contentForFilm.appendChild(about);
      contentForFilm.appendChild(textAbout);
      contentForFilm.appendChild(closeButton);
      divForFilm.appendChild(contentForFilm);

      document.body.appendChild(divForFilm);
  


  
      divForFilm.addEventListener("click", (event) => {
        if (event.target === divForFilm) {
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
