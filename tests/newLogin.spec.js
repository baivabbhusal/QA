const { test } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/login.po');
const testData=require("../fixtures/loginFixture.js");

test.describe('Login Tests - Contact List App', () => {

  test.describe('Valid Login Scenarios', () => {

    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.navigate();
    });

    test('Valid Login', async ({ page }) => {
      const login = new LoginPage(page);

      await login.login(testData.validUser.userName,testData.validUser.password);
      await login.verifyValidLogin();
    });

  });

  test.describe('Invalid Login Scenarios', () => {

    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.navigate();
    });

    test('Valid username and invalid password', async ({ page }) => {
      const login = new LoginPage(page);

      await login.login(testData.validUser.userName,testData.invalidUser.password);
      await login.verifyInvalidLogin();
    });

    test('Invalid Login (wrong email & password)', async ({ page }) => {
      const login = new LoginPage(page);

      await login.login(testData.invalidUser.userName,testData.invalidUser.password);
      await login.verifyInvalidLogin();
    });

    test('Empty Login Fields', async ({ page }) => {
      const login = new LoginPage(page);

      await login.login('', '');
      await login.verifyInvalidLogin();
    });

  });

});