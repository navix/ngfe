import {JsonPipe} from '@angular/common';
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-value-view',
  imports: [JsonPipe],
  templateUrl: './value-view.html',
  styleUrl: './value-view.scss',
})
export class ValueView {
  name = input.required<string>();
  value = input.required<any>();
}
