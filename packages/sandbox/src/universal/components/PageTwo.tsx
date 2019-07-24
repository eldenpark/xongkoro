import axios from 'axios';
import { Dispatch } from 'redux';
import { logger } from 'jege';
import React from 'react';
import { SongkoroFetch } from 'songkoro';
import { useDispatch } from 'react-redux';

const log = logger('[example-react]');

const fetchFunction = async (param) => {
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

const songkoroRendered = ({
  data,
}: {
  data: HttpBinGet;
}) => {
  return (
    <div>{data.url}</div>
  );
};

const Loading = () => {
  return (
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
      <SongkoroFetch<FetchParam, HttpBinGet>
        fetchFunction={fetchFunction}
        fetchOptions={fetchOptions}
        renderData={songkoroRendered}
        renderLoading={Loading}
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
