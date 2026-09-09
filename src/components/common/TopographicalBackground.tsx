export default function TopographicalBackground({ className = "topo-container" }: { className?: string }) {
  return (
    <div className={className}>
      <svg className="topo-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Upper Topography */}
        {Array.from({ length: 15 }).map((_, i) => (
          <path 
            key={`top-${i}`} 
            d={`M-10,${15 + i*1.5} C40,${35 - i*0.8} 70,${5 - i*1.5} 110,${25 + i*1.2}`} 
          />
        ))}
        {/* Middle Topography */}
        {Array.from({ length: 15 }).map((_, i) => (
          <path 
            key={`middle-${i}`} 
            d={`M-10,${45 + i*1.5} C40,${65 - i*0.8} 70,${35 - i*1.5} 110,${55 + i*1.2}`} 
          />
        ))}
        {/* Lower Topography */}
        {Array.from({ length: 15 }).map((_, i) => (
          <path 
            key={`bottom-${i}`} 
            d={`M-10,${75 + i*1.5} C40,${95 - i*0.8} 70,${65 - i*1.5} 110,${85 + i*1.2}`} 
          />
        ))}
      </svg>
    </div>
  );
}
