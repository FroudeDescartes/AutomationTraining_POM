import { expect } from "@playwright/test"

class InventoryPage {

    constructor(page) {
        this.page = page
        this.homePageTitle = page.locator(".app_logo")
        this.headerTitle = page.locator(".title")
        this.filterSearchOption = page.locator('[data-test="product_sort_container"]')
        this.inventoryList = page.locator(".inventory_list")
        this.inventoryItem = page.locator(".inventory_item")
        this.inventoryItemDescription = page.locator(".inventory_item_description")
        this.inventoryAddToCartButton = page.locator(".inventory_item button")
        this.inventoryRemoveFromCartButton = page.locator(".inventory_item button")
        this.shoppingCartBadge = page.locator(".shopping_cart_badge")
        this.footerLinkTwitter = page.locator(".social_twitter")
        this.footerLinkFacebook = page.locator(".social_facebook")
        this.footerLinkLinkedIn = page.locator(".social_linkedin")
    }

    //assert home page title
    async validateHomePageTitle() {
        await expect(this.homePageTitle).toContainText("Swag Labs")
    }

    //assert header title
    async validateHeaderTitle() {
        await expect(this.headerTitle).toContainText("Products")
    }

    //assert inventory list
    async validateInventoryList() {
        await expect(this.inventoryList).toBeVisible()
    }

    //filter options
    async filterSearchOptions(value) {
        await this.filterSearchOption.selectOption(value)
    }

    //filter assertions
    async validateActiveFilter(validationValue) {
        await expect(this.inventoryItemDescription.nth(0)).toContainText(validationValue)
    }

    //add items to cart and assert it
    async addAllItemsToCartBySerialNumber() {
        let itemCount = await this.inventoryItem.count()
        for (let i = 0; i < itemCount; i++) {
            await this.inventoryAddToCartButton.nth(i).click()
        }
    }

    async addItemToCartBySerialNumber(serialNumberOfItem) {
        await this.inventoryAddToCartButton.nth(serialNumberOfItem).click()
    }

    async addItemToCartByName(itemName) {
        await this.page.pause()
        await this.inventoryAddToCartButton.getByText(itemName)//problem!
    }

    async addRandomItemToCart() {
        let itemCount = await this.inventoryItem.count()
        let randomItemNumber = Math.floor(Math.random() * itemCount)
        await this.inventoryAddToCartButton.nth(randomItemNumber).click()
    }

    async validateAddedItemsToCart(numberOfItems) {
        let itemsInCart = await this.shoppingCartBadge.innerHTML()
        let itemsInCartNum = parseInt(itemsInCart)
        expect(itemsInCartNum).toEqual(numberOfItems)
    }

    //remove items from cart via inventory page
    async removeItemsViaInventoryPg() {
        let itemCount = await this.inventoryItem.count()
        for (let i = 0; i < itemCount; i++) {
            await this.inventoryRemoveFromCartButton.nth(i).click()
        }
    }

    //remove items from cart via inventory page assertion
    async validateRemovedItemsViaInventoryPage() {
        let itemCount = await this.inventoryItem.count()
        for (let i = 0; i < itemCount; i++) {
            await expect(this.inventoryAddToCartButton.nth(i)).toBeVisible()
        }
    }

    //footer social media assertions
    async validateFooterLinkTwitter() {
        await expect(this.footerLinkTwitter).toBeVisible()
    }

    async validateFooterLinkFacebook() {
        await expect(this.footerLinkFacebook).toBeVisible()
    }

    async validateFooterLinkLinkedIn() {
        await expect(this.footerLinkLinkedIn).toBeVisible()
    }
}

export { InventoryPage }