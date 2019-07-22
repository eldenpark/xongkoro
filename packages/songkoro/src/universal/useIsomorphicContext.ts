import { useContext } from 'react';

import { SongkoroContext } from './Songkoro';

export default function useSongkoroContext() {
  const isomorphic = useContext(SongkoroContext);

  if (!isomorphic) {
    throw new Error('Isomorphic is not provided. Did you use <IsomorphicProvider />?');
  }

  return isomorphic;
}
