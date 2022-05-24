import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Demo:DynamicForm', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/demo-dynamic-form');
    await expect(kit.subTitle).toHaveText('Demo:DynamicForm');
  });

  test('Field 1', async () => {
    await expect(kit.$('#form-valid')).toHaveText('FORM_VALID: false ');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "", "showField2": false, "showField3": false } ');
    await kit.$('#field1').fill('aaa');
    await expect(kit.$('#form-valid')).toHaveText('FORM_VALID: true ');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "aaa", "showField2": false, "showField3": false } ');
  });

  test('Field 2', async () => {
    await kit.$('#showField2').check();
    await expect(kit.$('#form-valid')).toHaveText('FORM_VALID: false ');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "aaa", "showField2": true, "showField3": false } ');
    await kit.$('#field2').fill('123');
    await expect(kit.$('#form-valid')).toHaveText('FORM_VALID: true ');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "aaa", "showField2": true, "showField3": false, "field2": 123 } ');
    await kit.$('#showField2').uncheck();
    await expect(kit.$('#form-valid')).toHaveText('FORM_VALID: true ');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "aaa", "showField2": false, "showField3": false } ');
  });

  test('Field 3', async () => {
    await kit.$('#showField3').check();
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "aaa", "showField2": false, "showField3": true } ');
    await kit.$('#field1').fill('abc');
    await expect(kit.$('#form-value')).toHaveText('FORM_VALUE: { "field1": "abc", "showField2": false, "showField3": true, "field3": [ { "subField": "ph" } ] } ');
    await kit.$('#add-row').click();
    await expect(kit.$('#form-value')).toHaveText('FORM_VALUE: { "field1": "abc", "showField2": false, "showField3": true, "field3": [ { "subField": "ph" }, { "subField": "" } ] } ');
    await kit.$('#showField3').uncheck();
    await expect(kit.$('#form-value')).toHaveText('FORM_VALUE: { "field1": "abc", "showField2": false, "showField3": false } ');
  });
});
