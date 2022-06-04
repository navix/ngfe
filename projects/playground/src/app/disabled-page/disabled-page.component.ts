import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-disabled-page',
  templateUrl: './disabled-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPageComponent {
  value1 = '';
  value2 = '';
  disabled2 = false;
  value3 = '';
  disabled3 = false;
  value4 = '';
}
