import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulseActive: boolean;
  pulseTimer: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const isVisible = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    };

    const initNodes = () => {
      // Create fewer nodes for mobile, more for desktop to keep it sparse and engineered
      const count = width > 768 ? 40 : 20;
      const nodes: Node[] = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.1, // Very slow movement
          vy: (Math.random() - 0.5) * 0.1,
          pulseActive: false,
          pulseTimer: 0,
        });
      }
      nodesRef.current = nodes;
    };

    // Trigger a pulse randomly on one node
    const triggerPulse = () => {
      const nodes = nodesRef.current;
      if (!nodes.length || !isVisible.current) return;
      
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (!randomNode.pulseActive) {
        randomNode.pulseActive = true;
        randomNode.pulseTimer = 1.0; // 1.0 down to 0
      }
    };

    const pulseInterval = setInterval(triggerPulse, 3000);

    const animate = () => {
      if (!isVisible.current) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const nodes = nodesRef.current;
      const connectionDistance = width > 768 ? 200 : 120;

      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Add a slight left-to-right drift to simulate data flow
        node.x += node.vx + 0.1;
        node.y += node.vy;

        // Wrap around gracefully
        if (node.x > width + 50) node.x = -50;
        if (node.x < -50) node.x = width + 50;
        if (node.y > height + 50) node.y = -50;
        if (node.y < -50) node.y = height + 50;

        if (node.pulseActive) {
          node.pulseTimer -= 0.01;
          if (node.pulseTimer <= 0) {
            node.pulseActive = false;
            node.pulseTimer = 0;
          }
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 1 - (dist / connectionDistance);
            
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            
            // If either node is pulsing, the line lights up orange slightly
            if (n1.pulseActive || n2.pulseActive) {
              const pulseStrength = Math.max(n1.pulseTimer, n2.pulseTimer);
              ctx.strokeStyle = `rgba(244, 81, 30, ${opacity * pulseStrength * 0.4})`;
              ctx.lineWidth = 1.5;
            } else {
              // Standard muted dark gray line
              ctx.strokeStyle = `rgba(23, 23, 23, ${opacity * 0.15})`;
              ctx.lineWidth = 1;
            }
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        if (node.pulseActive) {
          ctx.fillStyle = `rgba(244, 81, 30, ${node.pulseTimer * 0.8})`;
          // Draw a small expanding ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10 * (1 - node.pulseTimer), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(244, 81, 30, ${node.pulseTimer * 0.3})`;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(23, 23, 23, 0.2)`;
        }
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      // Just draw once if reduced motion
      isVisible.current = true;
      animate();
      cancelAnimationFrame(requestRef.current!);
    }

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(pulseInterval);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Use IntersectionObserver to pause animation when offscreen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
