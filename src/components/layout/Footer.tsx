import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { footerNavigation } from '../../data/navigation';
import Button from '../common/Button';
import '../../styles/Footer.css';

export default function Footer() {
  const footerCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Shared animation logic for both canvases
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const initCanvas = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      let animationId: number;
      let time = 0;

      const resize = () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      };
      resize();
      window.addEventListener('resize', resize);

      const draw = () => {
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        if (w === 0 || h === 0) {
          if (!prefersReducedMotion) animationId = requestAnimationFrame(draw);
          return;
        }
        ctx.clearRect(0, 0, w, h);

        // Footer background: global grid/network 5-10% opacity
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        
        // Draw subtle grid
        const gridSize = 40;
        for (let x = 0; x < w; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        time += 0.01;
        if (!prefersReducedMotion) {
          animationId = requestAnimationFrame(draw);
        }
      };

      draw();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
      };
    };

    const cleanupFooter = footerCanvasRef.current ? initCanvas(footerCanvasRef.current) : null;

    return () => {
      if (cleanupFooter) cleanupFooter();
    };
  }, []);

  return (
    <div className="footer-wrapper">
      {/* Main Footer (Charcoal) */}
      <footer className="footer-main">
        <canvas ref={footerCanvasRef} className="footer-bg-canvas" aria-hidden="true" />
        <div className="container footer-container">
          
          <div className="footer-top-grid">
            {/* Logo & Brand Statement */}
            <div className="footer-brand-col">
              <Link to="/" aria-label="SST Home">
                <FooterLogo />
              </Link>
              <h3 className="footer-brand-subtitle">
                INTEGRATED INFRASTRUCTURE<br />&amp; SECURITY
              </h3>
              <p className="footer-brand-desc">
                One partner for technology, security, electrical, fire protection, logistics and turnkey infrastructure.
              </p>
            </div>

            {/* Services */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">SERVICES</h4>
              <ul className="footer-nav-list services-grid">
                {footerNavigation.services.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="footer-nav-link">
                      <span className="nav-link-text">{item.label}</span>
                      <span className="nav-link-arrow">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">COMPANY</h4>
              <ul className="footer-nav-list">
                {footerNavigation.company.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="footer-nav-link">
                      <span className="nav-link-text">{item.label}</span>
                      <span className="nav-link-arrow">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">CONNECT</h4>
              <ul className="footer-nav-list">
                {footerNavigation.connect.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="footer-nav-link">
                      <span className="nav-link-text">{item.label}</span>
                      <span className="nav-link-arrow">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Social Icons */}
              <div className="footer-socials">
                {['linkedin', 'instagram', 'youtube'].map((social) => (
                  <a key={social} href="#" className="footer-social-link" aria-label={social}>
                    <SocialIcon name={social} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          {/* Bottom Legal */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              <span className="copyright-dot">●</span> &copy; {new Date().getFullYear()} SRI SADGURU TRADERS
            </p>
            <div className="footer-legal-links">
              <a href="#" className="footer-legal-link">PRIVACY POLICY</a>
              <span className="legal-separator">&middot;</span>
              <a href="#" className="footer-legal-link">TERMS OF SERVICE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterLogo() {
  return (
    <svg width="80" height="36" viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 24C2 24 4 26 9 26C14 26 16 23 16 20.5C16 18 14.5 16.5 10 15C5.5 13.5 4 12.5 4 10.5C4 8.5 6 6 10 6C14 6 16 8 16 8" stroke="#F5F1E8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 24C20 24 22 26 27 26C32 26 34 23 34 20.5C34 18 32.5 16.5 28 15C23.5 13.5 22 12.5 22 10.5C22 8.5 24 6 28 6C32 6 34 8 34 8" stroke="#F5F1E8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 6H56M47 6V26" stroke="#F5F1E8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 6L58 6L54 26" stroke="#FF4B1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Adding '7' to SST to make it SST7 as requested */}
      <path d="M62 6H70L65 26" stroke="#FF4B1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.JSX.Element> = {
    linkedin: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    youtube: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  };
  return icons[name] || null;
}
