import { Page, expect } from "@playwright/test";
import { Env } from "../env";
import { BasePage } from "./basePage";

export class ProductPage extends BasePage {
    addToCartButton = this.page.getByRole('button', { name: 'ADD TO CART' })
    continueShoppingButton = this.page.getByRole('link', { name: 'Continue Shopping' })

    async addDummyItem1(){
        const currentUrl = this.page.url()
        // console.log(currentUrl)
        await this.page.locator("//img[@alt='Hacked fashion chuck taylor all star']").click()
        await this.page.waitForFunction((url) => window.location.href !== url, currentUrl)
        await expect(this.page.getByText("Hacked fashion chuck taylor all star")).toHaveCount(2)
        await this.page.waitForTimeout(2_000)
        await this.page.getByRole('link', { name: 'XL' }).click();
        await this.page.waitForTimeout(2_000)
        await this.page.getByRole('link', { name: 'Blue' }).click();
        await this.page.waitForTimeout(2_000)
        await this.addToCartButton.click()
        await this.page.waitForTimeout(2_000)
        await this.continueShoppingButton.click()
    }

    async addDummyItem2(){
        const currentUrl = this.page.url()
        console.log(currentUrl)
        await this.page.locator("//img[@alt='Nizza trefoil shoes']").click()
        await this.page.waitForFunction((url) => window.location.href !== url, currentUrl)
        await expect(this.page.getByText("Nizza trefoil shoes")).toHaveCount(2)
        await this.page.waitForTimeout(2_000)
        await this.page.locator("//a[normalize-space()='L']").click()
        await this.page.waitForTimeout(2_000)
        await this.page.locator("//a[normalize-space()='White']").click()
        await this.page.waitForTimeout(2_000)
        await this.addToCartButton.click()
        await this.page.waitForTimeout(2_000)
        await this.continueShoppingButton.click()
    }
}
