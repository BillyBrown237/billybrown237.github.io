const html = document.documentElement;
const icon = document.getElementById('themeIcon');
const label = document.getElementById('themeLabel');

// Sync UI to whatever theme was applied before paint
const current = html.getAttribute('data-theme');
setTheme(current);

function setTheme(t) {
    html.setAttribute('data-theme', t);
    icon.textContent = t === 'dark' ? '🌙' : '☀️';
    label.textContent = t;
    localStorage.setItem('theme', t);
    document.getElementById('themeToggle').setAttribute(
        'aria-label',
        `Switch to ${t === 'dark' ? 'light' : 'dark'} mode`
    );
}

function toggleTheme() {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}