export function header() {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll("#header-links a");
  const menuButton = document.querySelector(".menu-button");
  const overlay = document.querySelector('.responsive-overlay');
  const responsiveMenu = document.querySelector('.responsive-menu');
  const body = document.querySelector('body');
  

  menuButton.addEventListener('click', () => {
    responsiveMenu.classList.add('active-responsive-menu');
    overlay.classList.add('active-overlay');
    body.style.overflow = 'hidden';
  });

  document.addEventListener('click', (event) => {
    if (
      !responsiveMenu.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      responsiveMenu.classList.remove('active-responsive-menu');
      overlay.classList.remove('active-overlay');
      body.style.overflow = 'auto';
    }
  });


  window.addEventListener('resize', () => {
    document.querySelector('.responsive-menu').classList.remove('active-responsive-menu');
    overlay.classList.remove('active-overlay');
    body.style.overflow = 'auto';
  });


  links.forEach(link => {
    const linkHref = new URL(link.getAttribute('href'), window.location.origin).pathname;

    if (linkHref === currentPath) {
      link.classList.add('active-link');
    }
  });
}