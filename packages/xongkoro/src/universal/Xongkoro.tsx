const xongkoroConstructorSecret = Symbol('xongkoroConstructorSecret');

export default class Xongkoro<C> {
  context: C;
  options: XongkoroOptions = {
    ssr: false,
  };
  state: XongkoroState;

  constructor({
    constructorSecret,
    context,
    options,
    state,
  }) {
    if (constructorSecret !== xongkoroConstructorSecret) {
      console.warn('Isomorphic(): Try not to instantiate this using new keyword. Use createIsomorphic() instead'); // eslint-disable-line
    }

    this.context = context || {};
    this.options = options;
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

export const createXongkoro = <C extends object>({
  context,
  preloadedState = {},
  ssr = false,
}: CreateXongkoroArgs<C> = {}) => {
  const options = {
    ssr,
  };
  return new Xongkoro<C>({
    constructorSecret: xongkoroConstructorSecret,
    context,
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

interface CreateXongkoroArgs<C> {
  context?: C;
  preloadedState?: object;
  ssr?: boolean;
}

interface XongkoroOptions {
  ssr: boolean;
}
