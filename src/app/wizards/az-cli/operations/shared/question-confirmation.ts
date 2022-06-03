import Question from "./../../../../models/questions/question";
import QuestionConfirmation from "../../../../models/questions/question-confirm";

/**
 * Know how to get the question(s)
 */
export default (): Promise<Question> => {
    
    return new Promise((resolve, _) => {
        resolve(new QuestionConfirmation("confirmation", "Confirm operation?"))
    });
    
}
