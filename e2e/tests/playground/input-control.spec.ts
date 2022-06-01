import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('FeInputDirective', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async ({page}) => {
    await kit.goto('/input-control');
    await expect(kit.subTitle).toHaveText('FeInputDirective');
  });

  test('input 1 - base input', async () => {
    await expect(kit.$('#input-1')).toHaveValue('');
    await kit.$('#input-1').fill('aaa');
    await expect(kit.$('#input-1-value')).toHaveText('VAL: "aaa"');
  });

  test('input 2 - init value', async () => {
    await expect(kit.$('#input-2')).toHaveValue('123');
    await kit.$('#input-2').fill('');
    await expect(kit.$('#input-2-value')).toHaveText('VAL: ""');
    await kit.$('#input-2').fill('bbb');
    await expect(kit.$('#input-2-value')).toHaveText('VAL: "bbb"');
  });

  test('input 3 - init undefined', async () => {
    await expect(kit.$('#input-3-value')).toHaveText('VAL: ');
    await kit.$('#input-3').fill('ccc');
    await expect(kit.$('#input-3-value')).toHaveText('VAL: "ccc"');
  });

  test('input 4 - type number', async () => {
    await expect(kit.$('#input-4-value')).toHaveText('VAL: 111');
    await kit.$('#input-4').fill('222');
    await expect(kit.$('#input-4-value')).toHaveText('VAL: 222');
  });

  test('input 5 - type number with force type', async () => {
    await expect(kit.$('#input-5-value')).toHaveText('VAL: 111');
    await kit.$('#input-5').fill('222');
    await expect(kit.$('#input-5-value')).toHaveText('VAL: 222');
  });

  test('input 6 - type text with forced number type', async () => {
    await expect(kit.$('#input-6-value')).toHaveText('VAL: 666');
    await expect(kit.$('#input-6')).toHaveValue('666');
    await kit.$('#input-6').fill('777');
    await expect(kit.$('#input-6-value')).toHaveText('VAL: 777');
    await kit.$('#input-6').fill('00777');
    await expect(kit.$('#input-6')).toHaveValue('00777');
    await expect(kit.$('#input-6-value')).toHaveText('VAL: 777');
    await kit.$('#input-6').fill('0');
    await expect(kit.$('#input-6-value')).toHaveText('VAL: 0');
    await kit.$('#input-6').fill('');
    await expect(kit.$('#input-6')).toHaveValue('');
    await expect(kit.$('#input-6-value')).toHaveText('VAL: ');
    await kit.$('#input-6').fill('abc');
    await expect(kit.$('#input-6')).toHaveValue('abc');
    await expect(kit.$('#input-6-value')).toHaveText('VAL: ');
  });

  test('input 7 - base checkbox', async () => {
    await expect(kit.$('#input-7-value')).toHaveText('VAL: false');
    await expect(kit.$('#input-7')).not.toBeChecked();
    await kit.$('#input-7').check();
    await expect(kit.$('#input-7-value')).toHaveText('VAL: true');
    await expect(kit.$('#input-7')).toBeChecked();
    await kit.$('#input-7').uncheck();
    await expect(kit.$('#input-7-value')).toHaveText('VAL: false');
  });

  test('input 8 - checkbox with true init', async () => {
    await expect(kit.$('#input-8-value')).toHaveText('VAL: true');
    await expect(kit.$('#input-8')).toBeChecked();
    await kit.$('#input-8').uncheck();
    await expect(kit.$('#input-8-value')).toHaveText('VAL: false');
  });

  test('input 9 - checkbox with undefined init', async () => {
    await expect(kit.$('#input-9-value')).toHaveText('VAL: ');
    await expect(kit.$('#input-9')).not.toBeChecked();
    await kit.$('#input-9').check();
    await expect(kit.$('#input-9-value')).toHaveText('VAL: true');
    await kit.$('#input-9').uncheck();
    await expect(kit.$('#input-9-value')).toHaveText('VAL: false');
  });

  test('input 10 - base radio', async () => {
    await expect(kit.$('#input-10-value')).toHaveText('VAL: "1"');
    await expect(kit.$('#input-10-1')).toBeChecked();
    await expect(kit.$('#input-10-2')).not.toBeChecked();
    await expect(kit.$('#input-10-3')).not.toBeChecked();
    await kit.$('#input-10-2').check();
    await expect(kit.$('#input-10-value')).toHaveText('VAL: "2"');
    await expect(kit.$('#input-10-1')).not.toBeChecked();
    await expect(kit.$('#input-10-2')).toBeChecked();
    await expect(kit.$('#input-10-3')).not.toBeChecked();
  });

  test('input 11 - radio without name', async () => {
    await expect(kit.$('#input-11-value')).toHaveText('VAL: "1"');
    await expect(kit.$('#input-11-1')).toBeChecked();
    await expect(kit.$('#input-11-2')).not.toBeChecked();
    await expect(kit.$('#input-11-3')).not.toBeChecked();
    await kit.$('#input-11-2').check();
    await expect(kit.$('#input-11-value')).toHaveText('VAL: "2"');
    await expect(kit.$('#input-11-1')).not.toBeChecked();
    await expect(kit.$('#input-11-2')).toBeChecked();
    await expect(kit.$('#input-11-3')).not.toBeChecked();
  });

  test('input 12 - radio without undefined init', async () => {
    await expect(kit.$('#input-12-value')).toHaveText('VAL: ');
    await expect(kit.$('#input-12-1')).not.toBeChecked();
    await expect(kit.$('#input-12-2')).not.toBeChecked();
    await kit.$('#input-12-1').check();
    await expect(kit.$('#input-12-value')).toHaveText('VAL: "1"');
    await expect(kit.$('#input-12-1')).toBeChecked();
    await expect(kit.$('#input-12-2')).not.toBeChecked();
  });

  test('input 13 - radio without number value', async () => {
    await expect(kit.$('#input-13-value')).toHaveText('VAL: 1');
    await expect(kit.$('#input-13-1')).toBeChecked();
    await expect(kit.$('#input-13-2')).not.toBeChecked();
    await kit.$('#input-13-2').check();
    await expect(kit.$('#input-13-value')).toHaveText('VAL: 2');
    await expect(kit.$('#input-13-1')).not.toBeChecked();
    await expect(kit.$('#input-13-2')).toBeChecked();
  });

  test('input 14 - base date', async () => {
    await expect(kit.$('#input-14')).toHaveValue('2022-02-24');
    await expect(kit.$('#input-14-value')).toHaveText('VAL: "2022-02-24"');
    await kit.$('#input-14').fill('2022-09-11');
    await expect(kit.$('#input-14')).toHaveValue('2022-09-11');
    await expect(kit.$('#input-14-value')).toHaveText('VAL: "2022-09-11"');
  });

  test('input 15 - date with Date type', async () => {
    await expect(kit.$('#input-15')).toHaveValue('2022-03-03');
    await expect(kit.$('#input-15-value')).toHaveText('VAL: "2022-03-03T00:00:00.000Z"');
    await kit.$('#input-15').fill('2023-01-02');
    await expect(kit.$('#input-15')).toHaveValue('2023-01-02');
    await expect(kit.$('#input-15-value')).toHaveText('VAL: "2023-01-02T00:00:00.000Z"');
  });

  test('input 16 - datetime-local', async () => {
    await expect(kit.$('#input-16')).toHaveValue('2022-02-24T05:00');
    await expect(kit.$('#input-16-value')).toHaveText('VAL: "2022-02-24T05:00"');
    await kit.$('#input-16').fill('2022-09-11T19:00');
    await expect(kit.$('#input-16')).toHaveValue('2022-09-11T19:00');
    await expect(kit.$('#input-16-value')).toHaveText('VAL: "2022-09-11T19:00"');
  });

  test('input 17 - datetime-local with Date type', async () => {
    await expect(kit.$('#input-17')).toHaveValue('2022-08-24T18:00');
    await expect(kit.$('#input-17-value')).toHaveText('VAL: "2022-08-24T18:00:00.000Z"');
    await kit.$('#input-17').fill('2023-01-02T02:22');
    await expect(kit.$('#input-17')).toHaveValue('2023-01-02T02:22');
    await expect(kit.$('#input-17-value')).toHaveText('VAL: "2023-01-02T02:22:00.000Z"');
  });

  test('input 18 - base file', async () => {
    await expect(kit.$('#input-18-value')).toHaveText('VAL: , LEN: null');
    await kit.chooseFiles('#input-18', ['./e2e/file-test.txt']);
    await expect(kit.$('#input-18-value')).toHaveText('VAL: [object FileList], LEN: 1');
  });

  test('input 19 - file + readFiles', async () => {
    await expect(kit.$('#input-19-value')).toHaveText('VAL: , LEN: null');
    await expect(kit.$('#input-19-value-2')).toHaveText('LOADED FILES: , LEN: null');
    await kit.chooseFiles('#input-19', ['./e2e/file-test.txt']);
    await expect(kit.$('#input-19-value')).toHaveText('VAL: { "0": {} }, LEN: 1');
    await expect(kit.$('#input-19-value-2')).toHaveText('LOADED FILES: [ { "file": {}, "data": "data:text/plain;base64,RklMRSBURVNU" } ], LEN: 1');
    await kit.chooseFiles('#input-19', ['./e2e/file-test.txt', './e2e/file-test-2.txt']);
    await expect(kit.$('#input-19-value')).toHaveText('VAL: { "0": {}, "1": {} }, LEN: 2');
    await expect(kit.$('#input-19-value-2')).toHaveText('LOADED FILES: [ { "file": {}, "data": "data:text/plain;base64,RklMRSBURVNU" }, { "file": {}, "data": "data:text/plain;base64,RklMRSBURVNUIDIK" } ], LEN: 2');
  });

  test('input 21 - update on blur', async () => {
    await expect(kit.$('#input-21')).toHaveValue('');
    await kit.$('#input-21').fill('abc');
    await expect(kit.$('#input-21-value')).toHaveText('VAL: ');
    await kit.$('#input-1').focus();
    await expect(kit.$('#input-21-value')).toHaveText('VAL: "abc"');
  });

  test('input 22 - textarea', async () => {
    await expect(kit.$('#input-22')).toHaveValue('');
    await kit.$('#input-22').fill('xyz');
    await expect(kit.$('#input-22-value')).toHaveText('VAL: "xyz"');
  });

  test('input 26 - touch on change', async () => {
    await expect(kit.$('#input-26-touched')).toHaveText('TOUCHED: false');
    await kit.$('#input-26').fill('123');
    await expect(kit.$('#input-26-touched')).toHaveText('TOUCHED: true');
  });
});
