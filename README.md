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
* Native date input value transform to/from Date.
* Directive for easy value init/cleanup.
* `OnPush` mode support.
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

## Usage

```
imports: [
  FeModule,
  ...
]
```

## Binding

```
<input [(feControl)]="field" feInput>
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


## Init/cleanup values

```
<div *ngIf="someCheck" feEnsure>
</div>
```

## Custom controls

TODO

Model and Controller can be declared of different elements, you do not always need to define a custom control to create a component with a native input.


## Custom field



## TODO

* Labs:
  * `VisibleErrorsStrategy`
  * Scroll to first invalid field.
  * feControl `[extraErrors]` input with custom errors that will be merged to the state.
  * Playwright helpers
* Docs
  * README
  * Stackblitz demos
    * `<app-errors>`
    * `| errors`
    * `<app-field>`
    * UI kit demo: field, errors, styled inputs
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
