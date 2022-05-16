import { expect, test } from '@playwright/test';

test.describe('Main', () => {
  test('open', async ({page}) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('🧰 ngfe');
  });
});
