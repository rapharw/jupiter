import QuestionInputAutocomplete from "../../../../models/questions/question-input-autocomplete";
import Choice from "../../../../../lib/inquirer/choice";
import Question from "../../../../models/questions/question";
import KeyVault from "../az-keyvault/keyvault";


/**
 * Know how to get the question(s)
 */
export default (keyvaultName: string, subscription: string): Promise<Question> => {

    return new Promise((resolve, reject) => {

        const keyvault = new KeyVault();
        keyvault.listSecrets(keyvaultName, subscription)
            .then(secrets => {
                const choices: Choice[] = [];
                for (let secret of secrets) {
                    choices.push(new Choice(secret.name, secret.name, secret.name));
                }
                resolve(new QuestionInputAutocomplete("secretName", "Type the Secret Name of the KeyVault (autocomplete)", choices));
            })
            .catch((err) => {
                console.log(err);
                reject(new Error("Error on keyvault-secret-name-Question-autocomplete"))
            });



    });
}
