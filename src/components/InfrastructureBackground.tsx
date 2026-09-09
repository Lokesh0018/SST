import React, { useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  speed: number;
  width?: number;
  height?: number;
  type: 'line' | 'rect' | 'node' | 'complex-rect';
  alpha: number;
  connections: number[];
}

interface Pulse {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
}

export default function InfrastructureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    let points: Point[] = [];
    let pulses: Pulse[] = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      points = [];
      const numElements = Math.floor(width / 15); // Increased density
      
      for (let i = 0; i < numElements; i++) {
        const typeRand = Math.random();
        const type = typeRand < 0.4 ? 'line' : (typeRand < 0.6 ? 'rect' : (typeRand < 0.8 ? 'complex-rect' : 'node'));
        
        points.push({
          x: Math.random() * width,
          y: Math.random() * height * 2,
          speed: 0.1 + Math.random() * 0.4, // Slightly slower for elegance
          width: type.includes('rect') ? 20 + Math.random() * 100 : undefined,
          height: type.includes('rect') ? 40 + Math.random() * 200 : undefined,
          type: type,
          alpha: 0.08 + Math.random() * 0.15, // Slightly higher opacity
          connections: []
        });
      }

      // Create random connections for nodes
      points.forEach((p, i) => {
        if (p.type === 'node') {
          for (let j = 0; j < 2; j++) {
            const target = Math.floor(Math.random() * points.length);
            if (target !== i && points[target].type === 'node') {
              p.connections.push(target);
            }
          }
        }
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw elements
      points.forEach((p, i) => {
        p.y -= p.speed;
        if (p.y < -300) {
          p.y = height + 300;
          p.x = Math.random() * width;
        }

        ctx.strokeStyle = `rgba(23, 23, 23, ${p.alpha})`;
        ctx.lineWidth = 1;

        if (p.type === 'line') {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x, p.y + (p.height || 200));
          ctx.stroke();
        } else if (p.type === 'rect' && p.width && p.height) {
          ctx.strokeRect(p.x, p.y, p.width, p.height);
          // Inner detail
          if (p.width > 40 && p.height > 80) {
            ctx.strokeRect(p.x + 5, p.y + 5, p.width - 10, p.height - 10);
          }
        } else if (p.type === 'complex-rect' && p.width && p.height) {
          // Main block
          ctx.strokeRect(p.x, p.y, p.width, p.height);
          // Overlapping block
          ctx.fillStyle = `rgba(249, 247, 241, 0.8)`; // Ivory fill to block lines behind
          ctx.fillRect(p.x + p.width/2, p.y + p.height/3, p.width, p.height/2);
          ctx.strokeRect(p.x + p.width/2, p.y + p.height/3, p.width, p.height/2);
          // Small tech accent
          ctx.fillStyle = `rgba(23, 23, 23, ${p.alpha})`;
          ctx.fillRect(p.x - 4, p.y + 10, 8, 20);
        } else if (p.type === 'node') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.stroke();
          
          // Outer rotating ring effect
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8, Math.PI * 0.25, Math.PI * 1.75);
          ctx.stroke();
          
          // Draw connections (architectural L-shapes)
          p.connections.forEach(targetIdx => {
            const target = points[targetIdx];
            if (Math.abs(p.y - target.y) < 500 && Math.abs(p.x - target.x) < 500) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              // Draw L-shape instead of direct line
              ctx.lineTo(target.x, p.y);
              ctx.lineTo(target.x, target.y);
              ctx.strokeStyle = `rgba(23, 23, 23, ${Math.min(p.alpha, target.alpha) * 0.4})`;
              ctx.stroke();
            }
          });
        }
      });

      // Spawn pulses randomly on connections
      if (Math.random() < 0.05) {
        const nodes = points.filter(p => p.type === 'node' && p.connections.length > 0);
        if (nodes.length > 0) {
          const startNode = nodes[Math.floor(Math.random() * nodes.length)];
          const endIdx = startNode.connections[0];
          const endNode = points[endIdx];
          
          if (endNode && Math.abs(startNode.y - endNode.y) < 400) {
            pulses.push({
              startX: startNode.x,
              startY: startNode.y,
              endX: endNode.x,
              endY: endNode.y,
              progress: 0,
              speed: 0.01 + Math.random() * 0.02
            });
          }
        }
      }

      // Draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;
        
        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const currX = pulse.startX + (pulse.endX - pulse.startX) * pulse.progress;
        const currY = pulse.startY + (pulse.endY - pulse.startY) * pulse.progress;

        ctx.fillStyle = '#FF4B1F'; // SST Orange
        ctx.beginPath();
        ctx.arc(currX, currY, 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Pulse glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FF4B1F';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8
      }}
    />
  );
}
