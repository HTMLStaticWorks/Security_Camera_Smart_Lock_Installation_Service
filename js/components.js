class AppHeader extends HTMLElement {
  connectedCallback() {
    const isAuthPage = this.hasAttribute('no-header');
    if (isAuthPage) return;

    this.innerHTML = `
      <style>
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: var(--bg-nav);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          z-index: 1000;
          border-bottom: var(--glass-border);
          transition: all var(--transition-normal);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        .logo {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color var(--transition-fast);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .logo:hover {
          color: var(--color-primary);
        }

        .logo span {
          color: var(--color-primary);
        }

        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .nav-link {
          color: var(--text-main);
          font-weight: 500;
          position: relative;
          padding: 5px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: var(--color-primary);
          transition: width var(--transition-fast);
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        
        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-shrink: 0;
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: var(--text-main);
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: background var(--transition-fast);
          flex-shrink: 0;
        }

        .icon-btn:hover {
          background: rgba(148, 163, 184, 0.2);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 40px;
          height: 40px;
          padding: 6px;
          border-radius: 8px;
          transition: background var(--transition-fast);
          flex-shrink: 0;
        }

        .hamburger:hover {
          background: rgba(148, 163, 184, 0.2);
        }
        
        .hamburger span {
          display: block;
          width: 24px;
          height: 2.5px;
          background: var(--text-main);
          border-radius: 2px;
          transition: all 0.3s ease-in-out;
        }

        .hamburger.active span:nth-child(1) {
          transform: translateY(7.5px) rotate(45deg);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: translateY(-7.5px) rotate(-45deg);
        }

        .mobile-nav-cta, .mobile-nav-tools {
          display: none;
        }

        /* Mobile Nav */
        @media (max-width: 1024px) {
          .desktop-cta {
            display: none !important;
          }

          .header-actions {
            gap: 6px;
          }

          .hamburger {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100dvh - 80px);
            background: var(--bg-main);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 30px 20px;
            gap: 16px;
            transition: left 0.3s ease-in-out, right 0.3s ease-in-out;
            overflow-y: auto;
            box-shadow: var(--shadow-lg);
            z-index: 999;
          }
          
          .nav-links.show {
            left: 0;
          }

          [dir="rtl"] .nav-links {
            left: auto;
            right: -100%;
          }

          [dir="rtl"] .nav-links.show {
            right: 0;
            left: auto;
          }

          .nav-link {
            font-size: 1.1rem;
            padding: 8px 16px;
            width: 100%;
            text-align: center;
          }

          .mobile-nav-tools {
            display: flex;
            gap: 12px;
            width: 100%;
            max-width: 280px;
            margin-top: 10px;
            padding-top: 15px;
            border-top: 1px solid rgba(148, 163, 184, 0.2);
            justify-content: center;
          }

          .mobile-tool-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            flex: 1;
            padding: 10px 14px;
            background: rgba(148, 163, 184, 0.12);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 12px;
            color: var(--text-main);
            font-size: 0.9rem;
            font-weight: 500;
            font-family: var(--font-body);
            cursor: pointer;
            transition: all var(--transition-fast);
          }

          .mobile-tool-btn:hover {
            background: rgba(148, 163, 184, 0.25);
            border-color: var(--color-primary);
          }

          .mobile-tool-btn .btn-icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-nav-cta {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
            max-width: 280px;
            margin-top: 5px;
            padding-top: 15px;
            border-top: 1px solid rgba(148, 163, 184, 0.2);
          }

          .mobile-nav-cta .btn {
            width: 100%;
            text-align: center;
          }
        }
      </style>
      <header class="header" id="main-header">
        <div class="container header-content">
          <a href="index.html" class="logo">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Vigilant
          </a>
          
          <nav class="nav-links" id="nav-links">
            <a href="index.html" class="nav-link">Home</a>
            <a href="home2.html" class="nav-link">Home 2</a>
            <a href="about.html" class="nav-link">About</a>
            <a href="services.html" class="nav-link">Services</a>
            <a href="products.html" class="nav-link">Products</a>
            <a href="blog.html" class="nav-link">Blog</a>
            <a href="contact.html" class="nav-link">Contact</a>

            <div class="mobile-nav-tools">
              <button class="mobile-tool-btn theme-toggle" title="Toggle Theme" aria-label="Toggle Theme">
                <span class="btn-icon">
                   <!-- Sun/Moon SVG will be injected by app.js -->
                </span>
                <span class="btn-label">Dark Mode</span>
              </button>
              <button class="mobile-tool-btn rtl-toggle" title="Toggle RTL" aria-label="Toggle RTL">
                <span class="btn-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
                </span>
                <span class="btn-label">RTL Layout</span>
              </button>
            </div>

            <div class="mobile-nav-cta">
              <a href="signup.html" class="btn btn-outline">Sign Up</a>
              <a href="free-consultation.html" class="btn btn-primary">Book Consultation</a>
            </div>
          </nav>

          <div class="header-actions">
            <button class="icon-btn theme-toggle" title="Toggle Theme" aria-label="Toggle Theme">
               <!-- Sun/Moon SVG will be injected by app.js -->
            </button>
            <button class="icon-btn rtl-toggle" title="Toggle RTL" aria-label="Toggle RTL">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
            </button>
            <a href="signup.html" class="btn btn-outline desktop-cta" style="padding: 8px 16px; font-size: 0.9rem;">Sign Up</a>
            <a href="free-consultation.html" class="btn btn-primary desktop-cta" style="padding: 8px 16px; font-size: 0.9rem;">Book Consultation</a>
            
            <button class="hamburger" id="hamburger-menu" aria-label="Toggle Navigation Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    `;
    
    // Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = this.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }
}

class AppFooter extends HTMLElement {
  connectedCallback() {
    const isAuthPage = this.hasAttribute('no-footer');
    if (isAuthPage) return;

    this.innerHTML = `
      <style>
        .footer {
          background: var(--bg-alt);
          color: var(--text-muted);
          padding: var(--space-xl) 0 var(--space-md) 0;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--space-lg);
          margin-bottom: var(--space-lg);
        }

        .footer-col h3 {
          color: var(--text-main);
          margin-bottom: var(--space-md);
        }
        
        .footer-col p {
          color: var(--text-muted);
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          color: var(--text-muted);
          transition: color var(--transition-fast);
          position: relative;
          display: inline-block;
          width: fit-content;
        }

        .footer-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0;
          left: 0;
          background: var(--color-primary);
          transition: width var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--color-primary);
        }
        
        .footer-links a:hover::after {
          width: 100%;
        }

        .footer-bottom {
          text-align: center;
          padding-top: var(--space-md);
          border-top: 1px solid rgba(128, 128, 128, 0.2);
          color: var(--text-muted);
        }
        
        .social-icons {
          display: flex;
          gap: 15px;
          margin-top: var(--space-sm);
        }
        
        .social-icons a {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: var(--bg-main);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          border: 1px solid rgba(128, 128, 128, 0.1);
        }
        
        .social-icons a:hover {
          background: var(--color-primary);
          color: var(--color-white);
        }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      </style>
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <a href="index.html" class="logo" style="font-size:1.5rem; font-weight:bold; display:flex; gap:10px; align-items:center; margin-bottom:1rem;">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Vigilant
              </a>
              <p>Advanced security solutions for your home and business. We provide top-tier installation and 24/7 support.</p>
              <div class="social-icons">
                <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                <a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              </div>
            </div>
            <div class="footer-col">
              <h3>Quick Links</h3>
              <div class="footer-links">
                <a href="index.html">Home</a>
                <a href="about.html">About Us</a>
                <a href="products.html">Products</a>
                <a href="blog.html">Blog</a>
                <a href="free-consultation.html">Free Consultation</a>
              </div>
            </div>
            <div class="footer-col">
              <h3>Services</h3>
              <div class="footer-links">
                <a href="#">CCTV Installation</a>
                <a href="#">Smart Lock Installation</a>
                <a href="#">Alarm Systems</a>
                <a href="#">Video Doorbells</a>
              </div>
            </div>
            <div class="footer-col">
              <h3>Contact</h3>
              <div class="footer-links">
                <p>📍 123 Security Blvd, NY 10001</p>
                <p>📞 +1 (800) 123-4567</p>
                <p>✉️ support@vigilant.com</p>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Vigilant Smart Installations. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
