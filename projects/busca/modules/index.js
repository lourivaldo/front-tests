require('dotenv').config();
const EMAIL = process.env.EMAIL;
const URL_BUSCA = process.env.URL_BUSCA;
const PASS_MANGUE3 = process.env.PASS_MANGUE3;
const moment = require('moment');
const _ = require('lodash');

 
/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const byPassHeadlessDetection = async (page) => {

    // Burlas test de webdriver
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false
        });
    });

    // Burlar teste de chrome
    await page.evaluateOnNewDocument(() => {
        window.chrome = {
            runtime: {}
        };
    });

    // Burlar teste de permissões
    await page.evaluateOnNewDocument(() => {
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.__proto__.query = parameters =>
            parameters.name === 'notifications'
                ? Promise.resolve({ state: Notification.permission })
                : originalQuery(parameters);

        const oldCall = Function.prototype.call;
        function call() {
            return oldCall.apply(this, arguments);
        }
        Function.prototype.call = call;

        const nativeToStringFunctionString = Error.toString().replace(/Error/g, "toString");
        const oldToString = Function.prototype.toString;

        function functionToString() {
            if (this === window.navigator.permissions.query) {
                return "function query() { [native code] }";
            }
            if (this === functionToString) {
                return nativeToStringFunctionString;
            }
            return oldCall.call(oldToString, this);
        }
        Function.prototype.toString = functionToString;
    });

    // Burlar teste de tamanho de plugins
    await page.evaluateOnNewDocument(() => {
        // Sobreescreve a propriedade `plugins` , para usar  um getter personalizado.
        Object.defineProperty(navigator, 'plugins', {
            // So precisa ter `length > 0`
            get: () => [1, 2, 3, 4, 5]
        });
    });

    // Burlar teste de  Linguagem.
    await page.evaluateOnNewDocument(() => {
        // Sobreescreve a propriedade `plugins` , para usar  um getter personalizado.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en']
        });
    });

    // Burlar teste de iframe
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
            get: function () {
                return window;
            }
        });
    });

    // Burlar teste toString, ( quebra console.debug() )
    await page.evaluateOnNewDocument(() => {
        window.console.debug = () => {
            return null;
        };
    });
};


/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const go = async (page) => {
    await page.goto(URL_BUSCA);
};


/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const login = async (page) => {
    await page.click('div.button-enter button.btn-defaut');
    await page.type('input[type="email"]', EMAIL);
    await page.type('input[type="password"]', PASS_MANGUE3);
    await page.click('div.action-login button.b-btn.b-btn-default.btn-block');

};


/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const openSearch = async (page) => {
    await page.waitForSelector('#banner-home');

    //go to search page
    await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('a')).filter(a => /BUSCAR PASSAGENS/.test(a.innerText));
        elements[0].className += "btn-busca-nightmare";
    });
    await page.click('.btn-busca-nightmare')

};


/**
 *
 * @param page
 * @param after_15_days
 * @param companies
 * @returns {Promise<void>}
 */
const search = async (page, after_15_days, companies) => {
    const date_starting = after_15_days ? 16 : 1;
    const date_back = after_15_days ? 18 : 3;

    await page.waitFor(4000);
    await page.type('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > input', 'REC');
    await page.waitForSelector('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > ul > li:nth-child(1)');
    await page.click('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > ul > li:nth-child(1)');
    await page.waitFor(200);
    await page.type('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > input', 'SAO');
    await page.waitForSelector('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > ul > li:nth-child(1)');
    await page.click('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > ul > li:nth-child(1)');
    await page.type('#date_starting', moment().add(date_starting, 'day').format('DD/MM/YYYY'));
    await page.type('#date_back', moment().add(date_back, 'days').format('DD/MM/YYYY'));
    
    await _.forEach(companies, async (value, company) => {
        !value && await page.click(`.logo-${company}`);
        
    });
    await page.waitFor(200);
    await page.click('#btn-buscar-voos')

};


/**
 *
 * @param page
 * @param type
 * @returns {Promise<void>}
 */
const findFLight = async (page, type) => {
    await page.waitForSelector('.numero-voo');


    return await page.evaluate(($type) => {
        const selector = `#tab-${$type} > div:nth-child(3) > div > div > div:nth-child(1) > input[type=radio]`;
        return document.querySelector(selector).id;

    }, type);

};


/**
 *
 * @param page
 * @param round_trip
 * @returns {Promise<void>}
 */
const selectFlight = async (page, round_trip) => {
    await page.click(`#${await findFLight(page, 'ida')}`);
    if (round_trip) {
        await page.click('#tabs > li:nth-child(2) > a');
        await page.click(`#${await findFLight(page, 'volta')}`);
    }

};


/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const confirmFlights = async (page) => {
    await page.click('#btn-opcoes > div > div > button');
};


/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const confirmTerms = async (page) => {
    await page.waitForSelector('#modal-conditional > div > div > div.modal-footer > div > button.btn.btn-success');
    await page.click('#modal-conditional > div > div > div.modal-footer > div > button.btn.btn-success');

};


/**
 *
 * @param page
 * @param config
 * @returns {Promise<void>}
 */
const basics = async (page, config) => {
    await go(page);
    await login(page);
    await openSearch(page);
    await search(page, config.after_15_days, config.companies);
    await selectFlight(page, config.round_trip);
    await confirmFlights(page);
    await confirmTerms(page);
};


/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const setCoupon = async (page) => {
    const accordeon = '#root > div > div:nth-child(2) > content > div > div > div > div > div > div > div.animated.fadeInLeft > div:nth-child(1) > div > div.panel-heading.panel-heading-divider.form-title';
    await page.waitForSelector(accordeon);
    await page.click(accordeon);
    await page.type('#coupon-input', 'UGCGKCVG');

};


const test = async (page, config) => {
    // await go(page);
    // await login(page);
    // await openSearch(page);
    // for(let i = 0; i < config.loops; i++) {
    //     await search(page, config.after_15_days, config.companies);

    //     // await page.event.requestfinished();
    // }
    
};

const $module = {
    go,
    login,
    openSearch,
    search,
    selectFlight,
    cheat: byPassHeadlessDetection,
    confirmFlights,
    confirmTerms,
    basics,
    setCoupon,
    test
};


module.exports = $module;
