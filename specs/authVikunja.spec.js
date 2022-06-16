import chai from "chai"
import { run, stop } from '../lib/browser'
const assert = chai.assert

describe ('Authorisation', () => {
    let page
    const usernameField = '#username'
    const passwordField = '#password'
    const loginButton = '.is-primary'
    const profileNameField = 'span[class="username"]' 
    beforeEach( async () => {
        page = await run('https://try.vikunja.io/login')
    })

    afterEach( async () => {
        stop()
    })
    it('Authorisation demo user', async () => {
        await page.click(usernameField)
        await page.fill(usernameField, 'demo')
        await page.click(passwordField)
        await page.fill(passwordField, 'demo')
        await page.click(loginButton)
        
        await page.waitForSelector(profileNameField)
        const profileNameText = await page.textContent(profileNameField)
        assert.strictEqual(profileNameText, 'demo', 'User not found')
    })
})