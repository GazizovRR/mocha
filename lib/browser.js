import playwright from "playwright"
let browser, page, context

async function run (url) {
    browser = await playwright.chromium.launch(
        {
            headless: true,
            slowMo: 50,
        }
    )
    context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
      })
    page = await context.newPage()
    await page.goto(url)
    return page
}

async function stop () {
    await page.screenshot({ path: 'screenshot.png' })
    await page.close()
    await browser.close()
}

export { run, stop }