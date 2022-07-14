
const emailField = 'input[name="email"]'
const passwordField = 'input[name="password"]'
const loginButton = 'button[class="sc-gsTCUz iqPZMe admin-bro_Button"]'

const MainPage = {
    login: async (page, username, password) => {
        await page.click(emailField)
        await page.fill(emailField, username)
        await page.click(passwordField)
        await page.fill(passwordField, password)
        await page.click(loginButton)
    }

    
}

export default MainPage