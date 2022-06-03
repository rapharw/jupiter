import Question from "./../../../../models/questions/question";
import QuestionInputAutocomplete from "./../../../../models/questions/question-input-autocomplete";
import Choice from "../../../../../lib/inquirer/choice";
import AppService from "../az-webapp/app-service";
import WebApp from "../az-webapp/webapp";

/**
 * Know how to get the question(s)
 */
export default (subscription: string, resourceGroup: string): Promise<Question> => {
    const choices: Choice[] = [];

    const webapp = new WebApp();

    return new Promise((resolve, reject) => {

        webapp.listAppServices(subscription, resourceGroup).then((appservices: AppService[]) => {
            
            for(let appService of appservices){
                choices.push(new Choice(appService.name, appService.name, appService.name));
            }
            
            resolve(new QuestionInputAutocomplete("appServiceName", "Type an app service (autocomplete)", choices));
        })
        .catch((err) => {
            console.log(err);
            reject(new Error("Error on webapp-Question-input-autocomplete"))
        });
    });
}
