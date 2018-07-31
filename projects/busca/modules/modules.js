require('dotenv').config();
const EMAIL = process.env.EMAIL;
const PASS_INBOX = process.env.PASS_INBOX;
const PASS_MANGUE3 = process.env.PASS_MANGUE3;
const moment = require('moment');


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
    await page.goto('http://localhost:3333');
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
 * @returns {Promise<void>}
 */
const search = async (page) => {
    await page.waitFor(4000);
    await page.type('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > input', 'REC')
    await page.waitForSelector('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > ul > li:nth-child(1)')
    await page.click('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > ul > li:nth-child(1)')
    await page.type('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > input', 'SAO')
    await page.waitForSelector('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > ul > li:nth-child(1)')
    await page.click('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > ul > li:nth-child(1)')


    //error validate 15 days
    await page.type('#date_starting', moment().add(1, 'day').format('DD/MM/YYYY'));
    await page.type('#date_back', moment().add(3, 'days').format('DD/MM/YYYY'));


    // .type('#date_starting', moment().add(16,'days').format('DD/MM/YYYY'))
    // .type('#date_back',     moment().add(18,'days').format('DD/MM/YYYY'))


    // await page.click('.logo-tam')
    await page.click('.logo-avianca');
    await page.click('.logo-azul');
    // await page.click('.logo-gol')
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
        console.log(Array.from(document.querySelector(`#tab-ida > div:nth-child(3) > div > div > div:nth-child(1)`)));

        return Array.from(document.querySelector(`#tab-${$type}:nth-child(3)`))[0].id
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
    round_trip && await page.click(`#${await findFLight(page, 'volta')}`);

};


/**
 *
 * @type {{go: go, login: login, openSearch: openSearch, search: search, selectFlight: selectFlight, cheat: byPassHeadlessDetection}}
 */
const $module = { go, login, openSearch, search, selectFlight, cheat: byPassHeadlessDetection };


module.exports = $module;