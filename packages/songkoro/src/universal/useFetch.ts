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
    const data = await fetchFunction(fetchParam || {});
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

function useFetch<P>(fetchFunction: FetchFunction<P>, fetchOptions: FetchOptions<P>) {
  const {
    options,
    state,
  } = useSongkoroContext();
  const ssrManager = React.useContext(SSRManagerContext);
  const { cacheKey, fetchParam } = fetchOptions;
  const isInCache = cacheKey && state[cacheKey];
  const { ssr } = options;
  const ssrInUse = ssr && ssrManager;

  const mountState = React.useRef({ isMounted: false });
  const prefetchedResult = state[cacheKey] || {};
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
        delete state[cacheKey!];
      }
    };
  }, []);

  if (ssrInUse) {
    if (!isInCache) {
      const fetcher = new Fetcher(fetchFunction, fetchOptions, state);
      ssrManager!.register(fetcher);
    }
  }

  return {
    data: result.data,
    error: result.error,
    loading: result.loading || false,
  };
}

export default useFetch;
