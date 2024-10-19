import { header } from './js/header';
import { hero } from './js/hero';
import { movieList } from './js/movieList';
import { upcoming } from './js/upcoming';
import { footer } from './js/footer';
import theme from './js/theme';
import { myLibraryUpdate } from './js/myLibraryUpdate';

if (window.location.pathname.includes('catalog.html')) {
  header();
  hero();
  movieList();
  footer();
  theme();
}
if (window.location.pathname.includes('mylibrary.html')) {
  header();
  hero();
  footer();
  theme();
  myLibraryUpdate();
}
if (!window.location.pathname.includes('catalog.html') && !window.location.pathname.includes('library.html')) {                           
  header();
  hero();
  upcoming();
  movieList();
  footer();
  theme();
}
