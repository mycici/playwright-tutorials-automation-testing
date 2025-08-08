import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Urls } from "../test-data/common/page-url-endpoints";
import { DefaultUser } from '../test-data/users';

test('Login with valid regular user', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit(Urls.login);
    await loginPage.login(DefaultUser.email, DefaultUser.password);
    await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible()

})

