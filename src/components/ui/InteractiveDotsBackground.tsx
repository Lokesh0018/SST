import { useEffect, useRef } from 'react';

export default function InteractiveDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    // Dot settings
    const spacing = 24;
    const radius = 1.5;
    const color = '#94A3B8'; // Slate grey to match the previous CSS
    
    // Mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    
    let rect = canvas.getBoundingClientRect();

    const updateRect = () => {
      rect = canvas.getBoundingClientRect();
    };
    
    const handleResize = () => {
      // Must use parent dimensions to fill correctly
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      // Handle high DPI displays for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      updateRect();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateRect, { passive: true });
    
    // Small delay to ensure layout is done before initial sizing
    setTimeout(handleResize, 100);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      
      // If mouse is outside the canvas boundaries, throw it off screen
      if (
        targetMouseX < 0 || targetMouseX > width ||
        targetMouseY < 0 || targetMouseY > height
      ) {
        targetMouseX = -1000;
        targetMouseY = -1000;
      }
    };
    
    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smooth mouse interpolation (ease towards target)
      mouseX += (targetMouseX - mouseX) * 0.15;
      mouseY += (targetMouseY - mouseY) * 0.15;
      
      ctx.fillStyle = color;
      
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const originX = i * spacing;
          const originY = j * spacing;
          
          const dx = mouseX - originX;
          const dy = mouseY - originY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let offsetX = 0;
          let offsetY = 0;
          let currentRadius = radius;
          
          // Magnetic effect range
          const maxDist = 120;
          
          if (dist < maxDist) {
            // Repel effect calculation
            const force = (maxDist - dist) / maxDist; // 0 to 1
            const repelStrength = 15; // How far they get pushed
            const angle = Math.atan2(dy, dx);
            
            // Move AWAY from mouse
            offsetX = -Math.cos(angle) * force * repelStrength;
            offsetY = -Math.sin(angle) * force * repelStrength;
            
            // Slightly grow dots near mouse
            currentRadius = radius + (force * 1.2);
            
            // Increase opacity for nearby dots
            ctx.globalAlpha = 0.5 + (force * 0.5);
          } else {
            ctx.globalAlpha = 0.5;
          }
          
          ctx.beginPath();
          ctx.arc(originX + offsetX, originY + offsetY, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="interactive-dots-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
