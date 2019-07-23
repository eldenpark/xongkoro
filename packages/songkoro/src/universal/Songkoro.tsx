const songkoroConstructorSecret = Symbol('songkoroConstructorSecret');

export default class Songkoro {
  options: SongkoroOptions = {
    ssr: false,
  };
  state: SongkoroState;

  constructor({
    constructorSecret,
    options,
    state,
  }) {
    if (constructorSecret !== songkoroConstructorSecret) {
      console.warn('Isomorphic(): Try not to instantiate this using new keyword. Use createIsomorphic() instead'); // eslint-disable-line
    }

    this.options = options;
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

export const createSongkoro = ({
  preloadedState = {},
  ssr = false,
}: CreateIsomorphicArgs = {}) => {
  const options = {
    ssr,
  };
  return new Songkoro({
    constructorSecret: songkoroConstructorSecret,
    options,
    state: preloadedState,
  });
};

export interface SongkoroState {
  [cacheKey: string]: {
    data: null | any;
    error?: any;
  };
}

interface CreateIsomorphicArgs {
  preloadedState?: object;
  ssr?: boolean;
}

interface SongkoroOptions {
  ssr: boolean;
}
