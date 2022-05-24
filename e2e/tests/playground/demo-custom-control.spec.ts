import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Demo:CustomControl', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/demo-custom-control');
    await expect(kit.subTitle).toHaveText('Demo:CustomControl');
  });

  test('Basic custom control', async () => {
    await expect(kit.$('#control-1-value')).toHaveText('VALUE: "" ');
    await expect(kit.$('#control-1-touched')).toHaveText('TOUCHED: false ');
    await kit.$('#control-1 input').fill('eee');
    await expect(kit.$('#control-1-value')).toHaveText('VALUE: "eee" ');
    await expect(kit.$('#control-1-touched')).toHaveText('TOUCHED: false ');
    await kit.$('#unfocus').focus();
    await expect(kit.$('#control-1-touched')).toHaveText('TOUCHED: true ');
  });
});
