import {
  animate,
  state,
  style,
  AUTO_STYLE,
  AnimationTriggerMetadata,
  transition,
  trigger,
} from '@angular/animations';

import { IAnimationOptions } from './interface.animation';
import { animateIncludingChildren } from './animate-including-children.animation';
const DEFAULT_DURATION = 100;

export function collapseHorizontallyAnimation(
  options?: IAnimationOptions
): AnimationTriggerMetadata {
  return trigger((options && options.anchor) || 'collapseHorizontally', [
    state(
      '3',
      style({
        opacity: 0,
        transform: 'translate(0.1rem, -4.1rem) scale(0.5,0.3)',
        easing: 'ease',
        width: '0px',
        height: '0px',
        overflow: 'hidden',
        filter: 'blur(10px)',
      })
    ),
    state(
      '2',
      style({
        width: '30px',
        height: '15.67px',
        overflow: 'hidden',
      })
    ),
    state(
      '1',
      style({
        width: '30px',
        height: '15.67px',
        overflow: 'hidden',
      })
    ),
    state(
      '0',
      style({
        width: AUTO_STYLE,
        visibility: AUTO_STYLE,
        height: AUTO_STYLE,
        overflow: 'hidden',
      })
    ),
    transition('0 => 1', [...animateIncludingChildren('ease-out', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
    transition('1 => 0', [...animateIncludingChildren('ease-out', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
    transition('1 => 2', [...animateIncludingChildren('ease-in', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
    transition('2 => 1', [...animateIncludingChildren('ease-out', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
    transition('3 => 2', [...animateIncludingChildren('ease-in', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
    transition('2 => 3', [...animateIncludingChildren('ease-out', options)], {
      params: {
        delay: (options && options.delay) || 0,
        duration: (options && options.duration) || DEFAULT_DURATION,
      },
    }),
  ]);
}


