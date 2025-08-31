import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

class CardDetailsPage extends BasePage {
    title: Locator;
    price: Locator;
    section: Locator;

    constructor(page: Page) {
        super(page);
        this.section = this.page.locator('.container');
        this.title = this.section.getByRole('heading', { level: 20 });
        this.price = this.section.getByRole('heading', { level: 3 });
    }

    async getCardDetails() {
        const [title, price] = await Promise.all([
            this.title.innerText(),
            this.price.innerText()
        ]);
        return { title, price };
    }

    async verifyCardDetails(expectedCardDetils: {title: string, price: string}){
        await expect.soft(this.title).toHaveText(expectedCardDetils.title);
        await expect.soft(this.price).toHaveText(expectedCardDetils.price);

    }
}
export default CardDetailsPage;