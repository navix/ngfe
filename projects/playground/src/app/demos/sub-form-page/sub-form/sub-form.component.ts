import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
})
export class SubFormComponent {
  @Input() subForm!: {
    subField1: string;
    subField2: number;
  };
}
