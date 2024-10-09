import {fetchMovies,getMovies} from './fetchingdata.js';

const moviesFav = getMovies();
console.log('${moviesFav}');
let library;// kutuphanedeki filmlerin bulundugu obje veya array
function getAndSetStorage(){
    if (localStorage.getItem('myLibrary') !== null) {
        library= JSON.parse(localStorage.getItem("myLibrary"));
      } else {
        console.log('Library does not exist');
      }
    
    localStorage.setItem('myLibrary', JSON.stringify(library));

}

export function addToLibrary(filmId){

    const divLibrary = document.createElement("div");
    divLibrary.classList.add("div-library");

    const imgFilm = document.createElement("img");
    imgFilm.classList.add("img-film");
    imgFilm.src = `https://image.tmdb.org/t/p/original/${film.backdrop_path}`;
    imgFilm.alt = film.title;

    const description = document.createElement("div");
    description.classList.add("description-film");
    description.innerHTML=` <p>film.title</p>
                            <p>film.release_date</p>
                            <p>film.genre_ids.join(', ')</p>
                            <p>|/p>`;

    divLibrary.appendChild(imgFilm);
    divLibrary.appendChild(description);
    document.body.appendChild(divLibrary);

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

