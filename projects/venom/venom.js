const recovery  = require('./recovery/recovery');
const transfer  = require('./transfer/transfer');
const debit     = require('./debit/debit');
const credit    = require('./credit/credit');
const pagseguro = require('./pagseguro/pagseguro');

module.exports = {
    recovery:  recovery,
    transfer:  transfer,
    debit:     debit,
    credit:    credit,
    pagseguro: pagseguro
}