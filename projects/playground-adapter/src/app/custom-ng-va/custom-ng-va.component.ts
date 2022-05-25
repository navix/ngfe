import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-ng-va',
  templateUrl: './custom-ng-va.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomNgVaComponent),
      multi: true,
    },
  ],
})
export class CustomNgVaComponent implements OnInit, ControlValueAccessor {
  value = ''
  ch$ = new Subject();

  constructor() {
  }

  ngOnInit(): void {
  }

  writeValue(obj: any) {
    this.value = obj;
  }

  registerOnChange(fn: any) {
    this.ch$.subscribe(fn);
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
  }
}
