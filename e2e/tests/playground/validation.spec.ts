import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Validation', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async ({page}) => {
    await kit.goto('/validation');
    await expect(kit.subTitle).toHaveText('Validation');
  });

  test('1 - Required validator', async () => {
    await expect(kit.$('#control-1-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-1-errors')).toHaveText('ERRORS: { "required": true } ');
    await kit.$('#control-1').fill('123');
    await expect(kit.$('#control-1-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-1-errors')).toHaveText('ERRORS:');
    await kit.$('#control-1').fill('');
    await expect(kit.$('#control-1-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-1-errors')).toHaveText('ERRORS: { "required": true } ');
  });

  test('2 - Function validator', async () => {
    await expect(kit.$('#control-2-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-2-errors')).toHaveText('ERRORS: { "fn": true } ');
    await kit.$('#control-2').fill('123');
    await expect(kit.$('#control-2-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-2-errors')).toHaveText('ERRORS:');
    await kit.$('#control-2').fill('');
    await expect(kit.$('#control-2-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-2-errors')).toHaveText('ERRORS: { "fn": true } ');
  });

  test('3 - Function async Observable validator', async () => {
    await expect(kit.$('#control-3-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-3-errors')).toHaveText('ERRORS: { "avo": true }');
    await kit.$('#control-3').fill('123');
    await expect(kit.$('#control-3-validity')).toHaveText('VALIDITY: "pending"');
    await expect(kit.$('#control-3-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-3-errors')).toHaveText('ERRORS:');
    await kit.$('#control-3').fill('321');
    await expect(kit.$('#control-3-validity')).toHaveText('VALIDITY: "pending"');
    await expect(kit.$('#control-3-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-3-errors')).toHaveText('ERRORS: { "avo": true } ');
  });

  test('4 - Function async Promise validator', async () => {
    await expect(kit.$('#control-4-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-4-errors')).toHaveText('ERRORS: { "avp": true }');
    await kit.$('#control-4').fill('456');
    await expect(kit.$('#control-4-validity')).toHaveText('VALIDITY: "pending"');
    await expect(kit.$('#control-4-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-4-errors')).toHaveText('ERRORS:');
    await kit.$('#control-4').fill('654');
    await expect(kit.$('#control-4-validity')).toHaveText('VALIDITY: "pending"');
    await expect(kit.$('#control-4-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-4-errors')).toHaveText('ERRORS: { "avp": true } ');
  });

  test('5 - Debounce before async', async () => {
    await expect(kit.$('#control-5-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-5-errors')).toHaveText('ERRORS: { "avo": true }');
    await kit.$('#control-5').fill('123');
    await expect(kit.$('#control-5-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-5-validity')).toHaveText('VALIDITY: "pending"');
    await expect(kit.$('#control-5-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-5-errors')).toHaveText('ERRORS:');
    await kit.$('#control-5').fill('321');
    await expect(kit.$('#control-5-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-5-validity')).toHaveText('VALIDITY: "pending"');
    await expect(kit.$('#control-5-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-5-errors')).toHaveText('ERRORS: { "avo": true } ');
  });

  test('6 - Email validator', async () => {
    await expect(kit.$('#control-6-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-6').fill('mail');
    await expect(kit.$('#control-6-validity')).toHaveText('VALIDITY: "invalid"');
    await expect(kit.$('#control-6-errors')).toHaveText('ERRORS: { "email": true }');
    await kit.$('#control-6').fill('my@mail');
    await expect(kit.$('#control-6-validity')).toHaveText('VALIDITY: "valid"');
  });

  test('7 - Length validator', async () => {
    await expect(kit.$('#control-7-errors')).toHaveText('ERRORS: { "minlength": { "requiredLength": 5, "actualLength": 0 } } ');
    await kit.$('#control-7').fill('1234');
    await expect(kit.$('#control-7-errors')).toHaveText('ERRORS: { "minlength": { "requiredLength": 5, "actualLength": 4 } } ');
    await kit.$('#control-7').fill('12345');
    await expect(kit.$('#control-7-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-7').fill('1234512345');
    await expect(kit.$('#control-7-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-7').fill('12345123450');
    await expect(kit.$('#control-7-errors')).toHaveText('ERRORS: { "maxlength": { "requiredLength": 10, "actualLength": 11 } } ');
  });

  test('8 - Pattern validator', async () => {
    await expect(kit.$('#control-8-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-8').fill('aa');
    await expect(kit.$('#control-8-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-8').fill('aa66');
    await expect(kit.$('#control-8-errors')).toHaveText('ERRORS: { "pattern": { "pattern": "^[a-zA-Z ]*$", "modelValue": "aa66" } } ');
    await kit.$('#control-8').fill('66');
    await expect(kit.$('#control-8-errors')).toHaveText('ERRORS: { "pattern": { "pattern": "^[a-zA-Z ]*$", "modelValue": "66" } } ');
    await kit.$('#control-8').fill('bb');
    await expect(kit.$('#control-8-validity')).toHaveText('VALIDITY: "valid"');
  });

  test('9 - Required validator with initial value', async () => {
    await expect(kit.$('#control-9-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-9').fill('');
    await expect(kit.$('#control-9-errors')).toHaveText('ERRORS: { "required": true } ');
    await kit.$('#control-9').fill('ccc');
    await expect(kit.$('#control-9-validity')).toHaveText('VALIDITY: "valid"');
  });

  test('10 - Number validator', async () => {
    await expect(kit.$('#control-10-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-10').fill('9');
    await expect(kit.$('#control-10-errors')).toHaveText('ERRORS: { "min": { "min": 10, "modelValue": 9 } } ');
    await kit.$('#control-10').fill('10');
    await expect(kit.$('#control-10-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-10').fill('20');
    await expect(kit.$('#control-10-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-10').fill('21');
    await expect(kit.$('#control-10-errors')).toHaveText('ERRORS: { "max": { "max": 20, "modelValue": 21 } } ');
  });

  test('11 - isNumber validator', async () => {
    await expect(kit.$('#control-11-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-11-value')).toHaveText('VAL: 123');
    await kit.$('#control-11').fill('123aaa');
    await expect(kit.$('#control-11-value')).toHaveText('VAL:');
    await expect(kit.$('#control-11-errors')).toHaveText('ERRORS: { "isNumber": { "inputValue": "123aaa" } } ');
    await kit.$('#control-11').fill('');
    await expect(kit.$('#control-11-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-11-sub').fill('123');
    await expect(kit.$('#control-11-value')).toHaveText('VAL: "123"');
    await expect(kit.$('#control-11-errors')).toHaveText('ERRORS: { "isNumber": { "modelValue": "123" } } ');
  });

  test('12 - Equal validator', async () => {
    await expect(kit.$('#control-12-errors')).toHaveText('ERRORS: { "equal": { "equal": "321", "modelValue": "" } } ');
    await kit.$('#control-12').fill('321');
    await expect(kit.$('#control-12-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-12').fill('123');
    await expect(kit.$('#control-12-errors')).toHaveText('ERRORS: { "equal": { "equal": "321", "modelValue": "123" } } ');
  });

  test('13 - Not equal validator', async () => {
    await expect(kit.$('#control-13-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-13').fill('654');
    await expect(kit.$('#control-13-errors')).toHaveText('ERRORS: { "notEqual": { "notEqual": "654", "modelValue": "654" } } ');
    await kit.$('#control-13').fill('456');
    await expect(kit.$('#control-13-validity')).toHaveText('VALIDITY: "valid"');
  });

  test('14 - Equal models validator', async () => {
    await expect(kit.$('#control-14-1-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-14-2-validity')).toHaveText('VALIDITY: "valid"');
    await kit.$('#control-14-1').fill('654');
    await expect(kit.$('#control-14-1-errors')).toHaveText('ERRORS: { "equal": { "equal": "", "modelValue": "654" } }');
    await expect(kit.$('#control-14-2-errors')).toHaveText('ERRORS: { "equal": { "equal": "654", "modelValue": "" } } ');
    await kit.$('#control-14-2').fill('654');
    await expect(kit.$('#control-14-1-validity')).toHaveText('VALIDITY: "valid"');
    await expect(kit.$('#control-14-2-validity')).toHaveText('VALIDITY: "valid"');
  });
});
