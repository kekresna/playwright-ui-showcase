import { expect, Page } from "@playwright/test";
import { Env } from "../env";
import { BasePage } from "./basePage";

export class LoginPage  extends BasePage{
	inputEmail = this.page.getByRole('textbox', { name: 'Email' })
	inputPassword = this.page.getByRole('textbox', { name: 'Password' })
	signInButton = this.page.getByRole('button', { name: 'SIGN IN' })

	async navigateToLoginPage() {
		await this.page.goto(`${Env.BASE_URL}${Env.PATH_LOGIN}`);
	}

	async processLogin(email: string, password: string){
		// await this.inputEmail.click()
		await this.inputEmail.fill(email)
		// await this.inputPassword.click()
		await this.inputPassword.fill(password)
		await this.signInButton.click()
	}
}
