import QuestionSelect from "../../../../models/questions/question-select";
import Choice from "../../../../../lib/inquirer/choice";
import Question from "../../../../models/questions/question";
import EnvironmentVariable from "../az-webapp/config/environment-variable";
import WebApp from "../az-webapp/webapp";


/**
 * Know how to get the question(s)
 */
export default (appService: string, resourceGroup: string, subscription: string): Promise<Question> => {

    const webbApp = new WebApp();
    const choices: Choice[] = [];

    return new Promise((resolve, reject) => {

        // get enrivonment variables
        webbApp.listEnvironmentVariables(appService, subscription, resourceGroup)
            .then((environmentVariables: EnvironmentVariable[]) => {

                for (let environmentVariable of environmentVariables) {
                    choices.push(new Choice(environmentVariable.name, environmentVariable.name, environmentVariable.name));
                }

                resolve(new QuestionSelect("environmentVariableName", "Select a environment variable", choices));
            })
            .catch((err) => {
                console.log(err);
                reject(new Error("Error on environment-variable-question-select"))
            });


    });
}
