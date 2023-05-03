import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from '../pages/inventoryPage';


test.describe('Inventory page', () => {
    test.beforeEach(async ({ page }) => {
        const Login = new LoginPage(page)
        await Login.gotoPage()
        await Login.login("standard_user", "secret_sauce")
    });

    //header
    test('Home page title', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.validateHomePageTitle()
    });

    test('Header title', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.validateHeaderTitle()
    });

    //inventory
    test('Inventory list', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.validateInventoryList()
    });

    test('Add all items to cart by serial number', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.addAllItemsToCartBySerialNumber()
    });

    test('Add item to cart by serial number', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.addItemToCartBySerialNumber(3)
    });

    test('Add item to cart by name', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.addItemToCartByName("Sauce Labs Bike Light")
    });

    test('Add random item to cart', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.addRandomItemToCart()
    });

    test('Remove from cart via Inventory page', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.addAllItemsToCartBySerialNumber()
        await InventoryPg.removeItemsViaInventoryPg()
        await InventoryPg.validateRemovedItemsViaInventoryPage()
    });

    test('Filter search', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.filterSearchOptions('za')
        await InventoryPg.validateActiveFilter("Test.allTheThings() T-Shirt (Red)")

        await InventoryPg.filterSearchOptions('az')
        await InventoryPg.validateActiveFilter("Sauce Labs Backpack")

        await InventoryPg.filterSearchOptions('hilo')
        await InventoryPg.validateActiveFilter("$49.99")

        await InventoryPg.filterSearchOptions('lohi')
        await InventoryPg.validateActiveFilter("$7.99")

        /*
        optionValue = {
            "Name (Z to A)": 'za',
            "Name (A to Z)": 'az',
            "Price (High to Low)": 'hilo',
            "Price (Low to High)": 'lohi'
        }
        */
    });

    //footer
    test('Footer social media links', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.validateFooterLinkTwitter()
        await InventoryPg.validateFooterLinkFacebook()
        await InventoryPg.validateFooterLinkLinkedIn()
    });
});