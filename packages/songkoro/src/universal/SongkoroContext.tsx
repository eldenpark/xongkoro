import React from 'react';

import Songkoro from './Songkoro';

const SongkoroContext = React.createContext<Songkoro | null>(null);

export default SongkoroContext;

export const SongkoroProvider: React.FC<IsomorphicProviderProps> = ({
  children,
  songkoro,
}) => {
  return (
    <SongkoroContext.Provider value={songkoro}>
      {children}
    </SongkoroContext.Provider>
  );
};

export function useSongkoroContext() {
  const isomorphic = React.useContext(SongkoroContext);

  if (!isomorphic) {
    throw new Error('Isomorphic is not provided. Did you use <IsomorphicProvider />?');
  }

  return isomorphic;
}

interface IsomorphicProviderProps {
  songkoro: Songkoro;
}
