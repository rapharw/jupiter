import Question from "../../../../models/questions/question";
import QuestionInput from "../../../../models/questions/question-input";


/**
 * Know how to get the question(s)
 */
export default (): Promise<Question> => {

    return new Promise((resolve, _) => {

        resolve(new QuestionInput("envVarName", "Type a name for Environment Variable", (input: string) => {
            if (!input.length) {
                return "Please enter a valid environment variable"
            }
            return true;
        }));
    });
}
