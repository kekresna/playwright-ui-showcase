import { expect, Page } from "@playwright/test";
import { Env } from "../env";
import { BasePage } from "./basePage";

export class RegisterPage extends BasePage{
    inputFullName = this.page.locator("input[placeholder='Full Name']")
    inputEmail = this.page.locator("input[placeholder='Email']")
    inputPassword = this.page.locator("input[placeholder='Password']")
    signUpButton = this.page.getByRole('button', { name: 'SIGN UP' })

    async navigateToRegisterPage() {
        await this.page.goto(`${Env.BASE_URL}${Env.PATH_REGISTER}`);
    }

    async registerNewUser(){
        const postfix = this.generatePostfix()
        let fullName = `Test ${postfix}`
        let email = `test_${postfix}@test.com`
        let password = `123456`
        await expect(this.page.getByText("Create A New Account")).toBeVisible()
        // this.inputFullName.click()
        await this.inputFullName.fill(fullName)
        // this.inputEmail.click()
        await this.inputEmail.fill(email)
        // this.inputPassword.click()
        await this.inputPassword.fill(password)
        this.signUpButton.click()
    }

    generatePostfix(length: number = 4): string {
        return Math.random().toString(36).substring(2, 2 + length);}
}
