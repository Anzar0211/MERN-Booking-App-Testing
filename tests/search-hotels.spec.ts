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

test('should book hotel',async({page})=>{
    await page.goto(UI_URL);
    await page.getByPlaceholder("Where are you going?").fill("Gurgaon");
    const date=new Date();
    date.setDate(date.getDate()+3);
    const formattedDate=date.toISOString().split('T')[0]
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);
    await page.getByRole("button",{name:"Search"}).click(); 
    await page.getByText("test hotel 1").click();
    await page.getByRole("button",{name:"Book Now"}).click();
    await expect(page.getByText("Total Amount: Rs 366.00")).toBeVisible();
    const stripeFrame=page.frameLocator('iframe').first();
    await stripeFrame
        .locator('[placeholder="Card number"]')
        .fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("08/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("123");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("12345");
    await page.getByRole("button",{name:"Confirm and Pay"}).click()
    await expect(page.getByText("Payment Successful,Booking Saved")).toBeVisible({timeout: 120000});
    await page.getByRole("link",{name:"My Bookings"}).click();
    await expect(page.getByText("test hotel 1")).toBeVisible();
})

