/* eslint-disable no-param-reassign */
import { SongkoroStore } from '../universal/Songkoro';

export default class Fetcher<P> {
  promise: Promise<any>;

  constructor(
    fetchFunction: FetchFunction<P>,
    fetchOptions: FetchOptions<P>,
    store: SongkoroStore,
  ) {
    const { cacheKey, fetchParam } = fetchOptions;
    this.promise = new Promise((resolve) => {
      fetchFunction(fetchParam || {})
        .then((data) => {
          store[cacheKey] = {
            data,
          };
          resolve(cacheKey);
        })
        .catch((error) => {
          store[cacheKey] = {
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
