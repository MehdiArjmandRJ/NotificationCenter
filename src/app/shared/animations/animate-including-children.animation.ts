import { animate, animateChild, group, query } from '@angular/animations';

import { IAnimationOptions } from './interface.animation';

export function animateIncludingChildren(
  easing:
    | 'ease-in'
    | 'linear'
    | 'ease-out'
    | 'ease-in-out'
    | 'step-end'
    | 'step-start',
  options?: IAnimationOptions
) {
  return [
    ...(options && options.animateChildren === 'before'
      ? [query('@*', animateChild(), { optional: true })]
      : []),
    group([
      group([
        query('@*', animateChild(), { optional: true }),
        animate('{{duration}}' + 'ms ' + '{{delay}}' + 'ms ' + easing),
      ]),
      ...(!options ||
      !options.animateChildren ||
      options.animateChildren === 'together'
        ? [query('@*', animateChild(), { optional: true })]
        : []),
    ]),
    ...(options && options.animateChildren === 'after'
      ? [query('@*', animateChild(), { optional: true })]
      : []),
  ];
}
