const puppeteer = require('puppeteer');
const busca = require('../../modules');

const config = {
    random:       true,
    //random:       false,
    static_search:{
        departure:   '2018-08-26',
        return:      '2018-09-20',
        origin:      'REC',
        destination: 'BSB'
    },
    origins:      ['REC', 'BSB', 'SAO', 'MAO', 'JPA', 'IMP', 'GRU', 'CGR', 'POA'],
    destinations: ['REC', 'BSB', 'SAO', 'MAO', 'JPA', 'IMP', 'GRU', 'CGR', 'POA', 'BOG', 'JFK'],
    dates:        [
        //{departure:1, return: 15},
        //{departure:5, return: 10},
        //{departure:8, return: 20},
        //{departure:10, return: 30},
        //{departure:20, return: 30},
        //{departure:20, return: 40},
        //{departure:25, return: 50},
        //{departure:25, return: 60},
        //{departure:40, return: 45},
        //{departure:50, return: 55},
        //{departure:60, return: 65},
        {departure:1,  return: null},
        {departure:5,  return: null},
        {departure:8,  return: null},
        {departure:10, return: null},
        {departure:20, return: null},
        {departure:20, return: null},
        {departure:25, return: null},
        {departure:25, return: null},
        {departure:40, return: null},
        {departure:50, return: null},
        {departure:60, return: null}
    ],
    loops: 10,
    companies: {
        avianca: false,
        tam: true,
        gol: true,
        azul: true,
        tap: false
    }
};

const run = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        timeout: 60 * 5 * 1000
    });

    const page = (await browser.pages())[0];
    await page.setViewport({width: 1000, height: 800});
    await page.setDefaultNavigationTimeout(100 * 1000);

    await busca.go(page, config);
    await busca.login(page, config);

    for(let i = 0; i < 10; i++) {
        console.log('Test ' + (i + 1));

        if(i == 0){
            await busca.navigateToSearch(page, config);
        }else{
            await busca.openSearch(page, config);
        }

        await busca.search(page, config);

    }

    await browser.close();
};

module.exports = { run };
