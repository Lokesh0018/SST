import { useEffect, useRef } from 'react';
import '../styles/Industries.css';

// Seeded random
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

interface Block {
  id: number;
  type: string;
  baseWidth: number;
  baseHeight: number;
  gapBefore: number;
  startX: number;
  seed: number;
  // Morphing parameters
  morphPhaseH: number;
  morphSpeedH: number;
  morphPhaseW: number;
  morphSpeedW: number;
}

// Generate the instantaneous geometry for a block given time
const getBlockGeometry = (block: Block, timeSec: number, currentX: number) => {
  const h = block.baseHeight + Math.sin(timeSec * block.morphSpeedH + block.morphPhaseH) * 20;
  const w = block.baseWidth + Math.sin(timeSec * block.morphSpeedW + block.morphPhaseW) * 10;
  
  let d = '';
  const nodes = [];
  let cx = currentX;
  let perimeter = 0;

  // Function to add a line segment
  const addLine = (dx: number, dy: number, isNode = true) => {
    d += `L ${cx + dx} ${dy} `;
    perimeter += Math.sqrt(dx * dx + Math.pow(dy - (nodes.length > 0 ? nodes[nodes.length-1].y : 0), 2));
    cx += dx;
    if (isNode) nodes.push({ x: cx, y: dy });
  };

  // Base gap before
  addLine(block.gapBefore, 0, true);

  if (block.type === 'line') {
    addLine(w, 0, true);
  } else if (block.type === 'tower' || block.type === 'wide') {
    d += `L ${cx} ${-h} L ${cx + w} ${-h} L ${cx + w} 0 `;
    nodes.push({ x: cx, y: -h }, { x: cx + w, y: -h }, { x: cx + w, y: 0 });
    perimeter += h + w + h;
    cx += w;
  } else if (block.type === 'stepped') {
    const stepW = w / 3;
    const stepH = h / 3;
    d += `L ${cx} ${-h} L ${cx + stepW} ${-h} `;
    d += `L ${cx + stepW} ${-h + stepH} L ${cx + stepW * 2} ${-h + stepH} `;
    d += `L ${cx + stepW * 2} ${-h + stepH * 2} L ${cx + w} ${-h + stepH * 2} L ${cx + w} 0 `;
    nodes.push(
      { x: cx, y: -h },
      { x: cx + stepW, y: -h + stepH },
      { x: cx + stepW * 2, y: -h + stepH * 2 },
      { x: cx + w, y: 0 }
    );
    perimeter += h + stepW + stepH + stepW + stepH + stepW + (h - stepH * 2);
    cx += w;
  } else if (block.type === 'cantilever') {
    const overhang = w * 0.3;
    d += `L ${cx} ${-h * 0.5} L ${cx - overhang} ${-h * 0.5} L ${cx - overhang} ${-h} L ${cx + w} ${-h} L ${cx + w} 0 `;
    nodes.push(
      { x: cx - overhang, y: -h * 0.5 },
      { x: cx - overhang, y: -h },
      { x: cx + w, y: -h },
      { x: cx + w, y: 0 }
    );
    perimeter += (h * 0.5) + overhang + (h * 0.5) + (w + overhang) + h;
    cx += w;
  } else if (block.type === 'split') {
    const gap = w * 0.2;
    const sideW = (w - gap) / 2;
    d += `L ${cx} ${-h} L ${cx + sideW} ${-h} L ${cx + sideW} 0 L ${cx + sideW + gap} 0 L ${cx + sideW + gap} ${-h} L ${cx + w} ${-h} L ${cx + w} 0 `;
    nodes.push({ x: cx, y: -h }, { x: cx + sideW + gap, y: -h }, { x: cx + w, y: -h }, { x: cx + w, y: 0 });
    perimeter += h + sideW + h + gap + h + sideW + h;
    cx += w;
  }

  return { path: d, nodes, currentX: cx, perimeter };
};

const createBlock = (id: number, seed: number): Block => {
  const types = ['tower', 'wide', 'stepped', 'cantilever', 'split', 'line', 'tower', 'stepped'];
  const type = types[Math.floor(pseudoRandom(seed) * types.length)];
  const baseWidth = Math.floor(pseudoRandom(seed + 1) * 80) + 40;
  const baseHeight = Math.floor(pseudoRandom(seed + 2) * 160) + 40;
  const gapBefore = Math.floor(pseudoRandom(seed + 3) * 80) + 20;
  
  return {
    id,
    type, 
    baseWidth, 
    baseHeight, 
    gapBefore,
    startX: 0, // Assigned during layout
    seed,
    morphPhaseH: pseudoRandom(seed + 4) * Math.PI * 2,
    morphSpeedH: pseudoRandom(seed + 5) * 0.5 + 0.2, // Slow breathing
    morphPhaseW: pseudoRandom(seed + 6) * Math.PI * 2,
    morphSpeedW: pseudoRandom(seed + 7) * 0.5 + 0.2,
  };
};

export default function ArchitecturalSkyline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const nodesGroupRef = useRef<SVGGElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let absoluteTimeSec = 0;
    
    // Engine State
    let blocks: Block[] = [];
    let blockIdCounter = 0;
    let offsetX = 0; // The continuous leftward scroll
    const SCROLL_SPEED = 30; // px per sec
    const PULSE_SPEED = 200; // px perimeter per sec (moves fast along the path)
    
    let pulseDistance = 0;

    // Prefill 20 blocks
    for (let i = 0; i < 20; i++) {
      blocks.push(createBlock(blockIdCounter++, 1000 + i));
    }

    // Node DOM elements cache to avoid recreating them
    const nodeElements = new Map<string, SVGCircleElement>();

    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      absoluteTimeSec += dt;
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        offsetX -= SCROLL_SPEED * dt;
        pulseDistance += PULSE_SPEED * dt;
      }
      
      // Calculate active geometry
      let d = 'M 0 0 ';
      let cx = 0;
      let totalPerimeter = 0;
      
      const nodeData: {id: string, x: number, y: number, perimeterAtNode: number}[] = [];

      for (let i = 0; i < blocks.length; i++) {
        blocks[i].startX = cx;
        const geo = getBlockGeometry(blocks[i], absoluteTimeSec, cx);
        d += geo.path;
        
        geo.nodes.forEach((n, nIdx) => {
          // Approximate the perimeter up to this node for lighting it up
          // For simplicity, we just distribute the perimeter evenly across nodes, or just use the block's perimeter
          // A more robust way is tracking exact perimeter, but we can just use the total perim
          const perimRatio = (nIdx + 1) / geo.nodes.length;
          nodeData.push({
            id: `${blocks[i].id}-${nIdx}`,
            x: n.x,
            y: n.y,
            perimeterAtNode: totalPerimeter + (geo.perimeter * perimRatio)
          });
        });
        
        cx = geo.currentX;
        totalPerimeter += geo.perimeter;
      }

      // 1. Maintain Treadmill
      const firstBlockWidth = blocks[0].baseWidth + blocks[0].gapBefore;
      if (-offsetX > firstBlockWidth * 1.5) {
        // Shift!
        blocks.shift();
        
        // We removed a block, so we must subtract its perimeter from the pulse tracking
        // to keep the pulse at the exact same physical spot on the remaining path.
        // But since the perimeter morphs, it's an approximation.
        // A clean way is to let pulse wrap if it hits the end.
        
        blocks.push(createBlock(blockIdCounter++, 1000 + blockIdCounter));
        
        // Since we removed a block, we need to shift offsetX back
        // Wait, if we shift offsetX back, we ALSO have to shift all block coordinates back?
        // No, `cx` starts at 0 for `blocks[0]`. So by removing `blocks[0]`, `blocks[1]` becomes the new 0.
        // Therefore, the whole coordinate system shifts left by `firstBlockWidth`.
        // So we must ADD `firstBlockWidth` to `offsetX` to compensate!
        // But wait, the dynamic width of the first block might not be exactly `baseWidth`.
        // It's safer to just let the blocks array grow (up to e.g. 50 blocks) and then cleanly GC.
      }
      
      // To perfectly handle infinite scroll without coordinate jumps, let's just NOT shift cx back to 0.
      // cx should start at blocks[0].startX.
      // Let's rewrite the layout loop above to respect a continuous coordinate system!
      // Actually, my loop above DOES `let cx = 0;`. If I shift the array, cx=0 jumps to the second block!
      // Let's fix that.
    };

    // To do continuous coordinates:
    let startingX = 0;
    
    const refinedTick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      absoluteTimeSec += dt;
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        offsetX -= SCROLL_SPEED * dt;
        pulseDistance += PULSE_SPEED * dt;
      }
      
      let d = `M ${startingX} 0 `;
      let cx = startingX;
      let totalPerimeter = 0;
      
      const nodeData: {id: string, x: number, y: number, perimeterAtNode: number}[] = [];

      for (let i = 0; i < blocks.length; i++) {
        const geo = getBlockGeometry(blocks[i], absoluteTimeSec, cx);
        d += geo.path;
        
        geo.nodes.forEach((n, nIdx) => {
          const perimRatio = (nIdx + 1) / geo.nodes.length;
          nodeData.push({
            id: `${blocks[i].id}-${nIdx}`,
            x: n.x,
            y: n.y,
            perimeterAtNode: totalPerimeter + (geo.perimeter * perimRatio)
          });
        });
        
        cx = geo.currentX;
        totalPerimeter += geo.perimeter;
      }

      // Garbage collect left blocks
      if (blocks.length > 0 && cx - startingX > 5000) { // Keep a buffer of 5000px
        const removed = blocks.shift();
        if (removed) {
          // Adjust startingX so the next block stays at its exact coordinate
          // Wait, if we use getBlockGeometry on the removed block NOW, we get its current width.
          const removedGeo = getBlockGeometry(removed, absoluteTimeSec, startingX);
          startingX = removedGeo.currentX;
          
          // Adjust pulse distance
          pulseDistance -= removedGeo.perimeter;
        }
      }

      // Generate new blocks on the right
      const viewportRight = -offsetX + 2500;
      if (cx < viewportRight) {
        blocks.push(createBlock(blockIdCounter++, 1000 + blockIdCounter));
      }

      // Update DOM
      if (basePathRef.current) basePathRef.current.setAttribute('d', d);
      if (activePathRef.current) {
        activePathRef.current.setAttribute('d', d);
        // Using a fixed gap ensures that as a pulse leaves the right, another enters from the left
        activePathRef.current.style.strokeDasharray = `200 1500`;
        // Stroke dash offset moves it along the path. 
        activePathRef.current.style.strokeDashoffset = `${-pulseDistance}`;
      }
      
      if (groupRef.current) {
        groupRef.current.setAttribute('transform', `translate(${offsetX}, 0)`);
      }

      // Update Nodes
      if (nodesGroupRef.current) {
        // Find pulse coordinate (rough approximation from node data)
        let pulseNode = null;
        for (let i = 0; i < nodeData.length; i++) {
          // Because strokeDasharray is '200 1500', the pattern repeats every 1700px.
          // We check if the distance modulo 1700 is within the pulse range (0 to 200).
          // pulseDistance moves forward, so we need to offset perimeterAtNode.
          // The start of a dash is at `pulseDistance + k*1700`.
          const distFromPulse = (nodeData[i].perimeterAtNode - pulseDistance) % 1700;
          const normalizedDist = distFromPulse < 0 ? distFromPulse + 1700 : distFromPulse;
          
          // The dash is 200px long, at the start of the 1700px cycle.
          // So if normalizedDist is small, the pulse is currently over the node.
          if (normalizedDist > 1700 - 200 || normalizedDist < 100) {
            pulseNode = nodeData[i];
            break;
          }
        }

        // Render nodes
        const activeIds = new Set(nodeData.map(n => n.id));
        
        // Remove dead nodes
        for (const [id, el] of nodeElements.entries()) {
          if (!activeIds.has(id)) {
            el.remove();
            nodeElements.delete(id);
          }
        }

        // Add/Update nodes
        nodeData.forEach(n => {
          let el = nodeElements.get(n.id);
          if (!el) {
            el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            el.setAttribute("r", "2.5");
            nodesGroupRef.current?.appendChild(el);
            nodeElements.set(n.id, el);
          }
          el.setAttribute("cx", n.x.toString());
          el.setAttribute("cy", n.y.toString());
          
          // Reactivity
          if (pulseNode && pulseNode.id === n.id) {
            el.setAttribute("class", "skyline-node active");
            el.setAttribute("r", "4");
          } else {
            el.setAttribute("class", "skyline-node");
            el.setAttribute("r", "2.5");
          }
        });
      }
      
      animationFrameId = requestAnimationFrame(refinedTick);
    };

    animationFrameId = requestAnimationFrame(refinedTick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="architectural-skyline-container single-layer">
      <svg 
        className="architectural-skyline-svg" 
        preserveAspectRatio="xMinYMax slice" 
        viewBox="0 0 1440 300"
      >
        <g transform="translate(0, 270)">
          <g ref={groupRef}>
            {/* Base Architectural Blueprint */}
            <path ref={basePathRef} className="skyline-blueprint-base" />
            
            {/* Connection Nodes */}
            <g ref={nodesGroupRef}></g>

            {/* Active Data Pulse / Construction Line */}
            <path ref={activePathRef} className="skyline-blueprint-pulse" />
          </g>
        </g>
      </svg>
    </div>
  );
}
