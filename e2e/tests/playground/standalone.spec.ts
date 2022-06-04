import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Standalone', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/standalone');
    await expect(kit.subTitle).toHaveText('Standalone');
  });

  test('1 - Standalone control', async () => {
    await expect(kit.$('#value-1')).toHaveText('VALUE: "" ');
    await kit.$('#control-1').fill('123');
    await expect(kit.$('#value-1')).toHaveText('VALUE: "123" ');
  });

  test('2 - Standalone validator', async () => {
    await expect(kit.$('#errors-2')).toHaveText(' ERRORS: { "required": true } ');
    await kit.$('#control-2').fill('abc');
    await expect(kit.$('#errors-2')).toHaveText(' ERRORS: ');
  });
});
