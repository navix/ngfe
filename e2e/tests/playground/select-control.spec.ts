import {expect, test} from '@playwright/test';
import {PageKitFactory} from '../page-kit';

test('Select Control', async ({browser}) => {
  const kit = await PageKitFactory.new(browser);

  await test.step('Open page', async () => {
    await kit.goto('/select-control');
    await expect(kit.subTitle).toHaveText('Select Control');
  });

  await test.step('1 - base select', async () => {
    const c = kit.getCase('1-base-select');
    await expect(c.vv('VALUE')).toHaveText('"2"');
    await expect(c.$('select')).toHaveValue('2');
    expect(await kit.isSelected(c.$('#select-1-2'))).toBeTruthy();

    await test.step('select other option', async () => {
      await c.$('select').selectOption('3');
      await expect(c.vv('VALUE')).toHaveText('"3"');
      expect(await kit.isSelected(c.$('#select-1-3'))).toBeTruthy();
    });
  });

  await test.step('2 - select with undefined init', async () => {
    const c = kit.getCase('2-base-select-undefined-init');
    await expect(c.vv('VALUE')).toHaveText('');
    await expect(c.$('select')).toHaveValue('');
    expect(await kit.isSelected(c.$('#select-2-1'))).not.toBeTruthy();
    expect(await kit.isSelected(c.$('#select-2-2'))).not.toBeTruthy();
    expect(await kit.isSelected(c.$('#select-2-3'))).not.toBeTruthy();
    await c.$('select').selectOption('2');
    await expect(c.vv('VALUE')).toHaveText('"2"');
    expect(await kit.isSelected(c.$('#select-2-2'))).toBeTruthy();
  });

  await test.step('3 - select with undefined init and empty options', async () => {
    const c = kit.getCase('3-base-select-undefined-init-empty-option');
    await expect(c.vv('VALUE')).toHaveText('');
    expect(await kit.isSelected(c.$('#select-3-0'))).toBeTruthy();
    await c.$('select').selectOption('2');
    await expect(c.vv('VALUE')).toHaveText('"2"');
    expect(await kit.isSelected(c.$('#select-3-2'))).toBeTruthy();
  });

  await test.step('4 - base multiple', async () => {
    const c = kit.getCase('4-base-multiple');
    await expect(c.vv('VALUE')).toHaveText('[ "1", "2" ]');
    expect(await kit.isSelected(c.$('#select-4-1'))).toBeTruthy();
    expect(await kit.isSelected(c.$('#select-4-2'))).toBeTruthy();
    expect(await kit.isSelected(c.$('#select-4-3'))).not.toBeTruthy();
    await c.$('select').selectOption('3');
    await expect(c.vv('VALUE')).toHaveText('[ "3" ]');
    expect(await kit.isSelected(c.$('#select-4-3'))).toBeTruthy();
    await c.$('select').selectOption(['1', '3']);
    await expect(c.vv('VALUE')).toHaveText('[ "1", "3" ]');
    expect(await kit.isSelected(c.$('#select-4-1'))).toBeTruthy();
    expect(await kit.isSelected(c.$('#select-4-2'))).not.toBeTruthy();
    expect(await kit.isSelected(c.$('#select-4-3'))).toBeTruthy();
  });

  await test.step('5 - multiple with number values', async () => {
    const c = kit.getCase('5-multiple-select-number-values');
    await expect(c.vv('VALUE')).toHaveText('[ 10, 30 ]');
    expect(await kit.isSelected(c.$('#select-5-1'))).toBeTruthy();
    expect(await kit.isSelected(c.$('#select-5-2'))).not.toBeTruthy();
    expect(await kit.isSelected(c.$('#select-5-3'))).toBeTruthy();
    await c.$('select').selectOption({label: 'VAL30'});
    await expect(c.vv('VALUE')).toHaveText('[ 30 ]');
    expect(await kit.isSelected(c.$('#select-5-3'))).toBeTruthy();
    await c.$('select').selectOption([{label: 'VAL10'}, {label: 'VAL20'}]);
    await expect(c.vv('VALUE')).toHaveText('[ 10, 20 ]');
    expect(await kit.isSelected(c.$('#select-5-1'))).toBeTruthy();
    expect(await kit.isSelected(c.$('#select-5-2'))).toBeTruthy();
    expect(await kit.isSelected(c.$('#select-5-3'))).not.toBeTruthy();
  });

  await test.step('6 - select with number values', async () => {
    const c = kit.getCase('6-select-number-values');
    await expect(c.vv('VALUE')).toHaveText('100');
    expect(await kit.isSelected(c.$('#select-6-1'))).toBeTruthy();
    await c.$('select').selectOption({label: 'VAL200'});
    await expect(c.vv('VALUE')).toHaveText('200');
    expect(await kit.isSelected(c.$('#select-6-2'))).toBeTruthy();
  });

  await test.step('7 - select with object values', async () => {
    const c = kit.getCase('7-select-objects-values');
    await expect(c.vv('VALUE')).toHaveText('{ "field": 456 }');
    expect(await kit.isSelected(c.$('#select-7-1'))).toBeTruthy();
    await c.$('select').selectOption({label: '123'});
    await expect(c.vv('VALUE')).toHaveText('{ "field": 123 }');
    expect(await kit.isSelected(c.$('#select-7-0'))).toBeTruthy();
  });

  await test.step('8 - select with undefined init and undefined option bind', async () => {
    const c = kit.getCase('8-select-undefined-init-undefined-option');
    await expect(c.vv('VALUE')).toHaveText('');
    expect(await kit.isSelected(c.$('#select-8-1'))).toBeTruthy();
    expect(await kit.isSelected(c.$('#select-8-2'))).not.toBeTruthy();
  });

  await test.step('9 - update on blur', async () => {
    const c = kit.getCase('9-select-update-on-blur');
    await expect(c.vv('VALUE')).toHaveText('"1"');
    await kit.$('#select-9').focus();
    await c.$('select').selectOption({label: 'VAL2'});
    await expect(c.vv('VALUE')).toHaveText('"1"');
    await kit.$('#select-1').focus();
    await expect(c.vv('VALUE')).toHaveText('"2"');
  });

  await test.step('10 - Disabled handling', async () => {
    const c = kit.getCase('10-select-disabled-handling');
    await expect(c.$('select')).not.toBeDisabled();
    await expect(c.vv('DISABLED')).toHaveText('false');
    await c.$('#select-10-disabled-toggle').check();
    await expect(c.$('select')).toBeDisabled();
    await expect(c.vv('DISABLED')).toHaveText('true');
  });

  await test.step('11 - touch on change', async () => {
    const c = kit.getCase('11-select-touch-on-change');
    await expect(c.vv('TOUCHED')).toHaveText('false');
    await c.$('select').selectOption({label: 'VAL2'});
    await expect(c.vv('TOUCHED')).toHaveText('true');
  });

  await test.step('12 - cross-change, should properly re-set value received from input', async () => {
    const c = kit.getCase('12-select-cross-change');
    await c.$('select').first().selectOption({label: 'VAL1'});
    await expect(c.vv('VALUE')).toHaveText('"1"');
    expect(await kit.isSelected(c.$('#select-12_1-opt-1'))).toBeTruthy();
    expect(await kit.isSelected(c.$('#select-12_2-opt-1'))).toBeTruthy();
    await c.$('select').last().selectOption({label: 'VAL2'});
    await expect(c.vv('VALUE')).toHaveText('"2"');
    await expect(c.vv('MODEL_VALUE')).toHaveText('"2"');
    expect(await kit.isSelected(c.$('#select-12_1-opt-2'))).toBeTruthy();
    await c.$('select').last().selectOption({label: 'VAL1'});
    await expect(c.vv('VALUE')).toHaveText('"1"');
    await expect(c.vv('MODEL_VALUE')).toHaveText('"1"');
    expect(await kit.isSelected(c.$('#select-12_1-opt-1'))).toBeTruthy();
    await c.$('select').last().selectOption({label: 'VAL2'});
    await expect(c.vv('VALUE')).toHaveText('"2"');
    await expect(c.vv('MODEL_VALUE')).toHaveText('"2"');
    expect(await kit.isSelected(c.$('#select-12_1-opt-2'))).toBeTruthy();
    await c.$('select').first().selectOption({label: 'VAL3'});
    expect(await kit.isSelected(c.$('#select-12_2-opt-3'))).toBeTruthy();
    await c.$('select').first().selectOption({label: 'VAL2'});
    expect(await kit.isSelected(c.$('#select-12_2-opt-2'))).toBeTruthy();
  });

  await test.step('13 - dynamic options', async () => {
    const c = kit.getCase('13-select-dynamic-options');
    await expect(c.vv('VALUE')).toHaveText('');
    await test.step('select option', async () => {
      await c.$('select').first().selectOption('2');
      await expect(c.vv('VALUE')).toHaveText('"2"');
    });
    await test.step('change options set, do not change value in model, but select no options', async () => {
      expect(await kit.isSelected(c.$('#select-13-1'))).toBeTruthy();
      await c.$('select').last().selectOption('Options B');
      await expect(c.vv('VALUE')).toHaveText('"2"');
      expect(await kit.isSelected(c.$('#select-13-0'))).toBeFalsy();
      expect(await kit.isSelected(c.$('#select-13-1'))).toBeFalsy();
    });
    await test.step('change prev option set, show current value as selected', async () => {
      await c.$('select').last().selectOption('Options A');
      await expect(c.vv('VALUE')).toHaveText('"2"');
      expect(await kit.isSelected(c.$('#select-13-1'))).toBeTruthy();
    });
  });
});
