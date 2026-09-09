import { useRef, useEffect } from 'react';

interface Node {
  id: number;
  baseX: number;
  baseY: number;
  cx: number;
  cy: number;
  tx: number;
  ty: number;
  speed: number;
  radius: number;
  baseRadius: number;
  scalePhase: number;
  scaleSpeed: number;
  illumination: number; // 0 to 1
  rotCenter?: { x: number; y: number };
  rotAngle: number;
  rotSpeed: number;
  rotRadius: number;
}

interface Edge {
  source: Node;
  target: Node;
  baseOpacity: number;
  opacityPhase: number;
  opacitySpeed: number;
}

interface Pulse {
  edge: Edge;
  progress: number;
  speed: number;
  direction: 1 | -1;
}

export default function ClientNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let lastTime = performance.now();

    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let globalOffsetX = 0;
    let globalOffsetY = 0;
    const GLOBAL_MOVE_SPEED = 10; // px per second

    const initNetwork = () => {
      nodes.length = 0;
      edges.length = 0;
      pulses = [];
      
      const numNodes = Math.floor((width * height) / 30000); // adjust density
      
      // Generate nodes mostly on right 45%
      for (let i = 0; i < numNodes; i++) {
        // x goes from 55% to 110% of width, y from -10% to 110%
        const x = width * 0.55 + Math.random() * (width * 0.55);
        const y = -height * 0.1 + Math.random() * (height * 1.2);
        
        const isRotating = Math.random() > 0.7;
        const scaleSpeed = 0.5 + Math.random() * 1.5;

        nodes.push({
          id: i,
          baseX: x,
          baseY: y,
          cx: x,
          cy: y,
          tx: x + (Math.random() * 20 - 10),
          ty: y + (Math.random() * 20 - 10),
          speed: 2 + Math.random() * 5, // px per second
          radius: 1.5 + Math.random() * 2.5,
          baseRadius: 1.5 + Math.random() * 2.5,
          scalePhase: Math.random() * Math.PI * 2,
          scaleSpeed: scaleSpeed,
          illumination: 0,
          rotCenter: isRotating ? { x, y } : undefined,
          rotAngle: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.2, // radians per sec
          rotRadius: 10 + Math.random() * 20,
        });
      }

      // Connect closest nodes
      for (let i = 0; i < nodes.length; i++) {
        let connections = 0;
        const maxConnections = 2 + Math.floor(Math.random() * 3);
        
        // Sort other nodes by distance
        const others = nodes
          .filter((n) => n.id !== nodes[i].id)
          .map((n) => {
            const dx = n.baseX - nodes[i].baseX;
            const dy = n.baseY - nodes[i].baseY;
            return { node: n, dist: Math.sqrt(dx * dx + dy * dy) };
          })
          .sort((a, b) => a.dist - b.dist);

        for (const other of others) {
          if (other.dist < 200 && connections < maxConnections) {
            // Check if edge already exists
            const exists = edges.some(
              (e) => (e.source.id === nodes[i].id && e.target.id === other.node.id) ||
                     (e.target.id === nodes[i].id && e.source.id === other.node.id)
            );
            if (!exists) {
              edges.push({
                source: nodes[i],
                target: other.node,
                baseOpacity: 0.1 + Math.random() * 0.2,
                opacityPhase: Math.random() * Math.PI * 2,
                opacitySpeed: 0.2 + Math.random() * 0.5,
              });
              connections++;
            }
          }
        }
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        initNetwork();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Global movement (bottom-right to top-left)
      globalOffsetX -= GLOBAL_MOVE_SPEED * dt;
      globalOffsetY -= GLOBAL_MOVE_SPEED * dt;

      // Wrap around offset to keep network continuous roughly
      if (globalOffsetX < -width * 0.5) globalOffsetX = width * 0.5;
      if (globalOffsetY < -height * 0.5) globalOffsetY = height * 0.5;

      // Update Nodes
      nodes.forEach((node) => {
        // Drifting towards target
        const dx = node.tx - node.cx;
        const dy = node.ty - node.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 1) {
          node.cx += (dx / dist) * node.speed * dt;
          node.cy += (dy / dist) * node.speed * dt;
        } else {
          // New target within 5-15px of baseX, baseY
          const angle = Math.random() * Math.PI * 2;
          const r = 5 + Math.random() * 10;
          node.tx = node.baseX + Math.cos(angle) * r;
          node.ty = node.baseY + Math.sin(angle) * r;
        }

        // Rotation
        if (node.rotCenter) {
          node.rotAngle += node.rotSpeed * dt;
        }

        // Scaling (0.9 to 1.1)
        node.scalePhase += node.scaleSpeed * dt;
        const scale = 1.0 + Math.sin(node.scalePhase) * 0.1;
        node.radius = node.baseRadius * scale;

        // Illumination fade
        if (node.illumination > 0) {
          node.illumination -= dt * 1.5; // fade out over ~0.66s
          if (node.illumination < 0) node.illumination = 0;
        }
      });

      // Spawn pulses randomly
      if (Math.random() < 2.0 * dt && edges.length > 0) { // ~2 pulses per sec
        const randomEdge = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({
          edge: randomEdge,
          progress: 0,
          speed: 0.2 + Math.random() * 0.3, // % per sec
          direction: Math.random() > 0.5 ? 1 : -1,
        });
      }

      // Helper to get final node position considering rotation & global movement
      const getPos = (n: Node) => {
        let x = n.cx + globalOffsetX;
        let y = n.cy + globalOffsetY;
        
        // Simple wrap around if nodes go too far left/up
        if (x < width * 0.3) x += width * 1.2;
        if (y < -height * 0.2) y += height * 1.4;

        if (n.rotCenter) {
          x += Math.cos(n.rotAngle) * n.rotRadius;
          y += Math.sin(n.rotAngle) * n.rotRadius;
        }
        return { x, y };
      };

      // Draw Edges
      edges.forEach((edge) => {
        edge.opacityPhase += edge.opacitySpeed * dt;
        // op fluctuates between 0 and baseOpacity
        const op = edge.baseOpacity * (0.5 + Math.sin(edge.opacityPhase) * 0.5);
        
        const pos1 = getPos(edge.source);
        const pos2 = getPos(edge.target);

        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.strokeStyle = `rgba(150, 150, 150, ${op})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw and update Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed * dt;

        if (p.progress >= 1) {
          // Reached end, illuminate target node
          const targetNode = p.direction === 1 ? p.edge.target : p.edge.source;
          targetNode.illumination = 1;
          pulses.splice(i, 1);
          continue;
        }

        const pos1 = getPos(p.edge.source);
        const pos2 = getPos(p.edge.target);

        const t = p.direction === 1 ? p.progress : 1 - p.progress;
        const px = pos1.x + (pos2.x - pos1.x) * t;
        const py = pos1.y + (pos2.y - pos1.y) * t;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(241, 90, 36, 0.8)'; // Orange pulse
        ctx.fill();
        
        // slight glow
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(241, 90, 36, 0.3)';
        ctx.fill();
      }

      // Draw Nodes
      nodes.forEach((node) => {
        const pos = getPos(node);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.radius, 0, Math.PI * 2);
        
        // Color depends on illumination
        if (node.illumination > 0) {
          const intensity = node.illumination;
          ctx.fillStyle = `rgba(241, 90, 36, ${0.4 + intensity * 0.6})`;
          
          // Glow
          ctx.shadowBlur = 10 * intensity;
          ctx.shadowColor = 'rgba(241, 90, 36, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } else {
          ctx.fillStyle = 'rgba(120, 120, 120, 0.4)';
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
