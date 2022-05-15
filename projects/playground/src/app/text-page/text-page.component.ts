import { Component } from '@angular/core';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss'],
})
export class TextPageComponent {
  text1 = 'aaa';
  text1touched = false;
  text1disabled = false;
  text2 = '123';
  text3 = '';
  text4 = '';
  text4show = true;

  statech($event: any) {
    console.log('STATE_CH', $event);
  }

  itstouched(touched: boolean) {
    alert('ITS TOCUHJED');
  }
}
