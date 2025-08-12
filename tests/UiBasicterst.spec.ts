import { test } from "../fixtures/fixtures";
import HomePage from "../pages/HomePage";
import CardDetailsPage from "../pages/CardDetailsPage";

test('Random card details match between list and detail pages', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.openHomePage();
    
    const cardDetails = await homePage.openRandomCardAndGetDetails();
    const cardDetailsPage = new CardDetailsPage(page);
    await cardDetailsPage.verifyCardDetails(cardDetails);
});