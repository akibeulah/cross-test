import { Page, UnwrapPromiseLike } from 'puppeteer'

export async function pageEval<T> (page: Page, pageFunction: () => T): Promise<UnwrapPromiseLike<T>> {
  return await page.evaluate(pageFunction)
}

// istanbul ignore next - this function is running in dom context of headless browser
export function domExtractText (): string {
  return document?.body?.innerText ?? ''
}

// istanbul ignore next - this function is running in dom context of headless browser
export function domExtractHyperlinks (): string[] {
  return Array.from(document.getElementsByTagName('a'), a => a.href)
}
