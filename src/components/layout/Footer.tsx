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

      const dpr = window.devicePixelRatio || 1;
      let W = 0, H = 0;
      let animationId: number;
      let particles: { x: number; y: number; vx: number; vy: number }[] = [];
      const mouse = { x: -9999, y: -9999 };

      const opts = {
        count: 65,
        particleColor: "rgba(241, 90, 36, 0.8)",
        lineColor: "rgba(241, 90, 36, 0.3)",
        linkDistance: 155,
        speed: 0.6,
        size: 2,
        hoverConnect: true
      };

      const initParticles = () => {
        particles = [];
        for (let i = 0; i < opts.count; i++) {
          particles.push({
            x: Math.random() * W, 
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * opts.speed,
            vy: (Math.random() - 0.5) * opts.speed
          });
        }
      };

      const resize = () => {
        W = canvas.clientWidth || canvas.width;
        H = canvas.clientHeight || canvas.height;
        canvas.width = W * dpr; 
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles();
      };
      
      resize();
      window.addEventListener('resize', resize);

      const handleMouseMove = (e: MouseEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left; 
        mouse.y = e.clientY - r.top;
      };
      
      const handleMouseLeave = () => {
        mouse.x = -9999; 
        mouse.y = -9999;
      };

      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);

      const step = () => {
        if (W === 0 || H === 0) {
          if (!prefersReducedMotion) animationId = requestAnimationFrame(step);
          return;
        }

        ctx.clearRect(0, 0, W, H);
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]; 
          p.x += p.vx; 
          p.y += p.vy;
          if (p.x < 0) { p.x = 0; p.vx = -p.vx; } else if (p.x > W) { p.x = W; p.vx = -p.vx; }
          if (p.y < 0) { p.y = 0; p.vy = -p.vy; } else if (p.y > H) { p.y = H; p.vy = -p.vy; }
        }

        ctx.lineWidth = 1; 
        ctx.strokeStyle = opts.lineColor;
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j]; 
            const dx = p.x - q.x; 
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < opts.linkDistance) {
              ctx.globalAlpha = 1 - dist / opts.linkDistance;
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            }
          }
          if (opts.hoverConnect) {
            const dx = p.x - mouse.x; 
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < opts.linkDistance) {
              ctx.globalAlpha = 1 - dist / opts.linkDistance;
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = 1; 
        ctx.fillStyle = opts.particleColor;
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath(); ctx.arc(p.x, p.y, opts.size, 0, Math.PI * 2); ctx.fill();
        }

        if (!prefersReducedMotion) {
          animationId = requestAnimationFrame(step);
        }
      };

      step();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
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
              <div className="footer-brand-header">
                <Link to="/" aria-label="SST Home" className="footer-logo-wrap">
                  <FooterLogo />
                </Link>
                <div className="footer-brand-text">
                  <h2 className="footer-brand-name">SRI SADGURU TRADERS</h2>
                  <h3 className="footer-brand-tagline">INTEGRATED INFRASTRUCTURE &amp; SECURITY</h3>
                </div>
              </div>
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
    <img src="/images/logo/SST Logo.png" alt="SST Logo" className="footer-logo" />
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
