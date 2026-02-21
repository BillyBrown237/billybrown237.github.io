const html = document.documentElement;
const icon = document.getElementById('themeIcon');
const label = document.getElementById('themeLabel');

// Detect system preference on first load
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
setTheme(saved);

function setTheme(t) {
    html.setAttribute('data-theme', t);
    icon.textContent = t === 'dark' ? '🌙' : '☀️';
    label.textContent = t;
    localStorage.setItem('theme', t);
}

function toggleTheme() {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}