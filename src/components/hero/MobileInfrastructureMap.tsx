import React, { useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker, useMapContext } from "react-simple-maps";
import { INDIA_COORD } from './heroData';
import MobileServiceNodes from './MobileServiceNodes';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface MobileInfrastructureMapProps {
  onNodeTap: (id: string) => void;
  activeNodeId: string | null;
}

// Visakhapatnam coordinates — The SOLE origin for the entire service network (matches desktop INDIA_COORD)
const VIZAG_COORD: [number, number] = INDIA_COORD; // [83.2185, 17.6868]

// 12 Distinct, non-overlapping service node positions surrounding India (all placed strictly OUTSIDE India).
// Arranged in a complete 360-degree radial ring radiating from Visakhapatnam.
const mobileNodes: { id: string; coordinates: [number, number] }[] = [
  { id: 'SERVERS',    coordinates: [77.0, 38.5] }, // North (Central Asia / Above Ladakh)
  { id: 'SECURITY',   coordinates: [98.0, 33.0] }, // North-East (China / East Asia)
  { id: 'ACCESS',     coordinates: [99.0, 21.0] }, // East (Myanmar / SE Asia)
  { id: 'NETWORK',    coordinates: [98.0, 13.0] }, // East-Southeast (Andaman Sea / Thailand)
  { id: 'WIRELESS',   coordinates: [94.0, 4.0]  }, // Southeast (Indian Ocean SE)
  { id: 'DATACENTER', coordinates: [86.0, -1.0] }, // South (Indian Ocean South)
  { id: 'LOGISTICS',  coordinates: [77.0, -1.0] }, // South-Southwest (Indian Ocean South)
  { id: 'ELECTRICAL', coordinates: [67.0, 3.0]  }, // Southwest (Indian Ocean SW)
  { id: 'SAFETY',     coordinates: [58.0, 2.0]  }, // South-West (Arabian Sea / West Indian Ocean)
  { id: 'INTRUSION',  coordinates: [54.0, 11.5] }, // West-Southwest (Arabian Sea)
  { id: 'TURNKEY',    coordinates: [52.0, 19.5] }, // West (Arabian Sea / Oman)
  { id: 'CCTV',       coordinates: [60.0, 28.5] }, // North-West (Iran / Pakistan Border)
];

// Smooth curved Bézier dotted lines radiating from Visakhapatnam to all outer service nodes
function CurvedNetworkLines({ nodes, activeNodeId }: { nodes: { id: string; coordinates: [number, number] }[]; activeNodeId: string | null }) {
  const { projection } = useMapContext();
  if (!projection) return null;

  const origin = projection(VIZAG_COORD);
  if (!origin) return null;
  const [x1, y1] = origin;

  return (
    <g className="mh-curved-lines-group">
      {nodes.map((node) => {
        const dest = projection(node.coordinates);
        if (!dest) return null;
        const [x2, y2] = dest;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return null;

        // Midpoint
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;

        // Perpendicular normal vector (-dy, dx)
        const px = -dy / dist;
        const py = dx / dist;

        // Outward curved arc offset
        const isRight = dx >= 0;
        const curveDir = isRight ? 1 : -1;
        const curveOffset = dist * 0.16;

        const cx = mx + px * curveOffset * curveDir;
        const cy = my + py * curveOffset * curveDir;

        const pathData = `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
        const isActive = activeNodeId === node.id;

        return (
          <path
            key={`curved-line-${node.id}`}
            d={pathData}
            fill="none"
            stroke={isActive ? "#F4511E" : "#64748b"}
            strokeWidth={isActive ? 1.8 : 1.2}
            strokeLinecap="round"
            strokeDasharray="4 5"
            style={{
              opacity: isActive ? 0.95 : 0.55,
              transition: 'stroke 0.3s ease, opacity 0.3s ease, stroke-width 0.3s ease'
            }}
          />
        );
      })}
    </g>
  );
}

export default function MobileInfrastructureMap({ onNodeTap, activeNodeId }: MobileInfrastructureMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mh-map-container" ref={mapRef}>
      <div className="mh-map-svg-wrapper">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 340, center: [78.5, 48.0] }}
          width={425}
          height={960}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* SVG Definitions for India gradient */}
          <defs>
            <linearGradient id="indiaMobileGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7043" />
              <stop offset="50%" stopColor="#F4511E" />
              <stop offset="100%" stopColor="#E64A19" />
            </linearGradient>
          </defs>

          {/* World Geography (excluding standard India) - Same as Desktop */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isIndia = geo.properties?.name === "India";
                if (isIndia) return null; // Hide default India

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#CBD5E1"
                    stroke="#ffffff"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none", pointerEvents: "none" },
                      hover: { outline: "none", pointerEvents: "none" },
                      pressed: { outline: "none", pointerEvents: "none" }
                    } as any}
                  />
                );
              })
            }
          </Geographies>

          {/* Official India Geography - Same as Desktop */}
          <Geographies geography="/india-official-country.topo.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="url(#indiaMobileGradient)"
                  stroke="#D84315"
                  strokeWidth={0.8}
                  style={{
                    default: { outline: "none", filter: "drop-shadow(0 0 10px rgba(244, 81, 30, 0.4))", pointerEvents: "none" },
                    hover: { outline: "none", filter: "drop-shadow(0 0 10px rgba(244, 81, 30, 0.4))", pointerEvents: "none" },
                    pressed: { outline: "none", filter: "drop-shadow(0 0 10px rgba(244, 81, 30, 0.4))", pointerEvents: "none" }
                  } as any}
                />
              ))
            }
          </Geographies>

          {/* Curved Connection Lines — ALL 12 lines originate strictly from Visakhapatnam Dot and terminate at Node Centers in smooth outward arcs */}
          <CurvedNetworkLines nodes={mobileNodes} activeNodeId={activeNodeId} />

          {/* Visakhapatnam Marker Dot on Eastern Coast — The Network Origin */}
          <Marker coordinates={VIZAG_COORD}>
            <g className="mh-vizag-node">
              <circle r={6.5} fill="none" stroke="#F4511E" strokeWidth={1} opacity={0.7} className="mh-vizag-pulse-ring" />
              <circle r={3.5} fill="#F4511E" />
              <circle r={1.5} fill="#ffffff" />
            </g>
          </Marker>

          {/* Service Nodes Surrounding India — All 12 nodes positioned at exact path endpoints with generous clearance */}
          <MobileServiceNodes 
            nodes={mobileNodes} 
            activeNodeId={activeNodeId} 
            onNodeTap={onNodeTap} 
          />
        </ComposableMap>
      </div>
    </div>
  );
}
