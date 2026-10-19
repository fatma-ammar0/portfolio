/**
 * ==============================================================================
 * FATMA AMMAR — GRAPHIC DESIGNER PORTFOLIO SCRIPTS
 * ==============================================================================
 * Features:
 * 1. Subtle Ambient Canvas Background Animation (#FFB1B1, #FFDBB0, #FFFAD3)
 * 2. Scroll-reveal Observer for Entrance Animations & Skill Bars
 * 3. Sticky Navbar & Active Section Scroll-Spy
 * 4. Mobile Drawer Navigation with Accessibility
 * 5. Interactive Project Filtering & Lightbox Modal Preview
 * 6. Copy-to-Clipboard Email Utility
 * 7. Interactive Contact Form with Validation & Toast Notification System
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. AMBIENT BACKGROUND CANVAS ANIMATION
  // ----------------------------------------------------------------------------
  initAmbientCanvas();

  // ----------------------------------------------------------------------------
  // 2. STICKY NAVBAR & ACTIVE SCROLL SPY
  // ----------------------------------------------------------------------------
  initNavigation();

  // ----------------------------------------------------------------------------
  // 3. SCROLL-BASED ENTRANCE REVEAL & SKILL PROGRESS BARS
  // ----------------------------------------------------------------------------
  initScrollReveal();

  // ----------------------------------------------------------------------------
  // 4. PROJECT FILTERING & LIGHTBOX MODAL
  // ----------------------------------------------------------------------------
  initProjects();

  // ----------------------------------------------------------------------------
  // 5. CONTACT FORM & INTERACTIVE ACTIONS (EMAIL COPY, TOASTS)
  // ----------------------------------------------------------------------------
  initContactInteractions();

  // ----------------------------------------------------------------------------
  // 6. UTILITIES (YEAR UPDATE & BACK TO TOP)
  // ----------------------------------------------------------------------------
  initUtilities();
});

/**
 * 1. Subtle Ambient Canvas Animation
 * Creates organic floating glowing gradient meshes and subtle interactive particles
 * using the requested palette: #FFB1B1, #FFDBB0, #FFFAD3.
 */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;

  // Track mouse coordinates for subtle interactive drift
  const mouse = {
    x: null,
    y: null,
    targetX: null,
    targetY: null,
    radius: 120
  };

  // Color tokens from palette
  const colors = [
    { r: 255, g: 177, b: 177 }, // #FFB1B1 (Blush)
    { r: 255, g: 219, b: 176 }, // #FFDBB0 (Peach)
    { r: 255, g: 250, b: 211 }  // #FFFAD3 (Champagne Cream)
  ];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', debounce(resizeCanvas, 150));

  window.addEventListener('pointermove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  window.addEventListener('pointerleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
  });

  // Ambient Floating Gradient Orbs
  const orbs = [
    { x: width * 0.2, y: height * 0.25, radius: 260, color: colors[0], vx: 0.25, vy: 0.18, phase: 0 },
    { x: width * 0.8, y: height * 0.45, radius: 300, color: colors[1], vx: -0.22, vy: 0.24, phase: 1.5 },
    { x: width * 0.5, y: height * 0.75, radius: 280, color: colors[2], vx: 0.15, vy: -0.2, phase: 3.1 },
    { x: width * 0.15, y: height * 0.85, radius: 240, color: colors[0], vx: -0.18, vy: -0.15, phase: 4.2 }
  ];

  // Subtle floating particle nodes
  const particleCount = Math.min(Math.floor((width * height) / 32000), 45);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: colors[i % colors.length],
      alpha: Math.random() * 0.4 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse easing
    if (mouse.targetX !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
      }
    }

    // 1. Draw Organic Floating Gradient Orbs
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < orbs.length; i++) {
      const orb = orbs[i];
      orb.phase += 0.008;
      orb.x += orb.vx + Math.sin(orb.phase) * 0.3;
      orb.y += orb.vy + Math.cos(orb.phase) * 0.3;

      // Wrap around bounds softly
      if (orb.x < -orb.radius) orb.x = width + orb.radius;
      if (orb.x > width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = height + orb.radius;
      if (orb.y > height + orb.radius) orb.y = -orb.radius;

      // Mouse subtle repulsion/attraction
      if (mouse.x !== null) {
        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 350) {
          orb.x -= (dx / dist) * 0.4;
          orb.y -= (dy / dist) * 0.4;
        }
      }

      // Radial gradient draw
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      gradient.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.12)`);
      gradient.addColorStop(0.5, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.05)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Draw Subtle Constellation Particle Nodes & Connecting Web
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Bounce at viewport edges
      if (p.x <= 0 || p.x >= width) p.vx *= -1;
      if (p.y <= 0 || p.y >= height) p.vy *= -1;

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          const edgeAlpha = (1 - distance / 110) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${edgeAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Pause when tab is invisible to conserve device battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }
  });
}

/**
 * 2. Sticky Navbar, Mobile Navigation Drawer & Scroll Spy
 */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileClose = document.getElementById('mobile-close-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll Header Shrink
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Open / Close Mobile Drawer
  function openMobileMenu() {
    mobileDrawer.classList.add('open');
    mobileBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileBtn) mobileBtn.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Active Section Scroll Spy
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));
}

/**
 * 3. Scroll Reveal & Skill Progress Bar Animation
 */
function initScrollReveal() {
  const revealItems = document.querySelectorAll('.reveal-item');
  const progressBars = document.querySelectorAll('.progress-fill');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealItems.forEach(item => revealObserver.observe(item));

  // Animate skill bars when Skills section is reached
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const target = bar.getAttribute('data-progress');
            bar.style.width = `${target}%`;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }
}

/**
 * 4. Project Filtering & Lightbox Modal Preview
 */
function initProjects() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  // Filter Buttons Interaction
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Modal / Lightbox Configuration
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close-btn');
  const modalDismiss = document.getElementById('modal-dismiss-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTag = document.getElementById('modal-tag');
  const modalExternalLink = document.getElementById('modal-external-link');

  // Project details database (can be easily extended)
  const projectDatabase = {
    'rashfa': {
      title: 'رشفة — Rashfa Specialty Coffee',
      tag: 'Visual Identity & Packaging',
      desc: 'Complete artisanal brand identity for Rashfa Coffee. Emphasizes modern Arabic calligraphy, luxury warm packaging, and merchandise designed in Photoshop and Illustrator.',
      img: 'assets/images/project-rashfa.jpg',
      link: 'https://www.behance.net'
    },
    'social-promo': {
      title: 'Seasonal Social Media Campaign',
      tag: 'Social Media & Advertising',
      desc: 'A cohesive digital campaign designed for Instagram & Facebook, driving engagement through intentional hierarchy, vibrant warm color contrasts, and promotional templates.',
      img: 'assets/images/project-rashfa.jpg',
      link: 'https://www.behance.net'
    },
    'corporate-cards': {
      title: 'Executive Business Cards & Stationery',
      tag: 'Print & Corporate Identity',
      desc: 'Sophisticated print-ready collateral designed to exact CMYK specifications with spot-UV accents, custom typography, and minimalist layouts.',
      img: 'assets/images/project-rashfa.jpg',
      link: 'https://www.behance.net'
    },
    'rollup-banner': {
      title: 'Exhibition Roll-up Banners',
      tag: 'Large Format & Trade Shows',
      desc: 'High-impact 85x200cm roll-up banners engineered for exhibition booth display, balancing bold readability with refined brand elegance.',
      img: 'assets/images/project-rashfa.jpg',
      link: 'https://www.behance.net'
    }
  };

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId] || projectDatabase['rashfa'];
    modalImg.src = data.img;
    modalTitle.textContent = data.title;
    modalTag.textContent = data.tag;
    modalDesc.textContent = data.desc;
    modalExternalLink.href = data.link;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.view-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      openProjectModal(projId);
    });
  });

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalDismiss) modalDismiss.addEventListener('click', closeProjectModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/**
 * 5. Contact Form, Email Copy & Toast Notifications
 */
function initContactInteractions() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('btn-copy-email');
  const emailLink = document.getElementById('link-email');

  // Copy Email to Clipboard
  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', async () => {
      const email = emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email address copied to clipboard!', 'success');
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email address copied to clipboard!', 'success');
      }
    });
  }

  // Interactive Form Validation & Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const errorName = document.getElementById('error-name');
      const errorEmail = document.getElementById('error-email');
      const errorMessage = document.getElementById('error-message');

      let isValid = true;

      // Reset errors
      errorName.textContent = '';
      errorEmail.textContent = '';
      errorMessage.textContent = '';

      if (!nameInput.value.trim()) {
        errorName.textContent = 'Please enter your name.';
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        errorEmail.textContent = 'Please enter your email.';
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        errorEmail.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        errorMessage.textContent = 'Please include a project message.';
        isValid = false;
      }

      if (isValid) {
        const submitBtn = document.getElementById('btn-submit-contact');
        const originalContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

        // Simulate seamless submission feedback
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          form.reset();
          showToast('Thank you! Your message has been sent to Fatma.', 'success');
        }, 1200);
      }
    });
  }
}

/**
 * Toast Notification Utility
 */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' 
    ? '<i class="fa-solid fa-circle-check"></i>' 
    : '<i class="fa-solid fa-circle-info"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 350);
  }, 3500);
}

/**
 * 6. Utilities (Year update & back to top)
 */
function initUtilities() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const backToTop = document.getElementById('btn-back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0.6';
      }
    }, { passive: true });
  }
}

/**
 * Helper: Validate Email Format
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Helper: Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
