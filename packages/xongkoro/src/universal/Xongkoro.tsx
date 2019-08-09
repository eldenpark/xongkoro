const xongkoroConstructorSecret = Symbol('xongkoroConstructorSecret');

export default class Xongkoro {
  options: XongkoroOptions = {
    ssr: false,
  };
  state: XongkoroState;

  constructor({
    constructorSecret,
    options,
    state,
  }) {
    if (constructorSecret !== xongkoroConstructorSecret) {
      console.warn('Isomorphic(): Try not to instantiate this using new keyword. Use createIsomorphic() instead'); // eslint-disable-line
    }

    this.options = options;
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

export const createXongkoro = ({
  preloadedState = {},
  ssr = false,
}: CreateIsomorphicArgs = {}) => {
  const options = {
    ssr,
  };
  return new Xongkoro({
    constructorSecret: xongkoroConstructorSecret,
    options,
    state: preloadedState,
  });
};

export interface XongkoroState {
  [cacheKey: string]: {
    data: null | any;
    error?: any;
    loading: boolean;
  };
}

interface CreateIsomorphicArgs {
  preloadedState?: object;
  ssr?: boolean;
}

interface XongkoroOptions {
  ssr: boolean;
}
