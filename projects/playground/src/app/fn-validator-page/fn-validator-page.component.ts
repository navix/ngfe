import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-fn-validator-page',
  templateUrl: './fn-validator-page.component.html',
  styleUrls: ['./fn-validator-page.component.scss']
})
export class FnValidatorPageComponent implements OnInit {
  v1 = 'playground';

  v3 = 'pg';

  v4_1 = '1';
  v4_2 = '2';

  v5_1 = '11';
  v5_2 = '22';

  v6_1 = '111';
  v6_2 = '222';

  v7_1 = '5';
  v7_2 = '2';
  v7_3 = '2';

  v8_1 = '1111';
  v8_2 = '2222';

  v9_1 = '5';
  v9_2 = '2';
  v9_3 = '2';


  constructor() { }

  ngOnInit(): void {
  }


  fv2() {
    return {
      err2: true,
    };
  }

  fv3(control: AbstractControl) {
    if (control.value === 'pg') {
      return {
        err3: true,
      };
    }
    return null;
  }

  fv4 = (control: AbstractControl) => {
    if (control.value !== this.v4_2) {
      return {
        err4: true,
      };
    }
    return null;
  };

  fv5(control: AbstractControl) {
    if (control.value !== this.v5_2) {
      return {
        err5: true,
      };
    }
    return null;
  }

  fv6(control: AbstractControl) {
    if (control.value !== this.v6_2) {
      return {
        err6: true,
      };
    }
    return null;
  }

  fv7(control: AbstractControl) {
    if (+control.value !== +this.v7_2 + +this.v7_3) {
      return {
        err7: true,
      };
    }
    return null;
  }

  fv8(control: AbstractControl) {
    if (control.value !== this.v8_2) {
      return {
        err8: true,
      };
    }
    return null;
  }

  fv9(control: AbstractControl) {
    if (control.value !== this.v9_3) {
      return {
        err9: true,
      };
    }
    return null;
  }
}
