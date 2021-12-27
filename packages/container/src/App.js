import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
import { registerApplication, start } from 'single-spa';

import Header from './components/Header';
import Progress from './components/Progress';

import MarketingLazy from './components/MarketingApp';
import AuthLazy from './components/AuthApp';
import DashboardLazy from './components/DashboardApp';
import OpsApp from './components/OpsApp';

// const MarketingLazy = lazy(() => import('./components/MarketingApp'));
// const AuthLazy = lazy(() => import('./components/AuthApp'));
// const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'con',
});

// Doing this as getting access to history is difficult in component using BrowserRouter.
// Can be done easily in its children.
const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    registerApplication(
      'marketing',
      () => import('marketing/MarketingApp'),
      location => location.pathname === '/' || location.pathname === '/pricing',
      { history },
    );

    registerApplication(
      'auth',
      () => import('auth/AuthApp'),
      location => location.pathname.startsWith('/auth'),
      {
        history,
        onSignIn: () => setIsSignedIn(true),
      },
    );

    registerApplication(
      'dashboard',
      () => import('dashboard/DashboardApp'),
      location => location.pathname.startsWith('/dashboard'),
    );

    registerApplication(
      'opsPortal',
      () => import('opsPortal/OpsApp'),
      location => location.pathname.startsWith('/ops'),
    );

    start();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/ops" component={OpsApp} />
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
}

export default App;
