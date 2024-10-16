import { header } from './js/header';
import { popup } from './js/popup';
import { hero } from './js/hero';
import { movielist } from './js/movielist';
import { upcoming } from './js/upcoming';
import { footer } from './js/footer';
import theme from './js/theme';
import { mylibraryUpdate } from './js/mylibraryUpdate';
if (window.location.pathname === '/catalog.html') {
  header();
  hero();
  popup();
  movielist();
  footer();
  theme();
}
if (window.location.pathname === '/mylibrary.html') {
  header();
  hero();
  popup();
  footer();
  theme();
  mylibraryUpdate();
}
if (window.location.pathname === '/') {
  header();
  hero();
  popup();
  movielist();
  upcoming();
  footer();
  theme();
}
