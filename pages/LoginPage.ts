import { BasePage } from "./BasePage";
import { Locator, Page, expect } from "@playwright/test";
import { Urls } from "../test-data/common/page-url-endpoints";

export class LoginPage extends BasePage{
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page: Page){
        super(page);
        this.emailInput = this.page.locator('#userEmail');
        this.passwordInput = this.page.locator('#userPassword');
        this.loginButton = this.page.locator('#login');
    }

    async login(email: string, password: string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async verifyLogin(){
        await expect(this.page.getByRole('button', {name: 'Sign Out'})).toBeVisible()
    }
}