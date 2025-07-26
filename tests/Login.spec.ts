import { test, expect } from "@playwright/test";

test('Login with valid regular user', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')

    //работают:
    //await page.getByPlaceholder('email@example.com').fill('anshika@gmail.com')
    //await page.getByPlaceholder('enter your passsword').fill('Iamking@000')
    await page.locator('#userEmail').fill('tonuza7211@dropjar.com')
    await page.locator('#userPassword').fill("123qweASD")

    //не работают:
    //await page.getByRole('textbox', {name:"userEmail"}).fill('anshika@gmail.com')
    //await page.getByRole('textbox', {name:"Password"}).fill('Iamking@000')

    await page.getByRole('button', {name: 'Login'}).click()
    await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible()

})

