import QuestionInputPassword from "../../../../models/questions/question-input-password";
import Question from "../../../../models/questions/question";


/**
 * Know how to get the question(s)
 */
export default (): Promise<Question> => {

    return new Promise((resolve, _) => {

        resolve(new QuestionInputPassword("keyvaultSecretValue", "Type a value for Secret", (input: string) => {
            if (!input.length) {
                return "Please enter a valid secret value"
            }
            return true;
        }));
    });
}
