import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/SectionHeading.css';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  children: ReactNode;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function SectionHeading({
  children,
  highlight,
  subtitle,
  align = 'left',
  className = '',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      el.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  const renderText = () => {
    if (!highlight || typeof children !== 'string') return children;
    
    const parts = (children as string).split(new RegExp(`(${highlight})`, 'i'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="section-heading-highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  const alignClass = align === 'center' ? 'section-heading-center' : 'section-heading-left';

  return (
    <div
      ref={containerRef}
      className={`${alignClass} ${className}`.trim()}
    >
      <Tag className="section-heading-title">
        {renderText()}
      </Tag>
      {subtitle && (
        <p className="section-heading-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}
