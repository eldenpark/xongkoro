import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import React from 'react';
import {
  Xongkoro,
  XongkoroProvider,
} from 'xongkoro';

import Universal from '../universal/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  reduxStore,
  requestUrl,
  xongkoro,
}) => {
  return (
    <StaticRouter location={requestUrl}>
      <Provider store={reduxStore}>
        <XongkoroProvider xongkoro={xongkoro}>
          <Universal />
        </XongkoroProvider>
      </Provider>
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  reduxStore;
  requestUrl: string;
  xongkoro: Xongkoro;
}
