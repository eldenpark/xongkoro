/* eslint-disable no-param-reassign */
import chalk from 'chalk';
import { XongkoroState } from '../universal/Xongkoro';

import { logger } from 'jege/server';

const log = logger('[xongkoro]');

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
      const fetchFunctionFirstDegreeResult = fetchFunction(fetchParam || {}, context);

      if (typeof fetchFunctionFirstDegreeResult === 'function') {
        fetchFunctionFirstDegreeResult()
          .then((data) => {
            state[cacheKey] = {
              data,
              loading: false,
            };
            resolve(cacheKey);
          })
          .catch((error) => {
            log(
              `Fetcher(): ${chalk.red('error')} executing fetchFunction: %o`,
              error,
            );
            state[cacheKey] = {
              data: null,
              error,
              loading: false,
            };
            resolve(cacheKey);
          });
      } else {
        state[cacheKey] = {
          data: fetchFunctionFirstDegreeResult,
          loading: false,
        };
        resolve(cacheKey);
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
