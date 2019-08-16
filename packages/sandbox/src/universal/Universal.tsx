import { logger } from 'jege';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '@@universal/components/Header';
import PageDefault from '@@universal/components/PageDefault';
import PageError from '@@universal/components/PageError';
import PageOne from '@@universal/components/PageOne';
import PageThree from '@@universal/components/PageThree';
import PageTwo from '@@universal/components/PageTwo';

const log = logger('[sandbox]');

import('./components/Later')
  .then(() => {
    log('Universal(): <Later /> is loaded');
  })
  .catch((err) => log('Universal(): error loading <Later />: %o', err));

const Universal: React.FC<{}> = () => {
  return (
    <div>
      <Header />
      <div className="page">
        <Switch>
          <Route
            component={PageOne}
            path="/pageOne"
          />
          <Route
            component={PageTwo}
            path="/pageTwo"
          />
          <Route
            component={PageThree}
            path="/pageThree"
          />
          <Route
            component={PageError}
            path="/pageError"
          />
          <Route
            component={PageDefault}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Universal;
