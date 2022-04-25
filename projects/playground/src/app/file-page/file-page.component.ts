import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.scss']
})
export class FilePageComponent implements OnInit {
  file?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
