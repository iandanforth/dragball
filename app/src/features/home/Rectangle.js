import {
  CustomPIXIComponent
} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const TYPE = 'Rectangle';
export const behavior = {
  customDisplayObject: () => {
    return new PIXI.Graphics();
  },
  customApplyProps: (instance, oldProps, newProps) => {
    const {
      fill,
      x,
      y,
      width,
      height
    } = newProps;
    instance.clear();
    instance.beginFill(fill);
    instance.drawRect(x, y, width, height);
    instance.endFill();
    // const blurFilter = new PIXI.filters.BlurFilter();
    // instance.filters = [blurFilter];
    // blurFilter.blurX = 20;
    // blurFilter.blurY = 17;
  }
};
export default CustomPIXIComponent(behavior, TYPE);