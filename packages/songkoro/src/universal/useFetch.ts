import React from 'react';

import Fetcher, {
  FetchFunction,
  FetchOptions,
} from '../internals/Fetcher';
import { SSRManagerContext } from '../internals/SSRManager';
import { useSongkoroContext } from './SongkoroContext';

async function doFetch({
  fetchFunction,
  fetchParam,
  mountState,
  setResult,
}) {
  setResult({
    loading: true,
  });

  try {
    const data = await fetchFunction(fetchParam);
    if (mountState.current.isMounted) {
      setResult({
        data,
        loading: false,
      });
    }
  } catch (err) {
    if (mountState.current.isMounted) {
      setResult({
        error: err,
        loading: false,
      });
    }
  }
}

const useFetch = (fetchFunction: FetchFunction, fetchOptions: FetchOptions) => {
  const {
    options,
    store,
  } = useSongkoroContext();
  const ssrManager = React.useContext(SSRManagerContext);
  const { cacheKey, fetchParam } = fetchOptions;
  const isInCache = cacheKey && store[cacheKey];
  const { ssr } = options;
  const ssrInUse = ssr && ssrManager;

  const mountState = React.useRef({ isMounted: false });
  const prefetchedResult = store[cacheKey] || {};
  const [result, setResult] = React.useState<any>(prefetchedResult);

  React.useEffect(() => {
    mountState.current.isMounted = true;

    if (!isInCache) {
      doFetch({
        fetchFunction,
        fetchParam,
        mountState,
        setResult,
      });
    }

    return () => {
      mountState.current.isMounted = false;
      if (isInCache) {
        delete store[cacheKey!];
      }
    };
  }, []);

  if (ssrInUse) {
    if (!isInCache) {
      const fetcher = new Fetcher(fetchFunction, fetchOptions, store);
      ssrManager!.register(fetcher);
    }
  }

  return {
    data: result.data,
    error: result.error,
    loading: result.loading || false,
  };
};

export default useFetch;
