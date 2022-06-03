import Question from "./../../models/questions/question";
import QuestionSelect from "./../../models/questions/question-select";
import Choice from "../../../lib/inquirer/choice";

/**
 * Know how to get the question(s)
 */
export default (choices: Choice[]): Question => {

    return new QuestionSelect("selection", "Choose an option", choices);
}
