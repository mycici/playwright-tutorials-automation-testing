import { expect } from "@playwright/test";


const {test} = require ('@playwright/test');



test('First test', async ({browser, page})=>
{
    // const context = await browser.newContext()
    // const page = await context.newPage();
    
    await page.goto('https://google.com')
    await expect(page).toHaveTitle("Google")


})