import { exec } from "child_process";
import { ObjectEncodingOptions } from "fs";

export default (command: string, print: boolean, callback: Function, warning: Function) => {

    const options: ObjectEncodingOptions = {
        "encoding": 'utf8'
    };

    exec(command, options, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }

        if (stdout) {
            if (print)
                console.log(stdout);

            callback(stdout);
        }
        console.log(stderr)
        if(stderr){
            console.log(stderr);

            warning(stderr);
        }
    });
}