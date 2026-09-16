import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/CardHoverEffect.css';

export interface HoverItem {
  id: string;
  [key: string]: any;
}

interface CardHoverEffectProps<T extends HoverItem> {
  items: T[];
  renderItem: (item: T, isHovered: boolean) => React.ReactNode;
  className?: string;
}

export function CardHoverEffect<T extends HoverItem>({ items, renderItem, className = '' }: CardHoverEffectProps<T>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cleanup ref array when items change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  const handleMouseEnter = (index: number) => {
    const el = itemRefs.current[index];
    if (!el || !containerRef.current) return;

    // Check for prefers-reduced-motion to disable complex tracking
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setHoveredIndex(index);
      return; // CSS fallback handles hover
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    setHoveredIndex(index);
    setHighlightStyle({
      opacity: 1,
      transform: `translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px) scale(1)`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHighlightStyle(prev => ({ 
      ...prev, 
      opacity: 0,
      transform: prev.transform ? `${prev.transform.replace(/scale\([0-9.]+\)/, '')} scale(0.85)` : 'scale(0.85)'
    }));
  };

  return (
    <div 
      className={`card-hover-grid ${className}`.trim()} 
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Highlight Layer */}
      <div 
        className="card-hover-highlight" 
        style={highlightStyle} 
        aria-hidden="true"
      />

      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        
        if (item.link) {
          return (
            <Link
              to={item.link}
              key={item.id}
              ref={(el: any) => (itemRefs.current[index] = el)}
              className="card-hover-item-wrapper"
              onMouseEnter={() => handleMouseEnter(index)}
              onFocus={() => handleMouseEnter(index)}
              onBlur={handleMouseLeave}
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              {renderItem(item, isHovered)}
            </Link>
          );
        }

        return (
          <div
            key={item.id}
            ref={(el: any) => (itemRefs.current[index] = el)}
            className="card-hover-item-wrapper"
            onMouseEnter={() => handleMouseEnter(index)}
            onFocus={() => handleMouseEnter(index)}
            onBlur={handleMouseLeave}
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            {renderItem(item, isHovered)}
          </div>
        );
      })}
    </div>
  );
}
