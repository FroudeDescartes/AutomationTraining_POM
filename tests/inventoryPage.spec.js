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
    test('Add to cart by serial number', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.itemToCartBySerialNumber()
    });

    test('Add to cart by name', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.itemToCartByName()
    });

    test('Add random item to cart', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.randomItemToCart()
    });

    test('Remove from cart via Inventory page', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.itemToCartBySerialNumber()
        await InventoryPg.removeItemsViaInventoryPg()
    });

    test('Inventory list', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.validateInventoryList()
    });

    test('Filter search Z to A', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.filterSearchOptionZToA()
        await InventoryPg.validateActiveFilterZToA()
    });

    test('Filter search A to Z', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.filterSearchOptionAToZ()
        await InventoryPg.validateActiveFilterAToZ()
    });

    test('Filter search High price to Low price', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.filterSearchOptionHighToLow()
        await InventoryPg.validateActiveFilterHighToLow()
    });

    test('Filter search Low price to High price', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.filterSearchOptionLowToHigh()
        await InventoryPg.validateActiveFilterLowToHigh()
    });

    //footer
    test('Footer social media links', async ({ page }) => {
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.validateFooterLinkTwitter()
        await InventoryPg.validateFooterLinkFacebook()
        await InventoryPg.validateFooterLinkLinkedIn()
    });
});