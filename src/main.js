import { getMovies } from './js/fetchingdata';
import { header } from './js/header';
import { popup } from './js/popup';
import { mylibrary } from './js/mylibrary';
import { hero } from './js/hero';
import { listMovie } from './js/listMovie';
import { upcoming } from './js/upcoming';
import { footer } from './js/footer';
import { searchbar } from './js/searchbar';


if(window.location.pathname === '/catalog.html') {
    header();
    hero();
    popup();
    listMovie();
    footer();
    searchbar();
}
if(window.location.pathname === '/mylibrary.html') {
    header();
    hero();
    popup();
    mylibrary();
    footer();
}
if(window.location.pathname === '/') {
    header();
    hero();
    popup();
    listMovie();
    upcoming();
    footer();
}