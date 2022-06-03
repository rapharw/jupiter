import inquirer from "../../../lib/inquirer/inquirer";
import Question from "./question";

export default class QuestionConfirmation extends Question {

    constructor(public name: string, public message: string){
        super(name, message);
    }
    
    async ask(): Promise<any>{
        return inquirer.confirm(this.name, this.message);
    }
}