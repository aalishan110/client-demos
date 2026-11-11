const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const opened = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opened));
  navigation.classList.toggle('is-open', opened);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.querySelectorAll('.occasion-list details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('.occasion-list details').forEach(other => { if (other !== detail) other.open = false; });
}));
const lightbox = document.querySelector('.lightbox');
document.querySelectorAll('.photo-open').forEach(button => button.addEventListener('click', () => {
  lightbox.querySelector('img').src = button.dataset.photo;
  lightbox.querySelector('img').alt = button.dataset.caption;
  lightbox.querySelector('p').textContent = button.dataset.caption;
  lightbox.showModal();
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
const dateInput = document.querySelector('input[name="date"]');
const today = new Date();
dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
document.querySelector('#inquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const date = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' });
  const message = `Assalam o Alaikum, I would like to inquire about an event at King Marquee.\n\nName: ${String(data.get('name')).trim()}\nOccasion: ${data.get('occasion')}\nPreferred date: ${date}\nExpected guests: ${data.get('guests')}${String(data.get('notes')).trim() ? `\nNotes: ${String(data.get('notes')).trim()}` : ''}\n\nPlease share availability and package details.`;
  window.open(`https://wa.me/923457793342?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
