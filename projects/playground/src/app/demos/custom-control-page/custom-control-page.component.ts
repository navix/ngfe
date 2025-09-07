import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-custom-control-page',
    templateUrl: './custom-control-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CustomControlPageComponent {
  value1 = '';
}
