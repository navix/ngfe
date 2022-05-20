import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Adapters', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async ({page}) => {
    await kit.goto('/adapters');
    await expect(kit.subTitle).toHaveText('Adapters');
  });

  test('1 - deepCopy adapter', async () => {
    await expect(kit.$('#control-1-value')).toHaveText('VAL: [ 1, 2, 3 ], MODEL_VALUE: [ 1, 2, 3 ], INPUT_VALUE: [ 1, 2, 3 ] ');
    await expect(kit.$('#control-1-eq')).toHaveText('EQ: true ');
    await kit.$('#control-value1dc').check();
    await expect(kit.$('#control-1-eq')).toHaveText('EQ: false ');
    await kit.$('#control-value1dc').uncheck();
    await expect(kit.$('#control-1-eq')).toHaveText('EQ: true ');
  });

  test('2 - numberToString adapter', async () => {
    await expect(kit.$('#control-2-value')).toHaveText('VAL: 222, MODEL_VALUE: 222, INPUT_VALUE: "222" ');
    await kit.$('#control-2').fill('444');
    await expect(kit.$('#control-2-value')).toHaveText(' VAL: 444, MODEL_VALUE: 444, INPUT_VALUE: "444" ');
    await kit.$('#control-2').fill('abc');
    await expect(kit.$('#control-2-value')).toHaveText('VAL: , MODEL_VALUE: , INPUT_VALUE: "abc" ');
  });

  test('3 - dateToDateString adapter', async () => {
    await expect(kit.$('#control-3-value')).toHaveText('VAL: "2022-02-24T00:00:00.000Z", MODEL_VALUE: "2022-02-24T00:00:00.000Z", INPUT_VALUE: "2022-02-24" ');
    await kit.$('#control-3').fill('2022-08-15');
    await expect(kit.$('#control-3-value')).toHaveText('VAL: "2022-08-15T00:00:00.000Z", MODEL_VALUE: "2022-08-15T00:00:00.000Z", INPUT_VALUE: "2022-08-15" ');
    await kit.$('#control-3').fill('abc');
    await expect(kit.$('#control-3-value')).toHaveText('VAL: , MODEL_VALUE: , INPUT_VALUE: "abc" ');
  });

  test('4 - dateToDateLocalString adapter', async () => {
    await expect(kit.$('#control-4-value')).toHaveText('VAL: "2022-02-24T04:00:00.000Z", MODEL_VALUE: "2022-02-24T04:00:00.000Z", INPUT_VALUE: "2022-02-24T04:00" ');
    await kit.$('#control-4').fill('2022-08-15T16:00');
    await expect(kit.$('#control-4-value')).toHaveText('VAL: "2022-08-15T16:00:00.000Z", MODEL_VALUE: "2022-08-15T16:00:00.000Z", INPUT_VALUE: "2022-08-15T16:00" ');
    await kit.$('#control-4').fill('abc');
    await expect(kit.$('#control-4-value')).toHaveText('VAL: , MODEL_VALUE: , INPUT_VALUE: "abc" ');
  });
});
