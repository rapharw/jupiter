import Question from "./../../../../models/questions/question";
import QuestionInput from "./../../../../models/questions/question-input";


/**
 * Know how to get the question(s)
 */
export default (): Promise<Question> => {

    return new Promise((resolve, _) => {

        resolve(new QuestionInput("keyvaultName", "Type a name for KeyVault (with no special caracters, max. 20 characters)", (input: string) => {
            if(new RegExp("[^A-Za-z0-9]").test(input) === true){
                return "Please enter a valid keyvault name"
            }
            return true;
        }));
    });
}
