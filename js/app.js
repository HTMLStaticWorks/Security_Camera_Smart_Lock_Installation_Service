// Immediate Theme & RTL restoration on script parse
(function initPersistedState() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const currentDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.documentElement.setAttribute('dir', currentDir);
})();

document.addEventListener('DOMContentLoaded', () => {
  
  // Remove Loader
  const loader = document.getElementById('global-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 500);
  }

  const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  const updateThemeUI = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const themeBtns = document.querySelectorAll('.theme-toggle');
    themeBtns.forEach(btn => {
      const iconSpan = btn.querySelector('.btn-icon');
      const labelSpan = btn.querySelector('.btn-label');
      if (iconSpan && labelSpan) {
        iconSpan.innerHTML = currentTheme === 'light' ? moonIcon : sunIcon;
        labelSpan.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
      } else {
        btn.innerHTML = currentTheme === 'light' ? moonIcon : sunIcon;
      }
    });
  };

  const updateRtlUI = () => {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const rtlBtns = document.querySelectorAll('.rtl-toggle');
    rtlBtns.forEach(btn => {
      const labelSpan = btn.querySelector('.btn-label');
      if (labelSpan) {
        labelSpan.textContent = currentDir === 'ltr' ? 'RTL Layout' : 'LTR Layout';
      }
    });
  };

  // Sync UI immediately and after Web Components render
  updateThemeUI();
  updateRtlUI();
  setTimeout(() => {
    updateThemeUI();
    updateRtlUI();
  }, 50);

  // Global Event Delegation for Theme and RTL toggles
  document.addEventListener('click', (e) => {
    const themeBtn = e.target.closest('.theme-toggle');
    if (themeBtn) {
      e.stopPropagation();
      let currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeUI();
      return;
    }

    const rtlBtn = e.target.closest('.rtl-toggle');
    if (rtlBtn) {
      e.stopPropagation();
      let currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      currentDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', currentDir);
      localStorage.setItem('dir', currentDir);
      updateRtlUI();
      return;
    }
  });

  // Mobile Menu Toggle
  setTimeout(() => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('show');
      });

      // Close menu when clicking links inside nav-links
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('show');
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (hamburger && navLinks && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('show');
        }
      });
    }

    // Sticky Header Logic
    const header = document.getElementById('main-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        } else {
          header.style.boxShadow = 'none';
        }
      });
    }
  }, 100);

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Back to Top and Scroll Progress
  const backToTopBtn = document.createElement('div');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`;
  document.body.appendChild(backToTopBtn);

  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  const style = document.createElement('style');
  style.innerHTML = `
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: var(--color-primary);
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: var(--shadow-md);
    }
    .back-to-top.show {
      opacity: 1;
      transform: translateY(0);
    }
    .back-to-top:hover {
      background: var(--color-primary-dark);
      transform: translateY(-5px);
    }
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--color-secondary);
      z-index: 1001;
      transition: width 0.1s ease;
    }
  `;
  document.head.appendChild(style);

  window.addEventListener('scroll', () => {
    // Show back to top
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // Update scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
