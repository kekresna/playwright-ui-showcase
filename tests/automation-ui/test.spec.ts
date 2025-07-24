import * as fs from "fs";
import { test, expect } from "@playwright/test";
import { LandingPage } from "../../page_objects/landingPage";
import { LoginPage } from "../../page_objects/loginPage";
import { RegisterPage } from "../../page_objects/registerPage";
import { ProductPage } from "../../page_objects/productPage";
import { CartPage } from "../../page_objects/cartPage";
import { Env } from "../../env";

const loginData = JSON.parse(fs.readFileSync("./utils/usercredentials.json", "utf-8"));

test.describe("Process: Login", () => {
	for (const { testCase, email, password, errorMessage } of loginData) {
		test(`${testCase} | Should Return ${errorMessage}`, async ({ page }) => {
			const landingPage = new LandingPage(page)
            const loginPage = new LoginPage(page)
            loginPage.navigateToLoginPage()
            loginPage.processLogin(email, password)
            if(errorMessage === "Invalid"){
                await expect(page.getByText("Invalid email or password")).toBeVisible({timeout: 15000});
            }
            else if(errorMessage === "Null"){
                await expect(page.getByText("This field can not be empty")).toHaveCount(2, {timeout:15000})
            }
            else{
                await expect(page).toHaveURL(`${Env.BASE_URL}`, {timeout:15000})
                landingPage.clickProfileIcon()
                await expect(page.getByText(email)).toBeVisible();
            }
        })
	}
});

test.describe("Process: Register", () => {
    test("Register New User", async ({ page }) => {
        const registerPage = new RegisterPage(page)
        await registerPage.navigateToRegisterPage()
        await registerPage.registerNewUser()
        await expect(page).toHaveURL(`${Env.BASE_URL}`, {timeout:15000})
    })
})

test.describe("Process: Add to Cart and Remove Items", () => {
    test("Add 2 Item to Cart and Remove All", async ({ page }) => {
        const landingPage = new LandingPage(page)
        const loginPage = new LoginPage(page)
        const productPage = new ProductPage(page)
        const cartPage = new CartPage(page)

        await loginPage.navigateToLoginPage()
        await loginPage.processLogin("alvinkresna@gmail.com", "123456")
        await landingPage.verifySuccess()

        await landingPage.goToMenSection()
        await productPage.addDummyItem1()
        await landingPage.navigateToEvershopIO()
        await landingPage.goToMenSection()
        await productPage.addDummyItem2()
        await page.goto("https://demo.evershop.io/cart")
        // await page.locator("//a[@class='mini-cart-icon']").click()
        await page.waitForTimeout(5_000)
        await cartPage.remove2Item()
    })
})