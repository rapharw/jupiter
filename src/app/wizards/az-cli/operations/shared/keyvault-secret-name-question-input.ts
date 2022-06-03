import Question from "../../../../models/questions/question";
import QuestionInput from "../../../../models/questions/question-input";


/**
 * Know how to get the question(s)
 */
export default (): Promise<Question> => {

    return new Promise((resolve, _) => {

        resolve(new QuestionInput("keyvaultSecretName", "Type a name for Secret (with no special caracters, max. 15 characters)", (input: string) => {
            if(new RegExp("[^A-Za-z0-9]").test(input) === true){
                return "Please enter a valid secret name"
            }
            return true;
        }));
    });
}
