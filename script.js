'use strict';
const whatsapp = (text) => 'https://wa.me/5491150027041?text=' + encodeURIComponent(text);
const burger = document.querySelector('#burgerBtn');
const menu = document.querySelector('#mobileMenu');
function closeMenu() { burger.setAttribute('aria-expanded', 'false'); menu.classList.remove('active'); menu.inert = true; document.body.style.overflow = ''; }
burger.addEventListener('click', () => { const open = burger.getAttribute('aria-expanded') !== 'true'; burger.setAttribute('aria-expanded', String(open)); menu.classList.toggle('active', open); menu.inert = !open; document.body.style.overflow = open ? 'hidden' : ''; });
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); document.querySelector('#photoDialog').close(); } });
window.matchMedia('(min-width:701px)').addEventListener('change', e => { if(e.matches) closeMenu(); });
document.querySelector('#contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const text = 'Hola Waisan, soy ' + data.get('nombre').trim() + '. Estoy en ' + data.get('zona').trim() + '. Necesito: ' + data.get('consulta').trim();
  window.open(whatsapp(text), '_blank', 'noopener,noreferrer');
});
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter; });
}));
const dialog = document.querySelector('#photoDialog');
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  const source = button.querySelector('img'); const target = dialog.querySelector('img');
  target.src = source.src; target.alt = source.alt; dialog.querySelector('p').textContent = source.alt; dialog.showModal();
}));
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if(e.target === dialog) dialog.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();
