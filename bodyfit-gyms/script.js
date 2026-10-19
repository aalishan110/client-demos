'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

const branches = {
  f8: { kind: 'BODYFIT GOLD', title: 'F-8 MARKAZ', address: '1 Kalim Plaza, Kaghan Road,\nF-8 Markaz, Islamabad.', map: 'https://maps.app.goo.gl/E4zPCZ6kP99Br2hC7?g_st=ic', enquiry: 'Bodyfit Gold F-8', index: '01 / 02' },
  g11: { kind: 'BODYFIT GYM', title: 'G-11 MARKAZ', address: '1 Ground Floor, Rehman Plaza,\nG-11 Markaz, Islamabad.', map: 'https://maps.app.goo.gl/2xcBTA8uYuXTEZTTA?g_st=ic', enquiry: 'Bodyfit Gym G-11', index: '02 / 02' }
};
const tabs = [...document.querySelectorAll('[data-branch]')];
function selectBranch(key) {
  const branch = branches[key];
  if (!branch) return;
  tabs.forEach(tab => {
    const selected = tab.dataset.branch === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  document.querySelector('#branch-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.querySelector('#branch-kind').textContent = branch.kind;
  const title = document.querySelector('#branch-name');
  title.replaceChildren(document.createTextNode(branch.title));
  document.querySelector('#branch-address').textContent = branch.address;
  document.querySelector('#branch-address').style.whiteSpace = 'pre-line';
  document.querySelector('#branch-index').textContent = branch.index;
  document.querySelector('#branch-map').href = branch.map;
  document.querySelector('#branch').value = branch.enquiry;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectBranch(tab.dataset.branch));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = (index + 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectBranch(tabs[next].dataset.branch);
    tabs[next].focus();
  });
});
document.querySelectorAll('[data-choose]').forEach(link => link.addEventListener('click', () => selectBranch(link.dataset.choose)));
document.querySelector('#branch').addEventListener('change', event => {
  selectBranch(event.target.value === branches.g11.enquiry ? 'g11' : 'f8');
});
document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#interest').value = link.dataset.interest;
}));

const trainingDetails = [...document.querySelectorAll('.training-list details')];
trainingDetails.forEach(detail => detail.addEventListener('toggle', () => {
  if (!detail.open) return;
  trainingDetails.forEach(other => { if (other !== detail) other.open = false; });
  const image = document.querySelector('#training-image');
  image.src = `assets/${detail.dataset.photo}`;
  image.alt = detail.dataset.alt;
  document.querySelector('#training-caption').textContent = detail.dataset.caption;
}));

document.querySelector('#enquiry-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const branch = document.querySelector('#branch').value;
  const interest = document.querySelector('#interest').value;
  const message = `Assalamualaikum Bodyfit!${name ? ` I'm ${name}.` : ''} I'd like to ask about ${interest.toLowerCase()} at ${branch}. Could you share current prices, timings and how to arrange a visit?`;
  window.open(`https://wa.me/923005557498?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
