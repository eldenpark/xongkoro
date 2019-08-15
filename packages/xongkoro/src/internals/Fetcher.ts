/* eslint-disable no-param-reassign */
import { XongkoroState } from '../universal/Xongkoro';

export default class Fetcher<D, FP, C> {
  promise: Promise<any>;

  constructor(
    fetchFunction: FetchFunction<D, FP, C>,
    fetchOptions: FetchOptions<FP>,
    state: XongkoroState,
    context: C,
  ) {
    const { cacheKey, fetchParam } = fetchOptions;
    this.promise = new Promise((resolve) => {
      const fetchFunctionBody = fetchFunction(fetchParam || {}, context);

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

export interface FetchFunction<D, FP, C> {
  (fetchParam: FP | {}, context: C): FetchFunctionBody<D> | any;
}

type FetchFunctionBody<D> = () => Promise<D>;
