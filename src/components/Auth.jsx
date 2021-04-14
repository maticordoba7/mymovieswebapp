import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';

const Login = lazy(() => import('./Login'));
const SignUp = lazy(() => import('./SignUp'));

const NotFound = () => {
  return <Redirect to="/login" />;
};

const Auth = () => {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        {/* <Route exact path="/forgotPassword" component={ForgotPass} /> */}
        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
};

export default Auth;
