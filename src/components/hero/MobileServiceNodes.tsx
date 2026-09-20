import React from 'react';
import { Marker } from 'react-simple-maps';
import { services } from './heroData';

interface NodeProps {
  id: string;
  coordinates: [number, number];
}

interface MobileServiceNodesProps {
  nodes: NodeProps[];
  activeNodeId: string | null;
  onNodeTap: (id: string) => void;
}

export default function MobileServiceNodes({ nodes, activeNodeId, onNodeTap }: MobileServiceNodesProps) {
  return (
    <>
      {nodes.map((node, index) => {
        const serviceData = services.find(s => s.id === node.id);
        const isActive = activeNodeId === node.id;
        if (!serviceData) return null;
        
        return (
          <Marker key={node.id} coordinates={node.coordinates}>
            <g
              className={`mh-service-node ${isActive ? 'active' : ''}`}
              data-index={index}
              onClick={(e) => {
                e.stopPropagation();
                onNodeTap(node.id);
              }}
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            >
              {/* Main Service Circle — Dark Navy Background with Crisp White Icon */}
              <circle 
                className="mh-pin-main-circle" 
                r={16} 
                fill="#1e2530" 
                stroke={isActive ? "#F4511E" : "rgba(255, 255, 255, 0.18)"} 
                strokeWidth={isActive ? 2 : 1.5} 
              />
              {/* Service Icon */}
              <svg 
                className="mh-pin-icon" 
                x="-8" 
                y="-8" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={isActive ? "#F4511E" : "rgba(255, 255, 255, 0.9)"} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d={serviceData.icon} />
              </svg>
            </g>
          </Marker>
        );
      })}
    </>
  );
}
