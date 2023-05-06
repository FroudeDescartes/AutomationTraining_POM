import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";
import { CartPage } from "../pages/cartPage";
import { InventoryPage } from "../pages/inventoryPage";

test.describe('Cart page', () => {
    test.beforeEach(async ({ page }) => {
        const Login = new LoginPage(page)
        await Login.gotoPage()
        await Login.login("standard_user", "secret_sauce")
    });

    test('Full order procedure', async ({ page }) => {
        const CartPg = new CartPage(page)
        const InventoryPg = new InventoryPage(page)
        await InventoryPg.addItemToCartBySerialNumber(4)
        await InventoryPg.addItemToCartBySerialNumber(3)
        await CartPg.validateNumberOfItemsInCart(2)
        await CartPg.checkout("John", "Smith", "10001")
        await CartPg.validateSubtotalPrices()
        await CartPg.validateTaxPrice()
        await CartPg.validateTotalPrice()
        await CartPg.finishOrder()
    });

    test('Cart empty', async ({ page }) => {
        const CartPg = new CartPage(page)
        await CartPg.validateNumberOfItemsInCart()
    });
    
});