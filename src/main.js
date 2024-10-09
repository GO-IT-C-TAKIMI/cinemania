import { getMovies } from './js/fetchingdata';
import { header } from './js/header';
import { popup } from './js/popup';
import { mylibrary } from './js/mylibrary';
import { hero } from './js/hero';
import { listmovie } from './js/listmovie';
import { upcoming } from './js/upcoming';
import { footer } from './js/footer';
import { searchbar } from './js/searchbar';

import theme from './js/theme';
if (window.location.pathname === '/catalog.html') {
  header();
  hero();
  popup();
  listmovie();
  footer();
  searchbar();
  theme();
}
if (window.location.pathname === '/mylibrary.html') {
  header();
  hero();
  popup();
  mylibrary();
  footer();
  theme();
}
if (window.location.pathname === '/') {
  header();
  hero();
  popup();
  listmovie();
  upcoming();
  footer();
  theme();
}
