import { expect, test } from '@playwright/test';
import { delay } from '../../util';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('FeSelectDirective', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async ({page}) => {
    await kit.goto('/select-control');
    await expect(kit.subTitle).toHaveText('FeSelect');
  });

  test('select 1 - base select', async () => {
    await expect(kit.$('#select-1-value')).toHaveText('VAL: "2"');
    await expect(kit.$('#select-1')).toHaveValue('2');
    expect(await kit.isSelected('#select-1-2')).toBeTruthy();
    await kit.$('#select-1').selectOption('3');
    await expect(kit.$('#select-1-value')).toHaveText('VAL: "3"');
    expect(await kit.isSelected('#select-1-3')).toBeTruthy();
  });

  test('select 2 - select with undefined init', async () => {
    await expect(kit.$('#select-2-value')).toHaveText('VAL: ');
    await expect(kit.$('#select-2')).toHaveValue('');
    expect(await kit.isSelected('#select-2-1')).not.toBeTruthy();
    expect(await kit.isSelected('#select-2-2')).not.toBeTruthy();
    expect(await kit.isSelected('#select-2-3')).not.toBeTruthy();
    await kit.$('#select-2').selectOption('2');
    await expect(kit.$('#select-2-value')).toHaveText('VAL: "2"');
    expect(await kit.isSelected('#select-2-2')).toBeTruthy();
  });

  test('select 3 - select with undefined init and empty options', async () => {
    await expect(kit.$('#select-3-value')).toHaveText('VAL: ');
    await expect(kit.$('#select-3')).toHaveValue('');
    expect(await kit.isSelected('#select-3-0')).toBeTruthy();
    await kit.$('#select-3').selectOption('2');
    await expect(kit.$('#select-3-value')).toHaveText('VAL: "2"');
    expect(await kit.isSelected('#select-3-2')).toBeTruthy();
  });

  test('select 4 - base multiple', async () => {
    await expect(kit.$('#select-4-value')).toHaveText('VAL: [ "1", "2" ]');
    expect(await kit.isSelected('#select-4-1')).toBeTruthy();
    expect(await kit.isSelected('#select-4-2')).toBeTruthy();
    expect(await kit.isSelected('#select-4-3')).not.toBeTruthy();
    await kit.$('#select-4').selectOption('3');
    await expect(kit.$('#select-4-value')).toHaveText('VAL: [ "3" ]');
    expect(await kit.isSelected('#select-4-3')).toBeTruthy();
    await kit.$('#select-4').selectOption(['1', '3']);
    await expect(kit.$('#select-4-value')).toHaveText('VAL: [ "1", "3" ]');
    expect(await kit.isSelected('#select-4-1')).toBeTruthy();
    expect(await kit.isSelected('#select-4-2')).not.toBeTruthy();
    expect(await kit.isSelected('#select-4-3')).toBeTruthy();
  });

  test('select 5 - multiple with number values', async () => {
    await expect(kit.$('#select-5-value')).toHaveText('VAL: [ 10, 30 ]');
    expect(await kit.isSelected('#select-5-1')).toBeTruthy();
    expect(await kit.isSelected('#select-5-2')).not.toBeTruthy();
    expect(await kit.isSelected('#select-5-3')).toBeTruthy();
    await kit.$('#select-5').selectOption({label: 'VAL30'});
    await expect(kit.$('#select-5-value')).toHaveText('VAL: [ 30 ]');
    expect(await kit.isSelected('#select-5-3')).toBeTruthy();
    await kit.$('#select-5').selectOption([{label: 'VAL10'}, {label: 'VAL20'}]);
    await expect(kit.$('#select-5-value')).toHaveText('VAL: [ 10, 20 ]');
    expect(await kit.isSelected('#select-5-1')).toBeTruthy();
    expect(await kit.isSelected('#select-5-2')).toBeTruthy();
    expect(await kit.isSelected('#select-5-3')).not.toBeTruthy();
  });

  test('select 6 - select with number values', async () => {
    await expect(kit.$('#select-6-value')).toHaveText('VAL: 100');
    expect(await kit.isSelected('#select-6-1')).toBeTruthy();
    await kit.$('#select-6').selectOption({label: 'VAL200'});
    await expect(kit.$('#select-6-value')).toHaveText('VAL: 200');
    expect(await kit.isSelected('#select-6-2')).toBeTruthy();
  });

  test('select 7 - select with object values', async () => {
    await expect(kit.$('#select-7-value')).toHaveText('VAL: { "field": 456 }');
    expect(await kit.isSelected('#select-7-1')).toBeTruthy();
    await kit.$('#select-7').selectOption({label: '123'});
    await expect(kit.$('#select-7-value')).toHaveText('VAL: { "field": 123 }');
    expect(await kit.isSelected('#select-7-0')).toBeTruthy();
  });

  test('select 8 - select with undefined init and undefined option bind', async () => {
    await expect(kit.$('#select-8-value')).toHaveText('VAL: ');
    expect(await kit.isSelected('#select-8-1')).toBeTruthy();
    expect(await kit.isSelected('#select-8-2')).not.toBeTruthy();
  });

  test('select 9 - update on blur', async () => {
    await expect(kit.$('#select-9-value')).toHaveText('VAL: "1"');
    await kit.$('#select-9').focus();
    await kit.$('#select-9').selectOption({label: 'VAL2'});
    await expect(kit.$('#select-9-value')).toHaveText('VAL: "1"');
    await kit.$('#select-1').focus();
    await expect(kit.$('#select-9-value')).toHaveText('VAL: "2"');
  });

  test('10 - Disabled handling', async () => {
    await expect(await kit.$('#select-10').isDisabled()).toBeFalsy();
    await expect(kit.$('#select-10-disabled')).toHaveText('DISABLED: false ');
    await kit.$('#select-10-disabled-toggle').check();
    await delay(10);
    await expect(await kit.$('#select-10').isDisabled()).toBeTruthy();
    await expect(kit.$('#select-10-disabled')).toHaveText('DISABLED: true ');
  });

  test('11 - touch on change', async () => {
    await expect(kit.$('#select-11-touched')).toHaveText('TOUCHED: false');
    await kit.$('#select-11').selectOption({label: 'VAL2'});
    await expect(kit.$('#select-11-touched')).toHaveText('TOUCHED: true');
  });

  test('12 - cross-change, should properly re-set value received from input', async () => {
    await kit.$('#select-12_1').selectOption({label: 'VAL1'});
    await expect(kit.$('#select-12_1-input-value')).toHaveText('INPUT_VALUE: "1"');
    expect(await kit.isSelected('#select-12_1-opt-1')).toBeTruthy();
    expect(await kit.isSelected('#select-12_2-opt-1')).toBeTruthy();
    await kit.$('#select-12_2').selectOption({label: 'VAL2'});
    await expect(kit.$('#select-12_1-model-value')).toHaveText('MODEL_VALUE: "2"');
    await expect(kit.$('#select-12_1-input-value')).toHaveText('INPUT_VALUE: "2"');
    expect(await kit.isSelected('#select-12_1-opt-2')).toBeTruthy();
    await kit.$('#select-12_2').selectOption({label: 'VAL1'});
    await expect(kit.$('#select-12_1-model-value')).toHaveText('MODEL_VALUE: "1"');
    await expect(kit.$('#select-12_1-input-value')).toHaveText('INPUT_VALUE: "1"');
    expect(await kit.isSelected('#select-12_1-opt-1')).toBeTruthy();
    await kit.$('#select-12_2').selectOption({label: 'VAL2'});
    await expect(kit.$('#select-12_1-model-value')).toHaveText('MODEL_VALUE: "2"');
    await expect(kit.$('#select-12_1-input-value')).toHaveText('INPUT_VALUE: "2"');
    expect(await kit.isSelected('#select-12_1-opt-2')).toBeTruthy();
    await kit.$('#select-12_1').selectOption({label: 'VAL3'});
    expect(await kit.isSelected('#select-12_2-opt-3')).toBeTruthy();
    await kit.$('#select-12_1').selectOption({label: 'VAL2'});
    expect(await kit.isSelected('#select-12_2-opt-2')).toBeTruthy();
  });
});
