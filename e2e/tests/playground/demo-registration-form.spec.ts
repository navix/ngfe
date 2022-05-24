import { expect, test } from '@playwright/test';
import { PageKit, PageKitFactory } from '../page-kit';

test.describe.serial('Demo:RegistrationForm', () => {
  let kit: PageKit;

  test.beforeAll(async ({browser}) => {
    kit = await PageKitFactory.new(browser);
  });

  test('open', async () => {
    await kit.goto('/demo-registration-form');
    await expect(kit.subTitle).toHaveText('Demo:RegistrationForm');
  });

  test('Init', async () => {
    await expect(kit.$('#form-validity')).toHaveText('FORM_VALIDITY: "invalid" ');
    await expect(kit.$('#form-value')).toHaveText('FORM_VALUE: { "email": "", "username": "", "password": "", "passwordConfirm": "" } ');
  });

  test('Show email errors on touch', async () => {
    await kit.$('#email').focus();
    await kit.$('#username').focus();
    await expect(kit.$('#email-errors')).toHaveText('ERRORS: { "required": true } ');
  });

  test('Show invalid email error', async () => {
    await kit.$('#email').fill('not an email');
    await expect(kit.$('#email-errors')).toHaveText('ERRORS: { "email": true } ');
  });

  test('Enter valid email', async () => {
    await kit.$('#email').fill('my@mail');
    await expect(kit.$('#email-errors')).not.toBeVisible();
  });

  test('Show username error on form submit', async () => {
    await kit.$('#submit').click();
    await expect(kit.$('#username-errors')).toHaveText('ERRORS: { "required": true } ');
    await expect(kit.$('#form-submitted')).toHaveText('FORM_SUBMITTED: false ');
  });

  test('Show username availability loading and then error', async () => {
    await kit.$('#username').fill('some_name');
    await expect(kit.$('#username-availability-loading')).toBeVisible();
    await expect(kit.$('#username-availability-loading')).not.toBeVisible();
    await expect(kit.$('#username-errors')).toHaveText('ERRORS: { "usernameAvailable": true } ');
  });

  test('Show username availability loading and then no error', async () => {
    await kit.$('#username').fill('my_name');
    await expect(kit.$('#username-availability-loading')).toBeVisible();
    await expect(kit.$('#username-availability-loading')).not.toBeVisible();
    await expect(kit.$('#username-errors')).not.toBeVisible();
  });

  test('Show different passwords errors', async () => {
    await kit.$('#password').fill('123');
    await kit.$('#passwordConfirm').fill('1234');
    await kit.$('#password').focus();
    await expect(kit.$('#password-confirm-errors')).toHaveText('ERRORS: { "equal": { "equal": "123", "modelValue": "1234" } } ');
  });

  test('Hide different passwords errors', async () => {
    await kit.$('#password').fill('1234');
    await expect(kit.$('#password-confirm-error')).not.toBeVisible();
  });

  test('Form is valid and have proper state', async () => {
    await expect(kit.$('#form-validity')).toHaveText('FORM_VALIDITY: "valid" ');
    await expect(kit.$('#form-value')).toHaveText('FORM_VALUE: { "email": "my@mail", "username": "my_name", "password": "1234", "passwordConfirm": "1234" } ');
  });

  test('Submit form', async () => {
    await kit.$('#submit').click();
    await expect(kit.$('#form-submitted')).toHaveText('FORM_SUBMITTED: true ');
  });
});
