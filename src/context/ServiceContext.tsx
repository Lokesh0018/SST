import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ServiceContextType {
  activeService: string | null;
  setActiveService: (service: string | null) => void;
  isUserInteracting: boolean;
  setIsUserInteracting: (interacting: boolean) => void;
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
