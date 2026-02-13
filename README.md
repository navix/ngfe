[![npm version](https://badge.fury.io/js/ngfe.svg)](https://www.npmjs.com/package/ngfe)
![CI](https://github.com/navix/ngfe/actions/workflows/ci.yml/badge.svg)

# ngfe | Angular Forms Engine | Template-based Signal Forms

Boosted template-driven Angular forms.

It is an alternative for the Angular Forms of any kind: simpler, more flexible, more powerful, no restrictions.

If your project have complex and dynamic forms this package will save you a lot of time and lines of code.

> [StackBlitz showcase](https://stackblitz.com/edit/ngfe-showcase?file=src/app/app.component.html)

## Features

* **Focused on template-driven approach.**
* **Signal under the hood.**
* **Less abstractions, ultimate control.**
* **More freedom for developers.**
* Nothing exceptionally new for Angular people.
* Less boilerplate to write:
  * Simple custom value accessors creation.
  * Simple custom validators creation.
  * Single interface for sync and async validators.
  * No `ControlContainer` providing for sub-forms.
  * No required `name` binding.
  * Handy way to display validation errors only on touched fields.
* Function validators binding.
* Built-in debounce.
* Two-way state binding in templates (e.g `[(touched)]`).
* Almost all states have reactive alternative (e.g `.errors`+`.errors$`).
* Submit directive which touches all fields and checks validity.
* Stricter types in controls.
* SSR support.
* Zero deps.
* Reduced bundle size without @angular/forms (~20KB parsed size in prod mode).
* Does not conflict with the Angular `FormsModule`.
* Optional integration with Angular `Validator` and `ValueAccessor` interfaces.
* Works with Angular Material.

### Caveats

* 3rd party lib.
* Not battle-tested enough yet.
* Sometimes too much freedom for developers.

### Why template forms

* Angular template is the best DSL for describing forms.
* **Single source of truth for your forms - templates.** 
* No structure and binding duplication.
* Almost all logic written in a declarative manner.
* Less code to write.
* https://www.youtube.com/watch?v=L7rGogdfe2Q



## Terms

* **Form** - tool for displaying and manipulating data in Browser.
* **Model** - variable that represents a field of data.
* **Input** - HTML element (or custom component) allows you to display and change some state.
* **Control** - a bridge between **Model** and **Input**.
* **Value accessor** - directive or component that connects **Input** to the **Control**.
* **Validator** - function to check **Model** or **Input** values to meet some conditions.
* **Error** - returned by **Validator** if value is invalid. 
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

* `ngfe@13` for Angular@12 and Angular@13. RxJS@7 needed.
* `ngfe@15` no-signals version with `[feControl]` syntax for Angular@14+.



## Usage

Import the module:

```typescript
import { FeModule } from 'ngfe';
...
imports: [
  FeModule,
  ...
]
```

All directives are standalone and can be imported separately:

```typescript
imports: [FeForm, FeModel, FeSubmit, FeInput, FeSelect, FeRequiredValidator, ...]
```

### `feImports`

A convenience constant containing all directives for quick standalone component setup:

```typescript
import { feImports } from 'ngfe';

@Component({
  standalone: true,
  imports: [feImports],
  ...
})
export class MyComponent {}
```


## Binding

On the surface [`[(model)]`](projects/ngfe/src/lib/core/fe-model.ts) works exactly like `[(ngModel)]`.

```html
<input [(model)]="field">
```



## [Form](projects/ngfe/src/lib/core/fe-form.ts)

`FeForm` is automatically applied to `<form>` elements (selector: `form:not([noForm]),[feForm]`). 

It aggregates all child `FeModel` controls and provides form-level state.

Use the `noForm` attribute to opt out on a specific `<form>` element:

```html
<form noForm>
  <!-- No FeForm directive here -->
</form>
```

Use the `[feForm]` attribute to create a form group on a non-form element:

```html
<div feForm>
  <input [(model)]="field">
</div>
```

### Example

```html
<form #form="form" [(disabled)]="formDisabled">
  <input [(model)]="name" name="name" required>
  <input [(model)]="email" name="email" email>

  @if (form.invalid()) {
    <p>Form has errors</p>
  }

  <button (validSubmit)="save()">Submit</button>
</form>
```



## [Model](projects/ngfe/src/lib/core/fe-model.ts) (FeModel)

`FeModel` is the core control directive. 

Selector: `[model]:not([noModel]),[modelChange]:not([noModel])`.

Use the `noModel` attribute to opt out:

```html
<input [model]="value" noModel>
```

#### `invalidValueStrategy`

Controls what happens when input validation fails:

* `'accept'` (default) - update model with the input value even if invalid.
* `'retain'` - keep the previous valid value, do not update model.
* `{value: VALUE}` - update model with the provided fallback value.

#### `asyncValidatorsStrategy`

Controls when async validators run:

* `'runAfterSyncValid'` (default) - async validators only run if all sync validators pass.
* `'runAlways'` - async validators always run regardless of sync validation results.



## Built-in value accessors

### [Input](projects/ngfe/src/lib/value-accessors/fe-input.ts) (FeInput)

Selector: `input[model],textarea[model]`.

Bridges native `<input>` and `<textarea>` elements to `FeModel`.

```html
<input [(model)]="field">
<input [(model)]="field2" type="checkbox">
<input [(model)]="field3" type="radio" value="1">
<input [(model)]="field4" type="date">
<textarea [(model)]="field5"></textarea>
```

#### `valueType`

Force a specific value type regardless of the input element type:

```html
<!-- Force number parsing for a text input -->
<input [(model)]="amount" valueType="number">

<!-- Force Date object from a date input -->
<input [(model)]="date" type="date" valueType="Date">

<!-- Keep string value for a number input -->
<input [(model)]="code" type="number" valueType="string">
```

#### `updateOn`

Control when the model value is updated:

```html
<!-- Default: update on every keystroke -->
<input [(model)]="field" updateOn="change">

<!-- Update only when input loses focus -->
<input [(model)]="field" updateOn="blur">
```

#### File inputs

```html
<input (modelChange)="loadFiles($event)" type="file">
```

```typescript
import { readFiles } from 'ngfe';
...
loadFiles(files?: FileList) {
  readFiles(files || []).subscribe(loadedFiles => {
    ...
  });
}
```



### [Select](projects/ngfe/src/lib/value-accessors/fe-select.ts) (FeSelect)

Selector: `select[model]`. Bridges native `<select>` elements to `FeModel`.

```html
<select [(model)]="field">
  <option value="1">ONE</option>
  <option value="2">TWO</option>
</select>
```

Any type of value available to bind to `option[value]`:

```typescript
field: number;
```

```html
<select [(model)]="field">
  <option [value]="1">ONE</option>
  <option [value]="2">TWO</option>
</select>
```

#### Multiple select

```html
<select [(model)]="selectedItems" multiple>
  @for (let item of items) {
    <option [value]="item">{{ item.name }}</option>
  }
</select>
```

#### Custom compare function

Useful when option values are objects:

```html
<select [(model)]="selected" [compareFn]="compareById">
  @for (let item of items) {
    <option [value]="item">{{ item.name }}</option>
  }
</select>
```

```typescript
compareById = (v1: any, v2: any) => v1?.id === v2?.id;
```

### [FeSelectOption](projects/ngfe/src/lib/value-accessors/fe-select.ts)

Selector: `option`. 

Automatically connects to the parent `FeSelect` directive.



## Debounce 

Define debounce time for values from a value accessor:

```html
<input [(model)]="field" [debounce]="400">
```



## [Validation](./projects/ngfe/src/lib/core/validation.ts)

Works very similar to the default Angular validation.

```html
<input #model="model" [(model)]="field" required>
@if (model.errors(); as errors) {
  @if (errors.required) {
    <span>Required</span>
  }
}
```

### Visible Errors

`.visibleErrors()` returns the errors object only when the control is touched:

```html
<input #model="model" [(model)]="field" required>
@if (model.visibleErrors(); as errors) {
  @if (errors.required) {
    <span>Required</span>
  }
}
```



### [Built-in validators](./projects/ngfe/src/lib/validators)

| Validator | Selector | Key Inputs | Error Key |
|-----------|----------|------------|-----------|
| `FeRequiredValidator` | `[model][required]` | `required: boolean` (default: `true`) | `{required: {value}}` |
| `FeEmailValidator` | `[model][email]` | `email: boolean` (default: `true`) | `{email: {value}}` |
| `FeEqualValidator` | `[model][equal]` | `equal: any`, `activeWhenEmpty: boolean` | `{equal: {equal, value}}` |
| `FeNotEqualValidator` | `[model][notEqual]` | `notEqual: any`, `activeWhenEmpty: boolean` | `{notEqual: {notEqual, value}}` |
| `FeIsNumberValidator` | `[model][isNumber]` | `isNumber: boolean` (default: `true`) | `{isNumber: {value}}` |
| `FeLengthValidator` | `[model][minLength],[model][maxLength]` | `minLength`, `maxLength` | `{minLength: {requiredLength, actualLength, value}}`, `{maxLength: ...}` |
| `FeMinmaxValidator` | `[model][min],[model][max]` | `min`, `max` | `{min: {min, value, numberValue}}`, `{max: ...}` |
| `FePatternValidator` | `[model][pattern]` | `pattern: string \| RegExp` | `{pattern: {pattern, value}}` |

All boolean-toggle validators (`required`, `email`, `isNumber`) can be disabled by binding `false`:

```html
<input [(model)]="field" [required]="isRequired">
<input [(model)]="field" [email]="shouldValidateEmail">
```

The `equal` and `notEqual` validators have an `activeWhenEmpty` input (default: `false`). When `false`, validation is skipped if the value is empty:

```html
<input [(model)]="field" [equal]="expectedValue" activeWhenEmpty>
```



### Custom validator

#### As a function

Use [`FeValidator`](./projects/ngfe/src/lib/core/validation.ts) interface to implement a validator. Return errors object [`FeValidationErrors`](./projects/ngfe/src/lib/core/validation.ts) or `undefined` if value is valid.

```typescript
// Invalid if value is not empty and have value "BOOM".
notBoom: FeValidator<string> = value => {
  return value !== 'BOOM'
    ? undefined
    : {notBoom: true};
};
```

Pass it to `[validators]` input:

```html
<input #model="model" [(model)]="field" [validators]="[notBoom]">
@if (model.errors()?.notBoom) {
  <span>Value should not be "BOOM"</span>
}
```

#### As a directive

Or, create a validator directive:

```typescript
@Directive({
  selector: '[model][notBoom]',
  standalone: true,
})
export class NotBoomValidatorDirective {
  private model = inject(FeModel<string>);
  private removeFn = this.model.addValidator(value => {
    return value !== 'BOOM'
      ? undefined
      : {notBoom: true};
  });
}
```

```html
<input [(model)]="field" notBoom>
```



### Async validators

Return from a validation function `Observable` or `Promise` with [`FeValidatorResult`](./projects/ngfe/src/lib/core/validation.ts):

```typescript
asyncValidator: FeValidator<string> = (value, control) => {
  return new Observable<FeValidatorResult>(observer => {
    // Async check...
    observer.next(isValid ? undefined : {asyncError: true});
    observer.complete();
  });
};
```



### Forced errors

You can programmatically set errors on a control using `forcedErrors`:

```html
<input #model="model" [(model)]="field" [forcedErrors]="serverErrors()">
```

```typescript
// Set from server response
serverErrors = signal<FeValidationErrors | undefined>(undefined);

onSubmit() {
  this.api.save(this.field).subscribe({
    error: (err) => {
      this.serverErrors.set({serverError: err.message});
    }
  });
}
```

Set `forcedErrors` to `'pending'` to force `pending` validity state.



## [Submit](projects/ngfe/src/lib/core/fe-submit.ts)

Two directives that mark all form controls as touched and check validity on submit.

### FeSubmit (on button or form)

Selector: `button[anySubmit],button[validSubmit],button[invalidSubmit]`

```html
<form>
  ...
  <button (anySubmit)="doStuff()">Submit</button>
  <button (validSubmit)="doValidStuff()">Submit</button>
  <button (invalidSubmit)="doInvalidStuff()">Submit</button>
</form>
```

Selector: `form[anySubmit],form[validSubmit],form[invalidSubmit]`

```html
<form (anySubmit)="doStuff()" (validSubmit)="doValidStuff()" (invalidSubmit)="doInvalidStuff()">
  ...
</form>
```

| Output | Type | Description |
|--------|------|-------------|
| `anySubmit` | `boolean` | Emits validity (`true`/`false`) on click. |
| `validSubmit` | `void` | Emits on click when form is valid. |
| `invalidSubmit` | `void` | Emits on click when form is invalid. |

Both directives call `form.touchAll()` before emitting, so all validation errors become visible.



## Custom Value Accessor

You do not need to implement `ValueAccessor` interface.

Just inject `FeModel` and use its properties and methods:

```typescript
@Component({
  selector: 'app-custom-control',
  ...
})
export class AppCustomControlComponent {
  private model = inject(FeModel);

  onUserAction(value: any) {
    this.model.input(value);
  }

  onFocus() {
    this.model.touch();
  }
}
```

```html
<app-custom-control [(model)]="field" />
```

You can use any signal or subscribe to any observable of the model and define any state.



## [Util](./projects/ngfe/src/lib/util)

Set of functions useful for working with forms.

### [`ensureNumber`](./projects/ngfe/src/lib/util/ensure-number.ts)

Convert a string value to number if possible. 

Returns `undefined` for empty string or non-numeric values.

```typescript
import { ensureNumber } from 'ngfe';

ensureNumber('42');        // 42
ensureNumber('abc');       // undefined
ensureNumber('');          // undefined
ensureNumber(undefined);   // undefined
```



### [`readFiles`](./projects/ngfe/src/lib/util/read-files.ts)

Read file data from `File[]` or `FileList` (typically from file inputs).

```typescript
import { readFiles } from 'ngfe';

readFiles(fileList, 'DataURL').subscribe((loadedFiles: FeLoadedFile[]) => {
  loadedFiles.forEach(f => {
    console.log(f.file.name, f.data);
  });
});
```



## @angular/forms adapter

Enables an easy transition from Angular forms to **ngfe**.

Install package:

```
$ npm i ngfe-ng-adapter
```

Import module:

```typescript
imports: [
  ...
  FeModule,
  FeNgAdapterModule,
]
```

After that you can use Angular `ValueAccessors` and `Validators` with `[(model)]`.

Also, with this package, `FeModel` provides `NgControl` and allows you to use **ngfe** with Material components or other UI libs.



## LICENSE 

MIT
