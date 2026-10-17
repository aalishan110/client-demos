'use strict';
document.querySelector('#inquiry').addEventListener('submit', function (event) {
  event.preventDefault();
  if (!this.reportValidity()) return;
  const data = new FormData(this);
  const message = [`Assalamualaikum House of Bethak,`, `I'm ${data.get('name').trim()}.`, `Occasion: ${data.get('occasion')}`, data.get('date') ? `Preferred date: ${data.get('date')}` : '', data.get('plans').trim() ? `Plans: ${data.get('plans').trim()}` : '', 'Could we discuss the details?'].filter(Boolean).join('\n');
  window.open('https://wa.me/923345522227?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
});
