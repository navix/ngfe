import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPageComponent {
  value1 = '';
  submitted1 = false;
  value2 = '';
  show2 = true;
  required2 = true;
}
