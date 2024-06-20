import { test, expect } from '@playwright/test';

const UI_URL= "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
    await page.goto(UI_URL)
    //GET SIGN IN BUTTON
    await page.getByRole("link",{name:"Sign In"}).click();
    await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible()
    //FILL IN EMAIL
    await page.locator("[name=email]").fill("user@gmail.com");
    //FILL IN PASSWORD
    await page.locator("[name=password]").fill("user1234");

    //CLICK SIGN IN BUTTON
    await page.getByRole("button",{name:"Login"}).click()

    //EXPECT TO SEE WELCOME MESSAGE
    await expect(page.getByText("Login Successful")).toBeVisible()
    await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
    await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
    await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()

});

test("should allow user to register",async({page})=>{
    const test_email=`test_register_${Math.floor(Math.random()*90000)+10000}@gmail.com`
    await page.goto(UI_URL)
    await page.getByRole("link",{name:"Sign In"}).click()
    await page.getByRole("link",{name:"Create an account here"}).click()
    await expect(page.getByRole("heading",{name:"Create an Account"})).toBeVisible()
    await page.locator("[name=firstName]").fill("Test")
    await page.locator("[name=lastName]").fill("User")
    await page.locator("[name=email]").fill(test_email)
    await page.locator("[name=password]").fill("test1234")
    await page.locator("[name=confirmPassword]").fill("test1234")
    await page.getByRole("button",{name:"Register"}).click();
    await expect(page.getByText("Registration Successful!")).toBeVisible()
    await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible()
    await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible()
    await expect(page.getByRole("button",{name:"Sign Out"})).toBeVisible()
})