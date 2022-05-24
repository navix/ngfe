import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Demo:SubForm', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/demo-sub-form');
    await expect(kit.subTitle).toHaveText('Demo:SubForm');
  });

  test('Field 1', async () => {
    await expect(kit.$('#form-valid')).toHaveText('FORM_VALID: false ');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "", "subForm": { "subField1": "" } }  ');
    await kit.$('#field1').fill('aaa');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "aaa", "subForm": { "subField1": "" } } ');
  });

  test('Sub Field 1', async () => {
    await kit.$('#subField1').fill('bbb');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "aaa", "subForm": { "subField1": "bbb" } } ');
  });

  test('Sub Field 2', async () => {
    await kit.$('#subField2').fill('123');
    await expect(kit.$('#form-value')).toHaveText(' FORM_VALUE: { "field1": "aaa", "subForm": { "subField1": "bbb", "subField2": 123 } } ');
  });
});
