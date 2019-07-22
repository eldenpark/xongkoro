import { Provider } from 'react-redux';
import {
  Songkoro,
  SongkoroProvider,
} from 'songkoro';
import { StaticRouter } from 'react-router-dom';
import React from 'react';

import Universal from '../universal/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  reduxStore,
  requestUrl,
  songkoro,
}) => {
  return (
    <StaticRouter location={requestUrl}>
      <Provider store={reduxStore}>
        <SongkoroProvider songkoro={songkoro}>
          <Universal />
        </SongkoroProvider>
      </Provider>
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  reduxStore;
  requestUrl: string;
  songkoro: Songkoro;
}
