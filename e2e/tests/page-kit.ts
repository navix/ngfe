import {Browser, Locator, Page} from '@playwright/test';

export class PageKit {
  proxyConsole = false;

  constructor(public page: Page) {
    page.on('console', message => {
      if (this.proxyConsole) {
        console.log('PAGE CONSOLE >>', message);
      }
    });
  }

  goto(url: string) {
    return this.page.goto(url);
  }

  $(selector: string) {
    return this.page.locator(selector);
  }

  getCase(id: string) {
    return new CasePo(this.page.locator(`.case[data-id="${id}"]`));
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

  isSelected(locator: Locator) {
    return locator.evaluate((el: any) => el.selected);
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

export class CasePo {
  constructor(public component: Locator) {}

  get title() {
    return this.component.locator('h4');
  }

  $(selector: string) {
    return this.component.locator(selector);
  }

  /**
   * Get value-view by name
   */
  vv(name: string) {
    return this.component.locator(`.value-view[data-name="${name}"] .value`);
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
