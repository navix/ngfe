import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeControl } from 'ngfe';

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomControlComponent {
  value?: string = '';

  constructor(
    public control: FeControl<string, string>,
  ) {
    this.control.toInputValue$.subscribe(value => {
      this.value = value;
    });
  }

  input(value: string | undefined) {
    this.control.input(value || '');
  }
}
