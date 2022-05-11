import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss']
})
export class SelectPageComponent implements OnInit {
  model1 = '2';
  model2?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
