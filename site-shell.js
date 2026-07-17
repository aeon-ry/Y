const SITE_ITEMS = [
  { label: 'Home', href: 'index.html', showInNav: true },
  { label: 'RAi Archive', href: 'RAilingua.html', showInNav: true },
  { label: 'NinjaStar', href: 'ninjastar.html', showInNav: true },
  { label: 'RY/RAI/RI', href: 'ry-rai-ri.html', showInNav: true },
  { label: 'RAiOS v1.0', href: 'raios-v1.html', showInNav: true, kernel: true, tag: 'Kernel I · VT323 CRT Shell', title: 'RAiOS v1.0 (Terminal System)', desc: 'Vintage green-phosphor command terminal with Three.js background matrix particles, directory explorer, and legacy system emulators.' },
  { label: 'Kurai Edition', href: 'kurai-edition.html', showInNav: true },
  { label: 'KALI OS', href: 'kali-os.html', showInNav: true, kernel: true, tag: 'Kernel III · Cyberpunk Neon IDE', title: 'KALI OS (Self-Assembling operating system)', desc: 'High-contrast purple/cyan neon development board with real-time log monitoring, source code inspectors, package managers, and dynamic self-compiling quine engines.' },
  { label: 'RAiOS v4', href: 'raios-v4.html', showInNav: true, kernel: true, tag: 'Kernel IV · Functional Desktop Shell', title: 'RAiOS v4 (Windowed OS)', desc: 'A more practical desktop-style environment with status bar, windows, file browser, text editor, and terminal modules.' },
  { label: 'RAi Archive OS', href: 'rai-archive.html', showInNav: true, kernel: true, tag: 'Kernel V · Archive Knowledge OS', title: 'RAi Archive OS', desc: 'An archive-first knowledge environment for agents, ideas, companion prompts, and layered identity fragments.' }
];

function getCurrentPage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path === '' ? 'index.html' : path;
}

function renderNav(root) {
  if (!root) return;
  const currentPage = getCurrentPage();
  const links = SITE_ITEMS.filter(item => item.showInNav !== false)
    .map(item => {
      const isActive = item.href === currentPage;
      return `<a href="${item.href}" class="${isActive ? 'active' : ''}">${item.label}</a>`;
    })
    .join('');
  root.innerHTML = links;
}

function renderKernelCards() {
  const container = document.getElementById('kernel-selector');
  if (!container) return;
  const cards = SITE_ITEMS.filter(item => item.kernel)
    .map(item => `
      <div class="card" data-kernel-id="${item.href}">
        <div class="card-details">
          <span class="card-tag tag-retro">${item.tag}</span>
          <h2 class="card-title">${item.title}</h2>
          <p class="card-desc">${item.desc}</p>
        </div>
        <a class="card-action" href="${item.href}">Open</a>
      </div>
    `)
    .join('');
  container.innerHTML = cards;
}

function initSiteShell() {
  document.querySelectorAll('.site-nav, .system-nav-bar').forEach(renderNav);
  renderKernelCards();
}

document.addEventListener('DOMContentLoaded', initSiteShell);
