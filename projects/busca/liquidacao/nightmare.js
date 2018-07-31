require('dotenv').config();
const EMAIL        = process.env.EMAIL;
const PASS_INBOX   = process.env.PASS_INBOX;
const PASS_MANGUE3 = process.env.PASS_MANGUE3;
const Nightmare    = require('nightmare');
const moment       = require('moment');
const nightmare    = Nightmare({
    show: true,
    loadTimeout: 100 * 1000,
    waitTimeout: 100 * 1000,
    openDevTools: { mode: 'detach' }
});

const run = () => {
    nightmare
        .viewport(1000,800)
        .goto('http://localhost:3333/')

        
        //login
        .click('div.button-enter button.btn-defaut')
        .insert('input[type="email"]', EMAIL)
        .insert('input[type="password"]', PASS_MANGUE3)
        .click('div.action-login button.b-btn.b-btn-default.btn-block')


        //close modal
        // .wait('#close-modal-azul')
        // .click('#close-modal-azul')


        .wait('#banner-home')


        //go to search page
        .evaluate(() => {
            var elements = Array.from(document.querySelectorAll('a')).filter(a => /BUSCAR PASSAGENS/.test(a.innerText))
            elements[0].className += "btn-busca-nightmare";
        })
        .click('.btn-busca-nightmare')
        

        //search flight roundTrip
        .wait(4000)
        .type('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > input', 'LIMA')
        .wait('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > ul > li:nth-child(1)')
        .click('fieldset.origin-destination.col-xs-12 > label:nth-child(1) > div > div > ul > li:nth-child(1)')
        .type('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > input', 'GRU')
        .wait('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > ul > li:nth-child(1)')
        .click('fieldset.origin-destination.col-xs-12 > label:nth-child(2) > div > div > ul > li:nth-child(1)')
       

        //error validate 15 days
        // .type('#date_starting', moment().add(1,'day').format('DD/MM/YYYY'))
        .type('#date_starting', '02/06/2018')
        // .type('#date_back',     moment().add(3,'days').format('DD/MM/YYYY'))
       

        // .type('#date_starting', moment().add(16,'days').format('DD/MM/YYYY'))
        // .type('#date_back',     moment().add(18,'days').format('DD/MM/YYYY'))

        // .select('#root > div > div:nth-child(2) > content > div > div > div:nth-child(1) > div > div > div > form > div.col-md-9.col-xs-12 > section > div.flight-row > fieldset.date-passengers.col-xs-12 > div.passengers.col-xs-12.col-sm-6.col-md-6 > div > label:nth-child(1) > select', '2')
        // .click('.logo-tam')
        // .click('.logo-azul')
        // .click('.logo-gol')
        .click('#btn-buscar-voos')
        .wait('.numero-voo')


        //chose flights
        .click('#tab-ida > form > div > div > div:nth-child(1)')
        .click('#tab-volta > div:nth-child(3) > div > div > div:nth-child(1) > span.box-escolha > input[type="radio"]')
        .click('#btn-opcoes > div > div > button')


        //conditioal terms
        .wait('#modal-conditional > div > div > div.modal-footer > div > button.btn.btn-success')
        .click('#modal-conditional > div > div > div.modal-footer > div > button.btn.btn-success')


        //passengers data
        .insert('input[name="name"]', 'teste transfer')
        .insert('input[name="surname"]', 'teste transfer')
        .type('#adult-gender', 'M')
        .insert('input[name="birthday"]', '26/03/1996')
        // .click('#check-terms')
        // .click('#form-op > div:nth-child(3) > div > div.col-md-4.col-sm-12 > button')


        //billet form
        // .wait('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(4) > div:nth-child(3) > div > img')
        // .click('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(4) > div:nth-child(3) > div > img')
        // .wait('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(5) > div:nth-child(2) > div > div.row.alert.alert-msg > span > div:nth-child(4) > button')
        // .click('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(5) > div:nth-child(2) > div > div.row.alert.alert-msg > span > div:nth-child(4) > button')
        // .click('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(5) > div > div > div > span > div:nth-child(4) > button')
        // .wait('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(5) > div > div > div.row.alert.alert-msg > span > div:nth-child(4) > button')
        // .click('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(5) > div > div > div.row.alert.alert-msg > span > div:nth-child(4) > button')
      
        //debit form
        // .wait('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(4) > div:nth-child(5) > div > img')
        // .click('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(4) > div:nth-child(5) > div > img')
        // .wait('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(5) > div > div > div > span > div > button')
        // .click('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(5) > div > div > div > span > div > button')
        // .insert('#cielo-name', 'MARCIO H S LIMA')
        // .type('#cielo-cpf_cnpj', '10473322480')
        // .insert('#cielo-email', 'marcio.hsdl@gmail.com')
        // .type('#gateway-cardNumber', '0000 0000 0000 0001')
        // .select('#gateway-brand', 'Master')
        // .select('#form-op > div:nth-child(2) > div:nth-child(3) > div > div.form-group.col-xs-6.col-lg-2 > div > div.col-lg-6.col-xs-6.m-l-n-xs > select','03')
        // .select('#form-op > div:nth-child(2) > div:nth-child(3) > div > div.form-group.col-xs-6.col-lg-2 > div > div.col-lg-7.col-xs-7.m-r-n > select','2020')
        // .insert('#gateway-securityCode', '897')
        // .click('#form-op > div.modal-footer > div > button')


        //credit form 
        // .wait('#credit > img')
        // .click('#credit > img')
        // .insert('#cielo-name','teste')
        // .type('#cielo-cpf_cnpj', '10473322480')
        // .insert('#cielo-email', EMAIL)
        // .type('#gateway-cardNumber', '0000 0000 0000 0001')
        // .select('#gateway-brand', 'Master')
        // .select('#form-op > div:nth-child(2) > div:nth-child(3) > div.row > div:nth-child(3) > div > div.col-lg-6.col-xs-6.m-l-n-xs > select','03')
        // .select('#form-op > div:nth-child(2) > div:nth-child(3) > div.row > div:nth-child(3) > div > div.col-lg-7.col-xs-7.m-r-n > select','2020')
        // .insert('#gateway-securityCode', '897')
        // .select('#gateway-plot', '1')
        // .type('#gateway-cep','53370525')
        // .type('#gateway-number', '06')
        // .select('#gateway-contact_type', 'cellphone')
        // .type('#gateway-contact-ddd','81')
        // .type('#gateway-contact','998334195')
        // .click('#form-op > div.modal-footer > div > button')


        //pagseguro
        // .wait('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(4) > div:nth-child(4) > div > img')
        // .click('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(4) > div:nth-child(4) > div > img')
        // .insert('#cielo-name', 'teste')
        // .type('#cielo-cpf_cnpj', '10473322480')
        // .insert('#cielo-email', EMAIL)
        // .click('#form-op > div.modal-footer > div > button')


        //transfer
        // .wait('#root > div > div:nth-child(2) > content > div > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > img')
        // .click('#root > div > div:nth-child(2) > content > div > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(2) > div > img')
        // .click('#root > div > div:nth-child(2) > content > div > div > div > div > div:nth-child(5) > div > div > div.col-xs-12.alert.alert-msg.xs-p-10.xs-ml-5 > span > div > button')


        .catch(error => {
            console.error('Liquidação failed:', error)
        });
}

module.exports = {
    run: run
}