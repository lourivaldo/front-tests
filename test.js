const busca    = require('./projects/busca/busca');
const venom    = require('./projects/venom/venom');
const project  = process.env.PROJECT;
const name     = process.env.NAME;
const type     = process.env.TYPE;

if (project === 'VENOM') {
    switch (name) {
       
        case 'RECOVERY':
            const venom_recovery = venom.recovery
            type ? venom_recovery.mocha.run() : venom_recovery.nightmare.run()
            break

        case 'CREDIT':
            const venom_credit = venom.credit
            type ? venom_credit.mocha.run() : venom_credit.nightmare.run()
            break

        case 'TRANSFER':
            const venom_transfer = venom.transfer
            type ? venom_transfer.mocha.run() : venom_transfer.nightmare.run()
            break

        case 'DEBIT':
            const venom_debit = venom.debit
            type ? venom_debit.mocha.run() : venom_debit.nightmare.run()
            break

        case 'PAGSEGURO':
            const venom_pagseguro = venom.pagseguro
            type ? venom_pagseguro.mocha.run() : venom_pagseguro.nightmare.run()
            break

    }
} else if (project === 'BUSCA') {
    switch (name) {

        case 'LIQUIDACAO':
            const busca_liquidacao = busca.liquidacao
            type ? busca_liquidacao.mocha.run() : busca_liquidacao.nightmare.run();
            break

    }
}
