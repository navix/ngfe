import {expect, test} from '@playwright/test';
import {PageKitFactory} from '../page-kit';

test('Input Control', async ({browser}) => {
  const kit = await PageKitFactory.new(browser);

  await test.step('Open page', async () => {
    await kit.goto('/input-control');
    await expect(kit.subTitle).toHaveText('Input Control');
  });

  await test.step('1 - base input', async () => {
    const c = kit.getCase('1-basic-text-input');
    await expect(c.$('input')).toHaveValue('');
    await c.$('input').fill('aaa');
    await expect(c.vv('VALUE')).toHaveText('"aaa"');
  });

  await test.step('2 - Bind value on init', async () => {
    const c = kit.getCase('2-bind-value-on-init');
    await expect(c.$('input')).toHaveValue('123');
    await kit.$('#input-2').fill('');
    await expect(c.vv('VALUE')).toHaveText('""');
    await kit.$('#input-2').fill('bbb');
    await expect(c.vv('VALUE')).toHaveText('"bbb"');
  });

  await test.step('3 - Bind undefined on init', async () => {
    const c = kit.getCase('3-bind-undefined-on-init');
    await expect(c.vv('VALUE')).toHaveText('');
    await kit.$('#input-3').fill('ccc');
    await expect(c.vv('VALUE')).toHaveText('"ccc"');
  });

  await test.step('4 - Number input', async () => {
    const c = kit.getCase('4-number-input');
    await expect(c.vv('VALUE')).toHaveText('111');
    await expect(c.vv('VALUE_TYPEOF')).toHaveText('"number"');
    await kit.$('#input-4').fill('222');
    await expect(c.vv('VALUE')).toHaveText('222');
    await expect(c.vv('VALUE_TYPEOF')).toHaveText('"number"');
  });

  await test.step('5 - Number input with forced string type', async () => {
    const c = kit.getCase('5-number-input-with-forced-string-type');
    await expect(c.vv('VALUE')).toHaveText('"111"');
    await expect(c.vv('VALUE_TYPEOF')).toHaveText('"string"');
    await kit.$('#input-5').fill('222');
    await expect(c.vv('VALUE')).toHaveText('"222"');
    await expect(c.vv('VALUE_TYPEOF')).toHaveText('"string"');
  });

  await test.step('6 - Text input with forced number type', async () => {
    const c = kit.getCase('6-text-input-with-forced-number-type');
    await expect(c.vv('VALUE')).toHaveText('666');
    await expect(c.$('input')).toHaveValue('666');
    await expect(c.vv('VALUE_TYPEOF')).toHaveText('"number"');
    await kit.$('#input-6').fill('777');
    await expect(c.vv('VALUE')).toHaveText('777');
    await kit.$('#input-6').fill('00777');
    await expect(c.$('input')).toHaveValue('00777');
    await expect(c.vv('VALUE')).toHaveText('777');
    await kit.$('#input-6').fill('0');
    await expect(c.vv('VALUE')).toHaveText('0');
    await kit.$('#input-6').fill('');
    await expect(c.$('input')).toHaveValue('');
    await expect(c.vv('VALUE')).toHaveText('');
    await kit.$('#input-6').fill('abc');
    await expect(c.$('input')).toHaveValue('abc');
    await expect(c.vv('VALUE')).toHaveText('');
    await expect(c.vv('VALUE_TYPEOF')).toHaveText('"undefined"');
    await kit.$('#input-6').fill('abc88');
    await expect(c.$('input')).toHaveValue('abc88');
    await expect(c.vv('VALUE')).toHaveText('');
    await expect(c.vv('VALUE_TYPEOF')).toHaveText('"undefined"');
  });

  await test.step('7 - Base checkbox', async () => {
    const c = kit.getCase('7-base-checkbox');
    await expect(c.vv('VALUE')).toHaveText('false');
    await expect(c.$('input')).not.toBeChecked();
    await kit.$('#input-7').check();
    await expect(c.vv('VALUE')).toHaveText('true');
    await expect(c.$('input')).toBeChecked();
    await kit.$('#input-7').uncheck();
    await expect(c.vv('VALUE')).toHaveText('false');
  });

  await test.step('8 - Checkbox with true init', async () => {
    const c = kit.getCase('8-checkbox-with-true-init');
    await expect(c.vv('VALUE')).toHaveText('true');
    await expect(c.$('input')).toBeChecked();
    await kit.$('#input-8').uncheck();
    await expect(c.vv('VALUE')).toHaveText('false');
  });

  await test.step('9 - Checkbox with undefined init', async () => {
    const c = kit.getCase('9-checkbox-with-undefined-init');
    await expect(c.vv('VALUE')).toHaveText('');
    await expect(c.$('input')).not.toBeChecked();
    await kit.$('#input-9').check();
    await expect(c.vv('VALUE')).toHaveText('true');
    await kit.$('#input-9').uncheck();
    await expect(c.vv('VALUE')).toHaveText('false');
  });

  await test.step('10 - Base radio', async () => {
    const c = kit.getCase('10-base-radio');
    await expect(c.vv('VALUE')).toHaveText('"1"');
    await expect(c.$('input').nth(0)).toBeChecked();
    await expect(c.$('input').nth(1)).not.toBeChecked();
    await expect(c.$('input').nth(2)).not.toBeChecked();
    await kit.$('#input-10-2').check();
    await expect(c.vv('VALUE')).toHaveText('"2"');
    await expect(c.$('input').nth(0)).not.toBeChecked();
    await expect(c.$('input').nth(1)).toBeChecked();
    await expect(c.$('input').nth(2)).not.toBeChecked();
  });

  await test.step('11 - Radio without name', async () => {
    const c = kit.getCase('11-radio-without-name');
    await expect(c.vv('VALUE')).toHaveText('"1"');
    await expect(c.$('input').nth(0)).toBeChecked();
    await expect(c.$('input').nth(1)).not.toBeChecked();
    await expect(c.$('input').nth(2)).not.toBeChecked();
    await kit.$('#input-11-2').check();
    await expect(c.vv('VALUE')).toHaveText('"2"');
    await expect(c.$('input').nth(0)).not.toBeChecked();
    await expect(c.$('input').nth(1)).toBeChecked();
    await expect(c.$('input').nth(2)).not.toBeChecked();
  });

  await test.step('12 - Radio with undefined init', async () => {
    const c = kit.getCase('12-radio-with-undefined-init');
    await expect(c.vv('VALUE')).toHaveText('');
    await expect(c.$('input').nth(0)).not.toBeChecked();
    await expect(c.$('input').nth(1)).not.toBeChecked();
    await kit.$('#input-12-1').check();
    await expect(c.vv('VALUE')).toHaveText('"1"');
    await expect(c.$('input').nth(0)).toBeChecked();
    await expect(c.$('input').nth(1)).not.toBeChecked();
  });

  await test.step('13 - Radio with number value', async () => {
    const c = kit.getCase('13-radio-with-number-value');
    await expect(c.vv('VALUE')).toHaveText('1');
    await expect(c.$('input').nth(0)).toBeChecked();
    await expect(c.$('input').nth(1)).not.toBeChecked();
    await kit.$('#input-13-2').check();
    await expect(c.vv('VALUE')).toHaveText('2');
    await expect(c.$('input').nth(0)).not.toBeChecked();
    await expect(c.$('input').nth(1)).toBeChecked();
  });

  await test.step('14 - Base date', async () => {
    const c = kit.getCase('14-base-date');
    await expect(c.$('input')).toHaveValue('2022-02-24');
    await expect(c.vv('VALUE')).toHaveText('"2022-02-24"');
    await kit.$('#input-14').fill('2022-09-11');
    await expect(c.$('input')).toHaveValue('2022-09-11');
    await expect(c.vv('VALUE')).toHaveText('"2022-09-11"');
  });

  await test.step('15 - Date with Date valueType', async () => {
    const c = kit.getCase('15-date-with-date-type');
    await expect(c.$('input')).toHaveValue('2022-03-03');
    await expect(c.vv('VALUE')).toHaveText('"2022-03-03T00:00:00.000Z"');
    await kit.$('#input-15').fill('2023-01-02');
    await expect(c.$('input')).toHaveValue('2023-01-02');
    await expect(c.vv('VALUE')).toHaveText('"2023-01-02T00:00:00.000Z"');
  });

  await test.step('16 - Datetime-local', async () => {
    const c = kit.getCase('16-datetime-local');
    await expect(c.$('input')).toHaveValue('2022-02-24T05:00');
    await expect(c.vv('VALUE')).toHaveText('"2022-02-24T05:00"');
    await kit.$('#input-16').fill('2022-09-11T19:00');
    await expect(c.$('input')).toHaveValue('2022-09-11T19:00');
    await expect(c.vv('VALUE')).toHaveText('"2022-09-11T19:00"');
  });

  await test.step('17 - Datetime-local with Date valueType', async () => {
    const c = kit.getCase('17-datetime-local-with-date-type');
    await expect(c.$('input')).toHaveValue('2022-08-24T18:00');
    await expect(c.vv('VALUE')).toHaveText('"2022-08-24T18:00:00.000Z"');
    await kit.$('#input-17').fill('2023-01-02T02:22');
    await expect(c.$('input')).toHaveValue('2023-01-02T02:22');
    await expect(c.vv('VALUE')).toHaveText('"2023-01-02T02:22:00.000Z"');
  });

  await test.step('18 - Base file', async () => {
    const c = kit.getCase('18-base-file');
    await expect(c.vv('VALUE')).toHaveText('');
    await expect(c.vv('LEN')).toHaveText('null');
    await kit.chooseFiles('#input-18', ['./e2e/file-test.txt']);
    await expect(c.vv('VALUE')).toHaveText('{ "0": {} }');
    await expect(c.vv('LEN')).toHaveText('1');
  });

  await test.step('19 - File + readFiles', async () => {
    const c = kit.getCase('19-file-readfiles');
    await expect(c.vv('VALUE')).toHaveText('');
    await expect(c.vv('LEN')).toHaveText('null');
    await kit.chooseFiles('#input-19', ['./e2e/file-test.txt']);
    await expect(c.vv('VALUE')).toHaveText('{ "0": {} }');
    await expect(c.vv('LEN')).toHaveText('1');
    await expect(c.vv('LOADED_FILES__VALUE')).toHaveText(
      `[
  {
    "file": {},
    "data": "data:text/plain;base64,RklMRSBURVNUCg=="
  }
]
`,
    );
    await kit.chooseFiles('#input-19', ['./e2e/file-test.txt', './e2e/file-test-2.txt']);
    await expect(c.vv('VALUE')).toHaveText('{ "0": {}, "1": {} }');
    await expect(c.vv('LEN')).toHaveText('2');
    await expect(c.vv('LOADED_FILES__VALUE')).toHaveText(
      `[
  {
    "file": {},
    "data": "data:text/plain;base64,RklMRSBURVNUCg=="
  },
  {
    "file": {},
    "data": "data:text/plain;base64,RklMRSBURVNUIDIK"
  }
]`,
    );
  });

  await test.step('21 - Update on blur', async () => {
    const c = kit.getCase('21-update-on-blur');
    await expect(c.$('input')).toHaveValue('');
    await c.$('input').fill('abc');
    await expect(c.vv('VALUE')).toHaveText('');
    await kit.$('#input-1').focus();
    await expect(c.vv('VALUE')).toHaveText('"abc"');
  });

  await test.step('22 - Textarea', async () => {
    const c = kit.getCase('22-textarea');
    await expect(c.$('textarea')).toHaveValue('');
    await c.$('textarea').fill('xyz');
    await expect(c.vv('VALUE')).toHaveText('"xyz"');
  });

  await test.step('26 - touch on change', async () => {
    const c = kit.getCase('26-touch-on-change');
    await expect(c.vv('TOUCHED')).toHaveText('false');
    await c.$('input').fill('123');
    await expect(c.vv('TOUCHED')).toHaveText('true');
  });
});
