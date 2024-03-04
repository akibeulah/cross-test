import { Browser, Page } from 'puppeteer'
import { mock } from 'jest-mock-extended'

import { UrlLoaderService } from './url-loader.service'

const testUrl = 'https://test.com/'

const pageMock = mock<Page>()
const mockBrowser = mock<Browser>()
mockBrowser.newPage.mockResolvedValue(pageMock)

jest.mock('puppeteer', () => ({
  launch: () => mockBrowser
}))

const pageValue = 'Hello World'
describe('UrlLoaderService', () => {
  it('should return singleton', async () => {
    // when
    const instance1 = await UrlLoaderService.getInstance()
    const instance2 = await UrlLoaderService.getInstance()

    // then
    expect(instance1).toBe(instance2)
  })

  it('should load website text and links', async () => {
    // given
    pageMock.evaluate.mockResolvedValueOnce(pageValue)
    pageMock.evaluate.mockResolvedValueOnce(['test.html'])
    // when

    const instance = await UrlLoaderService.getInstance()
    const stringPromise = instance.loadUrlTextAndLinks(testUrl)

    // then
    await expect(stringPromise).resolves.toEqual({ text: pageValue, links: ['test.html'] })
    expect(mockBrowser.newPage).toHaveBeenCalledTimes(1)
    expect(pageMock.goto).toHaveBeenCalledTimes(1)
    expect(pageMock.goto).toHaveBeenCalledWith(testUrl)
  })
})
