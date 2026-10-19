const audience = document.getElementById('audience');
const message = document.getElementById('message');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    audience.value = service.startsWith('Gents') ? 'Gents appointment' : 'Ladies appointment';
    message.value = service.includes('—') ? `I’d like to enquire about ${service.toLowerCase()}.` : '';
  });
});
document.getElementById('enquiry').addEventListener('submit', event => {
  event.preventDefault();
  const phone = audience.value === 'Gents appointment' ? '923028947152' : '923065888700';
  const text = `Hello Aura Blanca! I’m enquiring about: ${audience.value}.\n${message.value.trim()}\nCould you please share current prices and available timings?`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
});
