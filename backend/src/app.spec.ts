import { mock } from 'jest-mock-extended'
import mockConsole from 'jest-mock-console'

import { App, DEFAULT_URL } from './app'
import { UrlLoaderService } from './services/url-loader.service'

process.argv = []

describe('App', () => {
  const urlLoader = mock<UrlLoaderService>()
  const app = new App(urlLoader)

  it('should call url loader and return 0 when word not present', async () => {
    // given
    urlLoader.loadUrlTextAndLinks.mockResolvedValue({ text: 'web site text', links: [] })
    mockConsole()

    // when
    await app.run()

    // then
    expect(urlLoader.loadUrlTextAndLinks).toHaveBeenCalledTimes(1)
    expect(urlLoader.loadUrlTextAndLinks).toHaveBeenCalledWith(DEFAULT_URL)
    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('Found 0 instances of \'kayako\' in the body of the page')
  })

  it('should call url loader and return count when word present', async () => {
    // given
    urlLoader.loadUrlTextAndLinks.mockResolvedValue({ text: 'kayako Kayako text', links: [] })
    mockConsole()

    // when
    await app.run()

    // then
    expect(urlLoader.loadUrlTextAndLinks).toHaveBeenCalledTimes(1)
    expect(urlLoader.loadUrlTextAndLinks).toHaveBeenCalledWith('https://www.kayako.com/')
    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toHaveBeenCalledWith('Found 2 instances of \'kayako\' in the body of the page')
  })

  it('should return default URL when no url passed', async () => {
    // when
    const appParameters = app.parseCli(['node', 'main.js'])

    // then
    expect(appParameters.url).toBe('https://www.kayako.com/')
  })

  it('should return specified URL', async () => {
    const url = 'https://www.google.com/'
    expect(app.parseCli(['node', 'main.js', '--url', url]).url).toBe(url)
    expect(app.parseCli(['node', 'main.js', '-u', url]).url).toBe(url)
  })
})
