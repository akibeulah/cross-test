import { App } from './app.js'
import { UrlLoaderService } from './services/url-loader.service.js'

const urlLoader = await UrlLoaderService.getInstance()
await new App(urlLoader).run()
process.exit(0)
