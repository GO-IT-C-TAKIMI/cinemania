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
    imgList.className.add("list-img");

    const description = document.createElement("div");
    description.classList.add("description-film");
    description.innerHTML=` <p>film.title</p>
                            <p>film.release_date</p>
                            <p>film.genre_ids.join(', ')</p>
                            <p>|/p>`;
    imgLink.appendChild(imgFilm);
    imgList.appendChild(imgLink);
    libraryUl.appendChild(imgList);

    divLibrary.appendChild(libraryUl);
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

