import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-custom-field-page',
    templateUrl: './field-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FieldPageComponent {
  value1 = '';
  value2 = '';
  required2 = true;
}
