import chai from "chai"
import { run, stop } from '../../lib/browser'
import app from "../../framework/pages"
const assert = chai.assert

describe ('Category page tests', () => {
    let page

const elementId = 'td[data-property-name="_id"] section'
const idInForm = 'section[data-testid="property-show-_id"] section'
const createFirstRecord = 'section[class="sc-dIsAE eezefg admin-bro_Box"] button[data-testid="action-new"]'

    beforeEach( async () => {
        page = await run('https://admin-bro-example-app-staging.herokuapp.com/admin/login')
        await app().Main().login(page, 'test@example.com', 'password')
        await app().Home().openCategories(page)
    })

    afterEach( async () => {
        stop()
    })

    it('Create new category', async () => {
        await app().Category().createNew(page, 'Testing', 'Gazizov R.', 'JS QA')
        const elementTitle = await app().Category().getFirstTitle(page)
        assert.strictEqual(elementTitle, 'Testing', 'List not found')
    })

    it('Show category', async () => {
        const id = await page.textContent(elementId)
        await app().Category().show(page)
        const showID = await page.textContent(idInForm)
        assert.equal(id, showID.substr(2), 'Ids dont match')
    })

    it('Update category', async () => {
        await app().Category().updateTitle(page, 'Task')
        await page.screenshot({ path: 'screenshot1.png' })
        const elementTitle = await app().Category().getFirstTitle(page)
        await page.screenshot({ path: 'screenshot2.png' })
        assert.strictEqual(elementTitle, 'Task', 'List not found')
    })
    
    it('Delete category', async () => {
        await app().Category().delete(page)
        await page.waitForSelector(createFirstRecord)
        const visible = await page.isVisible(createFirstRecord)
        assert.isTrue(visible, 'List is not empty')
    })
})