const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.emailInput = '#email';
    this.passwordInput = 'input[placeholder="Password"]';
    this.loginButton = '#submit';
    this.logoutButton = '#logout';
    this.successMessage = 'text=Click on any contact to view the Contact Details';
    this.errorMessage = '#error';
  }

  // Navigate (good practice to keep it inside POM)
  async navigate() {
    await this.page.goto('/');
  }

  // Actions
// Actions
async login(email, password) {
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.passwordInput).fill(password);

    // Wait for the response but don't force it to be 200 yet 
    // so we can see error messages on the UI
    const [response] = await Promise.all([
      this.page.waitForResponse(res => res.url().includes('/users/login')), 
      this.page.locator(this.loginButton).click(),
    ]);

    return response.status();
  }

  async logout() {
    await this.page.locator(this.logoutButton).click();
  }

  async verifyValidLogin() {
        const LoginValidation = await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect(LoginValidation).toHaveText('Click on any contact to view the Contact Details');
     }

  async verifyInvalidLogin() {
    const InvalidLogin = await this.page.locator(this.alertMessage);
    await expect(this.page.locator(this.errorMessage)).toBeVisible();
    await expect(this.page.locator(this.errorMessage))
      .toHaveText('Incorrect username or password');

    await expect(this.page.locator(this.logoutButton)).not.toBeVisible();
  }

};