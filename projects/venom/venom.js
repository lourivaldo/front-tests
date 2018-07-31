const recovery  = require('./test/recovery/recovery');
const transfer  = require('./test/transfer/transfer');
const debit     = require('./test/debit/debit');
const credit    = require('./test/credit/credit');
const pagseguro = require('./test/pagseguro/pagseguro');

module.exports = {
    recovery:  recovery,
    transfer:  transfer,
    debit:     debit,
    credit:    credit,
    pagseguro: pagseguro
}