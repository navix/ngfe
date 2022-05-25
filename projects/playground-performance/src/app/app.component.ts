import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

// @todo switch to firstValueFrom after rxjs update to @7

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  cycles = 10000;

  show1_fe = false;
  show1_ng = false;
  value1 = 'abc';

  show2_fe = false;
  show2_ng = false;
  value2 = '';

  @ViewChild('value2_fe') value2_fe?: ElementRef;
  @ViewChild('value2_ng') value2_ng?: ElementRef;

  show3_fe = false;
  show3_ng = false;
  value3 = 'abc';

  constructor(
    private ngZone: NgZone,
  ) {
  }

  async onStable() {
    return this.ngZone.onStable.pipe(take(1)).toPromise();
  }

  async bench1() {
    console.time('bench1_fe');
    for (let i = 0; i < this.cycles; i++) {
      this.show1_fe = true;
      await this.onStable();
      this.show1_fe = false;
      await this.onStable();
    }
    console.timeEnd('bench1_fe');

    console.time('bench1_ng');
    for (let i = 0; i < this.cycles; i++) {
      this.show1_ng = true;
      await this.onStable();
      this.show1_ng = false;
      await this.onStable();
    }
    console.timeEnd('bench1_ng');
  }

  async bench2() {
    console.time('bench2_fe');
    this.show2_fe = true;
    await this.onStable();
    for (let i = 0; i < this.cycles; i++) {
      this.value2 = i + '';
      await this.onStable();
      if (this.value2_fe?.nativeElement.innerText !== this.value2) {
        throw Error('bench2_fe');
      }
    }
    this.show2_fe = false;
    await this.onStable();
    console.timeEnd('bench2_fe');

    console.time('bench2_ng');
    this.show2_ng = true;
    await this.onStable();
    for (let i = 0; i < this.cycles; i++) {
      this.value2 = i + '';
      await this.onStable();
      if (this.value2_ng?.nativeElement.innerText !== this.value2) {
        throw Error('bench2_ng');
      }
    }
    this.show2_ng = false;
    await this.onStable();
    console.timeEnd('bench2_ng');
  }

  async bench3() {
    console.time('bench3_fe');
    for (let i = 0; i < this.cycles; i++) {
      this.show3_fe = true;
      await this.onStable();
      this.show3_fe = false;
      await this.onStable();
    }
    console.timeEnd('bench3_fe');

    console.time('bench3_ng');
    for (let i = 0; i < this.cycles; i++) {
      this.show3_ng = true;
      await this.onStable();
      this.show3_ng = false;
      await this.onStable();
    }
    console.timeEnd('bench3_ng');
  }
}
