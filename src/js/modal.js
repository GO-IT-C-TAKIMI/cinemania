const popupSection = document.querySelector('.popup-section');
const popupSectionContainer = document.querySelector(
  '.popup-section-container'
);
const closeBtn = document.querySelector('.close-btn');
const body = document.querySelector('body');

let isModalOpen = false;
export function closeModal() {
  popupSectionContainer.classList.add('hidden');
  body.style.overflow = 'auto';
  isModalOpen = false;
  document.removeEventListener('click', handleOutsideClick);
  document.removeEventListener('keydown', handleEscapePress);
  closeBtn.removeEventListener('click', handleCloseClick);
}
function handleOutsideClick(e) {
  if (isModalOpen && !popupSection.contains(e.target)) {
    closeModal();
  }
}
function handleCloseClick() {
  if (isModalOpen) {
    closeModal();
  }
}

function handleEscapePress(e) {
  if (isModalOpen && e.key === 'Escape') {
    closeModal();
  }
}

export function openModal() {
  isModalOpen = true;
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscapePress);
  closeBtn.addEventListener('click', handleCloseClick);
}
