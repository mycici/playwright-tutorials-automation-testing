import { expect, test } from "../fixtures/fixtures";



test('Item page has title, price and add to cart button', async ({page})=>
{
   await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash') 
   const firstItem = page.locator('.card-body').first()
   const firstItemTitle = await firstItem.getByRole('heading', {level: 5}).innerText()
   const firstItemPrice = await firstItem.locator('.text-muted').innerText()
   await firstItem.getByRole('button', {name: 'View'}).click()

   await expect(page.locator('.container').getByRole('heading', {level:2})).toHaveText(firstItemTitle)
   await expect(page.locator('.container').getByRole('heading', {level:3})).toHaveText(firstItemPrice)
   await expect(page.getByRole('button', {name: 'Add to Cart'})).toBeVisible()
})