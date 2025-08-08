import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";
import { Urls } from "../test-data/common/page-url-endpoints";

export class LoginPage extends BasePage{
    constructor(page: Page){
        super(page);
    }

    async login(email: string, password: string){
        await this.page.locator('#userEmail').fill(email);
        await this.page.locator('#userPassword').fill(password);
        await this.page.getByRole('button', {name: 'Login'}).click();
    }
}