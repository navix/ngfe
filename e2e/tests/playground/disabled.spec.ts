import { expect, test } from '@playwright/test';
import { delay } from '../../util';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Disabled', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/disabled');
    await expect(kit.subTitle).toHaveText('Disabled');
  });

  test('1 - Control disabled handling', async () => {
    await expect(await kit.$('#control-1').isDisabled()).toBeTruthy();
    await expect(kit.$('#control-1-disabled')).toHaveText('DISABLED: true ');
  });

  test('2 - Disabled toggle', async () => {
    await expect(await kit.$('#control-2').isDisabled()).toBeFalsy();
    await expect(kit.$('#control-2-disabled')).toHaveText('DISABLED: false ');
    await kit.$('#control-2-disabled-toggle').check();
    await delay(10);
    await expect(await kit.$('#control-2').isDisabled()).toBeTruthy();
    await expect(kit.$('#control-2-disabled')).toHaveText('DISABLED: true ');
    await kit.$('#control-2-disabled-toggle').uncheck();
    await delay(10);
    await expect(await kit.$('#control-2').isDisabled()).toBeFalsy();
    await expect(kit.$('#control-2-disabled')).toHaveText('DISABLED: false ');
  });

  test('3 - Disabled in group', async () => {
    await expect(kit.$('#control-3-disabled')).toHaveText('DISABLED: false ');
    await expect(kit.$('#control-3-valid')).toHaveText('VAL: false ');
    await expect(kit.$('#form-3-valid')).toHaveText('FORM_VAL: false ');
    await kit.$('#control-3-disabled-toggle').check();
    await delay(10);
    await expect(kit.$('#control-3-disabled')).toHaveText('DISABLED: true ');
    await expect(kit.$('#control-3-valid')).toHaveText('VAL: false ');
    await expect(kit.$('#form-3-valid')).toHaveText('FORM_VAL: true ');
    await expect(kit.$('#form-3-valid-async')).toHaveText('FORM_VAL$: true ');
    await kit.$('#control-3-disabled-toggle').uncheck();
    await delay(10);
    await expect(kit.$('#control-3-disabled')).toHaveText('DISABLED: false ');
    await expect(kit.$('#control-3-valid')).toHaveText('VAL: false ');
    await expect(kit.$('#form-3-valid')).toHaveText('FORM_VAL: false ');
    await expect(kit.$('#form-3-valid-async')).toHaveText('FORM_VAL$: false ');
    await kit.$('#control-3').fill('qqq');
    await expect(kit.$('#control-3-valid')).toHaveText('VAL: true ');
    await expect(kit.$('#form-3-valid')).toHaveText('FORM_VAL: true ');
    await expect(kit.$('#form-3-valid-async')).toHaveText('FORM_VAL$: true ');
  });

  test('4 - Direct disabled bind in group', async () => {
    await expect(kit.$('#control-4-disabled')).toHaveText('DISABLED: false ');
    await expect(kit.$('#form-4-valid')).toHaveText('FORM_VAL: false ');
    await kit.$('#control-4-disabled-toggle').check();
    await delay(10);
    await expect(kit.$('#control-4-disabled')).toHaveText('DISABLED: true ');
    await expect(kit.$('#form-4-valid')).toHaveText('FORM_VAL: true ');
    await expect(kit.$('#form-4-valid-async')).toHaveText('FORM_VAL$: true ');
    await kit.$('#control-4-disabled-toggle').uncheck();
    await delay(10);
    await expect(kit.$('#control-4-disabled')).toHaveText('DISABLED: false ');
    await expect(kit.$('#form-4-valid')).toHaveText('FORM_VAL: false ');
    await expect(kit.$('#form-4-valid-async')).toHaveText('FORM_VAL$: false ');
    await kit.$('#control-4').fill('qqq');
    await expect(kit.$('#form-4-valid')).toHaveText('FORM_VAL: true ');
    await expect(kit.$('#form-4-valid-async')).toHaveText('FORM_VAL$: true ');
  });
});
