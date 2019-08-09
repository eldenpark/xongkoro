import React from 'react';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

const Title = ({
  pathname,
}) => {
  return (
    <div>{pathname}</div>
  );
};

const Header: React.FC<RouteComponentProps> = ({
  history,
  location,
}) => {
  const { pathname } = location;

  const handleClickButton = React.useCallback((route) => () => {
    history.push(route);
  }, []);

  return (
    <div
      style={{
        marginBottom: 100,
      }}
    >
      <Title pathname={pathname} />
      <button
        onClick={handleClickButton('/')}
        type="button"
      >
        ROOT
      </button>
      <button
        onClick={handleClickButton('/pageOne')}
        type="button"
      >
        page one
      </button>
      <button
        onClick={handleClickButton('/pageTwo')}
        type="button"
      >
        page two
      </button>
      <button
        onClick={handleClickButton('/pageThree')}
        type="button"
      >
        page three
      </button>
    </div>
  );
};

export default withRouter(Header);
