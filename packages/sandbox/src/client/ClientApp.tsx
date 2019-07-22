import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import {
  createSongkoro,
  SongkoroProvider,
} from 'songkoro';
import * as React from 'react';

import Universal from '../universal/Universal';

const songkoro = createSongkoro({
  store: window['__APP_STATE__'],
});

const ClientApp = () => {
  return (
    <BrowserRouter>
      <SongkoroProvider songkoro={songkoro}>
        <Universal />
      </SongkoroProvider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);
