import { BrowserRouter } from 'react-router-dom';
import { createStore } from '@@universal/state';
import {
  createXongkoro,
  XongkoroProvider,
} from 'xongkoro';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import * as React from 'react';

import Universal from '../universal/Universal';

const reduxStore = createStore({
  preloadedState: window['__REDUX_STATE__'],
});
const xongkoro = createXongkoro({
  preloadedState: window['__XONGKORO_STATE__'],
});

const ClientApp = () => {
  return (
    <BrowserRouter>
      <Provider store={reduxStore}>
        <XongkoroProvider xongkoro={xongkoro}>
          <Universal />
        </XongkoroProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);
