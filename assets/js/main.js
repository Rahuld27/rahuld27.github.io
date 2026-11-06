/*===== THEME TOGGLE =====*/
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function getStoredTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (e) {
        return null;
    }
}

function applyTheme(theme) {
    root.dataset.theme = theme;
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
        localStorage.setItem('theme', next);
    } catch (e) { /* storage unavailable, theme still applies for this visit */ }
});

systemDark.addEventListener('change', (event) => {
    if (getStoredTheme() === null) {
        applyTheme(event.matches ? 'dark' : 'light');
    }
});


/*===== MOBILE MENU =====*/
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navToggleIcon = navToggle.querySelector('i');

function setMenuOpen(open) {
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navToggleIcon.className = open ? 'bx bx-x' : 'bx bx-menu';
}

navToggle.addEventListener('click', () => {
    setMenuOpen(!navMenu.classList.contains('is-open'));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        setMenuOpen(false);
    }
});


/*===== ACTIVE LINK ON SCROLL =====*/
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }
        navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));


/*===== HEADER SHADOW =====*/
const header = document.getElementById('header');

function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });


/*===== REVEAL ON SCROLL =====*/
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}


/*===== FOOTER YEAR =====*/
document.getElementById('year').textContent = String(new Date().getFullYear());
