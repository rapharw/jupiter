
import Choice from "../../lib/inquirer/choice";
import Question from "../models/questions/question";
import QuestionSelect from "../models/questions/question-select";

/**
 * Know how to get the question(s)
 */
export default (choices: Choice[]): Question => {

    return new QuestionSelect("selection", "Choose a wizard", choices);
}
