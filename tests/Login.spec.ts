import { test, expect } from "@playwright/test";

test('Login with valid regular user', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')

    await page.locator('#userEmail').fill('tonuza7211@dropjar.com')
    await page.locator('#userPassword').fill("123qweASD")

    await page.getByRole('button', {name: 'Login'}).click()
    await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible()

    

})

