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
function addToLibrary(film){

    const divLibrary = document.getElementById("myLibrary");
    const libraryUl = document.getElementById("library-list");

    const imgFilm = document.createElement("img");
    imgFilm.classList.add("img-film");
    imgFilm.src = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
    imgFilm.alt = film.title;

    const imgLink = document.createElement("a");
    imgLink.classList.add("link-img");
    imgLink.href=`https://image.tmdb.org/t/p/original/${film.backdrop_path}`;

    const imgList = document.createElement("li");
    imgList.classList.add("list-img");
    filmGenres = film.genres.map(genre => genre.name).join(', ');

    let yearFilm = film.release_date.slice(0,4);
    const description = document.createElement("div");
    description.classList.add("description-film");
    description.innerHTML=` <p id="film-title">${film.title}</p>
                            <p id="film-genre">${filmGenres}</p>
                            <p>|</p>
                             <p>${yearFilm}</p>
                            <p>${film.vote_average}</p>
                            `;

    imgLink.appendChild(imgFilm);
    imgList.appendChild(imgLink);
    imgList.appendChild(description);
    libraryUl.appendChild(imgList);

    if (!divLibrary.contains(libraryUl)) {
      divLibrary.appendChild(libraryUl);
  }

}
// pseudo code for localstorage

let favorites;
function removeFromLibrary(filmremove){
    document.getElementById("removefavorite").addEventListener("click",()=>{
        favorites = favorites.filter(favItem=>favItem !== filmremove);
    
          // HTML'deki öğeyi de kaldır
          const favListItem = document.querySelector(`#${filmremove}`);
          if (favListItem) {
            favListItem.remove();
          }
        });
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
