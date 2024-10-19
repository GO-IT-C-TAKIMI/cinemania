export function displayMovieRating(vote_average) {
  const stars = [
    {
      name: 'fullStar',
      img: `
      <img star-icon-full src="./public/fullstar.svg" alt="star"/>
     `,
    },
    {
      name: 'halfStar',
      img: `
        <img class="star-icon-half" src="./public/starhalf.svg" alt="star" />
      `
    },
    {
      name: 'emptyStar',
      img: `
        <img class="star-icon-empty" src="./public/starempty.svg" alt="star" />
      `,
    },
  ];

  const maxStars = 5;
  const fullStars = Math.floor(vote_average / 2);
  const hasHalfStar = vote_average % 2 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  if (vote_average === 0) {
    return 'NOT RELEASED YET';
  }

  const fullStarSvg = stars.find(star => star.name === 'fullStar').img;
  const halfStarSvg = stars.find(star => star.name === 'halfStar').img;
  const emptyStarSvg = stars.find(star => star.name === 'emptyStar').img;

  let starHTML = fullStarSvg.repeat(fullStars); //tam
  if (hasHalfStar) starHTML += halfStarSvg; //yari
  starHTML += emptyStarSvg.repeat(emptyStars); //bos

  return starHTML;
}
