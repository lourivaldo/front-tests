require('dotenv').config();
const EMAIL = process.env.EMAIL;
const PASS_MANGUE3 = process.env.PASS_MANGUE3;
const URL = process.env.URL_VENOM;
const moment = require('moment');


/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const byPassHeadlessDetection = async (page) => {

    // // Burlas test de webdriver
    // await page.evaluateOnNewDocument(() => {
    //     Object.defineProperty(navigator, 'webdriver', {
    //         get: () => false
    //     });
    // });

    // Burlar teste de chrome
    await page.evaluateOnNewDocument(() => {
        window.chrome = {
            runtime: {}
        };
    });

    // // Burlar teste de tamanho de plugins
    // await page.evaluateOnNewDocument(() => {
    //     // Sobreescreve a propriedade `plugins` , para usar  um getter personalizado.
    //     Object.defineProperty(navigator, 'plugins', {
    //         // So precisa ter `length > 0`
    //         get: () => [1, 2, 3, 4, 5]
    //     });
    // });

    // // Burlar teste de  Linguagem.
    // await page.evaluateOnNewDocument(() => {
    //     // Sobreescreve a propriedade `plugins` , para usar  um getter personalizado.
    //     Object.defineProperty(navigator, 'languages', {
    //         get: () => ['en-US', 'en']
    //     });
    // });

    // // Burlar teste de iframe
    // await page.evaluateOnNewDocument(() => {
    //     Object.defineProperty(HTMLIFrameElement.prototype, 'contentWindow', {
    //         get: function () {
    //             return window;
    //         }
    //     });
    // });

    // // Burlar teste toString, ( quebra console.debug() )
    // await page.evaluateOnNewDocument(() => {
    //     window.console.debug = () => {
    //         return null;
    //     };
    // });
};


// /**
//  *
//  * @param page
//  * @returns {Promise<void>}
//  */
// const loginPage = async (page) => {
//     await page.goto(URL+'/#/login');
// };


/**
 *
 * @param page
 * @returns {Promise<void>}
 */
const login = async (page) => {
    await page.type('input[type="email"]', EMAIL);
    await page.type('input[type="password"]', PASS_MANGUE3);
    await page.click('button[type="submit"]');
};


/**
 *
 * @param page
 * @param roundTrip
 * @return {Promise<void>}
 */
const goSearch = async (page, roundTrip = false) => {

    const date_go = moment().add(1, 'day').format('DD/MM/YYYY');
    const date_bk = roundTrip ? moment().add(3, 'days').format('DD/MM/YYYY') : '';
    const url = `${URL}/#/?type_trip=${roundTrip ? 1 : 0}&adults=1&children=0&babies=0&baggage_type=1&date_starting=${date_go}&date_back=${date_bk}&destination_id=1152&origin_id=1005&international=false&agency_token=%242y%2410%24S0qXnpBq%2FhGeJCIo4AF.Iu86LcagR.DF8I8Xf7cuisWkQGYvQ%2FNCC`

    await page.goto(url);
};


/**
 *
 * @param page
 * @param type
 * @returns {Promise<void>}
 */
const findFlight = async (page, type) => {
    return await page.evaluate(($type) => (
        document.querySelector(`#form-${$type} > div:nth-child(3) > center > div > div.col-md-2.col-xs-3.flybox-in.flybox-company > div > div:nth-child(1) > div > input`).id
    ), type);

};


/**
 *
 * @param page
 * @param round_trip
 * @returns {Promise<void>}
 */
const selectFlight = async (page, round_trip = false) => {
    await page.waitForSelector('#home');
    await page.waitFor(2000);

    let departure_id = await findFlight(page, 'ida');
    await page.evaluate(id => {
        document.getElementById(id).style.display = 'block';
    }, departure_id);

    console.log('flight', departure_id)

    await page.waitForSelector(`#${departure_id}`);
    await page.click(`#${departure_id}`);

    if (round_trip) {
        await page.waitForSelector('a[href="#menu1"]');
        await page.click('a[href="#menu1"]');

        let return_id = await findFlight(page, 'volta');
        console.log('flightBack', return_id)

        await page.evaluate(id => {
            document.getElementById(id).style.display = 'block';
        }, return_id);

        await page.waitForSelector(`#${return_id}`);
        await page.click(`#${return_id}`);
    }

    await page.waitForSelector('.animated.fadeIn.panel-footer > button');
    await page.click('.animated.fadeIn.panel-footer > button');
};


/**
 *
 * @type {{login: login, goSearch: goSearch, selectFlight: selectFlight, cheat: byPassHeadlessDetection}}
 */
const $module = { login, goSearch, selectFlight, cheat: byPassHeadlessDetection };


module.exports = $module;