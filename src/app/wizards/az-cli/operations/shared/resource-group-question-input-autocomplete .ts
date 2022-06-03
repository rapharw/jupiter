
import Question from "./../../../../models/questions/question";
import QuestionInputAutocomplete from "./../../../../models/questions/question-input-autocomplete";
import Choice from "../../../../../lib/inquirer/choice";
import Group from "../az-group/group";
import ResourceGroup from "../az-group/resource-group";

/**
 * Know how to get the question(s)
 */
export default (subscription: string): Promise<Question> => {
    const choices: Choice[] = [];

    const group = new Group();

    return new Promise((resolve, reject) => {

        group.listResourceGroups(subscription).then((resourceGroups: ResourceGroup[]) => {
            
            for(let resourceGroup of resourceGroups){
                choices.push(new Choice(resourceGroup.name, resourceGroup.name, resourceGroup.name));
            }
            
            resolve(new QuestionInputAutocomplete("resourceGroup", "Type a resource group (autocomplete)", choices));
        })
        .catch((err) => {
            console.log(err);
            reject(new Error("Error on resource-group-Question-input-autocomplete"))
        });
    });
}
