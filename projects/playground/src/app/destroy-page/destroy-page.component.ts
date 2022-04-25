import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destroy-page',
  templateUrl: './destroy-page.component.html',
  styleUrls: ['./destroy-page.component.scss']
})
export class DestroyPageComponent implements OnInit {
  show = false;

  count = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
