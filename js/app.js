/**
 * ARISE PUBLIC SCHOOL - Application Logic & Interactivity
 * Features Three.js 3D WebGL Background Engine & 3D Interactive Parallax Tilt
 */

document.addEventListener('DOMContentLoaded', () => {
  init3DScene();
  init3DTiltEffects();
  initNavbarScroll();
  initMobileDrawer();
  initDynamicContent();
  initGalleryFilters();
  initFormValidations();
  initBackToTop();
  initRouteHandler();
});

/**
 * Ultra-Aesthetic 3D Three.js WebGL Particle & Geometry Scene
 */
function init3DScene() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = document.querySelector('.hero-section');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient & Directional Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x2563eb, 1.2); // Navy Blue Glow
  dirLight1.position.set(20, 20, 20);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xdc2626, 1.2); // Coral Glow
  dirLight2.position.set(-20, -20, -10);
  scene.add(dirLight2);

  // Floating 3D Geometric Objects (Dodecahedrons & Icosahedrons)
  const group = new THREE.Group();
  scene.add(group);

  const geometries = [
    new THREE.DodecahedronGeometry(3.5, 0),
    new THREE.IcosahedronGeometry(2.8, 0),
    new THREE.TorusGeometry(3.2, 0.4, 16, 100),
    new THREE.OctahedronGeometry(2.2, 0),
    new THREE.TetrahedronGeometry(2.5, 0)
  ];

  const materials = [
    new THREE.MeshPhongMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3, metalness: 0.8, transparent: true, opacity: 0.45 }),
    new THREE.MeshPhongMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.35 }),
    new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.2, metalness: 0.7, transparent: true, opacity: 0.4 }),
    new THREE.MeshPhongMaterial({ color: 0xf43f5e, wireframe: true, transparent: true, opacity: 0.3 })
  ];

  const meshCount = 12;
  const meshes = [];

  for (let i = 0; i < meshCount; i++) {
    const geom = geometries[i % geometries.length];
    const mat = materials[i % materials.length];
    const mesh = new THREE.Mesh(geom, mat);

    mesh.position.x = (Math.random() - 0.5) * 55;
    mesh.position.y = (Math.random() - 0.5) * 35;
    mesh.position.z = (Math.random() - 0.5) * 20 - 5;

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    const scale = Math.random() * 0.7 + 0.6;
    mesh.scale.set(scale, scale, scale);

    // Custom floating parameters
    mesh.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.015,
      rotSpeedY: (Math.random() - 0.5) * 0.015,
      floatSpeed: Math.random() * 0.002 + 0.001,
      floatOffset: Math.random() * Math.PI * 2,
      baseY: mesh.position.y
    };

    group.add(mesh);
    meshes.push(mesh);
  }

  // 3D Particle Starfield
  const particleCount = 220;
  const particleGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 85;
    positions[i + 1] = (Math.random() - 0.5) * 55;
    positions[i + 2] = (Math.random() - 0.5) * 45;
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.55,
    transparent: true,
    opacity: 0.65
  });

  const particleSystem = new THREE.Points(particleGeom, particleMat);
  scene.add(particleSystem);

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    group.rotation.y = targetX * 1.5 + elapsedTime * 0.05;
    group.rotation.x = -targetY * 1.5;

    particleSystem.rotation.y = elapsedTime * 0.02;

    meshes.forEach(mesh => {
      mesh.rotation.x += mesh.userData.rotSpeedX;
      mesh.rotation.y += mesh.userData.rotSpeedY;
      mesh.position.y = mesh.userData.baseY + Math.sin(elapsedTime * 2 + mesh.userData.floatOffset) * 0.8;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

/**
 * 3D Mouse Parallax & Tilt Effect for Cards
 */
function init3DTiltEffects() {
  const tiltContainers = document.querySelectorAll('.tilt-container, .quick-card, .approach-card, .academic-card');

  tiltContainers.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/**
 * Sticky Navbar & Header Elevation & Scroll Progress
 */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    }
  });
}

/**
 * Mobile Drawer Navigation
 */
function initMobileDrawer() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1150) {
      closeDrawer();
    }
  });

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/**
 * Dynamic Content Rendering from ARISE_CONFIG
 */
function initDynamicContent() {
  if (typeof ARISE_CONFIG === 'undefined') return;

  // Render Approach Pillars
  const approachContainer = document.getElementById('approach-cards-container');
  if (approachContainer && ARISE_CONFIG.approachPillars) {
    approachContainer.innerHTML = ARISE_CONFIG.approachPillars.map(pillar => `
      <div class="approach-card tilt-container">
        <div class="approach-icon-wrap">
          <i class="fas ${pillar.icon}"></i>
        </div>
        <h3>${pillar.title}</h3>
        <p>${pillar.desc}</p>
      </div>
    `).join('');
  }

  // Render Academics Cards
  const academicContainer = document.getElementById('academic-cards-container');
  if (academicContainer && ARISE_CONFIG.academicWings) {
    academicContainer.innerHTML = ARISE_CONFIG.academicWings.map(wing => `
      <div class="academic-card tilt-container">
        <div class="academic-card-header">
          <span class="academic-badge">${wing.ageGroup}</span>
          <h3>${wing.title}</h3>
          <p>${wing.grades}</p>
        </div>
        <div class="academic-card-body">
          <p>${wing.description}</p>
          <ul class="academic-highlights-list">
            <li><i class="fas fa-check-circle"></i> Activity-Oriented Pedagogy</li>
            <li><i class="fas fa-check-circle"></i> Core Literacy & Numeracy</li>
            <li><i class="fas fa-check-circle"></i> Value-based Moral Education</li>
          </ul>
        </div>
      </div>
    `).join('');
  }

  // Render Campus Life Items with Real Photos
  const campusContainer = document.getElementById('campus-cards-container');
  if (campusContainer && ARISE_CONFIG.campusLife) {
    campusContainer.innerHTML = ARISE_CONFIG.campusLife.map(item => `
      <div class="campus-card tilt-container">
        <div class="campus-media-holder">
          <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 220px; object-fit: cover; display: block;">
        </div>
        <div class="campus-card-content">
          <div class="campus-card-category">${item.category}</div>
          <h3 class="campus-card-title">${item.title}</h3>
          <p class="campus-card-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Render News & Announcements
  const newsContainer = document.getElementById('news-cards-container');
  if (newsContainer && ARISE_CONFIG.newsAndEvents) {
    newsContainer.innerHTML = ARISE_CONFIG.newsAndEvents.map(item => `
      <div class="news-card">
        <span class="news-type-badge ${item.badgeClass}">${item.type}</span>
        <h3 class="news-title">${item.title}</h3>
        <div class="news-date"><i class="far fa-calendar-alt"></i> ${item.date}</div>
        <p class="news-summary">${item.summary}</p>
        <button class="btn-secondary" style="color: var(--primary-navy-900); border-color: var(--slate-300); padding: 0.5rem 1.25rem; margin-top: auto;" onclick="showAnnouncementModal('${item.title}', '${item.details}')">
          Read Notice
        </button>
      </div>
    `).join('');
  }

  // Render Gallery Items
  renderGalleryGrid('All');
}

/**
 * Gallery Filtering & Lightbox Modal
 */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-filter');
      renderGalleryGrid(cat);
    });
  });
}

function renderGalleryGrid(category) {
  const container = document.getElementById('gallery-grid-container');
  if (!container || typeof ARISE_CONFIG === 'undefined') return;

  const items = category === 'All' 
    ? ARISE_CONFIG.galleryItems 
    : ARISE_CONFIG.galleryItems.filter(i => i.category.toLowerCase() === category.toLowerCase());

  container.innerHTML = items.map(item => `
    <div class="gallery-item tilt-container" onclick="openLightbox('${item.title}', '${item.desc}', '${item.category}')">
      <div style="height: 240px; overflow: hidden; position: relative;">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease;">
      </div>
      <div class="gallery-item-info">
        <div class="gallery-item-title">${item.title}</div>
        <div class="gallery-item-cat">${item.desc}</div>
      </div>
    </div>
  `).join('');
}

/**
 * Interactive Form Validations & Toasts
 */
function initFormValidations() {
  const enquiryForm = document.getElementById('admissionEnquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const studentName = document.getElementById('studentName').value.trim();
      const parentName = document.getElementById('parentName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const applyingClass = document.getElementById('applyingClass').value;

      if (!studentName || !parentName || !phone || !applyingClass) {
        showToast('Please fill out all required fields marked with *', 'error');
        return;
      }

      if (!/^\+?\d{10,12}$/.test(phone.replace(/[\s-]/g, ''))) {
        showToast('Please enter a valid 10-digit phone number', 'error');
        return;
      }

      // Success
      showToast(`Thank you, ${parentName}! Admission enquiry for ${studentName} (Class: ${applyingClass}) received. Our desk will contact you soon.`, 'success');
      enquiryForm.reset();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for contacting Arise Public School! We have received your message.', 'success');
      contactForm.reset();
    });
  }
}

/**
 * Toast System
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeftColor = type === 'error' ? '#dc2626' : '#16a34a';

  const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
  const iconColor = type === 'error' ? '#dc2626' : '#16a34a';

  toast.innerHTML = `
    <i class="fas ${icon}" style="color: ${iconColor}; font-size: 1.3rem;"></i>
    <div style="font-size: 0.92rem; font-weight: 600; color: #1e293b;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slide-in 0.3s reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

/**
 * Modals & Lightbox Triggers
 */
window.openLightbox = function(title, desc, category) {
  showToast(`[Gallery Photo] ${title} (${category}): ${desc}`);
};

window.showAnnouncementModal = function(title, details) {
  showToast(`${title}: ${details}`);
};

/**
 * Back To Top & Floating Enquiry
 */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Client-Side SPA Route Handling
 */
function initRouteHandler() {
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');
  
  function handleHashChange() {
    const hash = window.location.hash || '#home';
    const targetSection = document.querySelector(hash);

    // Active link highlighting
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}
