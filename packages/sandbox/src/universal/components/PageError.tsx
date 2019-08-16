import { Dispatch } from 'redux';
import { logger } from 'jege';
import React from 'react';
import { XongkoroFetch, RenderDataProps } from 'xongkoro';

const log = logger('[sandbox]');

const fetchFunction = () => {
  log('fetchFunction(): executing');
  return async () => {
    throw new Error('error fetchFunction');
  };
};

const XongkoroRendered = ({
  // data,
  // erorr,
  loading,
}) => {
  return !loading
    ? (
      <div>
        <p>error</p>
      </div>
    )
    : (
      <div>loading...</div>
    );
};

const PageError: React.FC<any> = () => {
  const fetchOptions = {
    cacheKey: 'http://httpbin.org/',
  };

  return (
    <div>
      <p>Page Error</p>
      <XongkoroFetch<any, FetchParam>
        fetchFunction={fetchFunction}
        fetchOptions={fetchOptions}
        renderData={XongkoroRendered}
      />
    </div>
  );
};

export default PageError;

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

type XongkoroFetchRenderedProps = RenderDataProps<HttpBinGet, { foo: number; }>;
