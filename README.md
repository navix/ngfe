[![npm version](https://badge.fury.io/js/ngfe.svg)](https://www.npmjs.com/package/ngfe)
![CI](https://github.com/navix/ngfe/actions/workflows/ci.yml/badge.svg)

# 🧰 ngfe | Angular Forms Extra

Boosted template-driven Angular forms.

It is an alternative for the Angular `FormsModule`.
If your project have complex and dynamic forms this lib will save you a lot of time and lines of code.

> [StackBlitz showcase](https://stackblitz.com/edit/ngfe-showcase?file=src/app/app.component.html)

## Features

* **Focused on template-driven approach.**
* **Less abstractions, ultimate control.**
* **More freedom for developers.**
* Nothing exceptionally new for Angular people.
* Less boilerplate to write:
  * Simple custom value accessors creation.
  * Simple custom validators creation.
  * Single interface for sync and async validators.
  * No `ControlContainer` providing for sub-forms.
  * No required `name` binding.
  * Directive for easy value init/cleanup on dynamic forms.
  * Handy way to display validation errors only on touched fields.
* Function validators binding.
* Built-in debounce.
* Adapters for two-way value conversion.
* Two-way state binding in templates (e.g `[(touched)]`).
* Almost all states have reactive alternative (e.g `.errors`+`.errors$`).
* Submit directive which touches all fields and checks validity.
* Stricter types in controls.
* `OnPush` mode support.
* SSR support.
* Zero deps, only Angular and RxJS.
* Reduced bundle size without @angular/forms (~20KB parsed size in prod mode).
* Does not conflict with the Angular `FormsModule`.
* Optional integration with Angular `Validator` and `ValueAccessor` interfaces.
* Works with Angular Material.

### Caveats

* 3rd party lib.
* Not battle-tested enough yet.
* Sometimes too much freedom for developers.

### Why template forms

* **Single source of truth for your forms - templates.**
* Almost all logic written in a declarative manner.
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

* `ngfe@13` for Angular 12 and 13. RxJS 7 needed.



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

Also, all directives are standalone and can be imported separately:

```
imports: [FeControl, FeInput, FeRequiredValidator]
```



## Binding

On the surface [`[(feControl)]`](./projects/ngfe/src/lib/core/fe-control.ts) works exactly like `[(ngModel)]`.

```
<input [(feControl)]="field">
```

## Built-in value accessors

### [Input](./projects/ngfe/src/lib/value-accessors/fe-input.ts)

```
<input [(feControl)]="field">
<input [(feControl)]="field2" type="checkbox">
<input [(feControl)]="field3" type="radio" value="1">
<input [(feControl)]="field4" type="date" value="1">
...
```

> [[StackBlitz] ngfe inputs demo](https://stackblitz.com/edit/ngfe-inputs-demo?file=src/app/app.component.html)

#### File helpers

There is a built-in function [`readFiles`](./projects/ngfe/src/lib/util/read-files.ts) to read file data from file inputs:

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

#### Touch on change

You can control how touched state is set with `touchOnChange` and `touchOnBlur` parameters.

By default `touchOnBlur` is `true` and `touchOnChange` is `false`. 

```
<input [(feControl)]="field1" touchOnChange>
<input [(feControl)]="field2" [touchOnBlur]="false">
```

### [Textarea](./projects/ngfe/src/lib/value-accessors/fe-input.ts)

```
<textarea [(feControl)]="field"></textarea>
```

### [Select](./projects/ngfe/src/lib/value-accessors/fe-select.ts)

```
<select [(feControl)]="field">
  <option value="1">ONE</option>
  <option value="2">TWO</option>
</select>
```

Any type of value available to bind to `option[value]`.

```
field: number;
```

```
<select [(feControl)]="field">
  <option [value]="1">ONE</option>
  <option [value]="2">TWO</option>
</select>
```



## [Adapters](./projects/ngfe/src/lib/core/adapters.ts)

Controls store 2 values at the same moment: `modelValue` and `inputValue`. When `modelValue` changes its' value also transferred to `inputValue` and vice-versa.  You could define functions that change the values during this transition. 

At the first place this feature is needed to keep proper types for values in models.

For example:

```
field: number = 100;
```

```
<input [(feControl)]="field" adapter="numberToString">
```

_Note: value accessor for `input[type="number"]` parses input and returns number without the adapter._

Or native Date:

```
field = new Date();
```

```
<input [(feControl)]="field" type="date" adapter="dateToDateString">
```

_By default in browsers date input uses `string`._

### [Built-in adapters](./projects/ngfe/src/lib/core/adapters.ts)

* `numberToString` - keeps number in model and string in input.
* `dateToDateString` - useful for inputs with type `date`.
* `dateToDateLocalString` - useful for inputs with type `date-local`.
* `deepCopy` - useful for objects and arrays.

### Custom adapter

Use [`FeAdapter`](./projects/ngfe/src/lib/core/adapters.ts) interface to declare modifying functions:

```
booleanToString: FeAdapter<boolean, string> = {
  fromModel: modelValue => modelValue === true ? '1' : modelValue === false ? '0' : '',
  fromInput: inputValue => inputValue === '1' ? true : inputValue === '0' ? false : undefined,
};
```

Pass it to `[adapter]` input:

```
<input [(feControl)]="field" [adapter]="booleanToString">
```

> [[StackBlitz] ngfe custom adapter demo](https://stackblitz.com/edit/ngfe-custom-adapter-demo?file=src/app/app.component.ts)



## [Validation](./projects/ngfe/src/lib/core/validation.ts)

Work very similar to the default Angular validation.

```
<input #control="feControl" [(feControl)]="field" required>
<div *ngIf="control.errors as errors">
  <span *ngIf="errors.required">Required</span>
</div>
```

> [[StackBlitz] ngfe validation demo](https://stackblitz.com/edit/ngfe-validation-demo?file=src/app/app.component.html)

### Visible Errors

Also, there is `.visibleErrors` that passes errors object when control becomes touched.

```
<input #control="feControl" [(feControl)]="field" required>
<div *ngIf="control.visibleErrors as errors">
  <span *ngIf="errors.required">Field is required</span>
</div>
```

### [Built-in validators](./projects/ngfe/src/lib/validators)

* `required`
* `email`
* `equal`, `notEqual`
* `minlength`, `maxlength` - works only for strings and arrays in `modelValue`.
* `min`, `max` - works only for numbers in `modelValue`.
* `pattern`
* `isNumber` - checks that `inputValue` represents a number or a string that can be parsed to number.

### Custom validator

#### As a function

Use [`FeValidator`](./projects/ngfe/src/lib/core/validation.ts) interface to implement a validator. Return errors object [`FeError`](./projects/ngfe/src/lib/core/validation.ts) or `undefined` if value is valid.

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

#### As a directive

Or, create a validator directive:

```
@Directive({
  selector: '[feControl][notBoom]'
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

> [[StackBlitz] ngfe validation demo](https://stackblitz.com/edit/ngfe-validation-demo?file=src/app/not-boom-validator.directive.ts)

### Async validators

Just return from validation function `Observable` or `Promise` with [`FeValidatorResult`](./projects/ngfe/src/lib/core/validation.ts).



## Debounce 

Define debounce time for values from a value accessor:b

```
<input [(feControl)]="field" [debounce]="400">
```



## [Submit](./projects/ngfe/src/lib/core/fe-submit.ts)

Directive that marks all form controls as touched, when user submits the form.

Also emits event only if form has `valid` state.

### On button

```
<form>
  ...
  <button (feSubmit)="doStuff()">Submit</button>
</form>
```

### On form

```
<form (feSubmit)="doStuff()">
  ...
</form>
```



## [Init/cleanup values](./projects/ngfe/src/lib/core/fe-if.ts)

For dynamic forms we need to setup values when some fields became visible, and remove such values on field hiding.

Structural directive [`feIf`](./projects/ngfe/src/lib/core/fe-if.ts) works similar to `ngIf` (except `else` part) and could set a model to some default / `undefined`.

When Angular change detection runs, `feIf` directive checks that the condition is true/false, wait until template updates, then update bound model and renders conditional template. This allows us to keep this logic in template and not collide with rendering process.

_The main disadvantage - it works only with `<ng-template>`._

```
<ng-template [feIf]="showField" [(ensure)]="field">
  <input [(feControl)]="field">
</ng-template>
```

Also, you could define `[default]` value that will be set to the model when it's empty.

```
<ng-template [feIf]="showField" [(ensure)]="field" default="BOOOM">
  <input [(feControl)]="field">
</ng-template>
```



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

```
<app-custom-control [(feControl)]="field"></app-custom-control>
```

You can subscribe to any stream of the control and define any state.

> [[StackBlitz] ngfe custom value accessor demo](https://stackblitz.com/edit/ngfe-custom-va-demo?file=src/app/custom-control.component.ts)



## [Util](./projects/ngfe/src/lib/util)

Set of functions that is very useful in work with forms.

* [`coerceToBoolean`](./projects/ngfe/src/lib/util/coercion.ts) - coerce an input value (typically a string) to a boolean.
* [`deepCopy`](./projects/ngfe/src/lib/util/deep-copy.ts) - deep copy objects and arrays.
* [`diff`](./projects/ngfe/src/lib/util/diff.ts) - compare objects and arrays.
* [`readFiles`](./projects/ngfe/src/lib/util/read-files.ts) - read file data from File.



## @angular/forms adapter

Enables an easy transition from Angular forms to **ngfe**.

Install package:

```
$ npm i ngfe-ng-adapter
```

Import module:

```
imports: [
  ...
  FeModule,
  FeNgAdapterModule,
]
```

After that you can use Angular `ValueAccessors` and `Validator` with `[(feControl)]`.

Also, with this package, `feControl` provides `NgControl` and allows you to use **ngfe** with Material components or other UI libs.

> [[StackBlitz] ngfe-ng-adapter demo](https://stackblitz.com/edit/ngfe-ng-adapter?file=src/app/app.component.html)



## LICENSE 

MIT
