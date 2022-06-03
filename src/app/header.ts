import chalk from 'chalk';
import figlet from 'figlet';

export default class Header {

    constructor(private message: string) {

    }

    show(type: string = 'yellow'): void {
        
        let text: string = figlet.textSync(this.message);

        switch (type) {
            case 'blue':
                console.log(
                    chalk.blue(text)
                );
                break;

            default:
                console.log(
                    chalk.yellow(text)
                );
                break;
        }

    }
}