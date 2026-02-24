const toggles = document.querySelectorAll("[data-toggle='consent']");
const sheet = document.getElementById('consent-sheet');
const reveals = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav a');
const progressBar = document.getElementById('scroll-progress-bar');
const indicatorDots = document.querySelectorAll('.indicator-dot');
const bgGrid = document.querySelector('.bg-grid');
const bgOrbits = document.querySelectorAll('.bg-orbit');
const marketingHomeLink = document.getElementById('marketing-home-link');

function setSheetOpen(open) {
  if (!sheet) return;
  sheet.classList.toggle('open', open);
  sheet.setAttribute('aria-hidden', open ? 'false' : 'true');
}

if (sheet) {
  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      setSheetOpen(!sheet.classList.contains('open'));
    });
  });
}

if (reveals.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  reveals.forEach((node) => observer.observe(node));
}

if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = () => {
    const position = window.scrollY + 120;
    let activeIndex = 0;
    sections.forEach((section, index) => {
      if (section.offsetTop <= position) activeIndex = index;
    });
    navLinks.forEach((link, index) => {
      link.classList.toggle('active', index === activeIndex);
    });
    indicatorDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  };

  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
}

indicatorDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const target = document.querySelector(dot.getAttribute('data-target'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

if (marketingHomeLink) {
  marketingHomeLink.addEventListener('click', (event) => {
    const target = document.querySelector('#home');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (progressBar) {
  const progressTrack = progressBar.parentElement;
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollY = doc.scrollTop;
    const total = doc.scrollHeight - doc.clientHeight;
    const progress = total > 0 ? (scrollY / total) * 100 : 0;
    progressBar.style.width = `${progress}%`;

    if (progressTrack) {
      progressTrack.style.setProperty('--scroll-shift', `${progress * 6}px`);
    }
    if (bgGrid) {
      bgGrid.style.backgroundPosition = `${scrollY * 0.08}px ${scrollY * 0.05}px`;
    }
    bgOrbits.forEach((orbit, index) => {
      const x = (index === 0 ? 1 : -1) * scrollY * 0.035;
      const y = (index === 0 ? 1 : 0.7) * scrollY * 0.055;
      orbit.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    });
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && sheet && sheet.classList.contains('open')) {
    setSheetOpen(false);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.status-progress-bar');
  bars.forEach((bar, i) => {
    setTimeout(() => {
      bar.classList.add('done');
      const row = bar.closest('.status-row');
      if (row) row.classList.add('progress-done');
    }, 800 + i * 600);
  });
});

document.querySelectorAll('.why-toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.why-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const persona = btn.dataset.persona;
    document.querySelectorAll('.why-text').forEach(el => {
      el.textContent = el.dataset[persona];
    });
  });
});

document.querySelectorAll('.why-text').forEach(el => {
  el.textContent = el.dataset.users;
});
