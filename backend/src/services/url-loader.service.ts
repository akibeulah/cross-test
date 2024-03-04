import puppeteer, { Browser } from 'puppeteer'

import { domExtractHyperlinks, domExtractText, pageEval } from './page-eval.service.js'

export interface TextAndLinks{
  text: string
  links: string[]
}

export class UrlLoaderService {
  private static instance: UrlLoaderService

  static async getInstance (): Promise<UrlLoaderService> {
    if (UrlLoaderService.instance === undefined) {
      const browser = await puppeteer.launch()
      UrlLoaderService.instance = new UrlLoaderService(browser)
    }
    return UrlLoaderService.instance
  }

  private constructor (private readonly browser: Browser) {
  }

  async loadUrlTextAndLinks (url: string): Promise<TextAndLinks> {
    const page = await this.browser.newPage()
    await page.goto(url)
    await page.waitForSelector('body')
    const [text, links] = await Promise.all([await pageEval(page, domExtractText), await pageEval(page, domExtractHyperlinks)])

    return { text, links }
  }
}
