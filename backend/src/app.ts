
import { UrlLoaderService } from './services/url-loader.service.js'
import { Command } from 'commander'

interface AppParameters {
  url: string
  depth: number
  term: string
}

export const DEFAULT_URL = 'https://www.kayako.com/'
export const DEFAULT_DEPTH_LEVEL = 2
export const DEFAULT_TERM = 'kayako'

export class App {
  /* istanbul ignore next */
  totalCount: number = 0
  constructor (
    private readonly urlLoader: UrlLoaderService,
    private readonly command = new Command()
  ) { }

  async run (): Promise<void> {
    const appParameters = this.parseCli()
    await this.process(appParameters)
  }

  normalizeUrl (url: string): string {
    if (url.endsWith('/')) { url = url.slice(0, -1) }

    const hashIndex = url.indexOf('#')
    if (hashIndex !== -1) {
      if (url[hashIndex - 1] === '/') { url = url.slice(0, hashIndex - 1) } else { url = url.slice(0, hashIndex) }
    }

    return url
  }

  wordCounter (text: string, appParameters: AppParameters): number {
    const count = (text.toLocaleLowerCase().match(new RegExp(appParameters.term, 'ig')) ?? []).length
    console.log(`Found ${count} instances of '${appParameters.term}' in the body of the page`)
    return count
  }

  async process (appParameters: AppParameters): Promise<void> {
    const visited: Set<string> = new Set()
    const queue: Array<{ url: string, depth: number }> = [{ url: appParameters.url, depth: 0 }]
    const domainMatch = appParameters.url.match(/^(http|https):\/\/[a-zA-Z0-9:.]+\/?/)
    const domain = (domainMatch != null) ? domainMatch[0] : ''
    while (queue.length > 0) {
      const item: { url: string, depth: number } | undefined = queue.shift()
      if (item == null || visited.has(this.normalizeUrl(item.url))) { continue }
      const { url, depth } = item
      const { text, links } = await this.urlLoader.loadUrlTextAndLinks(url)
      const normalizedUrl = this.normalizeUrl(url)

      this.totalCount += this.wordCounter(text, appParameters)

      if (depth < appParameters.depth) {
        for (const link of links) {
          if (link.includes(domain) && !visited.has(link)) { queue.push({ url: link, depth: depth + 1 }) }
        }
      }

      visited.add(normalizedUrl)
    }
    console.log(`Total instances of '${appParameters.term} ' found: ${this.totalCount}`)
  }

  parseCli (argv: readonly string[] = process.argv): AppParameters {
    this.command
      .requiredOption('-u, --url <url>', 'URL to load', DEFAULT_URL)
      .option('-t, --term <term>', 'Term to search for', DEFAULT_TERM)
      .option('-d, --depth <depth>', 'Depth of scanning', parseInt, DEFAULT_DEPTH_LEVEL)

    this.command.parse(argv)
    const options = this.command.opts()

    return { url: options.url, term: options.term, depth: options.depth }
  }
}
