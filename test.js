const busca    = require('./modules/busca/busca');
const venom    = require('./modules/venom/venom');
const project  = process.env.PROJECT;
const name     = process.env.NAME;
const type     = process.env.TYPE;

if (project === 'VENOM') {
    switch (name) {
       
        case 'RECOVERY':
            const venom_recovery = venom.recovery
            type ? venom_recovery.mocha.run() : venom_recovery.nightmare.run()

        case 'LIQUIDACAO':
            const venom_liquidacao = venom.liquidacao
            type ? venom_liquidacao.mocha.run() : venom_liquidacao.nightmare.run()

    }
} else if (project === 'BUSCA') {
    switch (name) {

        case 'LIQUIDACAO':
            const busca_liquidacao = busca.liquidacao
            type ? busca_liquidacao.mocha.run() : busca_liquidacao.nightmare.run();

    }
}

