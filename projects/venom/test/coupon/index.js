const puppeteer = require('puppeteer');
const venom = require('../../modules');

const roundTrip = true;

const run = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = (await browser.pages())[0];
    await page.setViewport({width: 1000, height: 800});
    await page.setDefaultNavigationTimeout(100 * 1000);
    // await busca.cheat(page);
    await venom.goSearch(page, roundTrip);
    await venom.selectFlight(page, roundTrip);
    await venom.login(page);
};

module.exports = { run }
