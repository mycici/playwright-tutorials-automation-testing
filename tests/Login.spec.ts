import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Urls } from "../test-data/common/page-url-endpoints";
import { getDefaultUser, type Environment } from '../test-data/users';

test('Login with valid regular user',
    { tag: '@P1' },
    async ({ page }) => {
        const envName = (test.info().project.name as Environment) || 'qa';
        const defaultUser = getDefaultUser(envName);
        const loginPage = new LoginPage(page);
        await loginPage.visit(Urls.login);
        await loginPage.login(defaultUser.email, defaultUser.password);
        await loginPage.verifyLogin();
    })

