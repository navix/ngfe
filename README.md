# 🧰 ngfe | Angular Forms Extra

## WIP

## TODO

* [x] `[feFn]` - run function as validator.
  * [ ] Accept array of functions.
* [ ] `[feAsyncFn]` - run function as async validator.
* [x] `[feRef]` - trigger validation on other form control.
* [x] `*feErr` - display validation if needed errors.
* [x] `feSubmit` - mark all fields touched to display errors.
  * [ ] Optional scroll to first invalid field.
* [x] `feFile` - file input handling and customization.
* [x] `feDestroy` - emitter to handle element destroy.
* [ ] Docs
* [ ] Specs

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
