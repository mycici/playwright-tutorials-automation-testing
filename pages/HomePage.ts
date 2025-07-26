import { Page, Locator, expect } from '@playwright/test';


class HomePage {
    page: Page;
    cards: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.cards = page.locator('.card-body');
    }

    async openHomePage() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
        await this.page.waitForLoadState('networkidle');
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
        const title = await card.getByRole('heading', {level: 5}).innerText()
        const price = await card.locator('.text-muted').innerText()
        
        return { title, price };
    }

    async viewCardDetails(index: number){
        const card = this.cards.nth(index);
        const viewButton = card.getByRole('button', {name: 'View'});

        await expect(viewButton).toBeVisible();
        await viewButton.click();


    }

    async addCardToCart(index: number){
        const card = this.cards.nth(index);
        const addButton = card.getByRole('button', {name: 'Add To Cart'});
        
        await expect(addButton).toBeVisible();
        await addButton.click();
        
        await this.page.waitForResponse(response => 
            response.url().includes('/cart') && response.status() === 200
        );
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