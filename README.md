# 🧰 ngfe | Angular Forms Extra

## WIP

Boosted template-driven Angular forms.

It is an alternative for the native `FormsModule`.

## Installation

```
$ npm i ngfe
```

## TODO

* [x] `[feFn]` - run function as validator.
  * [ ] rm?
  * [ ] `[feAsyncFn]` - run function as async validator.
* [x] `[feRef]` - trigger validation on other form control.
  * [ ] rm? 
* [x] `*feErr` - display validation errors if needed.
  * [ ] rm? 
* [ ] `feSubmit` - mark all fields touched to display errors.
* [ ] `feFile` - file input handling and customization. 
* [x] `(feDestroy)` - emitter to handle element destroy.
  * [ ] Add (clear) event to `feModel` instead. 
* [ ] Move validators to separated module
* [ ] Integration with native ValueAccessor
* [ ] Integration with native Validator
* Labs:
  * [ ] Optional scroll to first invalid field.
  * [ ] `[feModelDefault]` Directive for defining model value if it's empty.
  * [ ] textarea autoresize
  * [ ] input text mask
  * [ ] focus control?
* [ ] Docs
* [ ] Specs
* [ ] CI release

## Modules

### `FeDestroyModule`

```
<div *ngIf="condition" (feDestroy)="handler()"></div>
```

### `FeErrModule`

```
<input #model="ngModel" [(ngModel)]="value" name="value" required>
<span *feErr="model; let errors">{{ errors | json }}</span>
```

### `FeFileModule`

```
<button class="custom" feFileHolder>
Pick a File
<input type="file" required [(ngModel)]="file" name="file" feFile>
</button>
```

### `FeFnValidatorModule`

```
<input [(ngModel)]="value" [feFn]="validationFunction">
```

### `FeRefModule`

```
<input #password="ngModel" [(ngModel)]="password" name="password">
<input [(ngModel)]="passwordConfirm" [feRef]="[password]" name="passwordConfirm">
```

### `FeSubmitModule`

```
<form>
  ...
  <button feSubmit>Submit</button>
</form>
```


## `FeModel` features

* Focused on template-driven approach.
* Less abstractions, ultimate control.
* More freedom for developers.
* Simple custom value accessors creation.
* Simple custom validators creation.
* Direct way to control model in validators.
* Handy ways to display validation errors.


### Caveats

* No reactive forms.
* More freedom for developers.
* Does not support `Validator` and `ValueAccessor` interfaces.
