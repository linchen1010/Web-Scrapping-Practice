/** @format */

const puppeteer = require("puppeteer");

const myURL = "https://en.wikipedia.org/wiki/Banana";

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const scrapReference = async (url) => {
  const brower = await puppeteer.launch({ headless: true });
  const page = await brower.newPage();

  await page.goto(url);

  console.log("Start scraping...");

  mp = {};

  const references = await page.$$("a[href]");
  console.log(references.length);

  for (let i = 0; i < references.length; i++) {
    await page.goto(url); // go back to main page
    await page.waitForSelector("a[href]");
    console.log(i);
    const references = await page.$$("a[href]");
    const reference = references[i];

    await reference.evaluate((ref) => ref.click());

    await page.waitForSelector(".firstHeading");
    const name = await page.evaluate(() => {
      return document.querySelector(".firstHeading").innerText;
    });
    // count the reference of each article
    const numOfReference = await page.$$("a[href]");
    // and record it a map with name of article
    mp[name.toString()] = numOfReference.length;
    console.log(name, numOfReference.length);
  }
  console.log("end scraping ...");
  return mp;
};

// sort the map and get the least five # of ref of article

const getData = async () => {
  const data = await scrapReference(myURL);
  let myObj = [];

  for (const key in data) {
    myObj.push([key, data[key]]);
  }

  myObj.sort((a, b) => {
    return a[1] - b[1];
  });

  console.log(myObj);

  let res = [];

  for (let i = 0; i < 5; i++) {
    res.push(myObj[i]);
  }
  console.log(res);
  return;
  //   return data;
};

getData();
