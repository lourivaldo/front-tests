const busca    = require('./projects/busca');
const venom    = require('./projects/venom');
const project  = process.env.PROJECT;
const name     = process.env.NAME;
const type     = process.env.TYPE;

if (project === 'VENOM') {
    switch (name) {
       
        case 'RECOVERY':
            const venom_recovery = venom.recovery;
            type ? venom_recovery.mocha.run() : venom_recovery.nightmare.run();
            break;

        case 'CREDIT':
            const venom_credit = venom.credit;
            type ? venom_credit.mocha.run() : venom_credit.nightmare.run();
            break;

        case 'TRANSFER':
            const venom_transfer = venom.transfer;
            type ? venom_transfer.mocha.run() : venom_transfer.nightmare.run();
            break;

        case 'DEBIT':
            const venom_debit = venom.debit;
            type ? venom_debit.mocha.run() : venom_debit.nightmare.run();
            break;

        case 'PAGSEGURO':
            const venom_pagseguro = venom.pagseguro;
            type ? venom_pagseguro.mocha.run() : venom_pagseguro.nightmare.run();
            break;

        case 'COUPON':
            const venom_coupon = venom.coupon;
            type ? venom_coupon.mocha.run() : venom_coupon.puppeteer.run();
            break;

    }
} else if (project === 'BUSCA') {
    switch (name) {

        case 'SEARCHES':
            const busca_searches = busca.searches;
            type ? busca_searches.mocha.run() : busca_searches.run();
            break;

        case 'COUPON':
            const busca_coupon = busca.coupon;
            type ? busca_coupon.mocha.run() : busca_coupon.run();
            break;

    }
}
