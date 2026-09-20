import React, { useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { INDIA_COORD } from './heroData';
import MobileServiceNodes from './MobileServiceNodes';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface MobileInfrastructureMapProps {
  onNodeTap: (id: string) => void;
  activeNodeId: string | null;
}

// Visakhapatnam coordinates — The SOLE origin for the entire service network (matches desktop INDIA_COORD)
export const VIZAG_COORD: [number, number] = INDIA_COORD; // [83.2185, 17.6868]

// 12 Distinct, non-overlapping service node positions surrounding enlarged India.
// Derived from desktop geometry and spaced out with generous clearance so zero nodes stack or overlap.
export const mobileNodes: { id: string; coordinates: [number, number] }[] = [
  { id: 'SERVERS',    coordinates: [75.5, 30.5] }, // North (Upper center)
  { id: 'SECURITY',   coordinates: [93.5, 30.5] }, // North-East (Upper right)
  { id: 'CCTV',       coordinates: [61.5, 25.5] }, // North-West (Upper left)
  { id: 'ACCESS',     coordinates: [95.5, 20.5] }, // East (Middle right)
  { id: 'TURNKEY',    coordinates: [54.5, 18.5] }, // West (Middle left)
  { id: 'NETWORK',    coordinates: [96.5, 12.5] }, // East-Southeast (Lower right)
  { id: 'INTRUSION',  coordinates: [56.5, 10.5] }, // West-Southwest (Lower left)
  { id: 'WIRELESS',   coordinates: [91.5, 4.5]  }, // Southeast (Bottom right)
  { id: 'DATACENTER', coordinates: [83.5, 2.5]  }, // South (Bottom center-right)
  { id: 'LOGISTICS',  coordinates: [75.5, 3.5]  }, // South (Bottom center-left)
  { id: 'ELECTRICAL', coordinates: [66.5, 4.5]  }, // Southwest (Bottom left)
  { id: 'SAFETY',     coordinates: [58.5, 2.5]  }, // South-Southwest (Bottom far-left)
];

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
                    }}
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
                  }}
                />
              ))
            }
          </Geographies>

          {/* Connection Lines — ALL 12 lines originate strictly from Visakhapatnam Dot and terminate at Node Centers */}
          {mobileNodes.map((node) => {
            const isActive = activeNodeId === node.id;
            return (
              <g key={`line-group-${node.id}`}>
                <Line
                  from={VIZAG_COORD}
                  to={node.coordinates}
                  stroke="#64748b"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeDasharray="4 5"
                  className="mh-anim-network-line"
                  style={{ opacity: isActive ? 0.95 : 0.55 }}
                />
              </g>
            );
          })}

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
