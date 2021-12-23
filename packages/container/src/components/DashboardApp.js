import React, { useRef, useEffect } from 'react';
import { registerApplication, start } from 'single-spa';

// import { mount } from 'dashboard/DashboardApp';

const DashboardApp = () => {
  const ref = useRef(null);

  useEffect(() => {
    // mount(ref.current);

    registerApplication(
      'dashboard',
      () => import('dashboard/DashboardApp'),
      location => location.pathname.startsWith('/dashboard'),
    );

    start();
  }, []);

  return (
    <div id="single-spa-application:dashboard" ref={ref} />
  );
}

export default DashboardApp;
