# 🧰 ngfe | Angular Forms Extra

## WIP

Boosted template-driven Angular forms.

It is an alternative for the original `FormsModule`.
If your project have complex and dynamic forms this lib will save you a lot of time and lines of code.



## Features

* **Focused on template-driven approach.**
* **Single source of truth for your forms - templates.**
* **Less abstractions, ultimate control.**
* **More freedom for developers.**
* Nothing exceptionally new for Angular developers.
* Simple custom value accessors creation.
* Simple custom validators creation.
* Single interface for sync and async validators.
* Direct way to control model in value accessors and validators.
* Stricter data type checks in controls.
* Explicit native controls binding (input, select).
* Built-in debounce.
* Nice submit directive which touches all fields and checks validity.
* Handy ways to display validation errors.
* Allows to create wrapper components without additional value accessors.
* Does not conflict with the native `FormsModule`.
* Adapters mechanism to convert value on the fly.
* Native date input value transform to/from Date.
* Directive for easy value init/cleanup.
* `OnPush` mode support.
* Almost all props have reactive alternative (e.g `.errors`+`.errors$`).
* SSR support.
* Zero deps, only Angular and RxJS.
* Reduced bundle size without @angular/forms (~20KB parsed size in prod mode).
* Optional integration with Angular `Validator` and `ValueAccessor` interfaces.

### Caveats

* 3rd party lib.
* Not battle-tested enough yet.
* Sometimes too much freedom for developers.



## Terms

* **Form** - tool for displaying and manipulating data in Browser.
* **Model** - variable that represents a field of data.
* **Input** - HTML element (or custom component) allows you to display and change some state.
* **Control** - a bridge between **Model** and **Input**.
* **Value accessor** - directive or component that connects **Input** to the **Control**.
* **Adapter** - functions that convert state when it flows between **Model** and **Input**. 
* **Validator** - function to check **Model** or **Input** state to meet some conditions.
* **Error** - returner by **Validator** if state is invalid. 
* **Validity** - represents current state of control: 
  * `pending` - one or more async **Validators** are running,
  * `invalid` - one or more **Validators** return errors,
  * `valid` - all **Validators** return no errors.
* **Touched** - **Input** had interaction with user (was focused in default **Value accessors**).
* **Dirty** - **Input** was changed by user.
* **Group** - set of **Controls**, **Form** is also a **Group**.



## Installation

```
$ npm i ngfe
```

### Requirements

* Angular 12.0+
* RxJs 6.6+



## Usage

Import main module:

```
imports: [
  FeModule,
  ...
]
```



## Binding

On the surface `[(feControl)]` works exactly like `[(ngModel)]`.

```
<input [(feControl)]="field" feInput>
```

## Built-in controls

All value accessors for native elements have explicit binding. 
It is one additional keyword, but this solution has long-term compatibility benefits.

### feInput

Use `feInput` to enable model binding to any `input` or `textarea` element.

```
<input [(feControl)]="field" feInput>
<input [(feControl)]="field" feInput type="checkbox">
<input [(feControl)]="field" feInput type="radio" value="1">
<input [(feControl)]="field" feInput type="date" value="1">
<textarea [(feControl)]="field" feInput>
```

TODO: STACKBLITZ DEMO

#### file

There is built-in function `readFiles` to read file data from file inputs:

```
<input (feControlChange)="loadFiles($event)" feInput multiple type="file">
```

```
import { readFiles } from 'ngfe';
...
loadFiles(files?: FileList) {
  readFiles(files || []).subscribe(loadedFiles => {
    ...
    this.cdr.markForCheck();
  });
}
```

### feSelect

You have to use `feSelect` and `feOption` for proper work of `select` element.

_Any type of value available to bind to `option[value]`._

```
<select [(feControl)]="field" feSelect>
  <option feOption value="1">ONE</option>
  <option feOption value="2">TWO</option>
</select>
```

TODO: STACKBLITZ DEMO



## Adapters

Controls store 2 values at the same moment: `modelValue` and `inputValue`.  When `modelValue` changes this value also transferred to `inputValue` and vice-versa.  You could define two functions that will change the values during this transition. 

At the first place this feature is needed to keep proper types for values in models.

For example numbers:

```
field: number = 100;
```

```
<input [(feControl)]="field" feInput adapter="numberToString">
```

Or native Date:

```
field = new Date();
```

```
<input [(feControl)]="field" feInput type="date" adapter="dateToDateString">
```

TODO: STACKBLITZ DEMO

### Built-in adapters

* `numberToString` - keeps number in model and string in input.
* `dateToDateString`
* `dateToDateLocalString`
* `deepCopy` - useful for objects and arrays.

### Custom adapter

Use `FeAdapter` interface to declare modifying functions:

```
const booleanToString: FeAdapter<boolean, string> = {
  name: 'booleanToString',
  fromModel: modelValue => modelValue ? '1' : '0',
  fromInput: inputValue => inputValue === '1' ? true : false,
};
```

Pass it to `[adapter]` input:

```
<input [(feControl)]="field" feInput [adapter]="booleanToString">
```

TODO: STACKBLITZ DEMO



## Validation

Work very similar to the default Angular validation.

```
<input #control [(feControl)]="field" feInput required>
<span *ngIf="control.errors as errors>
  <span *ngIf="errors.required">Required</span>
</span>
```

### Display Errors

Also, there is `.visibleErrors` that passed errors object when control is touched. 

```
<input #control="feModel" [(feControl)]="field" required>
<span *ngIf="control.visibleErrors as errors>
  <span *ngIf="errors.required">Required</span>
</span>
```

TODO: STACKBLITZ DEMO

### Built-in validators

* `required`
* `email`
* `equal`, `notEqual`
* `minlength`, `maxlength` - works only for strings and arrays in `modelValue`.
* `min`, `max` - works only for numbers in `modelValue`.
* `pattern`
* `isNumber` - check that `inputValue` represents a number.

### Custom validator

#### As function

Use `FeValidator` interface to implement a validator.

```
isBoom: FeValidator<string> = ({modelValue}) => {
  return !modelValue || modelValue === 'BOOM'
    ? undefined
    : {boom: true};
};
```

Pass to `[extraValidators]` input:

```
<input [(feControl)]="field" feInput [extraValidators]="[isBoom]">
```

TODO: STACKBLITZ DEMO

#### As directive

Or, create a validator directive:

```
@Directive({
  selector: 'isBoom'
})
export class IsBoomValidatorDirective implements OnChanges {
  @Input isBoom!: string | boolean;

  validator: FeValidator<string> = ({modelValue}) => {
    return !this.isEnabled || !modelValue || modelValue === 'BOOM'
      ? undefined
      : {boom: true};
  };
  
  constructor(
    @Self() private control: FeControl,
  ) {
    this.control.updateValidators({add: [this.validator]});
  }

  ngOnChanges() {
    this.control.updateValidity();
  }
  
  get isEnabled() {
    return this._isEnabled$.value;;
  }
}
```

```
<input [(feControl)]="field" feInput isBoom>
```

TODO: STACKBLITZ DEMO


## Debounce 

Pass value from input to model with debounce time:

```
<input [(feControl)]="field" [debounce]="400" feInput>
```

TODO: STACKBLITZ DEMO



## Submit

Directive that marks all form controls as touched, when user submits the form.

Also emits event only if form has `valid` state.

### On button

```
<form>
  ...
  <button type="submit" (feSubmit)="doStuff()">Submit</button>
</form>
```

TODO: STACKBLITZ DEMO

### On form

```
<form (feSubmit)="doStuff()">
  ...
  <button type="submit">Submit</button>
</form>
```



## Init/cleanup values

On dynamic forms we need to setup values when some fields became visible, and remove such values on field hiding.

Directive `feEnsure` will set `undefined` to binded model on destroy.

```
<div *ngIf="showField" [(feEnsure)]="field">
  <input [(feControl)]="field" feInput>
</div>
```

Also, you could define `[default]` value that will be set to the model when it is `undefined`.

```
<div *ngIf="showField" [(feEnsure)]="field" default="BOOM">
  <input [(feControl)]="field" feInput>
</div>
```

TODO: STACKBLITZ DEMO

## Custom controls

Unlike default Angular approach, you do not need to implement `ValueAccessor` interface.

Just inject `FeControl` and use it methods.

```
@Component({
  selector: 'app-custom-control',
  ...
})
export class AppCustomControlComponent {
  constructor(private control: FeControl) {
    this.control.toInputValue$.subscribe(inputValue => {
      ...
    });
    this.control.disabled$.subscribe(disabled => {
      ...
    });
  }
  
  ...
  this.control.input(value);
  ...
  this.control.touch();
}
```

TODO: STACKBLITZ DEMO

You can subscribe to any stream of the control and define any state.



## @angular/forms adapter

Install package:

```
$ npm i ngfe-ng-adapter
```

Import module:

```
imports: [
  FeNgAdapterModule,
]
```

After that you can use `ValueAccessors` and `Validator` with `[(feControl)]`.

> [StackBlitz Demo](https://stackblitz.com/edit/ngfe-ng-adapter?file=src%2Fapp%2Fapp.component.html)



## Additional Examples

* TODO: How to create form with dynamic fields.
* TODO: How to reduce errors boilerplate using pipe.
* TODO: How to reduce errors boilerplate using component.
* TODO: How to create a field component.
* TODO: How to scroll to first invalid field.



## TODO

* Docs, stackblitz demos
* Playwright helpers
* CI test
