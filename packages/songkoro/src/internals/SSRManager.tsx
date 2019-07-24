import { createContext } from 'react';

import Fetcher from './Fetcher';

export class SSRManager {
  promiseSet = new Set<Promise<any>>();

  consumeAndWaitPromises(): Promise<any[]> {
    const promises = Array.from(this.promiseSet);
    this.promiseSet.clear();

    return Promise.all(promises);
  }

  hasPromises() {
    return this.promiseSet.size > 0;
  }

  register<FP, D>(fetcher: Fetcher<FP, D>) {
    this.promiseSet.add(fetcher.promise);
  }
}

export const SSRManagerContext = createContext<SSRManager | null>(null);
