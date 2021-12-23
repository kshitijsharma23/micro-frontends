import { h, createApp } from 'vue';
import singleSpaVue from 'single-spa-vue'

import Dashboard from './components/Dashboard';

// Mount function to start up the app.
const mountp = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// If in development or isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mountp(devRoot);
  }
}

// Running through container
// Export mount function
// export { mount };
const lifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(Dashboard, {
        // name: this.name,
        // mountParcel: this.mountParcel,
        // singleSpa: this.singleSpa,
      });
    },
    // handleInstance: (app) => {
    //   app.use
    // }
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
