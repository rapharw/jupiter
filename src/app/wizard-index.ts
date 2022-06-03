import Choice from "../lib/inquirer/choice";

export default abstract class WizardIndex {

    constructor(){

    }

    abstract getChoice(): Choice;
    abstract execute (): void;
}