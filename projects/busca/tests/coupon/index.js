const puppeteer = require('puppeteer');
const busca = require('./projects/busca/modules/modules');
const config = {
    after_15_days: false,
    loops: 1,
    round_trip: true,
    companies: {
        avianca: true,
        tam: true,
        gol: true,
        azul: true
    }
};

const run = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = (await browser.pages())[0];
    await page.setViewport({width: 1000, height: 800});
    await page.setDefaultNavigationTimeout(100 * 1000);
    await busca.basics(page, config);
}

module.exports = { run }
