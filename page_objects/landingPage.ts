import { Page, expect } from "@playwright/test";
import { Env } from "../env";
import { BasePage } from "./basePage";

export class LandingPage extends BasePage {
    logoIcon = this.page.locator('.logo-icon')
    searchIcon = this.page.locator('.search-icon')
    cartIcon = this.page.locator('.mini-car-icon')
	profileIcon = this.page.locator('div:nth-child(3) > a').first()
    shopMenButton = this.page.getByRole('link', { name: 'Shop men' })
    shopWomenButton = this.page.getByRole('link', { name: 'Shop women' })
    shopKidsButton = this.page.getByRole('link', { name: 'Shop kids' })

	async navigateToEvershopIO() {
		await this.page.goto(`${Env.BASE_URL}`);
	}

    async verifySuccess(){
        await expect(this.page).toHaveURL(`${Env.BASE_URL}`)
        await expect(this.page.getByRole('heading', { name: 'Your Heading Here' })).toBeVisible()
    }

    async clickProfileIcon(){
        await this.profileIcon.click()
        await expect(this.page).toHaveURL(/\/account\/login/);
    }

    async goToMenSection(){
        await expect(this.shopMenButton).toBeVisible()
        await this.shopMenButton.click()
        await expect(this.page).toHaveURL(/men/);
    }

    async goToKidsSection(){
        await this.shopKidsButton.click()
        await expect(this.page).toHaveURL(/kids/);
    }

    async goToWomenSection(){
        await this.shopWomenButton.click()
        await expect(this.page).toHaveURL(/women/);
    }
}
