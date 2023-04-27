import { expect } from "@playwright/test"

class InventoryPage {

    constructor(page) {
        this.page = page
        this.homePageTitle = page.locator(".app_logo")
        this.headerTitle = page.locator(".title")
        this.filterSearchOption = page.locator('[data-test="product_sort_container"]')
        this.inventoryList = page.locator(".inventory_list")
        this.inventoryItem = page.locator(".inventory_item")
        this.inventoryItemName = page.locator(".inventory_item_name")
        this.inventoryItemPrice = page.locator(".inventory_item_price")
        this.inventoryAddToCartButton = page.locator(".inventory_item button")
        this.inventoryRemoveFromCartButton = page.locator(".inventory_item button")
        this.footerLinkTwitter = page.locator(".social_twitter")
        this.footerLinkFacebook = page.locator(".social_facebook")
        this.footerLinkLinkedIn = page.locator(".social_linkedin")
        this.inventory = {
            "sauceLabsBackpack": page.locator("#add-to-cart-sauce-labs-backpack"),
            "sauceLabsBikeLight": page.locator("#add-to-cart-sauce-labs-bike-light"),
            "sauceLabsBoltTShirt": page.locator("#add-to-cart-sauce-labs-bolt-t-shirt"),
            "sauceLabsFleeceJacket": page.locator("#add-to-cart-sauce-labs-fleece-jacket"),
            "sauceLabsOnesie": page.locator("#add-to-cart-sauce-labs-onesie"),
            "tShirt": page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]'),
        }
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
    async filterSearchOptionZToA() {
        await this.filterSearchOption.selectOption('za')
    }

    async filterSearchOptionAToZ() {
        await this.filterSearchOption.selectOption('az')
    }

    async filterSearchOptionHighToLow() {
        await this.filterSearchOption.selectOption('hilo')
    }

    async filterSearchOptionLowToHigh() {
        await this.filterSearchOption.selectOption('lohi')
    }

    //filter assertions
    async validateActiveFilterZToA() {
        await expect(this.inventoryItemName.nth(0)).toContainText("Test.allTheThings() T-Shirt (Red)")
    }

    async validateActiveFilterAToZ() {
        await expect(this.inventoryItemName.nth(0)).toContainText("Sauce Labs Backpack")
    }

    async validateActiveFilterHighToLow() {
        await expect(this.inventoryItemPrice.nth(0)).toContainText("$49.99")
    }

    async validateActiveFilterLowToHigh() {
        await expect(this.inventoryItemPrice.nth(0)).toContainText("$7.99")
    }

    //add items to cart
    async itemToCartBySerialNumber() {
        let itemCount = await this.inventoryItem.count()
        for (let i = 0; i < itemCount; i++) {
            await this.inventoryAddToCartButton.nth(i).click()
        }
    }

    async itemToCartByName() {
        await this.inventory.sauceLabsBackpack.click()
        await this.inventory.sauceLabsBikeLight.click()
        await this.inventory.sauceLabsBoltTShirt.click()
        await this.inventory.sauceLabsFleeceJacket.click()
        await this.inventory.sauceLabsOnesie.click()
        await this.inventory.tShirt.click()
    }

    async randomItemToCart(){
        let itemCount = await this.inventoryItem.count()
        let randomItemNumber = Math.floor(Math.random() * itemCount)
        await this.inventoryAddToCartButton.nth(randomItemNumber).click()
    }

    //remove items from cart via inventory page
    async removeItemsViaInventoryPg() {
        let itemCount = await this.inventoryItem.count()
        for (let i = 0; i < itemCount; i++) {
            await this.inventoryRemoveFromCartButton.nth(i).click()
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