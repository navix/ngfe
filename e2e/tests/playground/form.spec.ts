import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Form', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/form');
    await expect(kit.subTitle).toHaveText('Form');
  });

  test('1 - Submit', async () => {
    await expect(kit.$('#control-1-touched')).toHaveText('TOUCHED: false');
    await expect(kit.$('#form-1-submitted')).toHaveText('FORM_SUBM: false ');
    await kit.$('#form-1-submit').click();
    await expect(kit.$('#control-1-touched')).toHaveText('TOUCHED: true');
    await expect(kit.$('#form-1-submitted')).toHaveText('FORM_SUBM: false ');
    await kit.$('#control-1').fill('www');
    await kit.$('#form-1-submit').click();
    await expect(kit.$('#form-1-submitted')).toHaveText('FORM_SUBM: true ');
  });

  test('2 - Update view on control remove', async () => {
    await expect(kit.$('#form-2-valid')).toHaveText('VALID: false');
    await kit.$('#show2').uncheck();
    await expect(kit.$('#form-2-valid')).toHaveText('VALID: true');
    await kit.$('#show2').check();
    await expect(kit.$('#form-2-valid')).toHaveText('VALID: false');
  });
});
