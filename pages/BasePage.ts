import { Page } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async visit(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async waitForApiResponse(urlSubstring: string, expectedStatus = 200): Promise<void> {
    await this.page.waitForResponse(
      (response) => response.url().includes(urlSubstring) && response.status() === expectedStatus
    );
  }
}