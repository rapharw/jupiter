import QuestionInputAutocomplete from "./../../../../models/questions/question-input-autocomplete";
import Choice from "./../../../../../lib/inquirer/choice";
import Question from "../../../../models/questions/question";
import KeyVault from "../az-keyvault/keyvault";

/**
 * Know how to get the question(s)
 */
export default (resourceGroup: string, subscription: string): Promise<Question> => {

    return new Promise((resolve, _) => {

        const keyvault = new KeyVault ();
        const keyvaults = keyvault.list(resourceGroup, subscription);

        keyvaults.then(keyvaults => {
            const choices: Choice [] = [];
            for(let keyvault of keyvaults){
                choices.push(new Choice(keyvault.name, keyvault.name, keyvault.name));
            }
            resolve(new QuestionInputAutocomplete("keyvaultName", "Type the name of the KeyVault (autocomplete)", choices));
        })
    });
}
