import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-select-control-page',
  templateUrl: './select-control-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlPageComponent {
  value1 = '2';
  value2?: string;
  value3?: string;
  value4 = ['1', '2'];
  value5 = [10, 30];
  value6 = 100;
  value7objects = [{field: 123}, {field: 456}, {field: 789}];
  value7 = this.value7objects[1];
  value8 = undefined;
  value9 = '1';
  value10 = '1';
  disabled10 = false;
}
