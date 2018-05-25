require('dotenv').config();
const EMAIL        = process.env.EMAIL;
const PASS_MANGUE3 = process.env.PASS_MANGUE3;
const VENOM        = process.env.URL_VENOM;
const moment       = require('moment');
const Nightmare    = require('nightmare');
const nightmare    = Nightmare({ 
        show: true, 
        loadTimeout: 100 * 2000,
        waitTimeout: 100 * 2000,
        openDevTools: { mode: 'detach' } });

let url_token = null;


const run = () => { 
    const origin        = 2;
    const destination   = 5;
    const date_starting = moment().add(1,'day').format('DD/MM/YYYY');
    const date_back     = moment().add(3,'day').format('DD/MM/YYYY');
    const adults        = 1;
    const children      = 0;
    const babies        = 0;
    // const agency_token  = '$2y$10$Iu9JbmRpn2pPbBlqpvl5TOJOpes.MtWU/SGkqsbdBqhRM7IqTcdHO'; //danyllo
    const agency_token  = '$2y$10$Cdr0LXFr0/rB7S./jT/LY.IUHUElffOzEE5KYJuxyIiVk96HdMuIa'; //iago
    // const agency_token  = '$2y$10$RSfbBYrXN6xXFQpATuKlMuldIIkb8O7NKXhbIAeENC5NRqnkcOMWK'; //production
    
    const searchUrl = `${VENOM}/#/?type_trip=1&adults=${adults}&children=${children}&babies=${babies}&baggage_type=1&date_starting=${date_starting}&date_back=${date_back}&destination_id=${destination}&origin_id=${origin}&agency_token=${agency_token}&companies=1%2C%202%2C%203%2C%204%2C%205`;
   
    nightmare
        .viewport(1000,800)
        .goto(searchUrl)

        .wait('#form-ida > div:nth-child(3) > center > div')
        .click('#form-ida > div:nth-child(3) > center > div')
        .wait(1000)
        .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div.col-md-6.col-xs-12.col-md-offset-3 > div:nth-child(2) > div > div > div > ul > li:nth-child(2) > a')
        .wait('#form-volta > div:nth-child(3) > center > div')
        .wait(1000)

        .click('#form-volta > div:nth-child(3) > center > div')


        .wait('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div:nth-child(2) > div > div > div.animated.fadeIn.panel-footer.md-pt-10.lg-pt-10.xs-pt-10.sm-pt-10 > button')
        .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div:nth-child(2) > div > div > div.animated.fadeIn.panel-footer.md-pt-10.lg-pt-10.xs-pt-10.sm-pt-10 > button')
        

        //logar
        .insert('#email', EMAIL)
        .insert('#password', PASS_MANGUE3)
        .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div > div > div.panel-body.m-t-md > form > div > div.form-group.row.login-submit > div > button')


        .wait('#form-op > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1) > input')
        .insert('#form-op > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(1) > input', 'teste')
        .insert('#form-op > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(2) > input', 'teste')
        .type('#form-op > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(3) > input', EMAIL)
        .select('#adult-gender', 'M')
        .type('#form-op > div:nth-child(1) > div > div > div:nth-child(1) > div:nth-child(6) > input', '26031996')
        .click('#check-terms')
        .click('#form-op > div:nth-child(4) > div.col-md-4.col-sm-12 > button')
        .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div.col-md-9.col-xs-12 > div > div.panel-body.row.m-t-xs.m-b-n-sm > div:nth-child(4) > div > div > img')

        .insert('#form-op > div > div > div:nth-child(2) > div > div:nth-child(3) > input', 'teste')
        .type('#gateway-cardNumber','0000000000000001')
        .select('#brand', 'Master')
        .type('#gateway-expirationDate', 202020)
        .insert('#gateway-securityCode', 579)
        .type('#gateway-cpf_cnpj', 10473322480)
        .insert('#form-op > div > div > div:nth-child(2) > div > div.col-lg-12.col-md-12.col-xs-12.m-b-md > input', 'marcio.hsdl@gmail.com')
  
        .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div.col-md-9.col-xs-12 > div > div:nth-child(3) > div > div > div.modal-footer > div > button')

       
        .catch((error) => {
            console.log('error', error);
            // return nightmare.end()
        });       
}

module.exports = {
    run: run
}
