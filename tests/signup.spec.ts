import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/sign-up.page';
import { v4 as uuid } from "uuid";
import dotenv from 'dotenv';
import { AccountInformationPage } from '../pages/account-information.page';

dotenv.config();

test('Successful signup test', async ({ page }) => {
  const signupPage = new SignupPage(page);
  const name = process.env.USERNAME!;

  process.env.USERNAME = uuid() + '@test.com';
  const email = process.env.USERNAME!;
  
  await signupPage.goto();
  const accountInformationPage = await signupPage.signUp(uuid(), email);
  
  await expect(accountInformationPage.accountInformaionHeader).toBeVisible();
});
