import Choice from "../../../lib/inquirer/choice";
import inquirer from "../../../lib/inquirer/inquirer";
import Question from "./question";

export default class QuestionInputAutocomplete extends Question {

    constructor(public name: string, public message: string, public choices: Choice[]){
        super(name, message);
    }

    async ask(): Promise<any>{
        return inquirer.inputTextAutocomplete(this.name, this.message, this.choices);
    }
}