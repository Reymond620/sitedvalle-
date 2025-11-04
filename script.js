// script.js — comportamento e interatividade refinado

// ======== Seletores ========
const app = document.getElementById('app');
const themeToggle = document.getElementById('themeToggle');
const iconMoon = document.getElementById('iconMoon');
const iconSun = document.getElementById('iconSun');
const waBtn = document.getElementById('waBtn');
const emailBtn = document.getElementById('emailBtn');
const ctaWa = document.getElementById('ctaWa');
const ctaSolutions = document.getElementById('ctaSolutions');
const solutionsGrid = document.getElementById('solutionsGrid');
const footerWa = document.getElementById('footerWa');
const footerEmail = document.getElementById('footerEmail');

// ======== Links ========
const WA_NUMBER = '5545998181217';
const MAIL_ADDRESS = 'DValle.comercial@gmail.com';

// ======== Inicialização do tema ========
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const isDark = saved === 'dark' || (!saved && prefersDark);

  app.classList.toggle('dark', isDark);
  app.classList.toggle('light', !isDark);
  iconMoon.classList.toggle('hidden', isDark);
  iconSun.classList.toggle('hidden', !isDark);
}

initTheme();

// ======== Alternar tema ========
themeToggle.addEventListener('click', () => {
  const isDark = app.classList.contains('dark');
  app.classList.toggle('dark', !isDark);
  app.classList.toggle('light', isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  iconMoon.classList.toggle('hidden', !isDark);
  iconSun.classList.toggle('hidden', isDark);

  // Transição suave
  app.style.transition = 'background-color 0.4s ease, color 0.4s ease';
  setTimeout(() => (app.style.transition = ''), 600);
});

// ======== Ações de contato ========
function openWhatsApp() {
  window.open(`https://wa.me/${WA_NUMBER}`, '_blank');
}
function openEmail() {
  window.location.href = `mailto:${MAIL_ADDRESS}`;
}

// Botões principais
if (waBtn) waBtn.addEventListener('click', openWhatsApp);
if (ctaWa) ctaWa.addEventListener('click', openWhatsApp);
if (footerWa) footerWa.addEventListener('click', openWhatsApp);

if (emailBtn) emailBtn.addEventListener('click', openEmail);
if (footerEmail) footerEmail.addEventListener('click', openEmail);

// ======== Rolagem suave para soluções ========
if (ctaSolutions) {
  ctaSolutions.addEventListener('click', () => {
    document.getElementById('solutions').scrollIntoView({ behavior: 'smooth' });
  });
}

// ======== Animações de revelação ========
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ======== Efeito de entrada suave ========
window.addEventListener('load', () => {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('show'), i * 120);
  });
});

// ======== Interação de hover nas cards ========
if (solutionsGrid) {
  solutionsGrid.addEventListener('mousemove', e => {
    const cards = solutionsGrid.querySelectorAll('.card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${ -y * 3 }deg) rotateY(${ x * 3 }deg)`;
    });
  });

  solutionsGrid.addEventListener('mouseleave', () => {
    solutionsGrid.querySelectorAll('.card').forEach(card => (card.style.transform = ''));
  });
}

// ======== Acessibilidade ========
document.querySelectorAll('button, a, .card').forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') el.click();
  });
});
