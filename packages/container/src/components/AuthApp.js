import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { registerApplication, start } from 'single-spa';

// import { mount } from 'auth/AuthApp';

const AuthApp = ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // const { onParentNavigate } = mount(ref.current, {
    //   initialPath: history.location.pathname,
    //   onNavigate: ({ pathname: nextPathname }) => {
    //     const { pathname } = history.location;

    //     if (pathname !== nextPathname) {
    //       history.push(nextPathname);
    //     }
    //   },
    //   onSignIn,
    // });

    // history.listen(onParentNavigate);

    registerApplication(
      'auth',
      () => import('auth/AuthApp'),
      location => location.pathname.startsWith('/auth'),
      { history, onSignIn },
    );

    start();
  }, []);

  return (
    <div id="single-spa-application:auth" ref={ref} />
  );
}

export default AuthApp;
