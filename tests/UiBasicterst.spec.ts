import { test, expect } from "../fixtures/fixtures";
import HomePage from "../pages/HomePage";

test('Random card details match between list and detail pages', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    
    const cardDetails = await homePage.openRandomCardAndGetDetails();
    
    await expect(page.locator('.container').getByRole('heading', {level: 2}))
        .toHaveText(cardDetails.title);
    await expect(page.locator('.container').getByRole('heading', {level: 3}))
        .toHaveText(cardDetails.price);
    await expect(page.getByRole('button', {name: 'Add to Cart'})).toBeVisible();
});