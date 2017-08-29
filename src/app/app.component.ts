import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  animations: [
      trigger('slideInOut', [
          state('in', style({
              transform: 'translate3d(0, 0, 0)'
          })),
          state('out', style({
              transform: 'translate3d(100%, 0, 0)'
          })),
          transition('in => out', animate('400ms ease-in-out')),
          transition('out => in', animate('400ms ease-in-out'))
      ]),

      trigger('slideTable', [
          state('in', style({
              //transform: 'translate3d(50%, 0, 0)'
              width: '75%'
          })),
          state('out', style({
             // transform: 'translate3d(100%, 0, 0)'
              width: '100%'
          })),
          transition('in => out', animate('400ms ease-in-out')),
          transition('out => in', animate('400ms ease-in-out'))
      ]),
  ]

})
export class AppComponent {
    menuState: string = 'in';

    toggleMenu() {
        // 1-line if statement that toggles the value:
        this.menuState = this.menuState === 'out' ? 'in' : 'out';
    }

}
