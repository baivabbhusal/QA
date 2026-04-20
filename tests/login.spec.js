import { test, expect } from '@playwright/test';

test("valid login test",async ({page})=>{
 
    await page.goto('https://hamrocsit.com/account/');

})


test('login with valid username', async ({ page }) => {
  await page.goto('https://hamrocsit.com/account/');
  await page.getByLabel('Username').fill('standard_user');
  await page.getByLabel('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.getByText('Welcome back!')).toBeVisible();
});

test('login using invalid username and valid password',async ({page})=>{
  await page.goto('https://hamrocsit.com/account/');
  await page.getByLabel('Username').fill('apple');
  await page.getByLabel('Password').fill('nepal@123');
  await page.getByRole('button', { name: 'Login' }).click();
  const error=await page.locator()
  await expect()

})