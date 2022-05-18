import { Browser, Page } from '@playwright/test';

export class PageKit {
  proxyConsole = false;

  constructor(
    public page: Page,
  ) {
    page.on('console', message => {
      if (this.proxyConsole) {
        console.log('PAGE CONSOLE >>', message);
      }
    });
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

  async chooseFiles(locator: string, files: string[]) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.page.locator(locator).click(),
    ]);
    await fileChooser.setFiles(files);
  }

  screenshot() {
    return this.page.screenshot({path: 'scr.png', fullPage: true});
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
