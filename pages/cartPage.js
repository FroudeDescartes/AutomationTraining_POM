import { expect } from "@playwright/test"

class CartPage {

    constructor(page) {
        this.page = page
        this.inventoryItem = page.locator(".inventory_item")
        this.numOfItemsInCart = page.locator(".shopping_cart_badge")
        this.itemPrice = page.locator(".inventory_item_price")
        this.cartItem = page.locator(".cart_item")
        this.checkoutButton = page.locator("#checkout")
        this.firstName = page.locator("#first-name")
        this.lastName = page.locator("#last-name")
        this.postalCode = page.locator("#postal-code")
        this.continueButton = page.locator("#continue")
        this.finishOrderButton = page.locator("#finish")
        this.backToProductsButton = page.locator("#back-to-products")
        this.subtotalPrice = page.locator(".summary_subtotal_label")
    }

    async validateAllItemsInCart() {
        let itemsInCart = await this.numOfItemsInCart.innerHTML()
        let itemsInCartNum = parseInt(itemsInCart)
        let itemCount = await this.inventoryItem.count()
        expect(itemsInCartNum).toBe(itemCount)
    }

    async validateItemsInCartByPrice() {
        //needs to be added
    }

    async validateAtLeastOneItemInCart() {
        let itemsInCart = this.numOfItemsInCart.innerHTML()
        let numberOfItemsInCart = parseInt(itemsInCart)
        expect(numberOfItemsInCart).toBeGreaterThanOrEqual(1)
    }

    async checkout(firstname, lastname, zipcode) {
        await this.checkoutButton.click()
        await this.firstName.type(firstname)
        await this.lastName.type(lastname)
        await this.postalCode.fill(zipcode)
        await this.continueButton.click()
    }

    async validatePricesSum() {
        let cartItemNumberOfProducts = await this.cartItem.count()
        for (i = 1; i < cartItemNumberOfProducts; i++) {
            await this.cartItem.nth(0).innerHTML() + await this.cartItem.nth(cartItemNumberOfProducts).innerHTML()
        }
        expect(this.subtotalPrice).toEqual()
        //total sum of product prices
        //taxed price (tax is totalSumOfProductPrices/12.49)
        //full price
    }

    async finishOrder() {
        await this.finishOrderButton.click()
        await this.backToProductsButton.click()
    }
}

export { CartPage }