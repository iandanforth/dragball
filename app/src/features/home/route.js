// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  TestPage,
  CanvasTestPage,
  Scene,
  Camera,
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
    { path: 'scene', name: 'Scene', component: Scene },
    { path: 'camera', name: 'Camera', component: Camera },
  ],
};
