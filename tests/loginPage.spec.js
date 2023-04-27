import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";

test.describe('Login page', () => {
    test('Login unsucessfull - wrong username', async ({ page }) => {
        const Login = new LoginPage(page)
        await Login.gotoPage()
        await Login.login("not_standard_user", "secret_sauce")
        await Login.validateErrorMessage()
    });

    test('Login unsucessfull - wrong password', async ({ page }) => {
        const Login = new LoginPage(page)
        await Login.gotoPage()
        await Login.login("standard_user", "not_secret_sauce")
        await Login.validateErrorMessage()
    });

    test('Login unsucessfull - wrong username & password', async ({ page }) => {
        const Login = new LoginPage(page)
        await Login.gotoPage()
        await Login.login("not_standard_user", "not_secret_sauce")
        await Login.validateErrorMessage()
    });

    test('Login sucessfull', async ({ page }) => {
        const Login = new LoginPage(page)
        await Login.gotoPage()
        await Login.login("standard_user", "secret_sauce")
        await Login.validateLoginSuccessfull()
    });
});