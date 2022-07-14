import chai from "chai"
import { run, stop } from '../../lib/browser'
const assert = chai.assert

describe ('Authorisation admin bro', () => {
    let page
    const emailField = 'input[name="email"]'
    const passwordField = 'input[name="password"]'
    const loginButton = 'button[class="sc-gsTCUz iqPZMe admin-bro_Button"]'
    const profileNameField = 'section[class="sc-dIsAE idZUqT admin-bro_Box"] div[class="sc-iJCRLp dpQocQ"]' 
    const menu = 'section[class="sc-dIsAE dHfQEO admin-bro_Box"]'
    const logoutButton = 'a[class="sc-dIsAE sc-jgPznn idZUqT dnrmlv admin-bro_Box"]'
    beforeEach( async () => {
        page = await run('https://admin-bro-example-app-staging.herokuapp.com/admin/login')
    })

    afterEach( async () => {
        stop()
    })
    it('Login test user', async () => {
        await page.click(emailField)
        await page.fill(emailField, 'test@example.com')
        await page.click(passwordField)
        await page.fill(passwordField, 'password')
        await page.click(loginButton)
        
        await page.waitForSelector(profileNameField)
        const profileNameText = await page.textContent(profileNameField)
        assert.strictEqual(profileNameText, 'test@example.com', 'User not found')
    })

    it('Logout', async () => {
        await page.click(emailField)
        await page.fill(emailField, 'test@example.com')
        await page.click(passwordField)
        await page.fill(passwordField, 'password')
        await page.click(loginButton)
        
        await page.waitForSelector(profileNameField)
        await page.hover(menu)
        await page.click(logoutButton)

        await page.waitForSelector(loginButton)
        const visible = await page.isVisible(loginButton)
        assert.equal(visible, true, 'Test')
    })
})