import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-custom-control-page',
  templateUrl: './custom-control-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomControlPageComponent {
  value1 = '';
}
