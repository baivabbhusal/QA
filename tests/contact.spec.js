import { test } from "@playwright/test";
import { LoginPage } from "../pageObjects/login.po.js";
import { ContactPage } from '../pageObjects/contact.po.js';
const testData = require('../fixtures/loginFixture.json');
const contactTestData = require('../fixtures/contactFixture.json');
const { authenticateUser, createEntity } = require('../utils/helper.spec.js');
let accessToken;

test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login(testData.validUser.userName, testData.validUser.password);
    await login.verifyValidLogin();
});

test.describe("Contact testcases", () => {
    test("Contact Add test", async ({ page, request }) => {
        const contact = new ContactPage(page);
        await contact.contactAdd("fname","lname","dob","email","phone");
        await contact.viewContact();
        await contact.validateContactCreated("fname","lname","dob","email","phone");
    });

    test ("Contact Edit test", async ({ page, request }) => {
        const Data = {
            "firstName": "Ram",
            "lName": "Prasad",
            "birthdate": "1990-01-01",
            "email": "ram@gamil.com",
            "phone": "9876543210",
            "street1": "Naxal",
            "city": "city1",
            "stateProvince": "state1",
            "postalCode": "1234",
            "country": "Nepal"
        };
        const contact = new ContactPage(page);
        accessToken = await authenticateUser(testData.validUser.username, testData.validUser.password, {request});
        await createEntity(Data, accessToken, "/contacts", {request});
        page.reload();
        await contact.viewContact();
        await contact.contactEdit(contactTestData.contactEdit.firstName);
        await contact.validateContactCreated(contactTestData.contactEdit.firstName, contactTestData.contactEdit.lastName, contactTestData.contactEdit.dateOfBirth, contactTestData.contactEdit.email, contactTestData.contactEdit.phone, contactTestData.contactEdit.address, contactTestData.contactEdit.city, contactTestData.contactEdit.state, contactTestData.contactEdit.postal, contactTestData.contactEdit.country);
    });
    test.only('contact Delete test',async ({page,request})=>{
        const Data={
            "firstName": "Baivab",
            "lastName": "Bhusal",
            "birthdate": "2003-07-24",
            "email": "baivabbhusal229@gamil.com",
            "phone": "9867294717",
            "street1": "chandol",
            "city": "siyari",
            "stateProvince": "Bagmati",
            "postalCode": "44600",
            "country": "Nepal"
        };
        const contact=new ContactPage(page);
        accessToken=await authenticateUser(testData.validUser.userName,testData.validUser.password,{request});
        await createEntity(Data,accessToken,'/contact',{request});
        page.reload();
        await contact.viewContact();
        const id=await getEntity(accessToken,'/contacts','200',{request});
        await contact.contactDelete();
        await validateEntity(accessToken,`/contact/${id}`,'404',{request});

    })
})