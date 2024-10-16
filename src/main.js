import { header } from './js/header';
import { hero } from './js/hero';
import { movielist } from './js/movielist';
import { upcoming } from './js/upcoming';
import { footer } from './js/footer';
import theme from './js/theme';
import { mylibraryUpdate } from './js/mylibraryUpdate';


if (window.location.pathname === '/catalog.html') {
  header();
  hero();
  movielist();
  footer();
  theme();
}
if (window.location.pathname === '/mylibrary.html') {
  header();
  hero();
  footer();
  theme();
  mylibraryUpdate();
}
if (window.location.pathname === '/') {
  header();
  hero();
  movielist();
  upcoming();
  footer();
  theme();
}
