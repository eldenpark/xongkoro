import React from 'react';

import Xongkoro from './Xongkoro';

const XongkoroContext = React.createContext<Xongkoro<any> | null>(null);

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
  const xongkoro = React.useContext(XongkoroContext);

  if (!xongkoro) {
    throw new Error('Xongkoro is not provided. Did you use <XongkoroProvider />?');
  }

  return xongkoro;
}

interface IsomorphicProviderProps {
  xongkoro: Xongkoro<any>;
}
