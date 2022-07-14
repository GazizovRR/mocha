import chai from "chai"
import { run, stop } from '../../lib/browser'
import app from "../../framework/pages"
const assert = chai.assert

describe ('Authorisation admin bro', () => {
    let page
    const loginButton = 'button[class="sc-gsTCUz iqPZMe admin-bro_Button"]'
    beforeEach( async () => {
        page = await run('https://admin-bro-example-app-staging.herokuapp.com/admin/login')
    })

    afterEach( async () => {
        stop()
    })
    it('Login test user', async () => {
        await app().Main().login(page, 'test@example.com', 'password')
        const profileNameText = await app().Home().getProfileName(page)
        assert.strictEqual(profileNameText, 'test@example.com', 'User not found')
    })

    it('Logout', async () => {
        await app().Main().login(page, 'test@example.com', 'password')
        await app().Home().getProfileName(page)
        await app().Home().logout(page)

        await page.waitForSelector(loginButton)
        const visible = await page.isVisible(loginButton)
        assert.equal(visible, true, 'Logout is failed')
    })
})