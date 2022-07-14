
const createNewButton = 'a[data-testid="action-new"]'
const titleField = '#title'
const ownerField = '#owner'
const nestedField = 'input[id="nested.field"]'
const nestedValueField = 'input[id="nested.value"]'
const saveButton = 'button[data-testid="button-save"]'
const elementTitle = 'section[data-testid="property-list-title"]'
const elementAction = 'div[class="sc-khIgXV eZiEu admin-bro_ButtonGroupItem"]'
const showAction = 'a[data-testid="action-show"]'
const editAction = 'a[data-testid="action-edit"]'
const deleteAction = 'a[data-testid="action-delete"]'
const cancelButton = 'a[class="styled-back-button__StyledLink-uyhg9d-0 esrSCj"]'

const CategoryPage = {
    createNew: async (page, title, owner, nested, nestedValue='1') => {
        await page.click(createNewButton)
        await page.fill(titleField, title)
        await page.fill(ownerField, owner)
        await page.fill(nestedField, nested)
        await page.fill(nestedValueField, nestedValue)
        await page.click(saveButton)
    },

    show: async (page) => {
        await page.hover(elementAction)
        await page.click(showAction)
        await page.waitForSelector(cancelButton)
    },

    updateTitle: async (page, title) => {
        await page.hover(elementAction)
        await page.click(editAction)
        await page.waitForSelector(cancelButton)
        await page.fill(titleField, title)
        await page.click(saveButton)
    },

    delete: async (page) => {
        await page.hover(elementAction)
        const ele = await page.$(deleteAction)

        page.on('dialog', async (dialog) => {
            await dialog.accept()
        })
        await ele?.click()
    },

    getFirstTitle: async (page) => {
        const firstTitle = await page.textContent(elementTitle)
        return firstTitle
    },
}

export default CategoryPage