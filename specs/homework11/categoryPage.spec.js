import chai from "chai"
import { run, stop } from '../../lib/browser'
const assert = chai.assert

describe ('Category page tests', () => {
    let page
    const emailField = 'input[name="email"]'
    const passwordField = 'input[name="password"]'
    const loginButton = 'button[class="sc-gsTCUz iqPZMe admin-bro_Button"]'
    const profileNameField = 'section[class="sc-dIsAE idZUqT admin-bro_Box"] div[class="sc-iJCRLp dpQocQ"]'
    const mongooseResources = 'a[class="sc-dIsAE sc-ArjOu hqCygR jORYPE admin-bro_Box"]'

    const category = {
        chapter: 'a[href="/admin/resources/Category"]',
        createNewButton: 'a[data-testid="action-new"]',
        titleField: '#title',
        ownerField: '#owner',
        nestedField: 'input[id="nested.field"]',
        nestedValueField: 'input[id="nested.value"]',
        saveButton: 'button[data-testid="button-save"]',
        elementTitle: 'section[data-testid="property-list-title"]',
        elementId: 'td[data-property-name="_id"] section',
        elementAction: 'div[class="sc-khIgXV eZiEu admin-bro_ButtonGroupItem"]',
        showAction: 'a[data-testid="action-show"]',
        editAction: 'a[data-testid="action-edit"]',
        deleteAction: 'a[data-testid="action-delete"]',
        cancelButton: 'a[class="styled-back-button__StyledLink-uyhg9d-0 esrSCj"]',
        idInForm: 'section[data-testid="property-show-_id"] section',
        createFirstRecord: 'section[class="sc-dIsAE eezefg admin-bro_Box"] button[data-testid="action-new"]',
    }

    beforeEach( async () => {
        page = await run('https://admin-bro-example-app-staging.herokuapp.com/admin/login')
        await page.click(emailField)
        await page.fill(emailField, 'test@example.com')
        await page.click(passwordField)
        await page.fill(passwordField, 'password')
        await page.click(loginButton)
        
        await page.waitForSelector(profileNameField)
        await page.click(mongooseResources)
        await page.click(category.chapter)
    })

    afterEach( async () => {
        stop()
    })

    it('Create new category', async () => {
        await page.click(category.createNewButton)
        await page.fill(category.titleField, 'Testing')
        await page.fill(category.ownerField, 'Gazizov R.')
        await page.fill(category.nestedField, 'JS QA')
        await page.fill(category.nestedValueField, '1')
        await page.click(category.saveButton)

        await page.waitForSelector(category.createNewButton)
        const elementTitle = await page.textContent(category.elementTitle)
        assert.strictEqual(elementTitle, 'Testing', 'List not found')
    })

    it('Show category', async () => {
        const id = await page.textContent(category.elementId)
        await page.hover(category.elementAction)
        await page.click(category.showAction)
        await page.waitForSelector(category.cancelButton)
        const showID = await page.textContent(category.idInForm)
        assert.equal(id, showID.substr(2), 'Ids dont match')
    })

    it('Update category', async () => {
        await page.hover(category.elementAction)
        await page.click(category.editAction)
        await page.waitForSelector(category.saveButton)
        await page.fill(category.titleField, 'Task')
        await page.click(category.saveButton)
        
        await page.waitForSelector(category.elementAction)
        await page.screenshot({ path: 'screenshot1.png' })
        const elementTitle = await page.textContent(category.elementTitle)
        await page.screenshot({ path: 'screenshot2.png' })
        assert.strictEqual(elementTitle, 'Task', 'List not found')
    })
    
    it('Delete category', async () => {
        await page.hover(category.elementAction)
        const ele = await page.$(category.deleteAction)

        page.on('dialog', async (dialog) => {
            await dialog.accept()
        })
        await ele?.click()
        
        await page.waitForSelector(category.createFirstRecord)
        const visible = await page.isVisible(category.createFirstRecord)
        assert.isTrue(visible, 'List is not empty')
    })
})