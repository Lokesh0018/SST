import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ServiceContextType {
  activeService: string | null;
  setActiveService: React.Dispatch<React.SetStateAction<string | null>>;
  isUserInteracting: boolean;
  setIsUserInteracting: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [activeService, setActiveService] = useState<string | null>('TURNKEY');
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  return (
    <ServiceContext.Provider 
      value={{ 
        activeService, 
        setActiveService, 
        isUserInteracting, 
        setIsUserInteracting 
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceContext() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
}
