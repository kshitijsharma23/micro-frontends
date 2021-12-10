import { createApp } from 'vue';

import Dashboard from './components/Dashboard';

// Mount function to start up the app.
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// If in development or isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// Running through container
// Export mount function
export { mount };
