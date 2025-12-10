import { launchPage } from '@rvoh/psychic-spec-helpers'
import { debuglog } from 'node:util'
import { LaunchOptions } from 'puppeteer'

// Enable debug logging with NODE_DEBUG=fspec
const debugFspec = debuglog('fspec').enabled

let page: Awaited<ReturnType<typeof launchPage>>

export default async function getPage(opts?: LaunchOptions) {
  if (!page) {
    page = await launchPage({
      headless: process.env.HEADLESS !== '0',
      timeout: debugFspec ? 40000 : 20000,
      dumpio: debugFspec,
      devtools: debugFspec,
      ...opts,
    })

    // set the browser dimensions prior to running specs
    await page.setViewport({ width: 1200, height: 800 })
  }

  return page
}
