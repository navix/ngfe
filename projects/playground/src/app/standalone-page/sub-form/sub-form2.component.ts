import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FeControl, FeInput, FeRequiredValidator } from 'ngfe';

@Component({
  selector: 'app-sub-form2',
  templateUrl: './sub-form2.component.html',
  standalone: true,
  imports: [FeControl, FeInput, FeRequiredValidator, CommonModule],
})
export class SubForm2Component {
  model1 = '';
  model2 = '';
}
