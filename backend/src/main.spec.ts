import { UrlLoaderService } from './services/url-loader.service'
import { App } from './app'
jest.setTimeout(120000)
describe.skip('Manual test main app, useful for debugging', () => {
  it('Run app', async () => {
    const urlLoader = await UrlLoaderService.getInstance()
    await new App(urlLoader).run()
  })
})
