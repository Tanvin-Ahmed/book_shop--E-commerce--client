import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userInfoContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const {loggedInUser} = useContext(userInfoContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
      loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;