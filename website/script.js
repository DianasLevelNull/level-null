// Header direkt einbinden mit dynamischen Pfaden
const isInPages = window.location.pathname.includes('/pages/');
const homeLink = isInPages ? '../../index.html' : 'index.html';
const aboutLink = isInPages ? 'about.html' : 'website/pages/about.html';
const contactLink = isInPages ? 'contact.html' : 'website/pages/contact.html';
const futureLink = isInPages ? 'future.html' : 'website/pages/future.html';

const headerHTML = `
   <header class="header">
        <div class="gradient-text">
            <h1 class="gradient-text"><a href="${homeLink}" style="color: inherit; text-decoration: none;">Level Null</a></h1>
            <nav class="gradient-text">
                <ul>
                    <li><a href="${homeLink}">Home</a></li>
                    <li><a href="${aboutLink}">Über mich</a></li>
                    <li><a href="${contactLink}">Kontakt</a></li>
                    <li><a href="${futureLink}">Pläne und Ideen</a></li>
                </ul>
            </nav>
        </div>
        <button id="theme-toggle" class="theme-toggle-btn" title="Theme wechseln">
            <img id="theme-icon" src="" alt="Theme Icon" style="width: 24px; height: 24px;">
        </button>
    </header>
`;

const container = document.getElementById('header-container');
if (container) {
  container.innerHTML = headerHTML;
  
  // Theme-Toggle nach dem Header-Laden einrichten
  setupThemeToggle();
} else {
  console.error('header-container nicht gefunden');
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const linkTag = document.querySelector('link[rel="stylesheet"]');

  if (!toggleBtn || !linkTag) return;

  // Basis-Pfad für Themes abhängig vom aktuellen Verzeichnis
  const themeBase = isInPages ? '../themes' : 'website/themes';
  const iconBase = isInPages ? '../../assets/website/icons' : 'assets/website/icons';

  // Icon basierend auf aktuellem Theme setzen
  const updateIcon = () => {
    const href = linkTag.getAttribute('href') || '';
    if (href.includes('dark')) {
      themeIcon.src = `${iconBase}/icons8-sonne-64.png`;
      toggleBtn.title = 'Zur hellen Seite wechseln';
    } else {
      themeIcon.src = `${iconBase}/icons8-mond-64.png`;
      toggleBtn.title = 'Zur dunklen Seite wechseln';
    }
  };

  updateIcon();

  // Toggle-Funktionalität
  toggleBtn.addEventListener('click', () => {
    const currentHref = linkTag.getAttribute('href') || '';
    if (currentHref.includes('dark')) {
      linkTag.setAttribute('href', `${themeBase}/styles.css`);
      localStorage.setItem('theme', 'light');
    } else {
      linkTag.setAttribute('href', `${themeBase}/darktheme.css`);
      localStorage.setItem('theme', 'dark');
    }
    updateIcon();
  });

  // Theme aus localStorage laden (beim ersten Laden)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    linkTag.setAttribute('href', `${themeBase}/darktheme.css`);
    updateIcon();
  }
}

  // Aktuelles Jahr im Footer
  document.getElementById("year").textContent = new Date().getFullYear();

// Passwort für privaten Bereich
function checkPassword() {
    const passwordInput = document.getElementById('password').value;
    const privatBereich = document.getElementById('privatBereich');
    const correctPassword = 'levelnull2025'; // maximale Sicherheit: unverschlüsselte Speicherung direkt vor Ort XD

    if (passwordInput === correctPassword) {
        privatBereich.style.display = 'block';
    } else {
        alert('Netter Versuch.');
    }
}

// Aktuelles Jahr im Footer
document.getElementById("year").textContent = new Date().getFullYear(); 