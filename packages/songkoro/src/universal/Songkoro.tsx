const songkoroConstructorSecret = Symbol('songkoroConstructorSecret');

export default class Songkoro {
  options: SongkoroOptions = {
    ssr: false,
  };
  store: SongkoroStore;

  constructor({
    constructorSecret,
    options,
    store,
  }) {
    if (constructorSecret !== songkoroConstructorSecret) {
      console.warn('Isomorphic(): Try not to instantiate this using new keyword. Use createIsomorphic() instead'); // eslint-disable-line
    }

    this.options = options;
    this.store = store;
  }

  getStoreObject() {
    return JSON.stringify(this.store)
      .replace(/</g, '\\u003c');
  }
}

export const createSongkoro = ({
  ssr = false,
  store = {},
}: CreateIsomorphicArgs = {}) => {
  const options = {
    ssr,
  };
  return new Songkoro({
    constructorSecret: songkoroConstructorSecret,
    options,
    store,
  });
};

export interface SongkoroStore {
  [cacheKey: string]: {
    data: null | any;
    error?: any;
  };
}

interface CreateIsomorphicArgs {
  ssr?: boolean;
  store?: object;
}

interface SongkoroOptions {
  ssr: boolean;
}
