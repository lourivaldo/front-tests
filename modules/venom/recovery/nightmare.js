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


        //open recovery page
        .click('#navbar > div > div.navbar-header > ul > li > a.navbar-brand.menu-link-style.false')
        .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div > div > div.panel-body.m-t-md > form > div > div:nth-child(7) > div > a')


        //send email
        .insert('#email', 'marcio.lima@mangue3.com')
        .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div > div > div.panel-body.m-t-md > form > div > div.form-group.row.login-submit > div > button')
        .wait(10000)


        //login inbox
        .goto('https://inbox.google.com/')
        .insert('#Email', 'marcio.lima@mangue3.com')
        .click('#next')
        .wait('#Passwd')
        .insert('#Passwd', 's6g4sdfg5')
        .click('#signIn')


        //capture last email recovery password
        .wait('#GH > div > div.gr > div.at.bS > div.te.Nm > div.k5 > input.gc.sp.g-lW')
        .wait(1500)
        .type('#GH > div > div.gr > div.at.bS > div.te.Nm > div.k5 > input.gc.sp.g-lW', 'Controle de Usuário')
        .wait('#Nr > div > div.lp > div.nXx3q > div > div.cM.bz > div.yDSKFc.viy5Tb > div.tE > div > div.ai-cA.scroll-list-section-body > div > div.an.b9')
        .click('#Nr > div > div.lp > div.nXx3q > div > div.cM.bz > div.yDSKFc.viy5Tb > div.tE > div > div.ai-cA.scroll-list-section-body > div > div.an.b9')
        .wait(1000)
        .wait('#Nr > div > div.lp > div.nXx3q > div > div.cM.bz > div.yDSKFc.viy5Tb > div.tE > div > div.ai-cA.scroll-list-section-body > div > div.aY.ac.X.s2 > div.al.s2 > div.gj.s2 > div:nth-child(4) > div.pA.s2 > div.he.s2 > div.b5.xJNT8d > div.uyb8Gf > div:nth-child(1) > div.mg')
        .evaluate( () => {
            window.scrollTo(1000, 0)
        })
        .click('#Nr > div > div.lp > div.nXx3q > div > div.cM.bz > div.yDSKFc.viy5Tb > div.tE > div > div.ai-cA.scroll-list-section-body > div > div.aY.ac.X.s2 > div.al.s2 > div.gj.s2 > div:nth-child(4) > div.pA.s2 > div.he.s2 > div.b5.xJNT8d > div.uyb8Gf > div:nth-child(1) > div.mg')
        .wait('#Nr > div > div.lp > div.nXx3q > div > div.cM.bz > div.yDSKFc.viy5Tb > div.tE > div > div.ai-cA.scroll-list-section-body > div > div.aY.ac.X.s2.ac-P > div.al.s2.al-P > div.gj.s2 > div:nth-child(4) > div.pA.s2 > div.he.s2 > div.b5.xJNT8d > div.uyb8Gf > div:nth-child(1) > div.i3 > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > p > a')
        .evaluate (() => {
            url_token = 'http://localhost:3336/#/password/' + document.querySelector('#Nr > div > div.lp > div.nXx3q > div > div.cM.bz > div.yDSKFc.viy5Tb > div.tE > div > div.ai-cA.scroll-list-section-body > div > div.aY.ac.X.s2.ac-P > div.al.s2.al-P > div.gj.s2 > div:nth-child(4) > div.pA.s2 > div.he.s2 > div.b5.xJNT8d > div.uyb8Gf > div:nth-child(1) > div.i3 > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr > td > p > a')
            .getAttribute('href').split('/password/')[1];
            
            return url_token;
        })
        .then((res) => {
            const old_password = '123';
            const new_password = moment.now();


            console.log('old_password => ', old_password);
            console.log('new_password => ', new_password);

            
            return nightmare

                //define new password
                .goto(res)
                .type('#password', new_password)
                .type('#repeat_password', new_password)
                // .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div > div > div.panel-body.m-t-md > form > div > div.form-group.row.login-submit > div > button')
                // .wait('#root > div > div.notifications-wrapper > div > div > div.notification-action-wrapper > button')
                // .click('#root > div > div.notifications-wrapper > div > div > div.notification-action-wrapper > button')
    
                // .then( () => {

                //     // return nightmare
                //     //         .asd()
                // })


            })
        .catch((error) => {
            console.log('error', error);
            return nightmare.end()
        });       
}

module.exports = {
    run: run
}