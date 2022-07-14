const menu = 'section[class="sc-dIsAE dHfQEO admin-bro_Box"]'
const logoutButton = 'a[class="sc-dIsAE sc-jgPznn idZUqT dnrmlv admin-bro_Box"]'
const profileNameField = 'section[class="sc-dIsAE idZUqT admin-bro_Box"] div[class="sc-iJCRLp dpQocQ"]'

const NavBar = {
    getProfileName: async (page) => {
        const profileNameText = await page.textContent(profileNameField)
        return profileNameText
    },

    logout: async (page) => {
        await page.hover(menu)
        await page.click(logoutButton)
    }
}

export default NavBar