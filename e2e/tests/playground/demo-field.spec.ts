import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Demo:Field', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/demo-field');
    await expect(kit.subTitle).toHaveText('Demo:Field');
  });

  test('Errors on touch', async () => {
    await expect(kit.$('#field-1 [errors]')).not.toBeVisible();
    await kit.$('#control-1').focus();
    await kit.$('#unfocus').focus();
    await expect(kit.$('#field-1 [errors]')).toHaveText('{ "equal": { "equal": "123", "modelValue": "" } } ');
  });

  test('Required mark', async () => {
    await expect(kit.$('#field-2 label')).toHaveText('Field-2 *');
    await kit.$('#control-2-required-toggle').uncheck();
    await expect(kit.$('#field-2 label')).toHaveText('Field-2');
    await expect(kit.$('#field-2 label')).not.toHaveText('Field-2 *');
    await kit.$('#control-2-required-toggle').check();
    await expect(kit.$('#field-2 label')).toHaveText('Field-2 *');
  });
});
