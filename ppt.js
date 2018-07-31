const puppeteer = require('puppeteer');
const busca = require('./projects/busca/modules/modules');



(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = (await browser.pages())[0];
    await page.setViewport({width: 1000, height: 800});
    await page.setDefaultNavigationTimeout(100 * 1000);
    // await busca.cheat(page);
    await busca.go(page);
    await busca.login(page);
    await busca.openSearch(page);
    await busca.search(page);
    await busca.selectFlight(page, true);
  
  })();
  