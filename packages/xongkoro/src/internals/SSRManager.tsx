import { createContext } from 'react';
import { logger } from 'jege/server';

import Fetcher from './Fetcher';

const logFunction = logger('[xongkoro]');

export class SSRManager {
  promiseSet = new Set<Promise<any>>();

  consumeAndWaitPromises(): Promise<any[]> {
    log('consumeAndWaitPromises(): promiseSet: %o', this.promiseSet);
    const promises = Array.from(this.promiseSet);
    this.promiseSet.clear();

    return Promise.all(promises);
  }

  hasPromises() {
    return this.promiseSet.size > 0;
  }

  register<FP, D, C>(fetcher: Fetcher<FP, D, C>) {
    this.promiseSet.add(fetcher.promise);
  }
}

export const SSRManagerContext = createContext<SSRManager | null>(null);

function log(...args) {
  if (process.env.XONGKORO_DEBUG === 'true') {
    const [format, ...rest] = args;
    logFunction(format, ...rest);
  }
}
