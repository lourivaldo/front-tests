const Nightmare = require('nightmare');
const assert    = require('assert');

let url_token = null;

const run = () => {

    // context('Recovery password venom', function () {
    //     // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    //     this.timeout('30s')

    //     let nightmare = null

    //     beforeEach(() => {
    //         nightmare = new Nightmare()
    //     })

    //     describe('', () => {
    //         it('Open recovery page', done => {
    //             nightmare
    //                 .goto('http://localhost:3336/')
    //                 .click('#navbar > div > div.navbar-header > ul > li > a.navbar-brand.menu-link-style.false')
    //                 .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div > div > div.panel-body.m-t-md > form > div > div:nth-child(7) > div > a')
    //                 .then((res) => {
    //                     done()
    //                 })
    //         })


    //         it('Type in email field and send email', done => {
    //             nightmare
    //                 .insert('#email', 'marcio.lima@mangue3.com')
    //                 .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div > div > div.panel-body.m-t-md > form > div > div.form-group.row.login-submit > div > button')
    //                 .wait(5000)
    //                 .then(function (result) {


    //                     expect(result).to.equal(null);


    //                     it('Type in email field and send email', done => {
    //                         nightmare
    //                             .insert('#email', 'marcio.lima@mangue3.com')
    //                             .click('#root > div > div.be-wrapper.be-nosidebar-left > div > div > div > div > div > div.panel-body.m-t-md > form > div > div.form-group.row.login-submit > div > button')
    //                             .wait(5000)
    //                             .then(function (result) { done() })
    //                             .catch(done)
    //                     })


    //                 })
    //                 .catch(done)
    //         })


    //     })

    //     describe.skip('', () => {

    //     })
    // })

}

module.exports = {
    run: run
}

