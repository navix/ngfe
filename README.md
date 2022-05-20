# 🧰 ngfe | Angular Forms Extra

## WIP

Boosted template-driven Angular forms.

It is an alternative for the original `FormsModule`.

## Features

* Focused on template-driven approach.
* Single source of truth for your forms - templates.
* Less abstractions, ultimate control.
* More freedom for developers.
* Simple custom value accessors creation.
* Simple custom validators creation.
* Single interface for sync and async validators.
* Direct way to control model in validators.
* Reduce bundle size dropping @angular/forms.
* Stricter data type checks in controls.
* Explicit native controls binding (input, select, etc).
* Built-in debounce.
* Nice submit directive which touches all fields and checks validity.
* Handy ways to display validation errors.
* Helper directive for build a custom field component.
* Allows to create wrapper components without additional value accessors.
* Does not conflict with the native `FormsModule`.
* Native date input value transform to/from Date. ??
* Optional integration with Angular `Validator` and `ValueAccessor` interfaces.
* `OnPush` mode support.
* SSR support.


### Caveats

* 3rd party lib.
* Non-standard way to do things.
* Not battle-tested enough yet.
* Sometimes too much freedom for developers.


## Installation

```
$ npm i ngfe
```

## Usage

```
imports: [
  FeModule,
  ...
]
```

## Terms

* Control - a bridge between Model and Input.
  * Model - field that you bind in an Angular template to Control.
  * Input - HTML element allows you to input data or any other custom implementation.
  * Value - ...
  * InputValue
  * Control implementation (Value accessor)
* Field - ...
* Validator - ...
* Error - ...
* Validity - ...
* Form - ...

Control has 3 crucial parts:
* `FeControl` - service that handle all communication and states.
* `FeControlDirective` provides `FeControl` and bind Model to it to define fields of your form.
* Value accessor implementations (for example, `FeInputDirective`, that connects `FeControl` with HTML `<input>` element).

## Binding

```
<input [(feControl)]="field" feInput>
```

### Default value

```
<input [feModel]="field || 'DEFAULT'" (feModelChange)="field = $event" feText>
```

### Clean up

```
<input *ngIf="show" [(feModel)]="field" (destroy)="field = undefined" feText>
```

## Built-in controls

All controls for native elements have explicit binding. 
It is one additional keyword, but this solution has long-term compatibility benefits.

### `[feInput]`

#### number

TODO: Adapters

#### date, date-local

TODO: Adapters

#### checkbox

#### radio

#### file

TODO: Info about `readFiles()`, `FeLoadedFile`, `compileFileList()`

#### textarea

### `[feSelect]`


## Validation

```
<input [(feModel)]="field" required>
```

### Display Errors

```
<input #model="feModel" [(feModel)]="field" required>
<span *ngIf="model.displayedErrors as errors>
  <span *ngIf="errors.has('required')">Required</span>
</span>
```

You can move errors displaying in a separated component or use pipe to reduce boilerplate.

### Built-in validators

TODO

### Function validator

TODO

### Custom validator

TODO



## Submit

### On button

TODO

### On form

TODO


## Custom controls

TODO

Model and Controller can be declared of different elements, you do not always need to define a custom control to create a component with a native input.


## Custom field



## TODO

* deepCopyAdapter, adapters tests
* Drop all subs on control destroy 
* Specs for all playground pages.
* Complete ng adapter, release.
* Labs:
  * `DisplayedErrorsStrategy`
  * Scroll to first invalid field.
  * textarea autoresize (`[feText][autoresize]` separated directive)
  * input text mask
  * focus control
  * feMath control -- adapter?
  * feButton control - to use on group buttons, tabs
  * feControl `[extraErrors]` input with custom errors that will be merged to the state.
  * Playwright helpers
  * `(afterChange)` - desync emit, called after model change applied
* Docs
  * README
  * Stackblitz demos
    * `<app-errors>`
    * `| errors`
    * `<app-field>`
    * UI kit demo: field, errors, styled inputs
    * TODO MVC demo
    * Place links in the README
  * Fancy hacks
    * Dynamic forms 
    * Combine custom control with custom validators under one component. 
    * Type convert: `[feModel]="dateToString(someDate)" (feModelChange)="stringToDate($event)"`
    * Register validator from child component // How to debug this sheesh?
    * Change input type on-the-fly.
    * Luxon-Date adapter
  * Links to forms UX articles
* Specs
* CI release
