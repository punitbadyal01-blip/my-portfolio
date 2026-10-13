/* ============================================================
   script.js — Punit Badyal Portfolio Spatial Engine & Admin Logic
   ============================================================ */

// ── INITIAL DATA STORES ──────────────────────────────────────
const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'AI-Based Hand Gesture Controlled Game System',
    description: 'A computer vision project that maps hand gestures to game controls using Python, OpenCV, and MediaPipe.',
    longDescription: 'Built with Python, OpenCV, and MediaPipe, the system tracks hand landmarks in real time and maps gestures to controls for games like Subway Surfers using hand tracking.',
    image: 'assets/images/project-hand-gesture.png',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision', 'ML'],
    github: 'https://github.com/punitbadyal01-blip',
    demo: '#',
    featured: true
  },
  {
    id: 2,
    title: 'Online Courier Service Management System',
    description: 'A web application for courier bookings, shipment tracking, and order status management.',
    longDescription: 'Full-stack web application for booking and tracking courier services. Features booking forms, tracking dashboards, dynamic order status, and responsive UI design.',
    image: 'assets/images/project-courier-service.png',
    technologies: ['Java', 'JavaScript', 'CSS3', 'HTML5'],
    github: 'https://github.com/punitbadyal01-blip',
    demo: '#',
    featured: true
  },
  {
    id: 3,
    title: 'Image Watermark Adder',
    description: 'Web app allowing users to upload images and apply customizable text watermarks with options for font, size, opacity, and position.',
    longDescription: 'Adds customizable watermarks using Python backend & Web frontend with HTML5 Canvas API for quick batch image protection.',
    image: 'assets/images/project-watermark.png',
    technologies: ['Java', 'Python', 'JavaScript', 'Canvas API', 'CSS3'],
    github: 'https://github.com/punitbadyal01-blip',
    demo: '#',
    featured: false
  }
];

const DEFAULT_CERTS = [
  {
    "id": 1,
    "title": "Web Weave — TRENZ ’25",
    "issuer": "M. Kumarasamy College of Engineering",
    "description": "Participation in Web Weave at TRENZ ’25, organised by the Department of Freshmen Engineering.",
    "date": "30 Apr 2025",
    "image": "assets/images/cert-java.jpg",
    "category": "Participation"
  },
  {
    "id": 2,
    "title": "Cybersecurity Analyst Job Simulation",
    "issuer": "Tata / Forage",
    "description": "Completed a job simulation covering identity and access management (IAM) fundamentals, IAM strategy assessment, custom IAM solutions, and platform integration.",
    "date": "4 Jun 2025",
    "image": "assets/images/cert-python.jpg",
    "category": "Completion"
  },
  {
    "id": 3,
    "title": "Adobe India Hackathon — Round 1",
    "issuer": "Adobe / Unstop",
    "description": "Participated with Team VOSTRO in Round 1: Online MCQ Assessment + Coding.",
    "date": "",
    "image": "assets/images/cert-react.jpg",
    "category": "Participation"
  },
  {
    "id": 4,
    "title": "Python Coder",
    "issuer": "Kaggle",
    "description": "Earned the Python Coder badge on Kaggle.",
    "date": "10 Nov 2025",
    "image": "assets/images/cert-js-algo.jpg",
    "category": "Badge"
  },
  {
    "id": 5,
    "title": "Code Forker",
    "issuer": "Kaggle",
    "description": "Earned the Code Forker badge on Kaggle.",
    "date": "14 Nov 2025",
    "image": "assets/images/cert-responsive.jpg",
    "category": "Badge"
  },
  {
    "id": 6,
    "title": "Google Analytics Certification",
    "issuer": "Google",
    "description": "Issued 8 August 2025. The certificate’s stated validity ended on 8 August 2026.",
    "date": "8 Aug 2025",
    "image": "assets/images/cert-ml.jpg",
    "category": "Certification"
  },
  {
    "id": 7,
    "title": "Aether HackConquest Hackathon",
    "issuer": "Thakur College of Engineering and Technology / Unstop",
    "description": "Participated with Team Opp_hunter in the Aether HackConquest Hackathon organised by TCET, Mumbai.",
    "date": "",
    "image": "assets/images/cert-opencv.jpg",
    "category": "Participation"
  },
  {
    "id": 8,
    "title": "MKCE | UNSTOP | IEEE — Coding Contest",
    "issuer": "M. Kumarasamy College of Engineering / Unstop",
    "description": "Participated in the Code Contest organised by M. Kumarasamy College of Engineering, Karur.",
    "date": "",
    "image": "assets/images/cert-springboot.jpg",
    "category": "Participation"
  },
  {
    "id": 9,
    "title": "APPRADIX — 12Hrs APPATHON",
    "issuer": "Mobile App Club, MKCE / ISTE",
    "description": "Participated in APPRADIX, a 12-hour appathon organised by the Mobile App Club powered by ISTE at MKCE.",
    "date": "24 Oct 2025",
    "image": "assets/images/cert-git.jpg",
    "category": "Participation"
  },
  {
    "id": 10,
    "title": "Developing a Consistent Metric to Measure End-User Water Service in Developing Countries",
    "issuer": "Osman Lab, Stanford University",
    "description": "Certificate of appreciation for participation in the study, conducted in collaboration with Gnanamani College of Technology and supported by the King Center on Global Development.",
    "date": "",
    "image": "assets/images/cert-firebase.jpg",
    "category": "Appreciation"
  }
];

const CERTS_STORAGE_KEY = 'punit_certs';

const DEFAULT_SKILLS = [
  { name: 'Java', cat: 'languages', level: 5, icon: '☕' },
  { name: 'Python', cat: 'languages', level: 4, icon: '🐍' },
  { name: 'JavaScript', cat: 'languages', level: 4, icon: '⚡' },
  { name: 'C Programming', cat: 'languages', level: 3, icon: '⚙️' },
  { name: 'Spring Boot', cat: 'backend', level: 4, icon: '🍃' },
  { name: 'HTML5', cat: 'frontend', level: 5, icon: '🌐' },
  { name: 'CSS3', cat: 'frontend', level: 4, icon: '🎨' },
  { name: 'Node.js', cat: 'backend', level: 3, icon: '🟩' },
  { name: 'Firebase', cat: 'backend', level: 4, icon: '🔥' },
  { name: 'OpenCV', cat: 'ai', level: 3, icon: '👁️' },
  { name: 'MediaPipe', cat: 'ai', level: 3, icon: '🎥' },
  { name: 'NumPy / Pandas', cat: 'ai', level: 3, icon: '🐼' },
  { name: 'scikit-learn', cat: 'ai', level: 2, icon: '🤖' },
  { name: 'Data Structures & Algorithms', cat: 'cs', level: 4, icon: '🧠' },
  { name: 'DBMS', cat: 'cs', level: 3, icon: '🗄️' },
  { name: 'OOP Concepts', cat: 'cs', level: 4, icon: '🔷' },
  { name: 'Operating Systems', cat: 'cs', level: 3, icon: '💻' },
  { name: 'Git & GitHub', cat: 'tools', level: 4, icon: '📦' },
  { name: 'VS Code', cat: 'tools', level: 5, icon: '💡' },
  { name: 'Vite', cat: 'tools', level: 4, icon: '⚡' }
];

// ── LOCAL STORAGE PERSISTENCE HELPERS ─────────────────────────
function getStoredData(key, fallback) {
  const data = localStorage.getItem(key);
  if (data === null) {
    return fallback;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
}

function setStoredData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadStoredArrayData(key, fallback) {
  const data = localStorage.getItem(key);
  if (data === null) {
    setStoredData(key, fallback);
    return fallback;
  }

  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) throw new Error('Stored data is not an array');
    return parsed;
  } catch (e) {
    setStoredData(key, fallback);
    return fallback;
  }
}

function saveCertsData() {
  setStoredData(CERTS_STORAGE_KEY, CERTS_DATA);
}

function normalizeMediaPath(value, fallback = '') {
  if (!value || typeof value !== 'string') return fallback;

  let normalized = value.trim();
  if (!normalized) return fallback;

  if (/^(https?:)?\/\//i.test(normalized) || normalized.startsWith('data:') || normalized.startsWith('blob:')) {
    return normalized;
  }

  normalized = normalized.replace(/\\/g, '/');

  const assetsMatch = normalized.match(/(?:^|\/)(assets\/[^?#]+)$/i);
  if (assetsMatch) {
    normalized = assetsMatch[1];
  }

  if (/^[a-zA-Z]:\//.test(normalized)) {
    const fallbackMatch = normalized.match(/\/assets\/[^?#]+$/i);
    normalized = fallbackMatch ? fallbackMatch[0].replace(/^\/+/, '') : normalized.replace(/^[a-zA-Z]:\//, '').replace(/^\/+/, '');
  }

  if (normalized.startsWith('/')) {
    normalized = normalized.replace(/^\/+/, '');
  }

  try {
    return new URL(normalized, window.location.href).href;
  } catch (error) {
    return normalized;
  }
}

let PROJECTS_DATA = getStoredData('punit_projects', DEFAULT_PROJECTS).map(p => ({ ...p, image: normalizeMediaPath(p.image) }));
let CERTS_DATA = loadStoredArrayData(CERTS_STORAGE_KEY, DEFAULT_CERTS).map(c => {
  const bundled = DEFAULT_CERTS.find(item => normalizeMediaPath(item.image) === normalizeMediaPath(c.image));
  return { ...c, ...(bundled || {}), image: normalizeMediaPath(c.image) };
});
saveCertsData();
let SKILLS_DATA = getStoredData('punit_skills', DEFAULT_SKILLS);
let MESSAGES_DATA = getStoredData('punit_messages', []);

// ── INITIALIZATION & LOADING SCREEN ─────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) loader.classList.add('hidden');
  }, 600);
  init3DTiltEngine();
  restoreAdminSession();

  // Attach Admin Portal Nav Button Listener
  const adminBtn = document.getElementById('admin-portal-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', openSecretAdmin);
  }
});

// ── SCROLL PROGRESS BAR & NAVBAR GLASS EFFECT ─────────────────
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const scrolled = total > 0 ? (window.scrollY / total) * 100 : 0;
  const progressEl = document.getElementById('scroll-progress');
  if (progressEl) progressEl.style.width = scrolled + '%';

  // Navbar glass effect
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }

  // Active section tracking
  const sections = document.querySelectorAll('section');
  let current = 'home';
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top - 140 <= 0) current = sec.id;
  });
  document.querySelectorAll('.navbar__link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// ── REVEAL ANIMATIONS & COUNTERS ──────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.querySelector('.home__stat-num')) {
        animateCounters();
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));

function animateCounters() {
  document.querySelectorAll('.home__stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    let count = 0;
    const id = setInterval(() => {
      count++;
      el.innerText = count + '+';
      if (count >= target) clearInterval(id);
    }, 100);
  });
}

// ── TYPEWRITER ANIMATION ───────────────────────────────────────
const roles = ['Full Stack Developer', 'Java Developer', 'AI / ML Explorer', 'CS Student @ MKCE', 'Problem Solver'];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter-text');

function typeLoop() {
  if (!typeEl) return;
  const currentRole = roles[roleIdx];
  if (!isDeleting && charIdx < currentRole.length) {
    charIdx++;
  } else if (!isDeleting && charIdx === currentRole.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && charIdx > 0) {
    charIdx--;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
  }
  typeEl.innerText = currentRole.substring(0, charIdx);
  setTimeout(typeLoop, isDeleting ? 40 : 80);
}
typeLoop();

// ── UNIVERSAL 3D SPATIAL TILT ENGINE ───────────────────────────
function init3DTiltEngine() { /* Cards use subtle CSS hover states. */ }

// ── MONOCHROME 3D CANVAS PARTICLE SYSTEM ──────────────────────
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const numParticles = 65;
  const fov = 350;
  let mouseX = 0, mouseY = 0;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - width / 2) * 0.05;
    mouseY = (e.clientY - height / 2) * 0.05;
  });

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 800 - 400,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      vz: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5
    });
  }

  function animate3DParticles() {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2 + mouseX;
    const cy = height / 2 + mouseY;

    const projected = particles.map(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      if (p.x < -width) p.x = width;
      if (p.x > width) p.x = -width;
      if (p.y < -height) p.y = height;
      if (p.y > height) p.y = -height;
      if (p.z < -400) p.z = 400;
      if (p.z > 400) p.z = -400;

      const scale = fov / (fov + p.z + 450);
      const px = p.x * scale + cx;
      const py = p.y * scale + cy;

      return { px, py, scale, p };
    });

    // Draw connecting lines in B&W Monochrome
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.strokeStyle = `rgba(220, 220, 220, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw 3D projected B&W particle nodes
    projected.forEach(item => {
      ctx.beginPath();
      ctx.arc(item.px, item.py, Math.max(0.5, item.p.radius * item.scale), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.8, item.scale * 0.7)})`;
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(animate3DParticles);
  }
  animate3DParticles();
}

// ── SKILLS RENDER & SEARCH / FILTER ────────────────────────────
function renderSkills(list) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = list.map(s => `
    <div class="skill-card reveal-scale visible">

      <div class="skill-card__name">${s.name}</div>

    </div>
  `).join('');
  init3DTiltEngine();
}
renderSkills(SKILLS_DATA);

function filterSkills(cat, btn) {
  document.querySelectorAll('.skills__tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const filtered = cat === 'all' ? SKILLS_DATA : SKILLS_DATA.filter(s => s.cat === cat);
  renderSkills(filtered);
}

function searchSkills(q) {
  const filtered = SKILLS_DATA.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  renderSkills(filtered);
}

// ── PROJECTS RENDER & MODAL ────────────────────────────────────
function handleImageUpload(fileInputId, targetInputId, previewId) {
  const fileInput = document.getElementById(fileInputId);
  const targetInput = document.getElementById(targetInputId);
  const preview = previewId ? document.getElementById(previewId) : null;
  const file = fileInput?.files?.[0];

  if (!file || !targetInput) return;

  if (file.size > 2 * 1024 * 1024) {
    alert('Please choose an image smaller than 2MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    targetInput.value = reader.result;
    if (preview) {
      preview.src = reader.result;
      preview.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
}

function renderProjects(list) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = list.map(p => {
    const imageSrc = normalizeMediaPath(p.image);
    return `
    <div class="project-card reveal visible" role="button" tabindex="0" onclick="openProjectModal(${p.id})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); openProjectModal(${p.id});}">
      <div class="project-card__image"><img src="${imageSrc}" alt="${p.title}" loading="lazy" width="640" height="400" /></div>
      <div class="project-card__index"><span>PROJECT ${String(p.id).padStart(2, '0')}</span><span aria-hidden="true">↗</span></div>
      <div class="project-card__body">
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__tags">
          ${p.technologies.slice(0,4).map(t => `<span class="badge badge-blue">${t}</span>`).join('')}
        </div>
      </div>
      <div class="project-card__footer">
        <span>View project details ↗</span>
      </div>
    </div>
  `;
  }).join('');
  init3DTiltEngine();
}
renderProjects(PROJECTS_DATA);

function filterProjects(tech, btn) {
  document.querySelectorAll('.projects__filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const filtered = tech === 'All' ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.technologies.includes(tech));
  renderProjects(filtered);
}

function openProjectModal(id) {
  const p = PROJECTS_DATA.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modal-title').innerText = p.title;
  document.getElementById('modal-desc').innerText = p.longDescription || p.description;
  document.getElementById('modal-tags').innerHTML = p.technologies.map(t => `<span class="badge badge-blue">${t}</span>`).join('');
  document.getElementById('modal-github').href = p.github;
  document.getElementById('modal-demo').href = p.demo;
  document.getElementById('modal-demo').hidden = !p.demo || p.demo === '#';
  document.getElementById('project-modal').classList.add('open');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('open');
}

// ── CERTS RENDER & MODAL ───────────────────────────────────────
function renderCerts(list) {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;
  grid.innerHTML = list.map(c => {
    const imageSrc = normalizeMediaPath(c.image);
    return `
    <div class="cert-card reveal-scale visible" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault(); openCertModal(${c.id});}" onclick="openCertModal(${c.id})">
      <div class="cert-card__thumb"><img src="${imageSrc}" alt="${c.title}" loading="lazy" /></div>
      <div class="cert-card__body">
        <h3 class="cert-card__title">${c.title}</h3>
        <p class="cert-card__issuer">${c.issuer}</p><span class="credential-type">${c.category || "Credential"}</span>
        <p class="cert-card__desc">${c.description}</p>
      </div>
      <div class="cert-card__footer">
        <span>${c.date || "Date not stated"}</span>
        <span style="color:var(--text-primary); font-weight:700;">View →</span>
      </div>
    </div>
  `;
  }).join('');
  init3DTiltEngine();
}
renderCerts(CERTS_DATA);

let selectedCertCategory = 'All';
let certificateQuery = '';
function applyCertificateFilters() {
  const query = certificateQuery.toLowerCase().trim();
  const filtered = CERTS_DATA.filter(c => (selectedCertCategory === 'All' || c.category === selectedCertCategory) && (c.title + ' ' + c.issuer).toLowerCase().includes(query));
  renderCerts(filtered);
  if (!filtered.length) document.getElementById('certs-grid').innerHTML = '<p class="empty-state" role="status">No matching credentials. Try another search or category.</p>';
}
function filterCerts(category, btn) {
  selectedCertCategory = category;
  document.querySelectorAll('.certs__tab').forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
  applyCertificateFilters();
}
function searchCerts(query) {
  certificateQuery = query;
  applyCertificateFilters();
}

function openCertModal(id) {
  const c = CERTS_DATA.find(x => x.id === id);
  if (!c) return;
  document.getElementById('cert-modal-img').src = normalizeMediaPath(c.image);
  document.getElementById('cert-modal-img').alt = c.title;
  document.getElementById('cert-modal-title').innerText = c.title;
  document.getElementById('cert-modal-issuer').innerText = c.issuer + (c.date ? ' · ' + c.date : '');
  document.getElementById('cert-modal-desc').innerText = c.description;
  document.getElementById('cert-modal-download').href = c.image;
  document.getElementById('cert-modal').classList.add('open');
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  if (modal) modal.classList.remove('open');
}

// ── KEYBOARD ESCAPE KEY LISTENER ─────────────────────────────
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu();
    closeProjectModal();
    closeCertModal();
    closeAdminModal();
    const win = document.getElementById('chatbot-window');
    if (win && win.classList.contains('open')) win.classList.remove('open');
  }
});

// ── CONTACT FORM VALIDATION & SUBMISSION ───────────────────────
function updateCharCount(el) {
  const charEl = document.getElementById('msg-char-count');
  if (charEl) charEl.innerText = el.value.length;
}

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (!form.reportValidity()) return;
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const body = message + String.fromCharCode(10,10) + 'From: ' + name + ' <' + email + '>';
  window.location.href = 'mailto:punitbadyal01@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  document.getElementById('form-success-banner').style.display = 'block';
}

// ── THEME SWITCHER ─────────────────────────────────────────────
const themeBtn = document.getElementById('theme-toggle-btn');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    themeBtn.innerText = next === 'dark' ? '◐' : '◑';
    localStorage.setItem('theme', next);
  });
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.innerText = '◐';
  }
}

// ── MOBILE MENU ────────────────────────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', String(mobileMenu.classList.contains('open')));
  });
}
function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
}

// ── SECRET ADMIN DASHBOARD LOGIC & TRIGGERS ───────────────────
function openSecretAdmin() {
  const adminModal = document.getElementById('admin-modal');
  if (adminModal) adminModal.classList.add('open');
}

// Secret keyboard shortcut: Ctrl + Shift + A
window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === 'a') {
    e.preventDefault();
    openSecretAdmin();
  }
});

function closeAdminModal() {
  const adminModal = document.getElementById('admin-modal');
  if (adminModal) adminModal.classList.remove('open');
}

function checkAdminAuth() {
  const passEl = document.getElementById('admin-pass-input');
  const pass = passEl ? passEl.value : '';
  if (pass === 'admin123') {
    localStorage.setItem('punit_admin_auth', 'true');
    showAdminDashboard();
  } else {
    const errEl = document.getElementById('admin-auth-error');
    if (errEl) errEl.style.display = 'block';
  }
}

function restoreAdminSession() {
  if (localStorage.getItem('punit_admin_auth') === 'true') {
    showAdminDashboard();
  }
}

function showAdminDashboard() {
  const loginScreen = document.getElementById('admin-login-screen');
  if (loginScreen) loginScreen.style.display = 'none';

  const mainViews = document.getElementById('admin-main-views');
  if (mainViews) mainViews.style.display = 'block';

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) logoutBtn.style.display = 'inline-flex';

  refreshAdminViews();
}

function adminLogout() {
  localStorage.removeItem('punit_admin_auth');
  const loginScreen = document.getElementById('admin-login-screen');
  if (loginScreen) loginScreen.style.display = 'block';

  const mainViews = document.getElementById('admin-main-views');
  if (mainViews) mainViews.style.display = 'none';

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) logoutBtn.style.display = 'none';

  const passEl = document.getElementById('admin-pass-input');
  if (passEl) passEl.value = '';
}

function switchAdminTab(tabName, btn) {
  document.querySelectorAll('.admin-tab-view').forEach(v => v.style.display = 'none');
  const targetView = document.getElementById(`admin-view-${tabName}`);
  if (targetView) targetView.style.display = 'block';

  document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
  const targetNav = document.getElementById(`admin-nav-${tabName}`);
  if (targetNav) targetNav.classList.add('active');
  else if (btn) btn.classList.add('active');
}

function refreshAdminViews() {
  // Update stats counters & badges safely
  const pStat = document.getElementById('admin-stat-projects'); if (pStat) pStat.innerText = PROJECTS_DATA.length;
  const pBadge = document.getElementById('admin-stat-projects-badge'); if (pBadge) pBadge.innerText = PROJECTS_DATA.length;
  const cStat = document.getElementById('admin-stat-certs'); if (cStat) cStat.innerText = CERTS_DATA.length;
  const cBadge = document.getElementById('admin-stat-certs-badge'); if (cBadge) cBadge.innerText = CERTS_DATA.length;
  const sStat = document.getElementById('admin-stat-skills'); if (sStat) sStat.innerText = SKILLS_DATA.length;
  const sBadge = document.getElementById('admin-stat-skills-badge'); if (sBadge) sBadge.innerText = SKILLS_DATA.length;
  const mStat = document.getElementById('admin-stat-messages'); if (mStat) mStat.innerText = MESSAGES_DATA.length;
  const mBadge = document.getElementById('admin-msg-badge'); if (mBadge) mBadge.innerText = MESSAGES_DATA.length;

  // Render Projects Admin List
  const projList = document.getElementById('admin-projects-list');
  if (projList) {
    projList.innerHTML = PROJECTS_DATA.map(p => `
      <div style="background:var(--bg-card); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:space-between; gap:1rem;">
        <img src="${normalizeMediaPath(p.image)}" style="width:60px; height:45px; object-fit:cover; border-radius:var(--radius-sm);" />
        <div style="flex-grow:1;">
          <div style="font-weight:700; font-size:0.95rem;">${p.title}</div>
          <div style="font-size:0.78rem; color:var(--text-muted);">${p.technologies.join(', ')}</div>
        </div>
        <button onclick="adminDeleteProject(${p.id})" class="btn btn-outline btn-sm" style="color:var(--color-error); border-color:rgba(239,68,68,0.3);">🗑️ Delete</button>
      </div>
    `).join('');
  }

  // Render Certs Admin List
  const certsList = document.getElementById('admin-certs-list');
  if (certsList) {
    certsList.innerHTML = CERTS_DATA.map(c => `
      <div style="background:var(--bg-card); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:space-between; gap:1rem;">
        <img src="${normalizeMediaPath(c.image)}" style="width:60px; height:45px; object-fit:cover; border-radius:var(--radius-sm);" />
        <div style="flex-grow:1;">
          <div style="font-weight:700; font-size:0.95rem;">${c.title}</div>
          <div style="font-size:0.78rem; color:var(--text-muted);">${c.issuer} · ${c.date}</div>
        </div>
        <button onclick="adminDeleteCert(${c.id})" class="btn btn-outline btn-sm" style="color:var(--color-error); border-color:rgba(239,68,68,0.3);">🗑️ Delete</button>
      </div>
    `).join('');
  }

  // Render Skills Admin List
  const skillsList = document.getElementById('admin-skills-list');
  if (skillsList) {
    skillsList.innerHTML = SKILLS_DATA.map(s => `
      <div style="background:var(--bg-card); padding:0.75rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span>${s.icon}</span>
          <span style="font-weight:700; font-size:0.88rem;">${s.name}</span>
        </div>
        <button onclick="adminDeleteSkill('${s.name}')" style="color:var(--color-error); font-size:0.8rem;">✕</button>
      </div>
    `).join('');
  }

  // Render Messages Admin List
  const msgList = document.getElementById('admin-messages-list');
  if (msgList) {
    if (MESSAGES_DATA.length === 0) {
      msgList.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:2rem;">No messages in inbox yet.</p>`;
    } else {
      msgList.innerHTML = MESSAGES_DATA.map(m => `
        <div style="background:var(--bg-card); padding:1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-color); display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div style="font-weight:800; font-size:1rem; color:var(--text-primary);">${m.name} <span style="font-weight:400; font-size:0.82rem; color:var(--text-muted);">(${m.email})</span></div>
            <span style="font-size:0.75rem; color:var(--text-muted);">${m.date}</span>
          </div>
          <div style="font-weight:700; font-size:0.9rem;">Subject: ${m.subject}</div>
          <div style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">${m.message}</div>
          <div style="text-align:right; margin-top:0.4rem;">
            <button onclick="adminDeleteMessage(${m.id})" class="btn btn-outline btn-sm" style="color:var(--color-error); font-size:0.75rem;">Delete Message</button>
          </div>
        </div>
      `).join('');
    }
  }
}

// ── ADMIN ADD / DELETE ACTIONS ───────────────────────────────
function adminAddProject(e) {
  e.preventDefault();
  const title = document.getElementById('proj-title-input').value;
  const techStr = document.getElementById('proj-tech-input').value;
  const image = document.getElementById('proj-img-input').value;
  const github = document.getElementById('proj-github-input').value;
  const desc = document.getElementById('proj-desc-input').value;

  if (!image) {
    alert('Please upload an image or enter an image path/URL before saving the project.');
    return;
  }

  const newProj = {
    id: Date.now(),
    title,
    description: desc,
    longDescription: desc,
    image: normalizeMediaPath(image),
    technologies: techStr.split(',').map(t => t.trim()),
    github,
    demo: '#',
    featured: true
  };

  PROJECTS_DATA.unshift(newProj);
  setStoredData('punit_projects', PROJECTS_DATA);
  renderProjects(PROJECTS_DATA);
  refreshAdminViews();
  e.target.reset();
  alert('✅ Project added successfully to live portfolio!');
}

function adminDeleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  PROJECTS_DATA = PROJECTS_DATA.filter(p => p.id !== id);
  setStoredData('punit_projects', PROJECTS_DATA);
  renderProjects(PROJECTS_DATA);
  refreshAdminViews();
}

function adminAddCert(e) {
  e.preventDefault();
  const title = document.getElementById('cert-title-input').value;
  const issuer = document.getElementById('cert-issuer-input').value;
  const image = document.getElementById('cert-img-input').value;
  const date = document.getElementById('cert-date-input').value;
  const desc = document.getElementById('cert-desc-input').value;

  if (!image) {
    alert('Please upload an image or enter an image path/URL before saving the certificate.');
    return;
  }

  const newCert = {
    id: Date.now(),
    title,
    issuer,
    description: desc,
    date,
    image: normalizeMediaPath(image)
  };

  CERTS_DATA.unshift(newCert);
  setStoredData('punit_certs', CERTS_DATA);
  renderCerts(CERTS_DATA);
  refreshAdminViews();
  e.target.reset();
  alert('✅ Certificate added successfully!');
}

function adminDeleteCert(id) {
  if (!confirm('Are you sure you want to delete this certificate?')) return;
  CERTS_DATA = CERTS_DATA.filter(c => c.id !== id);
  saveCertsData();
  renderCerts(CERTS_DATA);
  refreshAdminViews();
}

function adminAddSkill(e) {
  e.preventDefault();
  const name = document.getElementById('skill-name-input').value;
  const cat = document.getElementById('skill-cat-input').value;
  const icon = document.getElementById('skill-icon-input').value;
  const level = parseInt(document.getElementById('skill-level-input').value);

  const newSkill = { name, cat, icon, level };
  SKILLS_DATA.push(newSkill);
  setStoredData('punit_skills', SKILLS_DATA);
  renderSkills(SKILLS_DATA);
  refreshAdminViews();
  e.target.reset();
  alert('✅ Skill added successfully!');
}

function adminDeleteSkill(name) {
  if (!confirm(`Delete skill "${name}"?`)) return;
  SKILLS_DATA = SKILLS_DATA.filter(s => s.name !== name);
  setStoredData('punit_skills', SKILLS_DATA);
  renderSkills(SKILLS_DATA);
  refreshAdminViews();
}

function adminDeleteMessage(id) {
  MESSAGES_DATA = MESSAGES_DATA.filter(m => m.id !== id);
  setStoredData('punit_messages', MESSAGES_DATA);
  refreshAdminViews();
}

function adminClearMessages() {
  if (!confirm('Clear all received messages from inbox?')) return;
  MESSAGES_DATA = [];
  setStoredData('punit_messages', MESSAGES_DATA);
  refreshAdminViews();
}
