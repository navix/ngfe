import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('FeSelectDirective', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async ({page}) => {
    await kit.goto('/select-control');
    await expect(kit.subTitle).toHaveText('FeSelectDirective');
  });

  test('select 1 - base select', async () => {
    await expect(kit.$('#select-1-value')).toHaveText('VAL: "2"');
    await expect(kit.$('#select-1')).toHaveValue('2');
    await kit.$('#select-1').selectOption('3');
    await expect(kit.$('#select-1-value')).toHaveText('VAL: "3"');
  });

  test('select 2 - select with undefined init', async () => {
    await expect(kit.$('#select-2-value')).toHaveText('VAL: ');
    await expect(kit.$('#select-2')).toHaveValue('');
    await kit.$('#select-2').selectOption('2');
    await expect(kit.$('#select-2-value')).toHaveText('VAL: "2"');
  });

  test('select 3 - select with undefined init and empty options', async () => {
    await expect(kit.$('#select-3-value')).toHaveText('VAL: ');
    await expect(kit.$('#select-3')).toHaveValue('');
//    await expect(await kit.$('#select-3-empty-opt').getAttribute('selected')).toBeTruthy();
    await kit.$('#select-3').selectOption('2');
    await expect(kit.$('#select-3-value')).toHaveText('VAL: "2"');
  });

  test('select 4 - base multiple', async () => {
    await expect(kit.$('#select-4-value')).toHaveText('VAL: [ "1", "2" ]');
    await kit.$('#select-4').selectOption('3');
    await expect(kit.$('#select-4-value')).toHaveText('VAL: [ "3" ]');
    await kit.$('#select-4').selectOption(['1', '3']);
    await expect(kit.$('#select-4-value')).toHaveText('VAL: [ "1", "3" ]');
  });

  test('select 6 - select with number values', async () => {
    await expect(kit.$('#select-6-value')).toHaveText('VAL: 100');
    await kit.$('#select-6').selectOption({label: 'VAL200'});
    await expect(kit.$('#select-6-value')).toHaveText('VAL: 200');
  });

  test('select 7 - select with object values', async () => {
    await expect(kit.$('#select-7-value')).toHaveText('VAL: { "field": 456 }');
    await kit.$('#select-7').selectOption({label: '123'});
    await expect(kit.$('#select-7-value')).toHaveText('VAL: { "field": 123 }');
  });
});
