# 🧰 ngfe | Angular Forms Extra

## WIP

Boosted template-driven Angular forms.

It is an alternative for the Angular `FormsModule`.
If your project have complex and dynamic forms this lib will save you a lot of time and lines of code.

## Features

* **Focused on template-driven approach.**
* **Less abstractions, ultimate control.**
* **More freedom for developers.**
* Nothing exceptionally new for Angular developers.
* Less boilerplate to write:
  * Simple custom value accessors creation.
  * Simple custom validators creation.
  * Single interface for sync and async validators.
  * No `ControlContainer` providing for sub-forms.
  * No required `name` binding.
  * Directive for easy value init/cleanup.
  * Handy way to display validation errors only on touched fields.
* Function validators binding.
* Built-in debounce.
* Adapters for two-way value conversion.
* Optional state binding in templates (e.g `[(touched)]`).
* Almost all states have reactive alternative (e.g `.errors`+`.errors$`).
* Submit directive which touches all fields and checks validity.
* Stricter types in controls.
* `OnPush` mode support.
* SSR support.
* Zero deps, only Angular and RxJS.
* Reduced bundle size without @angular/forms (~20KB parsed size in prod mode).
* Does not conflict with the Angular `FormsModule`.
* Optional integration with Angular `Validator` and `ValueAccessor` interfaces.

### Caveats

* 3rd party lib.
* Not battle-tested enough yet.
* Sometimes too much freedom for developers.

### Why template forms

* **Single source of truth for your forms - templates.**
* Almost all logic written in declarative manner.
* Less code to write.
* https://www.youtube.com/watch?v=L7rGogdfe2Q


## Terms

* **Form** - tool for displaying and manipulating data in Browser.
* **Model** - variable that represents a field of data.
* **Input** - HTML element (or custom component) allows you to display and change some state.
* **Control** - a bridge between **Model** and **Input**.
* **Value accessor** - directive or component that connects **Input** to the **Control**.
* **Adapter** - functions that convert state when it flows between **Model** and **Input**. 
* **Validator** - function to check **Model** or **Input** values to meet some conditions.
* **Error** - returner by **Validator** if value is invalid. 
* **Validity** - represents current validation state: 
  * `pending` - one or more async **Validators** are running,
  * `invalid` - one or more **Validators** returned errors,
  * `valid` - all **Validators** returned no errors.
* **Touched** - **Input** had interaction with user (was focused for built-in **Value accessors**).
* **Dirty** - **Input** was changed by user.



## Installation

```
$ npm i ngfe
```

### Requirements

* Angular 12.0+
* RxJs 6.6+



## Usage

Import the module:

```
import { FeModule } from 'ngfe';
...
imports: [
  FeModule,
  ...
]
```



## Binding

On the surface `[(feControl)]` works exactly like `[(ngModel)]`.

```
<input [(feControl)]="field">
```

## Built-in controls

### Input

```
<input [(feControl)]="field">
<input [(feControl)]="field2" type="checkbox">
<input [(feControl)]="field3" type="radio" value="1">
<input [(feControl)]="field4" type="date" value="1">
...
```

TODO: STACKBLITZ DEMO

#### File helpers

There is a built-in function `readFiles` to read file data from file inputs:

```
<input (feControlChange)="loadFiles($event)" type="file">
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

### Textarea

```
<textarea [(feControl)]="field"></textarea>
```

### Select

```
<select [(feControl)]="field">
  <option value="1">ONE</option>
  <option value="2">TWO</option>
</select>
```

_Any type of value available to bind to `option[value]`._

TODO: STACKBLITZ DEMO



## Adapters

Controls store 2 values at the same moment: `modelValue` and `inputValue`. When `modelValue` changes its' value also transferred to `inputValue` and vice-versa.  You could define functions that will change the values during this transition. 

At the first place this feature is needed to keep proper types for values in models.

For example numbers:

```
field: number = 100;
```

```
<input [(feControl)]="field" adapter="numberToString">
```

Or native Date:

```
field = new Date();
```

```
<input [(feControl)]="field" type="date" adapter="dateToDateString">
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
  fromModel: modelValue => modelValue ? 'true' : 'false',
  fromInput: inputValue => inputValue === 'true' ? true : false,
};
```

Pass it to `[adapter]` input:

```
<input [(feControl)]="field" [adapter]="booleanToString">
```

TODO: STACKBLITZ DEMO



## Validation

Work very similar to the default Angular validation.

```
<input #control [(feControl)]="field" required>
<span *ngIf="control.errors as errors>
  <span *ngIf="errors.required">Required</span>
</span>
```

### Display Errors

Also, there is `.visibleErrors` that passed errors object when control is touched. 

```
<input #control="feControl" [(feControl)]="field" required>
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

#### As a function

Use `FeValidator` interface to implement a validator. Return errors object or `undefined` if value is valid.

```
// Invalid if value is not empty and have value "BOOM".
notBoom: FeValidator<string> = ({modelValue}) => {
  return !modelValue || modelValue !== 'BOOM'
    ? undefined
    : {notBoom: true};
};
```

Pass it to `[extraValidators]` input:

```
<input #control="feControl" [(feControl)]="field" [extraValidators]="[notBoom]">
<span *ngIf="control.errors?.notBoom">Value should not be "BOOM"</span>
```

TODO: STACKBLITZ DEMO

#### As a directive

Or, create a validator directive:

```
@Directive({
  selector: 'notBoom'
})
export class notBoomValidatorDirective implements OnChanges {
  constructor(
    @Self() private control: FeControl<string>,
  ) {
    this.control.addValidator(({modelValue}) => {
      return !modelValue || modelValue !== 'BOOM'
        ? undefined
        : {notBoom: true};
    });
  }
}
```

```
<input [(feControl)]="field" notBoom>
```

TODO: STACKBLITZ DEMO

### Async validators

TODO



## Debounce 

Pass value from input to model with debounce time:

```
<input [(feControl)]="field" [debounce]="400">
```

TODO: STACKBLITZ DEMO



## Submit

Directive that marks all form controls as touched, when user submits the form.

Also emits event only if form has `valid` state.

### On button

```
<form>
  ...
  <button (feSubmit)="doStuff()">Submit</button>
</form>
```

TODO: STACKBLITZ DEMO

### On form

```
<form (feSubmit)="doStuff()">
  ...
</form>
```



## Init/cleanup values

On dynamic forms we need to setup values when some fields became visible, and remove such values on field hiding.

Directive `feEnsure` will set `undefined` to binded model on destroy.

```
<div *ngIf="showField" [(feEnsure)]="field">
  <input [(feControl)]="field">
</div>
```

Also, you could define `[default]` value that will be set to the model when it is `undefined`.

```
<div *ngIf="showField" [(feEnsure)]="field" default="BOOM">
  <input [(feControl)]="field">
</div>
```

TODO: STACKBLITZ DEMO

## Custom Value Accessor

Unlike default Angular approach, you do not need to implement `ValueAccessor` interface.

Just inject `FeControl` and use it's props and methods.

`.toInputValue$` - emits all changes except last passed from input itself.

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



## Utils

* `coerceToBoolean` - coerce an input value (typically a string) to a boolean.
* `deepCopy` - deep copy objects and arrays.
* `diff` - compare objects and arrays.
* `readFile` - read file data from File.



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

* Implicit VAs binding to write less code?
* Docs, stackblitz demos
* Playwright helpers
* CI test
