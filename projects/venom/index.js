const recovery  = require('./test/recovery');
const transfer  = require('./test/transfer');
const debit     = require('./test/debit');
const credit    = require('./test/credit');
const pagseguro = require('./test/pagseguro');
const coupon    = require('./test/coupon');

module.exports = {
    recovery,
    transfer,
    debit,
    credit,
    pagseguro,
    coupon
}