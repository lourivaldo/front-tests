require('dotenv').config();
const EMAIL      = process.env.EMAIL;
const PASS_INBOX = process.env.PASS_INBOX;
const moment     = require('moment');
const Nightmare  = require('nightmare');
const nightmare  = Nightmare({ 
        show: true, 
        loadTimeout: 100 * 1000,
        waitTimeout: 100 * 1000,
        openDevTools: { mode: 'detach' } });

let url_token = null;


const run = () => { 

    nightmare
        .viewport(1000,1200)
        .goto('http://localhost:3336/#/?type_trip=1&adults=1&children=0&babies=0&baggage_type=1&date_starting=30%2F04%2F2018&date_back=04%2F05%2F2018&destination_id=1052&origin_id=1005&agency_token=%242y%2410%24S0qXnpBq%2FhGeJCIo4AF.Iu86LcagR.DF8I8Xf7cuisWkQGYvQ%2FNCC&companies=1%2C2%2C3%2C4')

}