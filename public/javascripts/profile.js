//Selector
const $ = (selector) => document.querySelector(selector);

//Elements
const card = $('#card'),
      toggle = $('#toggle'),
      button = $('#input');

//Toggle
button.addEventListener('click', () => {
  card?.classList.toggle('dark');
  toggle?.classList.toggle('dark');
});