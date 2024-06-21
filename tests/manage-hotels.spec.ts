import {test,expect} from "@playwright/test"
const UI_URL= "http://localhost:5173/"
import path from 'path'

test.beforeEach(async ({page})=>{
    await page.goto(UI_URL)
        //GET SIGN IN BUTTON
    await page.getByRole("link",{name:"Sign In"}).click();
    await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible()
        //FILL IN EMAIL
    await page.locator("[name=email]").fill("test_register_45136@gmail.com");
        //FILL IN PASSWORD
    await page.locator("[name=password]").fill("test1234");

        //CLICK SIGN IN BUTTON
    await page.getByRole("button",{name:"Login"}).click()

        //EXPECT TO SEE WELCOME MESSAGE
    await expect(page.getByText("Login Successful")).toBeVisible()
})

test('should allow user to add a hotel',async({page})=>{
    await page.goto(`${UI_URL}add-hotel`)
    await page.locator('[name="name"]').fill('Test Hotel')
    await page.locator('[name="city"]').fill('Test City')
    await page.locator('[name="country"]').fill('Test Country')
    await page.locator('[name="description"]').fill('Test Description')
    await page.locator('[name="pricePerNight"]').fill('100')
    await page.selectOption('select[name="starRating"]',"3")
    await page.getByText("Budget").click()
    await page.getByLabel("Free Wifi").check()
    await page.getByLabel("Parking").check()
    await page.locator('[name="adultCount"]').fill('2')
    await page.locator('[name="childCount"]').fill('2')
    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","1.jpg"),
        path.join(__dirname,"files","2.jpg")
    ])
    await page.getByRole("button",{name:"Save Hotel"}).click();
    await expect(page.getByText("Hotel added successfully")).toBeVisible({ timeout: 10000 })
})

test('should allow user to view hotels',async({page})=>{
    await page.goto(`${UI_URL}my-hotels`)
    await expect(page.getByText("abcyffgg")).toBeVisible()
    await expect(page.getByText("ammama vxczxmmkjkn")).toBeVisible()
    await expect(page.getByText("Noida,India")).toBeVisible()
    await expect(page.getByText("Business")).toBeVisible()
    await expect(page.getByText("$122 per night")).toBeVisible()
    await expect(page.getByText("5 Adults, 5 Children")).toBeVisible()
    await expect(page.getByText("5 Star Rating")).toBeVisible()
    await expect(page.getByRole("link",{name:"View Details"}).first()).toBeVisible()

})

test("should edit hotel",async({page})=>{
    await page.goto(`${UI_URL}my-hotels`)
    await page.getByRole("link",{name:"View Details"}).first().click()
    await page.waitForSelector('[name="name"]',{state:"attached"})
    await expect(page.locator('[name="name"]')).toHaveValue('test hotel 1')
    await page.locator('[name="name"]').fill('Test Hotel')
    await page.getByRole("button",{name:"Save"}).click()
    await expect(page.getByText("Hotel Updated successfully")).toBeVisible()
    await page.reload()
    await expect(page.locator('[name="name"]')).toHaveValue("Test Hotel")
    await page.locator('[name="name"]').fill("test hotel 1")
    await page.getByRole("button",{name:"Save"}).click()
})