// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  TestPage,
  CanvasTestPage
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
    },
    { path: 'test-page',
      name: 'Test page',
      component: TestPage,
      isIndex: true },
    { path: 'canvas-test-page',
      name: 'Canvas Test page',
      component: CanvasTestPage,
    },
  ],
};
