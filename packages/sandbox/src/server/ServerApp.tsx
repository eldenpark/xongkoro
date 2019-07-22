import {
  Songkoro,
  SongkoroProvider,
} from 'songkoro';
import { StaticRouter } from 'react-router-dom';
import React from 'react';

import Universal from '../universal/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  requestUrl,
  songkoro,
}) => {
  return (
    <StaticRouter location={requestUrl}>
      <SongkoroProvider songkoro={songkoro}>
        <Universal />
      </SongkoroProvider>
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  requestUrl: string;
  songkoro: Songkoro;
}
