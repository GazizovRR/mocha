const mongooseResources = 'a[class="sc-dIsAE sc-ArjOu hqCygR jORYPE admin-bro_Box"]'
const category = {
    chapter: 'a[href="/admin/resources/Category"]',
}
const LeftMenu = {
    openCategories: async(page) => {
        await page.click(mongooseResources)
        await page.click(category.chapter)
    }
}

export default LeftMenu