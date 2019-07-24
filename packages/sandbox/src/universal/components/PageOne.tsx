import axios from 'axios';
import { logger } from 'jege';
import React from 'react';
import { useFetch } from 'songkoro';
import { useDispatch, useSelector } from 'react-redux';

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

const fetchFunction2 = async () => {
  const { data } = await axios.get('http://httpbin.org/get');
  return data.origin;
};

const PageOne: React.FC<any> = () => {
  const dispatch = useDispatch();
  const fetchOptions = {
    cacheKey: 'http://httpbin.org/',
    fetchParam: {
      dispatch,
      power: 1,
    },
  };
  const { data, loading } = useFetch<FetchFunctionParam, HttpBinGet>(fetchFunction, fetchOptions);
  const [latestResult, setLatestResult] = React.useState(null);

  const handleClickFetch = React.useCallback(() => {
    fetchFunction2()
      .then((_data) => {
        setLatestResult(_data);
      });
  }, []);

  const counter = useSelector((state: any) => state.counter);
  const otherInformation = useSelector((state: any) => state.otherInformation);

  const handleClickDispatch = React.useCallback(() => {
    dispatch({
      type: 'INCREMENT',
    });
  }, []);

  const latestData = latestResult || data;

  return (
    <div>
      <p>Page One</p>
      <div>
        <button
          onClick={handleClickFetch}
          type="button"
        >
          fetch
        </button>
      </div>
      <div>
        <button
          onClick={handleClickDispatch}
          type="button"
        >
          dispatch (Increment)
        </button>
      </div>
      {!loading
        ? (
          <div>
            <p>
              {`counter: ${counter}`}
            </p>
            <p>
              {`axiosData: ${latestData.url}`}
            </p>
            <p>
              {`otherInformation: ${otherInformation}`}
            </p>
          </div>
        )
        : <p>loading</p>
      }
    </div>
  );
};

export default PageOne;

interface FetchFunctionParam {
  dispatch;
  power: number;
}

interface HttpBinGet {
  args: any;
  headers: any;
  origin: string;
  url: string;
}
