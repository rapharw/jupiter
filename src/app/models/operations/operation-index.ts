import Choice from "./../../../lib/inquirer/choice";


export default abstract class OperationIndex {

    constructor(){

    }

    abstract getChoice(): Choice;
    abstract execute (): Promise<any>;
}