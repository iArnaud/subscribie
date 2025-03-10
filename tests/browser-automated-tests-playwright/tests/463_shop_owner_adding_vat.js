
const { test, expect } = require('@playwright/test');
//Subscribie tests
test("@463@shop-owner@adding VAT", async ({ page }) => {
    console.log("enabling VAT...");
     // Go to style your shop
    await page.goto('/admin/vat-settings');
    const VAT_settings = await page.content("text=VAT Settings");
    expect(VAT_settings === "VAT Settings");

    await page.click('text="Yes. Charge VAT at 20%"');
    await new Promise(x => setTimeout(x, 1000));
    expect(await page.screenshot()).toMatchSnapshot('adding-VAT.png');
    await page.click('text="Save"');
    await page.textContent('.alert-heading') === "Notification";

});
