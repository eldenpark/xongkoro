/* eslint-disable no-param-reassign */
import { SongkoroState } from '../universal/Songkoro';

export default class Fetcher<FP, D> {
  promise: Promise<any>;

  constructor(
    fetchFunction: FetchFunction<FP, D>,
    fetchOptions: FetchOptions<FP>,
    state: SongkoroState,
  ) {
    const { cacheKey, fetchParam } = fetchOptions;
    this.promise = new Promise((resolve) => {
      fetchFunction(fetchParam || {})
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
    });
  }
}

export interface FetchOptions<P> {
  cacheKey: string;
  fetchParam?: P;
}

export interface FetchFunction<FP, D> {
  (fetchParam: FP | {}): Promise<D>;
}
