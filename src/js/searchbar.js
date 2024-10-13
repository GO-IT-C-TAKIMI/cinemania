const showButton = document.getElementById('searchButton');
const mySelect = document.getElementById('movieYear');

showButton.addEventListener('click', () => {
  // Select elemanının görünürlüğünü değiştir
  if (mySelect.style.display === 'none' || mySelect.style.display === '') {
    mySelect.style.display = 'block'; // Görünür yap
  } else {
    mySelect.style.display = 'block'; // Gizle
  }
});

export function searchbar() {
  console.log('searchbar sayfasinin js i calisti');
}
const apiKey = '3e7bd78082a78694a13d5e52c5addee0';
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
  const movieName = document.getElementById('movieName').value;
  searchMovies(movieName);
});

async function searchMovies(movieName) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    movieName
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function displayResults(movies) {
  resultsDiv.innerHTML = ''; // Önceki sonuçları temizle
  if (movies.length === 0) {
    resultsDiv.innerHTML = '<p>Sonuç bulunamadı.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.innerHTML = `
            <h3>${movie.title} (${movie.release_date.split('-')[0]})</h3>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}" />
        `;
    resultsDiv.appendChild(movieDiv);
  });
}
