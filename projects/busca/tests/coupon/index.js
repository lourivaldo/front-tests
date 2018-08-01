const puppeteer = require('puppeteer');
const busca = require('../../modules');
const config = require('../../../../config');

const run = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = (await browser.pages())[0];
    await page.setViewport({width: 1000, height: 800});
    await page.setDefaultNavigationTimeout(100 * 1000);
    await busca.basics(page, config.busca);
};

module.exports = { run };
