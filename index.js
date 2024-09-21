const axios = require("axios");
const puppeteer = require("puppeteer");

// Profile's UUID from Octo
const PROFILE_UUID = "bf704e1940f145be8cca5fd5144f1f0e";

async function main() {
  const response = await axios.post(
    "http://127.0.0.1:58888/api/profiles/start",
    {
      uuid: PROFILE_UUID,
      headless: false,
      debug_port: true,
    }
  );

  const startResponse = response.data;
  const wsEndpoint = startResponse.ws_endpoint;

  const browser = await puppeteer.connect({ browserWSEndpoint: wsEndpoint });
  const pages = await browser.pages();
  const page = pages[0];

  await page.goto("https://www.google.com");

  await browser.close();
}

main();
