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
* `OnPush` mode support.
* SSR support.


### Caveats

* 3rd party lib.
* Non-standard way to do things.
* Does not support `Validator` and `ValueAccessor` interfaces. [TODO FeFormsAdapter]
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

* Model - ...
  * State - ...
  * Value - ...
* Control - ...
* ControlRef - ...
* Field - ...
* Validator - ...
* Validity - ...
* Error - ...

## Binding

```
<input [(feModel)]="field" feText>
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

### `[feText]`

### `[feNumber]`


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

* Rework `feFile` - file input handling and customization
* Complete built-in controls (value accessors)
* Complete built-in validators (explicit names?? feRequired)
* Debug mode ??
* `standalone`
* Labs:
  * `DisplayedErrorsStrategy`
  * `DisabledStrategy`
  * Optional scroll to first invalid field.
  * textarea autoresize (`[feText][autoresize]` separated directive)
  * input text mask
  * focus control
  * Integration with native ValueAccessor and Validator
  * feMath control
  * feButton control - to use on group buttons, tabs
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
  * Links to forms UX articles
* Specs
* CI release
