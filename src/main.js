import { header } from './js/header';
import { popup } from './js/popup';
import { mylibrary } from './js/mylibrary';
import { hero } from './js/hero';
import { movielist } from './js/movielist';
import { upcoming } from './js/upcoming';
import { footer } from './js/footer';
<<<<<<< HEAD
import { searchbar } from './js/searchbar';


=======
/* import { searchbar } from './js/searchbar';
 */
>>>>>>> fc00f6ee797c2dab1b1621bf5abe6b9764a7682d
import theme from './js/theme';
if (window.location.pathname === '/catalog.html') {
  header();
  hero();
  popup();
  movielist();
  footer();
  /*   searchbar();
   */ theme();
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
  movielist();
  upcoming();
  footer();
  theme();
}
