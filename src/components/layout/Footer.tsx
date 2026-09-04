import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { footerNavigation } from '../../data/navigation';

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
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
      ctx.clearRect(0, 0, w, h);

      // Draw animated orange wave lines
      for (let line = 0; line < 3; line++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(241, 90, 36, ${0.08 + line * 0.04})`;
        ctx.lineWidth = 1;

        for (let x = 0; x <= w; x += 2) {
          const y = h * 0.5 +
            Math.sin((x / w) * Math.PI * 2 + time * 0.5 + line * 0.8) * 20 +
            Math.sin((x / w) * Math.PI * 4 + time * 0.3 + line) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw glowing nodes
      for (let i = 0; i < 5; i++) {
        const nx = (w / 6) * (i + 1);
        const ny = h * 0.5 + Math.sin((nx / w) * Math.PI * 2 + time * 0.5) * 20;
        
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241, 90, 36, ${0.4 + Math.sin(time + i) * 0.2})`;
        ctx.fill();
        
        // Glow
        const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, 12);
        gradient.addColorStop(0, 'rgba(241, 90, 36, 0.15)');
        gradient.addColorStop(1, 'rgba(241, 90, 36, 0)');
        ctx.beginPath();
        ctx.arc(nx, ny, 12, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      time += 0.02;
      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <footer className="relative bg-charcoal text-ivory overflow-hidden">
      {/* Animated wave canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        aria-hidden="true"
      />

      <div className="container relative z-10 pt-20 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Logo & Tagline */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="SST Home">
              <FooterLogo />
            </Link>
            <p className="mt-2 text-xs uppercase tracking-widest text-warm-gray font-medium">
              Integrated Infrastructure<br />& Security Solutions
            </p>
            <p className="mt-6 text-lg font-light leading-relaxed text-ivory/70">
              A safer. Smarter.<br />
              <span className="text-orange font-semibold">More connected tomorrow.</span>
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-5">Solutions</h4>
              <ul className="space-y-3">
                {footerNavigation.solutions.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-ivory/60 hover:text-orange transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-5">Company</h4>
              <ul className="space-y-3">
                {footerNavigation.company.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-ivory/60 hover:text-orange transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-5">Connect</h4>
              <ul className="space-y-3">
                {footerNavigation.connect.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-ivory/60 hover:text-orange transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-6">
                {['linkedin', 'instagram', 'youtube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-ivory/60 hover:border-orange hover:text-orange transition-all duration-300"
                    aria-label={social}
                  >
                    <SocialIcon name={social} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-ivory/40">
            © {new Date().getFullYear()} Sri Satguru Traders. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-ivory/40 hover:text-orange transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-ivory/40 hover:text-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLogo() {
  return (
    <svg width="80" height="36" viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 24C2 24 4 26 9 26C14 26 16 23 16 20.5C16 18 14.5 16.5 10 15C5.5 13.5 4 12.5 4 10.5C4 8.5 6 6 10 6C14 6 16 8 16 8"
        stroke="#F7F0E0"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 24C20 24 22 26 27 26C32 26 34 23 34 20.5C34 18 32.5 16.5 28 15C23.5 13.5 22 12.5 22 10.5C22 8.5 24 6 28 6C32 6 34 8 34 8"
        stroke="#F7F0E0"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 6H56M47 6V26"
        stroke="#F7F0E0"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52 6L58 6L54 26"
        stroke="#F15A24"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.JSX.Element> = {
    linkedin: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    instagram: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    youtube: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  };
  return icons[name] || null;
}
