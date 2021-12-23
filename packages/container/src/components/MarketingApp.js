import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { registerApplication, start } from 'single-spa';

// import { mount } from 'marketing/MarketingApp';


const MarketingApp = () => {
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
    // });

    // history.listen(onParentNavigate);

    // registerApplication(
    //   'marketing',
    //   () => import('marketing/MarketingApp'),
    //   location => location.pathname.startsWith('/'),
    //   { history },
    // );

    // start();

    // return () => {
    //   unloadApplication('marketing');
    // }
  }, []);

  return (
    <div id="single-spa-application:marketing" ref={ref} />
  );
}

export default MarketingApp;
