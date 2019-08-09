/* eslint-disable no-param-reassign */
import { XongkoroState } from '../universal/Xongkoro';

export default class Fetcher<D, FP> {
  promise: Promise<any>;

  constructor(
    fetchFunction: FetchFunction<D, FP>,
    fetchOptions: FetchOptions<FP>,
    state: XongkoroState,
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
  (fetchParam: FP | {}): FetchFunctionBody<D> | any;
}

type FetchFunctionBody<D> = () => Promise<D>;
