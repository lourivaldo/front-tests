const nightmare = require('./modules/pagseguro.nightmare');
const mocha     = require('./modules/pagseguro.mocha');


module.exports = {
    mocha: mocha,
    nightmare: nightmare
}