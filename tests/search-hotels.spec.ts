import{test,expect} from "@playwright/test"


const UI_URL= "http://localhost:5173/"


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

test("Should Show Hotel Search Results",async({page})=>{
    await page.goto(`${UI_URL}`);
    await page.getByPlaceholder("Where are you going?").fill("Gurgaon");
    await page.getByRole("button",{name:"Search"}).click();
    await expect(page.getByText("Hotels found in Gurgaon")).toBeVisible()
    await expect(page.getByText("test hotel 1")).toBeVisible()
})

test("Should show hotel details",async({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("Gurgaon");
    await page.getByRole("button",{name:"Search"}).click(); 
    await page.getByText("test hotel 1").click();
    await expect(page).toHaveURL('http://localhost:5173/detail/667412a87f1d7087f7338716');
    await expect(page.getByRole("button",{name:"Book Now"})).toBeVisible();
})