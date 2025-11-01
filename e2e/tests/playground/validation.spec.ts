import {expect, test} from '@playwright/test';
import {PageKitFactory} from '../page-kit';

test('Validation', async ({browser}) => {
  const kit = await PageKitFactory.new(browser);

  await test.step('open', async () => {
    await kit.goto('/validation');
    await expect(kit.subTitle).toHaveText('Validation');
  });

  await test.step('1 - Required validator', async () => {
    const c = kit.getCase('1-required-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "required": { "value": "" } }');
    await c.$('input').fill('123');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await expect(c.vv('ERRORS')).toHaveText('');
    await c.$('input').fill('');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "required": { "value": "" } }');
  });

  await test.step('2 - Function validator', async () => {
    const c = kit.getCase('2-function-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "fn": true } ');
    await c.$('input').fill('123');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await expect(c.vv('ERRORS')).toHaveText('');
    await c.$('input').fill('');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "fn": true } ');
  });

  await test.step('3 - Function async Observable validator', async () => {
    const c = kit.getCase('3-async-observable-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "avo": true }');
    await c.$('input').fill('123');
    await expect(c.vv('VALIDITY')).toHaveText('"pending"');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await expect(c.vv('ERRORS')).toHaveText('');
    await c.$('input').fill('321');
    await expect(c.vv('VALIDITY')).toHaveText('"pending"');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "avo": true } ');
  });

  await test.step('4 - Function async Promise validator', async () => {
    const c = kit.getCase('4-async-promise-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "avp": true }');
    await c.$('input').fill('456');
    await expect(c.vv('VALIDITY')).toHaveText('"pending"');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await expect(c.vv('ERRORS')).toHaveText('');
    await c.$('input').fill('654');
    await expect(c.vv('VALIDITY')).toHaveText('"pending"');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "avp": true } ');
  });

  await test.step('5 - Debounce before async', async () => {
    const c = kit.getCase('5-debounce-before-async');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "avo": true }');

    await test.step('Enter valid', async () => {
      await c.$('input').fill('123');
      await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await expect(c.vv('VALIDITY')).toHaveText('"valid"');
      await expect(c.vv('ERRORS')).toHaveText('');
    });

    await test.step('Enter invalid', async () => {
      await c.$('input').fill('321');
      await expect(c.vv('VALIDITY')).toHaveText('"valid"');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
      await expect(c.vv('ERRORS')).toHaveText('{ "avo": true } ');
    });

    await test.step('Enter valid then different invalid during pending', async () => {
      await c.$('input').fill('123');
      await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await c.$('input').fill('321');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await c.$('input').fill('321x');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await c.$('input').fill('321');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
      await expect(c.vv('ERRORS')).toHaveText('{ "avo": true } ');
    });

    await test.step('Enter valid then invalid after pending started then valid again', async () => {
      await c.$('input').fill('123');
      await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await c.$('input').fill('321');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await c.$('input').fill('123');
      await expect(c.vv('VALIDITY')).toHaveText('"pending"');
      await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    });
  });

  await test.step('6 - Email validator', async () => {
    const c = kit.getCase('6-email-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('mail');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "email": { "value": "mail" } }');
    await c.$('input').fill('my@mail');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
  });

  await test.step('7 - Length validator', async () => {
    const c = kit.getCase('7-length-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('1');
    await expect(c.vv('ERRORS')).toHaveText(
      `{ "minLength": { "requiredLength": 5, "actualLength": 1, "value": "1" } }`,
    );
    await c.$('input').fill('1234');
    await expect(c.vv('ERRORS')).toHaveText(
      `{ "minLength": { "requiredLength": 5, "actualLength": 4, "value": "1234" } }`,
    );
    await c.$('input').fill('12345');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('1234512345');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('12345123450');
    await expect(c.vv('ERRORS')).toHaveText(
      `{ "maxLength": { "requiredLength": 10, "actualLength": 11, "value": "12345123450" } }`,
    );
  });

  await test.step('8 - Pattern validator', async () => {
    const c = kit.getCase('8-pattern-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('aa');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('aa66');
    await expect(c.vv('ERRORS')).toHaveText(
      '{ "pattern": { "pattern": "^[a-zA-Z ]*$", "value": "aa66" } } ',
    );
    await c.$('input').fill('66');
    await expect(c.vv('ERRORS')).toHaveText(
      '{ "pattern": { "pattern": "^[a-zA-Z ]*$", "value": "66" } } ',
    );
    await c.$('input').fill('bb');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
  });

  await test.step('9 - Required validator with initial value', async () => {
    const c = kit.getCase('9-required-validator-with-initial-value');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('');
    await expect(c.vv('ERRORS')).toHaveText('{ "required": { "value": "" } }');
    await c.$('input').fill('ccc');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
  });

  await test.step('10 - Number validator', async () => {
    const c = kit.getCase('10-number-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('9');
    await expect(c.vv('ERRORS')).toHaveText(
      '{ "min": { "min": 10, "value": "9", "numberValue": 9 } }',
    );
    await c.$('input').fill('10');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('20');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('21');
    await expect(c.vv('ERRORS')).toHaveText(
      '{ "max": { "max": 20, "value": "21", "numberValue": 21 } }',
    );
  });

  await test.step('11 - isNumber validator', async () => {
    const c = kit.getCase('11-is-number-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('123aaa');
    await expect(c.vv('VALUE')).toHaveText('"123aaa"');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "isNumber": { "value": "123aaa" } } ');
    await c.$('input').fill('');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('123');
    await expect(c.vv('VALUE')).toHaveText('"123"');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
  });

  await test.step('12 - Equal validator', async () => {
    const c = kit.getCase('12-equal-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('123');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "equal": { "equal": "321", "value": "123" } }');
    await c.$('input').fill('321');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
  });

  await test.step('13 - Not equal validator', async () => {
    const c = kit.getCase('13-not-equal-validator');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('654');
    await expect(c.vv('ERRORS')).toHaveText(
      '{ "notEqual": { "notEqual": "654", "value": "654" } } ',
    );
    await c.$('input').fill('456');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
  });

  await test.step('14 - Equal models validator', async () => {
    const c = kit.getCase('14-equal-models-validator');
    await expect(c.vv('C1 VALIDITY')).toHaveText('"valid"');
    await expect(c.vv('C2 VALIDITY')).toHaveText('"valid"');
    await expect(c.vv('C2 VALIDITY')).toHaveText('"valid"');
    await c.$('input').nth(0).fill('654');
    await expect(c.vv('C1 ERRORS')).toHaveText('{ "equal": { "equal": "", "value": "654" } }');
    await expect(c.vv('C2 ERRORS')).toHaveText('');
    await expect(c.vv('C3 ERRORS')).toHaveText('{ "equal": { "equal": "654", "value": "" } } ');
    await c.$('input').nth(1).fill('654');
    await c.$('input').nth(2).fill('654');
    await expect(c.vv('C1 VALIDITY')).toHaveText('"valid"');
    await expect(c.vv('C2 VALIDITY')).toHaveText('"valid"');
    await expect(c.vv('C3 VALIDITY')).toHaveText('"valid"');
  });

  await test.step('15 - runAsyncValidators param', async () => {
    const c = kit.getCase('15-asyncValidatorsStrategy-param');
    // afterSyncValid
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "required": { "value": "" } }');
    await c.$('input').fill('12');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText(
      '{ "minLength": { "requiredLength": 3, "actualLength": 2, "value": "12" } }',
    );
    await c.$('input').fill('123');
    await expect(c.vv('VALIDITY')).toHaveText('"pending"');
    await expect(c.vv('VALIDITY')).toHaveText('"valid"');
    await c.$('input').fill('1234');
    await expect(c.vv('VALIDITY')).toHaveText('"pending"');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText('{ "avo": true } ');
    await c.$('input').fill('12');
    // always
    await c.$('select').selectOption('runAlways');
    await expect(c.vv('VALIDITY')).toHaveText('"pending"');
    await expect(c.vv('VALIDITY')).toHaveText('"invalid"');
    await expect(c.vv('ERRORS')).toHaveText(
      '{ "minLength": { "requiredLength": 3, "actualLength": 2, "value": "12" }, "avo": true }',
    );
  });
});
