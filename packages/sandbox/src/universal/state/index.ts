import { createStore as _createStore } from 'redux';

import { logger } from 'jege';

const log = logger('[sandbox]');

const initialState = {
  counter: 0,
  otherInformation: '',
};

export function createStore({
  preloadedState,
}: CreateStoreArgs = {}) {
  const store = _createStore(reducer, preloadedState);
  return store;
}

function reducer(state = initialState, action) {
  log('reducer(): action: %j, prevState: %j', action, state);

  const { payload = {} } = action;

  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1,
        otherInformation: payload.otherInformation,
      };
    default:
      return state;
  }
}

interface CreateStoreArgs {
  preloadedState?;
}
