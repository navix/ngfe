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
* Direct way to control model in validators.
* Handy ways to display validation errors.
* Nice submit directive which touches all fields and checks validity.
* Reduce bundle size dropping @angular/forms.
* Native date input value transform to/from Date.


### Caveats

* 3rd party lib.
* Non-standard way to do things.
* Does not support `Validator` and `ValueAccessor` interfaces. [TODO FeFormsAdapter]
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

### Binding

```
<input [(feModel)]="field">
```

#### Default value

TODO

#### Clean up

TODO


### Validation

```
<input [(feModel)]="field" required>
```

#### Display Errors

```
<input #model="feModel" [(feModel)]="field" required>
<span *ngIf="model.displayedErrors as errors>
  <span *ngIf="errors.has('required')">Required</span>
</span>
```

You can move errors displaying in a separated component or use pipe to reduce boilerplate.

#### Built-in validators

#### Function validator

TODO

#### Custom validator directive

TODO


### Submit

#### On button

TODO

#### On form

TODO


### Custom controls

TODO




## TODO

* [ ] Async validation
* [ ] `dirty`
* [ ] `[default]` + `reset()`
* [ ] Rework `feFile` - file input handling and customization
* [ ] Rework `(feDestroy)` - maybe add (clear) event to `feModel` instead
* [ ] Complete native controls
* [ ] Complete validators
* [ ] Handle `disabled`
* [ ] `FeForm` todos
* `FeAdapterModule`
  * [ ] Integration with native ValueAccessor
  * [ ] Integration with native Validator
* Labs:
  * [ ] `DisplayedErrorsStrategy`
  * [ ] `DisabledStrategy`
  * [ ] Optional scroll to first invalid field.
  * [ ] textarea autoresize
  * [ ] input text mask
  * [ ] focus control
* Docs
  * [ ] README 
  * Stackblitz demos
    * [ ] `<app-errors>`
    * [ ] `| errors`
    * [ ] `<app-field>`
    * [ ] Place links in the README
  * Fancy hacks
    * [ ] Dynamic forms 
    * [ ] Combine custom control with custom validators under one component. 
* [ ] Specs
* [ ] CI release
