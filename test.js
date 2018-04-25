const busca    = require('./modules/busca/busca');
const venom    = require('./modules/venom/venom');
const project  = process.env.PROJECT;
const name     = process.env.NAME;
const type     = process.env.TYPE;

if (project === 'VENOM') {
    switch (name) {
       
        case 'RECOVERY':
            const recovery = venom.recovery
            type ? recovery.mocha.run() : recovery.nightmare.run()

    }
} else if (project === 'BUSCA') {
    switch (name) {

        case 'LIQUIDACAO':
            const liquidacao = busca.liquidacao

            type ? liquidacao.mocha.run() : liquidacao.nightmare.run();

    }
}

