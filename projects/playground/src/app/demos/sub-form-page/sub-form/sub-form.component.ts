import { Component, Input } from '@angular/core';
import { FeModule } from 'ngfe';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  standalone: true,
  imports: [FeModule],
})
export class SubFormComponent {
  @Input() subForm!: {
    subField1: string;
    subField2: number;
  };
}
