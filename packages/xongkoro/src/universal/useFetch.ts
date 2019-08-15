import React from 'react';

import Fetcher, {
  FetchFunction,
  FetchOptions,
} from '../internals/Fetcher';
import { SSRManagerContext } from '../internals/SSRManager';
import { useXongkoroContext } from './XongkoroContext';

async function doFetch<D, FP, C>({
  context,
  fetchFunction,
  fetchParam,
  mountState,
  setResult,
}: DoFetchArgs<D, FP, C>) {
  const fetchFunctionBody = fetchFunction(fetchParam || {}, context);

  if (typeof fetchFunctionBody === 'function') {
    setResult({
      loading: true,
    });

    try {
      const data = await fetchFunctionBody();
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
  } else {
    setResult({
      data: fetchFunctionBody,
      loading: false,
    });
  }
}

/**
 * @param D data
 * @param FP fetch param
 */
function useFetch<D, FP, C = any>(
  fetchFunction: FetchFunction<D, FP, C>,
  fetchOptions: FetchOptions<FP>,
  deps: any[] = [],
): UseFetchResult<D> {
  const {
    context,
    options,
    state,
  } = useXongkoroContext();
  const ssrManager = React.useContext(SSRManagerContext);
  const { cacheKey, fetchParam } = fetchOptions;
  const isInCache = cacheKey && state[cacheKey];
  const { ssr } = options;
  const ssrInUse = ssr && ssrManager;

  const mountState = React.useRef({ isMounted: false });
  const prefetchedResult = state[cacheKey] || {};
  const [result, setResult] = React.useState<PrefetchedResult<D>>(prefetchedResult);

  React.useEffect(() => {
    mountState.current.isMounted = true;

    if (!isInCache) {
      doFetch({
        context,
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
  }, deps);

  if (ssrInUse) {
    if (!isInCache) {
      const fetcher = new Fetcher(fetchFunction, fetchOptions, state, context);
      ssrManager!.register(fetcher);
    }
  }

  return {
    data: result.data,
    error: result.error,
    loading: result.loading === undefined ? true : result.loading,
  };
}

export default useFetch;

interface UseFetchResult<D> {
  data: D,
  error: boolean;
  loading: boolean;
}

interface PrefetchedResult<D> {
  data: D;
  error?: any;
  loading: boolean;
}

interface DoFetchArgs<D, FP, C> {
  context: C;
  fetchFunction: FetchFunction<D, FP, C>;
  fetchParam?: FP;
  mountState: {
    current: {
      isMounted: boolean;
    };
  };
  setResult: (arg) => void;
}
