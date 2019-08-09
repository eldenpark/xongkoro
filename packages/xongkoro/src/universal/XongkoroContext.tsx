import React from 'react';

import Xongkoro from './Xongkoro';

const XongkoroContext = React.createContext<Xongkoro | null>(null);

export default XongkoroContext;

export const XongkoroProvider: React.FC<IsomorphicProviderProps> = ({
  children,
  xongkoro,
}) => {
  return (
    <XongkoroContext.Provider value={xongkoro}>
      {children}
    </XongkoroContext.Provider>
  );
};

export function useXongkoroContext() {
  const isomorphic = React.useContext(XongkoroContext);

  if (!isomorphic) {
    throw new Error('Isomorphic is not provided. Did you use <IsomorphicProvider />?');
  }

  return isomorphic;
}

interface IsomorphicProviderProps {
  xongkoro: Xongkoro;
}
