import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Urls } from "../test-data/common/page-url-endpoints";
import { getTestUser } from '../test-data/env';

test('Login with valid regular user',
    { tag: '@P1' },
    async ({ page }) => {
        const defaultUser = getTestUser();
        const loginPage = new LoginPage(page);
        await loginPage.visit(Urls.login);
        await loginPage.login(defaultUser.email, defaultUser.password);
        await loginPage.verifyLogin();
    })

