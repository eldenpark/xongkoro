import { Dispatch } from 'redux';
import { logger } from 'jege';
import React from 'react';
import { SongkoroFetch, RenderDataProps } from 'songkoro';

const log = logger('[example-react]');

const fetchFunction = () => {
  log('fetchFunction(): executing');
  return {
    a: 3,
  };
};

const SongkoroRendered = ({
  data,
  loading,
}) => {
  return !loading
    ? (
      <div>
        <p>{`data.a: ${data.a}`}</p>
      </div>
    )
    : (
      <div>loading...</div>
    );
};

const PageTwo: React.FC<any> = () => {
  const fetchOptions = {
    cacheKey: 'http://httpbin.org/',
  };

  return (
    <div>
      <p>Page Two</p>
      <SongkoroFetch<any, FetchParam>
        fetchFunction={fetchFunction}
        fetchOptions={fetchOptions}
        renderData={SongkoroRendered}
      />
    </div>
  );
};

export default PageTwo;

interface FetchParam {
  dispatch: Dispatch;
  power: number;
}

interface HttpBinGet {
  args: any;
  headers: any;
  origin: string;
  url: string;
}

interface ExtraProps {
  foo: number;
}

type SongkoroFetchRenderedProps = RenderDataProps<HttpBinGet, { foo: number; }>;
