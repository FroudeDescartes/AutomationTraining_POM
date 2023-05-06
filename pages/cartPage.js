import { expect } from "@playwright/test"

class CartPage {

    constructor(page) {
        this.page = page
        this.numOfItemsInCart = page.locator(".shopping_cart_badge")
        this.shoppingcart = page.locator(".shopping_cart_link")
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
        this.tax = page.locator(".summary_tax_label")
        this.totalSumPrice = page.locator(".summary_total_label")
    }

    async validateNumberOfItemsInCart(insertExpectedNumberOfItemsInCart) {
        let counOfItemsInCart = await this.cartItem.count()
        if (counOfItemsInCart > 1) {
            let itemsInCart = await this.numOfItemsInCart.innerHTML()
            let numberOfItemsInCart = parseInt(itemsInCart)
            expect(numberOfItemsInCart).toBe(insertExpectedNumberOfItemsInCart)
        } else {
           await expect(this.cartItem).not.toBeVisible()
        }
    }

    async checkout(firstname, lastname, zipcode) {
        await this.shoppingcart.click()
        await this.checkoutButton.click()
        await this.firstName.type(firstname)
        await this.lastName.type(lastname)
        await this.postalCode.fill(zipcode)
        await this.continueButton.click()
    }

    async validateSubtotalPrices() {
        let itemsInCart = await this.numOfItemsInCart.innerHTML()
        let numberOfItemsInCart = parseInt(itemsInCart)

        let subtotal = await this.subtotalPrice.innerHTML()
        let subtotalNum = parseInt(subtotal)

        if (numberOfItemsInCart == 1) {
            let totalPrice = await this.itemPrice.innerHTML()
            let totalPriceNum = parseInt(totalPrice)
            let itemTotalPriceNum = totalPriceNum//just to name it same as in else statement
            expect(subtotalNum).toBe(itemTotalPriceNum)
        } else {
            const priceNum = []
            let itemTotalPriceNum = 0;

            for (let i = 0; i <= numberOfItemsInCart; i++) {
                let totalPrice = await this.itemPrice.nth(i)
                let totalPriceNum = parseInt(totalPrice)
                priceNum.push(totalPriceNum[i])
            }

            for (let k = 0; k < priceNum.length; k++) {
                itemTotalPriceNum += priceNum[k];
            }
            expect(subtotalNum).toBe(itemTotalPriceNum)
        }
    }

    async validateTaxPrice() {
        let itemsInCart = await this.numOfItemsInCart.innerHTML()
        let numberOfItemsInCart = parseInt(itemsInCart)

        if (numberOfItemsInCart == 1) {
            let totalPrice = await this.itemPrice.innerHTML()
            let totalPriceNum = parseInt(totalPrice)
            let itemTotalPriceNum = totalPriceNum//just to name it same as in else statement
            let taxPrice = itemTotalPriceNum / 12.49
            let tax = this.tax.innerHTML()
            let taxNum = parseInt(tax)

            expect(taxPrice).toBe(taxNum)
        } else {
            const priceNum = []
            let itemTotalPriceNum = 0;

            for (let i = 0; i <= numberOfItemsInCart; i++) {
                let totalPrice = await this.itemPrice.nth(i)
                let totalPriceNum = parseInt(totalPrice)
                priceNum.push(totalPriceNum[i])
            }

            for (let k = 0; k < priceNum.length; k++) {
                itemTotalPriceNum += priceNum[k];
            }
            let taxPrice = itemTotalPriceNum / 12.49
            let tax = this.tax.innerHTML()
            let taxNum = parseInt(tax)

            expect(taxPrice).toBe(taxNum)
        }
    }

    async validateTotalPrice() {
        let itemsInCart = await this.numOfItemsInCart.innerHTML()
        let numberOfItemsInCart = parseInt(itemsInCart)

        let total = this.totalSumPrice.innerHTML()
        let totalNum = parseInt(total)

        if (numberOfItemsInCart == 1) {
            let totalPrice = await this.itemPrice.innerHTML()
            let totalPriceNum = parseInt(totalPrice)
            let itemTotalPriceNum = totalPriceNum//just to name it same as in else statement
            let taxPrice = itemTotalPriceNum / 12.49
            let sum = taxPrice + itemTotalPriceNum

            expect(totalNum).toBe(sum)
        } else {
            const priceNum = []
            let itemTotalPriceNum = 0;

            for (let i = 0; i <= numberOfItemsInCart; i++) {
                let totalPrice = await this.itemPrice.nth(i)
                let totalPriceNum = parseInt(totalPrice)
                priceNum.push(totalPriceNum[i])
            }

            for (let k = 0; k < priceNum.length; k++) {
                itemTotalPriceNum += priceNum[k];
            }
            let taxPrice = itemTotalPriceNum / 12.49
            let sum = taxPrice + itemTotalPriceNum

            expect(totalNum).toBe(sum)
        }
    }

    async finishOrder() {
        await this.finishOrderButton.click()
        await this.backToProductsButton.click()
    }
}

export { CartPage }