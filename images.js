const puppeteer = require("puppeteer");

const Locations = {
  US: { name: "United States", value: "US" },
  AL: { name: "Alabama", value: "AL" },
  AK: { name: "Alaska", value: "AK" },
  AZ: { name: "Arizona", value: "AZ" },
  AR: { name: "Arkansas", value: "AR" },
  CA: { name: "California", value: "CA" },
  CO: { name: "Colorado", value: "CO" },
  CT: { name: "Connecticut", value: "CT" },
  DC: { name: "District of Columbia", value: "DC" },
  DE: { name: "Delaware", value: "DE" },
  FL: { name: "Florida", value: "FL" },
  GA: { name: "Georgia", value: "GA" },
  HI: { name: "Hawaii", value: "HI" },
  ID: { name: "Idaho", value: "ID" },
  IL: { name: "Illinois", value: "IL" },
  IN: { name: "Indiana", value: "IN" },
  IA: { name: "Iowa", value: "IA" },
  KS: { name: "Kansas", value: "KS" },
  KY: { name: "Kentucky", value: "KY" },
  LA: { name: "Louisiana", value: "LA" },
  ME: { name: "Maine", value: "ME" },
  MD: { name: "Maryland", value: "MD" },
  MA: { name: "Massachusetts", value: "MA" },
  MI: { name: "Michigan", value: "MI" },
  MN: { name: "Minnesota", value: "MN" },
  MS: { name: "Mississippi", value: "MS" },
  MO: { name: "Missouri", value: "MO" },
  MT: { name: "Montana", value: "MT" },
  NE: { name: "Nebraska", value: "NE" },
  NV: { name: "Nevada", value: "NV" },
  NH: { name: "New Hampshire", value: "NH" },
  NJ: { name: "New Jersey", value: "NJ" },
  NM: { name: "New Mexico", value: "NM" },
  NY: { name: "New York", value: "NY" },
  NC: { name: "North Carolina", value: "NC" },
  ND: { name: "North Dakota", value: "ND" },
  OH: { name: "Ohio", value: "OH" },
  OK: { name: "Oklahoma", value: "OK" },
  OR: { name: "Oregon", value: "OR" },
  PA: { name: "Pennsylvania", value: "PA" },
  RI: { name: "Rhode Island", value: "RI" },
  SC: { name: "South Carolina", value: "SC" },
  SD: { name: "South Dakota", value: "SD" },
  TN: { name: "Tennessee", value: "TN" },
  TX: { name: "Texas", value: "TX" },
  UT: { name: "Utah", value: "UT" },
  VT: { name: "Vermont", value: "VT" },
  VA: { name: "Virginia", value: "VA" },
  WA: { name: "Washington", value: "WA" },
  WV: { name: "West Virginia", value: "WV" },
  WI: { name: "Wisconsin", value: "WI" },
  WY: { name: "Wyoming", value: "WY" },
};

function getLocationData(location) {
  if (Object.keys(Locations).includes(location)) {
    if (location == "US") {
      return {
        ok: true,
        url: "https://apnews.com/projects/election-results-2024/",
        selector: `.national-map-container`,
      };
    } else {
      return {
        ok: true,
        url: `https://apnews.com/projects/election-results-2024/${Locations[
          location
        ].name
          .toLowerCase()
          .replaceAll(" ", "-")}`,
        selector: `.state-map-container`,
      };
    }
  } else {
    return { ok: false };
  }
}

async function getImage(location) {
  if (getLocationData(location).ok) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const locationData = getLocationData(location);

    await page.setViewport({ width: 1600, height: 1200, deviceScaleFactor: 2 });

    console.log(locationData.url);

    await page.goto(locationData.url);

    await page.evaluate(() => window.scrollTo(0, 0));

    await page.waitForSelector(locationData.selector);

    const element = await page.$(locationData.selector);
    const boundingBox = await element.boundingBox();

    if (element) {
      console.log("Element found!");

      const screenshotBuffer = await page.screenshot({
        clip: {
          x: boundingBox.x - 20, // Adjust padding on x-axis
          y: boundingBox.y - 20, // Adjust padding on y-axis
          width: boundingBox.width + 40, // Add padding to width
          height: boundingBox.height + 40, // Add padding to height
        },
      });

      return screenshotBuffer;
    } else {
      console.log("Element not found");
    }

    await browser.close();
  } else {
    console.error(TypeError(`No location of type: ${location}`));
  }
}

module.exports = { Locations, getLocationData, getImage };
