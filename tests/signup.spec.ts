import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/sign-up.page';
import { v4 as uuid } from "uuid";
import dotenv from 'dotenv';

dotenv.config();

test('Successful signup test', async ({ page }) => {
  const signupPage = new SignupPage(page);
  const name = process.env.USERNAME!;

  process.env.USERNAME = uuid() + '@test.com';
  const email = process.env.USERNAME!;
  
  await signupPage.goto();
  await signupPage.signUp(uuid(), email);

  // Assert we're redirected to the correct page after signup
  await expect(page.getByText('Enter Account Information')).toBeVisible();
});
