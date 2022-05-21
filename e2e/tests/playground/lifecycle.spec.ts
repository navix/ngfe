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
});
