import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Text', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async ({page}) => {
    await kit.goto('/text');
    await expect(kit.subTitle).toHaveText('FeTextDirective');
  });

  test.describe.serial('input 1', () => {
    test('have value "aaa"', async () => {
      await expect(kit.inputByName('text1')).toHaveValue('aaa');
    });

    test('enter value "bbb"', async () => {
      await kit.inputByName('text1').fill('bbb');
      await kit.page.screenshot({path: 'scr.png'});
    });
  });
});
