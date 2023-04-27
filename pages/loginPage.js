import { expect } from "@playwright/test"

class LoginPage {

    constructor(page) {
        this.page = page
        this.usernameField = page.locator("#user-name")
        this.passwordField = page.locator("#password")
        this.loginButton = page.locator("#login-button")
        this.errorMessage = page.locator('[data-test="error"]')
        this.shoppingCart = page.locator("#shopping_cart_container")
    }

    async gotoPage() {
        await this.page.goto("https://www.saucedemo.com/")
        //await this.page.pause()
    }

    async login(username, password) {
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }

    async validateErrorMessage() {
        await expect(this.errorMessage).toContainText("Username and password do not match any user in this service")
    }

    async validateLoginSuccessfull(){
        await expect(this.shoppingCart).toBeVisible()
    }
}

export { LoginPage }