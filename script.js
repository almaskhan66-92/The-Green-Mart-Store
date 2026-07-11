// The Green Mart - Interactivity
(function () {
  'use strict';

  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // Header search interaction
  const searchForm = document.querySelector('.header-search');
  const searchInput = document.querySelector('.header-search input');
  const categorySelect = document.querySelector('.category-select');
  if (searchForm && searchInput && categorySelect) {
    categorySelect.addEventListener('change', () => {
      const selectedOption = categorySelect.options[categorySelect.selectedIndex];
      const label = selectedOption ? selectedOption.textContent.trim() : 'Selected category';
      if (categorySelect.value !== 'all') {
        showToast(`${label} — coming soon!`);
      }
    });

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      const selectedCategory = categorySelect.value.toLowerCase();
      const cards = Array.from(document.querySelectorAll('.cat-card'));
      const matches = cards.filter((card) => {
        const text = card.textContent.toLowerCase();
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const categoryMatch = selectedCategory === 'all' || name.includes(selectedCategory) || text.includes(selectedCategory);
        const queryMatch = !query || text.includes(query) || name.includes(query);
        return categoryMatch && queryMatch;
      });

      cards.forEach((card) => card.classList.remove('search-match'));
      if (matches.length) {
        matches.forEach((card) => card.classList.add('search-match'));
        matches[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(query ? `Showing ${matches.length} results for “${query}”` : `Showing ${matches.length} matching categories`);
      } else {
        showToast('No matching categories found');
      }
    });
  }

  // Category click -> toast
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  document.querySelectorAll('.cat-card').forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name') || 'Category';
      showToast('Exploring ' + name + ' — coming soon!');
    });
  });

  document.querySelectorAll('.contact-card').forEach((card) => {
    card.addEventListener('click', () => {
      const label = card.getAttribute('data-label');
      if (label) showToast(label);
    });
  });

  // Back to top
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (!toTop) return;
    if (window.scrollY > 400) toTop.classList.add('show');
    else toTop.classList.remove('show');
  });
  if (toTop) {
    toTop.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
