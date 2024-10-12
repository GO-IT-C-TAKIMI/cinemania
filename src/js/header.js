export function header() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll("#header-links a");


  links.forEach(link => {
    const linkHref = new URL(link.getAttribute('href'), window.location.origin).pathname;

    if (linkHref === currentPath) {
      link.classList.add('active-link');
    }
  });
}