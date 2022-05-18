import { Browser, Page } from '@playwright/test';

export class PageKit {
  constructor(
    public page: Page,
  ) {
  }

  goto(url: string) {
    this.page.goto(url);
  }

  $(selector: string) {
    return this.page.locator(selector);
  }

  get subTitle() {
    return this.page.locator('h2');
  }

  inputByName(name: string) {
    return this.page.locator(`input[name="${name}"]`);
  }

  fill(name: string, value: string) {
//    return this.page.fi
  }

  isSelected(locator: string) {
    return this.page.locator(locator).evaluate((el: any) => el.selected);
  }
}

export class PageKitFactory {
  static async new(browser: Browser) {
    const page = await browser.newPage({
//      recordVideo: video ? { dir: video, size: { width: 1920, height: 1080 } } : undefined,
    });
    return new PageKit(page);
  }
}
