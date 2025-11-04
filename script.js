
// script.js — comportamento e interatividade

// Selectors
const app = document.getElementById('app');
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');
const iconSun = document.getElementById('iconSun');
const waBtn = document.getElementById('waBtn');
const emailBtn = document.getElementById('emailBtn');
const ctaWa = document.getElementById('ctaWa');
const ctaSolutions = document.getElementById('ctaSolutions');
const solutionsGrid = document.getElementById('solutionsGrid');
const contactWa = document.getElementById('contactWa');
const contactEmail = document.getElementById('contactEmail');
const footerWa = document.getElementById('footerWa');
const footerEmail = document.getElementById('footerEmail');

// Links
const WA_NUMBER = '5545998181217';
const MAIL_ADDRESS = 'DValle.comercial@gmail.com';

// Init theme from localStorage or system
function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){
    app.classList.remove('light');
    app.classList.add('dark');
    iconMoon.classList.add('hidden');
    iconSun.classList.remove('hidden');
  } else {
    app.classList.remove('dark');
    app.classList.add('light');
    iconMoon.classList.remove('hidden');
    iconSun.classList.add('hidden');
  }
}
initTheme();

themeToggle.addEventListener('click', () => {
  if(app.classList.contains('dark')){
    app.classList.remove('dark'); app.classList.add('light');
    localStorage.setItem('theme', 'light');
    iconMoon.classList.remove('hidden');
    iconSun.classList.add('hidden');
  } else {
    app.classList.remove('light'); app.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    iconMoon.classList.add('hidden');
    iconSun.classList.remove('hidden');
  }
});

// Open WhatsApp
function openWhatsApp(){
  window.open(`https://wa.me/${WA_NUMBER}`, '_blank');
}
waBtn.addEventListener('click', openWhatsApp);
ctaWa.addEventListener('click', openWhatsApp);
contactWa.addEventListener('click', openWhatsApp);
footerWa.addEventListener('click', openWhatsApp);

// Open email
function openEmail(){
  window.location.href = `mailto:${MAIL_ADDRESS}`;
}
emailBtn.addEventListener('click', openEmail);
contactEmail.addEventListener('click', openEmail);
footerEmail.addEventListener('click', openEmail);

// Smooth scroll to solutions
ctaSolutions.addEventListener('click', () => {
  document.getElementById('solutions').scrollIntoView({behavior:'smooth'});
});

// IntersectionObserver for reveal animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
},{threshold: 0.15});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Small hover "pop" animation for cards (plain CSS handles main hover).
// Add small stagger entrance when page loads:
window.addEventListener('load', () => {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 120);
  });
});

// Accessibility: keyboard focus style for buttons
document.querySelectorAll('button, .contact-card, .card').forEach(el => {
  el.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') el.click();
  });
});

// Optional: tiny tilt on mouse move over solutions grid (for a little flair)
solutionsGrid.addEventListener('mousemove', (e) => {
  const cards = solutionsGrid.querySelectorAll('.card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${ -y * 3 }deg) rotateY(${ x * 3 }deg)`;
  });
});
solutionsGrid.addEventListener('mouseleave', () => {
  solutionsGrid.querySelectorAll('.card').forEach(card => {
    card.style.transform = '';
  });
});
