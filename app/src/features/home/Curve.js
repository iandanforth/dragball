import {
  CustomPIXIComponent
} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'Curve';
export const behavior = {
  customDisplayObject: () => {
    return new PIXI.Graphics();
  },
  customApplyProps: (instance, oldProps, newProps) => {
    const {
      fromX,
      fromY,
      cpX, 
      cpY, 
      toX, 
      toY
    } = newProps;
    instance.clear();
    instance.lineWidth = 2;
    instance.lineColor = 0x000000;
    instance.moveTo(fromX, fromY);
    instance.quadraticCurveTo(cpX, cpY, toX, toY);
  }
};
export default CustomPIXIComponent(behavior, TYPE);
