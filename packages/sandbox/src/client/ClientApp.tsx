import { BrowserRouter } from 'react-router-dom';
import { createStore } from '@@universal/state';
import {
  createSongkoro,
  SongkoroProvider,
} from 'songkoro';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import * as React from 'react';

import Universal from '../universal/Universal';

const reduxStore = createStore({
  preloadedState: window['__REDUX_STATE__'],
});
const songkoro = createSongkoro({
  store: window['__APP_STATE__'],
});

const ClientApp = () => {
  return (
    <BrowserRouter>
      <Provider store={reduxStore}>
        <SongkoroProvider songkoro={songkoro}>
          <Universal />
        </SongkoroProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);
