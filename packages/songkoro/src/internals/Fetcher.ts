/* eslint-disable no-param-reassign */
import { SongkoroState } from '../universal/Songkoro';

export default class Fetcher<P> {
  promise: Promise<any>;

  constructor(
    fetchFunction: FetchFunction<P>,
    fetchOptions: FetchOptions<P>,
    state: SongkoroState,
  ) {
    const { cacheKey, fetchParam } = fetchOptions;
    this.promise = new Promise((resolve) => {
      fetchFunction(fetchParam || {})
        .then((data) => {
          state[cacheKey] = {
            data,
          };
          resolve(cacheKey);
        })
        .catch((error) => {
          state[cacheKey] = {
            data: null,
            error,
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

export interface FetchFunction<P> {
  (fetchParam: P | {}): Promise<any>;
}
