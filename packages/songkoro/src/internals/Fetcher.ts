/* eslint-disable no-param-reassign */
import { SongkoroState } from '../universal/Songkoro';

export default class Fetcher<D, FP> {
  promise: Promise<any>;

  constructor(
    fetchFunction: FetchFunction<D, FP>,
    fetchOptions: FetchOptions<FP>,
    state: SongkoroState,
  ) {
    const { cacheKey, fetchParam } = fetchOptions;
    this.promise = new Promise((resolve) => {
      const fetchFunctionBody = fetchFunction(fetchParam || {});

      if (typeof fetchFunctionBody === 'function') {
        fetchFunctionBody()
          .then((data) => {
            state[cacheKey] = {
              data,
              loading: false,
            };
            resolve(cacheKey);
          })
          .catch((error) => {
            state[cacheKey] = {
              data: null,
              error,
              loading: false,
            };
            resolve(cacheKey);
          });
      } else {
        resolve();
      }
    });
  }
}

export interface FetchOptions<FP> {
  cacheKey: string;
  fetchParam?: FP;
}

export interface FetchFunction<D, FP> {
  (fetchParam: FP | {}): () => Promise<D>;
}
