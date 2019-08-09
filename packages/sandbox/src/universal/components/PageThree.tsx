import { Dispatch } from 'redux';
import { logger } from 'jege';
import React from 'react';
import { XongkoroFetch, RenderDataProps } from 'xongkoro';

const log = logger('[example-react]');

const fetchFunction = () => {
  log('fetchFunction(): executing');
  return {
    a: 3,
  };
};

const XongkoroRendered = ({
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
      <XongkoroFetch<any, FetchParam>
        fetchFunction={fetchFunction}
        fetchOptions={fetchOptions}
        renderData={XongkoroRendered}
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

type XongkoroFetchRenderedProps = RenderDataProps<HttpBinGet, { foo: number; }>;
