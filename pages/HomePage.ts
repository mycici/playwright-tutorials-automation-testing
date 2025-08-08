import { Page, Locator, expect } from '@playwright/test';
import { Urls } from '../test-data/common/page-url-endpoints';
import { BasePage } from './BasePage';

class HomePage extends BasePage {
    cards: Locator;

    constructor(page: Page) {
        super(page);
        this.cards = this.page.locator('.card-body');
    }

    async openHomePage() {
        await this.visit(Urls.dashboard);
        await this.waitForNetworkIdle();
    }

    async selectCard(index?: number): Promise<number>{
        const count = await this.cards.count();
        if (count ===0){
            throw new Error('No cards available')
        }
        if (index !== undefined) {
            if (index < 0 || index >= count) {
                throw new Error(`Invalid card index: ${index}. Available cards: 0-${count-1}`);
            }
            return index;
        }
        return Math.floor(Math.random()*count);
        
    }

    async getCardDetails(index: number) {
        const card = this.cards.nth(index);
        const title = await card.getByRole('heading', {level: 5}).describe(`Title of the card ${index}`).innerText();
        const price = await card.locator('.text-muted').innerText();
        
        return { title, price };
    }

    async viewCardDetails(index: number){
        const { title } = await this.getCardDetails(index); // Retrieve the title
        const card = this.cards.nth(index);
        const viewButton = card.getByRole('button', {name: 'View'}).describe(`View ${title} (${index}) card`);

        await expect(viewButton).toBeVisible();
        await viewButton.click();


    }

    async addCardToCart(index: number){
        const card = this.cards.nth(index);
        const addButton = card.getByRole('button', {name: 'Add To Cart'});
        
        await expect(addButton).toBeVisible();
        await addButton.click();
        
        await this.waitForApiResponse('/cart', 200);
    }

    async openRandomCardAndGetDetails() {
        const randomIndex = await this.selectCard();
        const cardDetails = await this.getCardDetails(randomIndex);
        await this.viewCardDetails(randomIndex);
        
        return {
            index: randomIndex,
            ...cardDetails
        };
    }

}

export default HomePage;