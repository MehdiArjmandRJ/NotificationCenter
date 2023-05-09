import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export class Animations {
  static ToggleModalAnimation = trigger('expandCollapse', [
    state(
      'open',
      style({
        transform: 'translateY(0)',
      })
    ),
    state(
      'close',
      style({
        transform: 'translateY(-73vh)',
      })
    ),
    transition('open <=> close', animate('200ms ease-in-out')),
  ]);

  static ToggleIconAnimation = trigger('expandCollapse', [
    state(
      'open',
      style({
        transform: 'translate(1px,12px)',
        opacity:1
      })
    ),
    state(
      'close',
      style({
        transform: 'translate(1px,50px)',
        opacity:0
      })
    ),
    transition('open <=> close', animate('200ms ease-in-out')),
  ]);

}
