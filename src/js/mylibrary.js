import SimpleLightbox from 'simplelightbox';
let film;
let filmData = [];  // Tüm filmleri tutacak dizi
let currentPage = 1;  // Şu anki sayfa
const filmsPerPage = 9;  // Her sayfada kaç film gösterilecek
export function mylibrary() {
console.log("mylibrary sayfasinin js i calisti")
  const getId = async (filmIds)  => {
    
    for(const id of filmIds){
      try{
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3e7bd78082a78694a13d5e52c5addee0&language=en-US`);
        film = await response.json();
        filmData.push(film); 
        console.log("filmler",filmData);
        if (filmData.length <= filmsPerPage) {
          addToLibrary(film);  // İlk sayfa dolmadan ekleyelim
      }
      }catch(error){
        console.log(error);
      }
      
    }
   selectGenre(filmData);
   createLoadMoreButton();
  }

  function createLoadMoreButton() {
    const libSection = document.getElementById("library-section");

    const loadMoreButton = document.createElement("button");
    loadMoreButton.id = "load-more-btn";
    loadMoreButton.textContent = "Load More";
    loadMoreButton.classList.add("load-more-button");
    libSection.appendChild(loadMoreButton);

    loadMoreButton.addEventListener("click", loadMoreFilms);
}

  // Load More işlevi
  function loadMoreFilms() {
    currentPage++;  // Sonraki sayfaya geç

    const start = (currentPage - 1) * filmsPerPage;
    const end = currentPage * filmsPerPage;

    const filmsToLoad = filmData.slice(start, end);  // Bir sonraki 9 filmi seç

    // Eğer ekleyecek film kalmadıysa, butonu gizle
    if (filmsToLoad.length === 0) {
        document.getElementById("load-more-btn").style.display = "none";
        return;
    }

    // Yeni filmleri ekrana bas
    filmsToLoad.forEach(film => addToLibrary(film));
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
  imgFilm.src = `https://image.tmdb.org/t/p/original/${film.poster_path}`;
  imgFilm.alt = film.title;

  const imgLink = document.createElement("a");
  imgLink.classList.add("link-img");
  imgLink.href = `https://image.tmdb.org/t/p/original/${film.poster_path}`;
  imgLink.setAttribute("data-film-id", film.id);

  const imgList = document.createElement("li");
  imgList.classList.add("list-img");
  const filmGenres = film.genres.map(genre => genre.name).slice(0, 2).join(', ');

  const movieInfo = document.createElement('div');
  movieInfo.classList.add('catalog-movie-info');

  const filmTitle = document.createElement("h2");
  filmTitle.classList.add("catalog-movie-title");
  filmTitle.textContent=`${film.title}`;
  
  const rateandinfo = document.createElement('div');
  rateandinfo.classList.add('catalog-info');
  
  const yearFilm = film.release_date.slice(0, 4);
  const description = document.createElement("p");
  description.classList.add("description-film");
  description.textContent = `${filmGenres} | ${yearFilm} `;

  const movieRating = document.createElement('p');
  movieRating.innerHTML = displayMovieRating(film.vote_average); // Güncel yıldız sistemi
  movieRating.classList.add('catalog-movie-rating');



  movieInfo.appendChild(filmTitle);
  rateandinfo.appendChild(description);
  rateandinfo.appendChild(movieRating);
  movieInfo.appendChild(rateandinfo)

  imgLink.appendChild(imgFilm);
  imgList.appendChild(imgLink);
  imgList.appendChild(movieInfo);
  imgList.appendChild(movieInfo);
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
      voteAbout.innerText = `Vote/Votes`;

      const voteDiv = document.createElement("div");
      voteDiv.classList.add("div-vote");
      voteDiv.innerHTML = `
      <span class="vote-num">${film.vote_average}</span>
      <span class="slash">/</span>
      <span class="vote-num">${film.vote_count}</span>
    `;
      
      liAbout.appendChild(voteAbout);
      liAbout.appendChild(voteDiv);
      ulAbout.appendChild(liAbout);

      const liAboutTwo = document.createElement("li"); 
      liAboutTwo.classList.add("about-li");

      const textpop = document.createElement("p");
      textpop.classList.add("headers-content");
      textpop.textContent="Popularity";
      const popularityCeil = film.popularity.toFixed(1);;
      const popularity = document.createElement("p");
      popularity.classList.add("stats-content");
      popularity.innerText = `${popularityCeil}`

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
  
    const libraryUl = document.getElementById("library-list");
    libraryUl.innerHTML = '';  // Clear previous results

    if (selectedGenre === "") {
      // If "Select a Genre" is chosen, display all films
      films.forEach(film => addToLibrary(film));
    } else {
      // Otherwise, filter by the selected genre
      const filteredFilms = films.filter(film => 
        film.genres.some(genre => genre.name === selectedGenre)
      );
      

      // Add the filtered films to the library
      filteredFilms.forEach(film => addToLibrary(film));
    }
  });


}

function displayMovieRating(vote_average) {
  const maxStars = 5;
  const fullStars = Math.floor(vote_average / 2);
  const hasHalfStar = vote_average % 2 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const fullStarSvg = `<svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.852 16.8746C13.7336 16.875 13.6181 16.8381 13.5219 16.7691L9.00048 13.4911L4.47903 16.7691C4.38243 16.8392 4.26606 16.8767 4.14673 16.8762C4.0274 16.8758 3.91129 16.8374 3.81521 16.7667C3.71912 16.6959 3.64803 16.5964 3.61221 16.4826C3.57639 16.3688 3.5777 16.2465 3.61594 16.1335L5.37938 10.9103L0.809069 7.77612C0.710073 7.70831 0.635356 7.61062 0.595836 7.49732C0.556316 7.38402 0.554063 7.26105 0.589407 7.14638C0.624751 7.0317 0.695839 6.93134 0.792285 6.85995C0.888732 6.78856 1.00548 6.74988 1.12548 6.74956H6.76384L8.4654 1.51304C8.50205 1.39998 8.57358 1.30144 8.6697 1.23156C8.76583 1.16167 8.88163 1.12402 9.00048 1.12402C9.11932 1.12402 9.23512 1.16167 9.33125 1.23156C9.42738 1.30144 9.4989 1.39998 9.53555 1.51304L11.2371 6.75132H16.8755C16.9956 6.75126 17.1126 6.78967 17.2094 6.86093C17.3061 6.93218 17.3775 7.03254 17.413 7.1473C17.4486 7.26206 17.4465 7.38519 17.407 7.49866C17.3675 7.61213 17.2928 7.70998 17.1936 7.77788L12.6216 10.9103L14.384 16.1321C14.4125 16.2166 14.4205 16.3067 14.4074 16.395C14.3942 16.4832 14.3603 16.5671 14.3083 16.6396C14.2563 16.7122 14.1879 16.7713 14.1085 16.8122C14.0292 16.853 13.9413 16.8744 13.852 16.8746Z" fill="url(#paint0_linear_148_6989)"/>
  <defs>
  <linearGradient id="paint0_linear_148_6989" x1="2.62549" y1="2.24957" x2="13.8755" y2="17.2496" gradientUnits="userSpaceOnUse">
  <stop stop-color="#F84119"/>
  <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
  </linearGradient>
  </defs>
  </svg>`;

  const halfStarSvg = `<svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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

  const emptyStarSvg = `<svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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

}
