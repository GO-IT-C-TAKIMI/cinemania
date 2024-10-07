export function addToLibrary(arr){
    arr.forEach(film => {
        
    });
    const divLibrary = document.createElement("div");
    divLibrary.classList.add("div-library");

    const imgFilm = document.createElement("img");
    imgFilm.classList.add("img-film");
    imgFilm.src = arr.src;
    imgFilm.alt = arr.alt;

    const description = document.createElement("div");
    description.classList.add("description-film");
    description.innerHTML=``;

    divLibrary.appendChild(imgFilm);
    divLibrary.appendChild(description);
    document.body.appendChild(divLibrary);

}

function localsto(){
    const resimler = localStorage.getItem("resimler");
    let user = { name: 'John', age: 30 };
localStorage.setItem('user', JSON.stringify(user));
let user = JSON.parse(localStorage.getItem('user'));
console.log(user.name);  // Output: John

if (localStorage.getItem('username') !== null) {
    console.log('Username exists');
  } else {
    console.log('Username does not exist');
  }
}