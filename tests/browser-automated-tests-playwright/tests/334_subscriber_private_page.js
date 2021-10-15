const { test, expect } = require('@playwright/test');
const checkSubscriberLogin= require('./checkSubscriberLogin.js');
const SUBSCRIBER_EMAIL_USER = process.env.SUBSCRIBER_EMAIL_USER;


test('@334@subscriber@checking for private page', async ({ page }) => {
 
  //login in as subscriber
  await page.goto("/account/login");
  await page.fill('#email', SUBSCRIBER_EMAIL_USER);
  await page.fill('#password', 'password');
  await page.click('text=Sign In');
  await page.textContent('.card-title') === "Your subscriptions";
  console.log("Logged in as a subscriber");

  //check for private page
  await page.textContent('text=Private Test Page') === "Private Test Page";
  console.log("private page exists");
  //private page exists. redirecting to private page.
  await page.goto('/page/privatetestpage');
  await new Promise(x => setTimeout(x, 3000));
  await page.textContent('text=This is a Private Page') === "This is a Private Page";
  console.log("private page have content");
});
