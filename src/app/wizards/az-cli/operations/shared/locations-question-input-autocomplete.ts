
import Question from "./../../../../models/questions/question";
import QuestionInputAutocomplete from "./../../../../models/questions/question-input-autocomplete";
import Choice from "../../../../../lib/inquirer/choice";
import Account from "../az-account/account";
import Location from "../az-account/list-locations/location";

/**
 * Know how to get the question(s)
 */
export default (): Promise<Question> => {
    const choices: Choice[] = [];

    const account = new Account();

    return new Promise((resolve, reject) => {

        account.listLocations().then((locations: Location[]) => {
            
            for(let location of locations){
                choices.push(new Choice(location.displayName, location.displayName, location.name));
            }
            
            resolve(new QuestionInputAutocomplete("location", "Type a location (autocomplete)", choices));
        })
        .catch((err) => {
            console.log(err);
            reject(new Error("Error on locations-question-input-autocomplete"))
        });
    });
}
