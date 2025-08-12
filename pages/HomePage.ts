import { Page, Locator } from '@playwright/test';
import { Urls } from '../test-data/common/page-url-endpoints';
import { BasePage } from './BasePage';

type CardLocators = {
  root: Locator;
  title: Locator;
  price: Locator;
  view: Locator;
  add: Locator;
};

class HomePage extends BasePage {
  cards: Locator;

  constructor(page: Page) {
    super(page);
    this.cards = this.page.locator('.card-body').describe('All product cards');
  }

  async openHomePage() {
    await this.visit(Urls.dashboard);
    await this.waitForNetworkIdle();
  }

  async cardCount(): Promise<number> {
    return this.cards.count();
  }

  private fromRoot(root: Locator, label: string): CardLocators {
    return {
      root,
      title: root.getByRole('heading', { level: 5 }).describe(`Title of ${label}`),
      price: root.locator('.text-muted').describe(`Price of ${label}`),
      view: root.getByRole('button', { name: 'View' }).describe(`View button of ${label}`),
      add: root.getByRole('button', { name: 'Add To Cart' }).describe(`Add To Cart button of ${label}`),
    };
  }

  card(index: number): CardLocators {
    const root = this.cards.nth(index).describe(`Card ${index}`);
    return this.fromRoot(root, `Card ${index}`);
  }

  private async resolveCardIndex(index?: number): Promise<number> {
    const count = await this.cardCount();
    if (count === 0) throw new Error('No cards available');
    if (index === undefined) return Math.floor(Math.random() * count);
    if (index < 0 || index >= count) {
      throw new Error(`Invalid card index: ${index}. Available cards: 0-${count - 1}`);
    }
    return index;
  }

  async cardAt(index?: number): Promise<{ index: number; card: CardLocators }> {
    const i = await this.resolveCardIndex(index);
    return { index: i, card: this.card(i) };
  }

  async openRandomCardAndGetDetails() {
    const { index, card } = await this.cardAt();
    const [title, price] = await Promise.all([card.title.innerText(), card.price.innerText()]);
    await card.view.click();
    return { index, title, price };
  }
}

export default HomePage;