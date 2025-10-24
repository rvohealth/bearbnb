import { visit } from '@rvoh/psychic-spec-helpers'

describe('puppeteer sample test', () => {
  it('my first puppeteer test', async () => {
    await visit('/')
    await expect(page).toMatchTextContent('nextjs')
  })
})
