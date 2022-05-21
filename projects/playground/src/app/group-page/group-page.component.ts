import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupPageComponent {
  value1 = '';
  submitted1 = false;
}
