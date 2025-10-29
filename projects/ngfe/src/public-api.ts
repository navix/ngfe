/*
 * Public API Surface of ngfe package.
 */

import {NgModule} from '@angular/core';
import {FeForm} from './lib/core/fe-form';
import {FeModel} from './lib/core/fe-model';
import {FeFormSubmit, FeSubmit} from './lib/core/fe-submit';
import {FeEmailValidator} from './lib/validators/fe-email-validator';
import {FeEqualValidator} from './lib/validators/fe-equal-validator';
import {FeIsNumberValidator} from './lib/validators/fe-is-number-validator';
import {FeLengthValidator} from './lib/validators/fe-length-validator';
import {FeMinmaxValidator} from './lib/validators/fe-minmax-validator';
import {FeNotEqualValidator} from './lib/validators/fe-not-equal-validator';
import {FePatternValidator} from './lib/validators/fe-pattern-validator';
import {FeRequiredValidator} from './lib/validators/fe-required-validator';
import {FeInput} from './lib/value-accessors/fe-input';
import {FeSelect, FeSelectOption} from './lib/value-accessors/fe-select';

// Core
export {FeForm, FeModel, FeSubmit, FeFormSubmit};
export * from './lib/core/validation';

// Util
export * from './lib/util/ensure-number';
export * from './lib/util/read-files';

// Validators
export {
  FeEmailValidator,
  FeEqualValidator,
  FeIsNumberValidator,
  FeLengthValidator,
  FeNotEqualValidator,
  FeMinmaxValidator,
  FePatternValidator,
  FeRequiredValidator,
};

// Value Accessors
export {FeInput};
export {FeSelect, FeSelectOption};

export const feImports = [
  // Core
  FeModel,
  FeForm,
  FeSubmit,
  FeFormSubmit,
  // Validators
  FeEmailValidator,
  FeEqualValidator,
  FeIsNumberValidator,
  FeLengthValidator,
  FeNotEqualValidator,
  FeMinmaxValidator,
  FePatternValidator,
  FeRequiredValidator,
  // Value Accessors
  FeInput,
  FeSelect,
  FeSelectOption,
] as const;

@NgModule({
  imports: [...feImports],
  exports: [...feImports],
})
export class FeModule {}
