/* eslint-disable no-param-reassign */
import { SongkoroStore } from '../universal/Songkoro';

export default class Fetcher {
  promise: Promise<any>;

  constructor(fetchFunction: FetchFunction, fetchOptions: FetchOptions, store: SongkoroStore) {
    const { cacheKey, fetchParam } = fetchOptions;
    this.promise = new Promise((resolve) => {
      fetchFunction(fetchParam)
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

export interface FetchOptions {
  cacheKey: string;
  fetchParam?: object;
}

export interface FetchFunction {
  (fetchParam?: object): Promise<any>;
}
