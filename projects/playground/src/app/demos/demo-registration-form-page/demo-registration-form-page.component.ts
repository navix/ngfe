import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeValidator } from 'ngfe';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-demo-registration-form-page',
  templateUrl: './demo-registration-form-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoRegistrationFormPageComponent {
  form: {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
  } = {
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  };

  submitted = false;
  submitting = false;

  usernameAvailable: FeValidator<string> = ({modelValue, control}) => {
    if (!modelValue) {
      return undefined;
    }
    return of(modelValue === 'my_name' ? undefined : {usernameAvailable: true}).pipe(
      delay(500),
      tap(() => control.touch()),
    );
  };
}
