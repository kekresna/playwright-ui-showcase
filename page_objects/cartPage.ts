import { Page, expect } from "@playwright/test";
import { Env } from "../env";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
    checkoutButton = this.page.locator("a[class='button primary']")

    async checkCartContains2Item(){
        await expect(this.page.getByText("Hacked fashion chuck taylor all star")).toBeVisible()
        await expect(this.page.getByText("Nizza trefoil shoes")).toBeVisible()
    }

    async clickCheckout(){
        await this.checkoutButton.click()
    }

    async remove2Item(){
        await this.page.getByRole('link', { name: 'Remove' }).first().click();
        await this.page.waitForTimeout(2_000)
        await this.page.getByRole('link', { name: 'Remove' }).click();
        await this.page.waitForTimeout(2_000)
        await this.page.getByText("Your cart is empty!")
    }

    async remove1Item(){
        await this.page.getByRole('link', { name: 'Remove' }).first().click();
    }
}
