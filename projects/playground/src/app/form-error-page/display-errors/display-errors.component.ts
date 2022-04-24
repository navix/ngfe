import { Component, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-display-errors',
  templateUrl: './display-errors.component.html',
  styleUrls: ['./display-errors.component.scss']
})
export class DisplayErrorsComponent implements OnInit {
  @Input() errors!: ValidationErrors;

  constructor() { }

  ngOnInit(): void {
  }

}
