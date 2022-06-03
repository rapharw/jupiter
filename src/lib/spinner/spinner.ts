import CLI from 'clui';

export default class Spinner {

    spinner: CLI.Spinner = new CLI.Spinner("Loading ...");

    constructor(){
    }

    start(){
        this.spinner.start();
    }

    stop(){
        this.spinner.stop();
    }
}

module.exports = Spinner