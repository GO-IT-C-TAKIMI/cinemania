export function popup() {
 
    //tikladigim yerin idsi lazim.
    //tiklanan yerler divler olmali.

    // const catalogCards = document.querySelectorAll('.catalog-movie-card');
    // catalogCards.forEach(catalogCard => console.log(catalogCard.img));

    

}


export function myDetailsFunction(popupId) {


    console.log(popupId)
    const api_key = '3e7bd78082a78694a13d5e52c5addee0';

    //gelecek olan veriler nerede yazilacak.

    const popupContainer = document.querySelector('.popup-section-container');
    const closeBtn = document.querySelector('.close-btn');



    const fetchDetails = async () => {
        try{
            const res = await fetch(`https://api.themoviedb.org/3/movie/${popupId}?api_key=${api_key}&language=en-US`);
            const data = await res.json();
            console.log(data);
            
            popupContainer.innerHTML = ``





        }catch(error){
            console.log(error);
        }
    }

    fetchDetails();
}

export function filmleriGetir(movies) {
    console.log(movies)
}



