import {expect, test} from '@playwright/test';
import {PageKitFactory} from '../page-kit';

test('Form', async ({browser}) => {
  const kit = await PageKitFactory.new(browser);

  await test.step('open', async () => {
    await kit.goto('/form');
    await expect(kit.subTitle).toHaveText('Form');
  });

  await test.step('1 - Submit', async () => {
    const c = kit.getCase('1-submit');
    await expect(c.vv('FIELD_TOUCHED')).toHaveText('false');
    await expect(c.vv('SUBMITTED_VALIDITY')).toHaveText('');
    await c.$('button').click();
    await expect(c.vv('FIELD_TOUCHED')).toHaveText('true');
    await expect(c.vv('SUBMITTED_VALIDITY')).toHaveText('false');
    await c.$('input').fill('www');
    await c.$('button').click();
    await expect(c.vv('SUBMITTED_VALIDITY')).toHaveText('true');
  });

  await test.step('2 - Update view on control remove', async () => {
    const c = kit.getCase('2-view-update-on-structure-update');
    await expect(c.vv('FORM_VALID')).toHaveText('false');
    await c.$('#show2').uncheck();
    await expect(c.vv('FORM_VALID')).toHaveText('true');
    await expect(c.vv('FORM_VALID__OUTSIDE_VIEW')).toHaveText('true');
    await c.$('#show2').check();
    await expect(c.vv('FORM_VALID')).toHaveText('false');
    await expect(c.vv('FORM_VALID__OUTSIDE_VIEW')).toHaveText('false');
  });

  await test.step('3 - Form Submit', async () => {
    const c = kit.getCase('3-form-submit');
    await expect(c.vv('FIELD_TOUCHED')).toHaveText('false');
    await expect(c.vv('SUBMITTED_VALIDITY')).toHaveText('');
    await c.$('button').click();
    await expect(c.vv('FIELD_TOUCHED')).toHaveText('true');
    await expect(c.vv('SUBMITTED_VALIDITY')).toHaveText('false');
    await c.$('input').fill('www');
    await c.$('button').click();
    await expect(c.vv('SUBMITTED_VALIDITY')).toHaveText('true');
  });
});
