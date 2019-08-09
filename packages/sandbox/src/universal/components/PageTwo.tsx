import axios from 'axios';
import { Dispatch } from 'redux';
import { logger } from 'jege';
import React from 'react';
import { XongkoroFetch, RenderDataProps } from 'xongkoro';
import { useDispatch } from 'react-redux';

const log = logger('[example-react]');

const fetchFunction = (param) => async () => {
  log('fetchFunction(): executing with fetchParam: %j', param);

  const { data } = await axios.get('http://httpbin.org/get');
  param.dispatch({
    payload: {
      otherInformation: `other-information-${Date.now()}`,
    },
    type: 'INCREMENT',
  });
  return data;
};

const XongkoroRendered: React.FC<XongkoroFetchRenderedProps> = ({
  data,
  extraProps,
  loading,
}) => {
  return !loading && data
    ? (
      <div>
        <p>{`data: ${data.url}`}</p>
        <p>{`extraProps.foo: ${extraProps!.foo}`}</p>
      </div>
    )
    : (
      <div>loading...</div>
    );
};

const PageTwo: React.FC<any> = () => {
  const dispatch = useDispatch();
  const fetchOptions = {
    cacheKey: 'http://httpbin.org/',
    fetchParam: {
      dispatch,
      power: 1,
    },
  };

  return (
    <div>
      <p>Page Two</p>
      <XongkoroFetch<HttpBinGet, FetchParam, ExtraProps>
        extraProps={{ foo: 33 }}
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
