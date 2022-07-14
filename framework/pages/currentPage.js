import app from '../elements/index'

const mongooseResources = 'a[class="sc-dIsAE sc-ArjOu hqCygR jORYPE admin-bro_Box"]'
const category = {
    chapter: 'a[href="/admin/resources/Category"]',
}
const CurrentPage = {
    getProfileName: async (page) => {
        const profileNameText = await app().NavBar().getProfileName(page)
        return profileNameText
    },

    logout: async (page) => {
        await app().NavBar().logout(page)
    },

    openCategories: async(page) => {
        await app().LeftMenu().openCategories(page)
    }
}

export default CurrentPage