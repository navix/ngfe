import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Lifecycle', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/lifecycle');
    await expect(kit.subTitle).toHaveText('Lifecycle');
  });

  test('1 - (destroy)', async () => {
    await expect(kit.$('#control-1')).toHaveValue('123');
    await expect(kit.$('#control-1-value')).toHaveText('VAL: "123"');
    await kit.$('#control-1-toggle').click();
    await expect(kit.$('#control-1-value')).toHaveText('VAL: ');
    await kit.$('#control-1-toggle').click();
    await expect(kit.$('#control-1')).toHaveValue('');
    await expect(kit.$('#control-1-value')).toHaveText('VAL: ');
    await kit.$('#control-1').fill('aaa');
    await expect(kit.$('#control-1-value')).toHaveText('VAL: "aaa"');
    await kit.$('#control-1-toggle').click();
    await expect(kit.$('#control-1-value')).toHaveText('VAL: ');
    await kit.$('#control-1-toggle').click();
    await expect(kit.$('#control-1-value')).toHaveText('VAL: ');
  });

  test('2 - Touched handler', async () => {
    await expect(kit.$('#control-2-touched')).toHaveText('TOUCHED: false');
    await kit.$('#control-2').focus();
    await expect(kit.$('#control-2-touched')).toHaveText('TOUCHED: false');
    await kit.$('#control-1').focus();
    await expect(kit.$('#control-2-touched')).toHaveText('TOUCHED: true');
  });

  test('3 - Dirty handler', async () => {
    await expect(kit.$('#control-3-dirty')).toHaveText('DIRTY: false');
    await kit.$('#control-3').focus();
    await expect(kit.$('#control-3-dirty')).toHaveText('DIRTY: false');
    await kit.$('#control-2').focus();
    await expect(kit.$('#control-3-dirty')).toHaveText('DIRTY: false');
    await kit.$('#control-3').fill('123');
    await expect(kit.$('#control-3-dirty')).toHaveText('DIRTY: true');
  });

  test('4 - feIf & ensure', async () => {
    await expect(kit.$('#control-4')).toHaveValue('123');
    await expect(kit.$('#value-4')).toHaveText('VALUE: "123"');
    await expect(kit.$('#ensure-count-4')).toHaveText('ENSURE_COUNT: 1 ');
    await kit.$('#rm-4').click();
    await expect(kit.$('#value-4')).toHaveText('VALUE: "123"');
    await expect(kit.$('#ensure-count-4')).toHaveText('ENSURE_COUNT: 2 ');
    await kit.$('#force-4').uncheck();
    await kit.$('#rm-4').click();
    await expect(kit.$('#control-4')).toHaveValue('');
    await expect(kit.$('#value-4')).toHaveText('VALUE:');
    await expect(kit.$('#ensure-count-4')).toHaveText('ENSURE_COUNT: 2 ');
    await kit.$('#force-4').check();
    await expect(kit.$('#value-4')).toHaveText('VALUE: "123"');
    await expect(kit.$('#ensure-count-4')).toHaveText('ENSURE_COUNT: 3 ');
    await kit.$('#show-4').uncheck();
    await expect(kit.$('#value-4')).toHaveText('VALUE:');
    await expect(kit.$('#ensure-count-4')).toHaveText('ENSURE_COUNT: 4 ');
    await kit.$('#show-4').check();
    await expect(kit.$('#control-4')).toHaveValue('123');
    await expect(kit.$('#value-4')).toHaveText('VALUE: "123"');
    await expect(kit.$('#ensure-count-4')).toHaveText('ENSURE_COUNT: 5 ');
  });
});
