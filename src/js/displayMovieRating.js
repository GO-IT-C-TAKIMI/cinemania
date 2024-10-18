export function displayMovieRating(vote_average) {
  const stars = [
    {
      name: 'fullStar',
      svg: `<svg width="24" height="24" class="star-icon-full">
                  <use class="full-star" href="svg/symbol-defs.svg#icon-star-outline"></use>
                </svg>`,
    },
    {
      name: 'halfStar',
      svg: `<svg width="24" height="24" class="star-icon-half">
                  <use href="svg/symbol-defs.svg#icon-star-half"></use>
                </svg>`,
    },
    {
      name: 'emptyStar',
      svg: `<svg width="24" height="24" class="star-icon-empty">
                  <use href="svg/symbol-defs.svg#icon-star-outline"></use>
                </svg>`,
    },
  ];

  const maxStars = 5;
  const fullStars = Math.floor(vote_average / 2);
  const hasHalfStar = vote_average % 2 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  if (vote_average === 0) {
    return 'NOT RELEASED YET';
  }

  const fullStarSvg = stars.find(star => star.name === 'fullStar').svg;
  const halfStarSvg = stars.find(star => star.name === 'halfStar').svg;
  const emptyStarSvg = stars.find(star => star.name === 'emptyStar').svg;

  let starHTML = fullStarSvg.repeat(fullStars); //tam
  if (hasHalfStar) starHTML += halfStarSvg; //yari
  starHTML += emptyStarSvg.repeat(emptyStars); //bos

  return starHTML;
}
