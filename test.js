const busca    = require('./projects/busca');
const venom    = require('./projects/venom');
const project  = process.env.PROJECT;
const name     = process.env.NAME;
const type     = process.env.TYPE;

if (project === 'VENOM') {
    switch (name) {
       
        case 'COUPON':
            const venom_coupon = venom.coupon;
            type ? venom_coupon.mocha.run() : venom_coupon.run();
            break;

    }
} else if (project === 'BUSCA') {
    switch (name) {

        case 'COUPON':
            const busca_coupon = busca.coupon;
            type ? busca_coupon.mocha.run() : busca_coupon.run();
            break;

    }
}
