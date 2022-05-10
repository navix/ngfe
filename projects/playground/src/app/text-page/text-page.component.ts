import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent implements OnInit {
  text1 = '';
  text2 = '123';

  constructor() { }

  ngOnInit(): void {
  }

}
