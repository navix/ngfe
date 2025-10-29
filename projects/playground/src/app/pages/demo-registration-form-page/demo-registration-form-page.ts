import {JsonPipe} from '@angular/common';
import {Component, computed, signal} from '@angular/core';
import {of} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {FeModule, FeValidator} from '../../../../../ngfe/src/public-api';

class RegistrationFormState {
  email = signal('');
  username = signal('');
  password = signal('');
  passwordConfirm = signal('');

  formData = computed(() => ({
    email: this.email(),
    username: this.username(),
    password: this.password(),
  }));
}

@Component({
  selector: 'app-demo-registration-form-page',
  imports: [FeModule, JsonPipe],
  templateUrl: './demo-registration-form-page.html',
})
export class DemoRegistrationFormPage {
  formState = signal(new RegistrationFormState());

  submitted = signal(false);
  submitting = signal(false);

  usernameAvailable: FeValidator<string> = (value, control) => {
    if (!value) {
      return undefined;
    }
    return of(value === 'my_name' ? undefined : {usernameAvailable: true}).pipe(
      delay(500),
      tap(() => control.touch()),
    );
  };
}
