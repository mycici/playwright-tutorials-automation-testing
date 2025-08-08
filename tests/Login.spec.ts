import { test, expect } from "@playwright/test";
import { Urls } from "../test-data/common/page-url-endpoints";

test('Login with valid regular user', async ({page}) => {
    await page.goto(Urls.login)

    await page.locator('#userEmail').fill('tonuza7211@dropjar.com')
    await page.locator('#userPassword').fill("123qweASD")

    await page.getByRole('button', {name: 'Login'}).click()
    await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible()

    

})

